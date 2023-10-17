import { LayoutCfg } from '@/components/Markdown';
import { CatalogItem } from '@/services/github';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useLocation, useModel } from '@umijs/max';
import { message } from 'antd';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { Octokit } from 'octokit';
import { useEffect, useState } from 'react';
import ContentView from './components/contentView';
import ListView from './components/listView';
import SearchView from './components/searchView';

const navpartWidth: number = 350;

function calcEdgeDate(items: CatalogItem[]) {
  let latestDate = dayjs('1999-01-02');
  let oldestDate = dayjs();

  for (let i = 0; i < items.length; i++) {
    const idate = dayjs(items[i].updateTime, 'YYYY-MM-DD');

    if (latestDate.isBefore(idate)) {
      latestDate = idate;
    }

    if (oldestDate.isAfter(idate)) {
      oldestDate = idate;
    }
  }

  return [oldestDate, latestDate];
}

function genTagSelectOpt(items: CatalogItem[]) {
  const tagset = new Set<string>();

  items.forEach((item) => {
    const tags = item.tags;

    tags.forEach((tag) => {
      tagset.add(tag);
    });
  });

  const unitags = Array.from(tagset);

  return unitags.map((item) => ({ value: item }));
}

function sortCatalogItems(items: CatalogItem[]) {
  // 升序 [oldest, ..., latest]
  const dateMap: Record<string, CatalogItem[]> = {};

  items.forEach((item) => {
    if (dateMap[item.updateTime] === undefined) {
      dateMap[item.updateTime] = [];
    }

    dateMap[item.updateTime].push(item);
  });

  const sortedKey = Object.keys(dateMap).sort((a, b) => {
    const adateunix = dayjs(a, 'YYYY-MM-DD').unix();
    const bdateunix = dayjs(b, 'YYYY-MM-DD').unix();

    return adateunix - bdateunix;
  });

  const sortedItems: CatalogItem[] = [];

  sortedKey.forEach((key) => {
    const cts = dateMap[key];
    sortedItems.push(...cts);
  });

  return sortedItems;
}

function procContent(content: string, info: CatalogItem) {
  const datahuburl = 'https://github.com/duganlx/datahub/blob/main/blogs';
  const prefix = datahuburl + '/' + info.dir;

  const regex = /!\[(.*?)\]\((.*?)\)/g;
  const ncontent = content.replace(regex, `![$1](${prefix}/$2?raw=true)`);

  return ncontent;
}

function generateUrlParams(search: string) {
  const query: Record<string, any> = {};

  if (search.split('?').length === 1) {
    return query;
  }

  search
    .split('?')[1]
    .split('&')
    .forEach((item) => {
      const [key, value] = item.split('=');

      if (value.indexOf(',') === -1) {
        query[key] = decodeURIComponent(value);
      } else {
        query[key] = value.split(',').map((v) => decodeURIComponent(v));
      }
    });

  return query;
}

const BlogsView: React.FC = () => {
  const octokit = new Octokit({});

  const [navstate, setNavstate] = useState<boolean>(false); // false: opening, true: closed

  const [catalog, setCatalog] = useState<CatalogItem[]>([]); // 按createTime降序 latest -> oldest
  const [loadingcatalog, setLoadingcatalog] = useState<boolean>(false);
  const [oldestDate, setOldestDate] = useState<dayjs.Dayjs | null>(null);
  const [latestDate, setLatestDate] = useState<dayjs.Dayjs | null>(null);
  const [tagselectopt, setTagselectopt] = useState<any[]>([]);
  const [catalogfilter, setCatalogfilter] = useState<any>({});
  const [rendercatalog, setRendercatalog] = useState<CatalogItem[]>([]);

  const [content, setContent] = useState<string>('');
  const [loadingcontent, setLoadingcontent] = useState<boolean>(false);
  const [contentlayout, setContentlayout] = useState<LayoutCfg | undefined>(undefined);

  const { search } = useLocation();
  const query = generateUrlParams(search);

  const { accatalog, setAccatalog } = useModel('travelogue.blogs.model', (m: any) => ({
    accatalog: m.accatalog as CatalogItem,
    setAccatalog: m.udAccatalog,
  }));

  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'row',
      height: 'calc(100vh - 36px)',
      width: '100vw',
      backgroundColor: '#f0f0f0',
      padding: '5px 3px 2px 0',

      '.navpart': {
        backgroundColor: 'white',
        height: '100%',
        width: navstate ? 0 : `${navpartWidth}px`,
        marginRight: '35px',
        position: 'relative',

        '.navbtn': {
          position: 'absolute',
          width: '22px',
          height: '52px',
          top: '20px',
          right: '-22px',
          borderRadius: '0 10px 10px 0',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0% 85%',
          background: `url(${window.location.origin}/nav/${
            navstate ? 'closed_btn' : 'opened_btn'
          }.png) 0 0/100% 100% no-repeat;`,
        },

        '.navcontent': {
          height: 'calc(100% - 17px)',
          width: '100%',
          padding: '15px 5px 2px 5px',
          display: navstate ? 'none' : '',
        },
      },

      '.main': {
        flex: '1 1 auto',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        marginRight: '5px',
        padding: '10px 5px 3px 5px',
      },
    };
  });

  useEffect(() => {
    setLoadingcatalog(true);
    octokit
      .request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'duganlx',
        repo: 'datahub',
        path: 'blogs/catalog.json',
      })
      .then((res) => {
        if (res.status !== 200) {
          message.info('获取目录数据失败');
          return;
        }

        const base64_str = (res.data as { content: string | undefined }).content || '';
        const decoded_content = Buffer.from(base64_str, 'base64').toString();
        const catalogjson = JSON.parse(decoded_content);
        const procItems = sortCatalogItems(catalogjson);
        const [od, ld] = calcEdgeDate(procItems);
        const tso = genTagSelectOpt(procItems);

        setTagselectopt(tso);
        setOldestDate(od);
        setLatestDate(ld);
        setCatalog(procItems);

        if (query.blogId !== undefined) {
          const aimCatalogItems = procItems.filter((item) => item.id === +query.blogId);
          if (aimCatalogItems.length > 0) {
            setAccatalog(aimCatalogItems[0]);
            return;
          }
          message.info(`blog[id=${query.blogId}] is not exist.`);
        }
        if (procItems.length > 0) {
          const lastindex = procItems.length - 1;
          setAccatalog(procItems[lastindex]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingcatalog(false);
      });
  }, []);

  useEffect(() => {
    const debounceRender = debounce(function (height: number, width: number) {
      setContentlayout({ height, width });
    }, 300);

    window.addEventListener('resize', () => {
      debounceRender(window.innerHeight - 40, window.innerWidth);
    });

    setContentlayout({ height: window.innerHeight - 40, width: window.innerWidth });
  }, []);

  useEffect(() => {
    let tcatalog = [...catalog];

    if (catalogfilter.keyword !== '') {
      tcatalog = tcatalog.filter((item) => {
        const title = item.title;

        return title.toLowerCase().indexOf(catalogfilter.keyword.toLowerCase()) !== -1;
      });
    }

    if ((catalogfilter.selectedtag || []).length !== 0) {
      tcatalog = tcatalog.filter((item) => {
        const tags = item.tags;
        let isMatch = false;

        for (let i = 0; i < catalogfilter.selectedtag.length; i++) {
          const expecttag = catalogfilter.selectedtag[i];

          if (tags.indexOf(expecttag) !== -1) {
            isMatch = true;
            break;
          }
        }

        return isMatch;
      });
    }

    if (catalogfilter.timeorder) {
      tcatalog = tcatalog.reverse();
    }

    // todo 时间过滤功能
    // console.log(catalogfilter.begin, catalogfilter.end)

    setRendercatalog(tcatalog);
  }, [catalogfilter]);

  useEffect(() => {
    if (accatalog === null) {
      return;
    }

    setLoadingcontent(true);
    const aimDir = accatalog.dir;
    octokit
      .request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'duganlx',
        repo: 'datahub',
        path: `blogs/${aimDir}/README.md`,
      })
      .then((res) => {
        if (res.status !== 200) {
          message.info('获取文章数据失败');
          return;
        }

        const base64_str = (res.data as { content: string | undefined }).content || '';
        const decoded_content = Buffer.from(base64_str, 'base64').toString();

        const proc_content = procContent(decoded_content, accatalog);
        // console.log(proc_content);
        setContent(proc_content);
      })
      .finally(() => {
        setLoadingcontent(false);
      });
  }, [accatalog]);

  return (
    <div className={className}>
      <div className="navpart">
        <div
          className="navbtn"
          onClick={() => {
            setNavstate(!navstate);
          }}
        />
        <div className="navcontent">
          <ListView blogItems={rendercatalog} loading={loadingcatalog} />
          <div style={{ width: '100%', height: '15px' }} />
          <SearchView
            oldestDate={oldestDate}
            latestDate={latestDate}
            selectOpts={tagselectopt}
            notifyFilterCondition={(fc: any) => {
              setCatalogfilter(fc);
            }}
          />
        </div>
      </div>
      <div className="main">
        <ContentView
          loadingcontent={loadingcontent}
          content={content}
          navstate={navstate}
          contentlayout={contentlayout}
          navpartWidth={navpartWidth}
        />
      </div>
    </div>
  );
};

export default BlogsView;
