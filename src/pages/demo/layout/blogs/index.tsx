import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Octokit } from 'octokit';
import { useEffect, useState } from 'react';
import ContentView from './components/contentView';
import ListView from './components/listView';
import SearchView from './components/searchView';
import { CatalogItem } from './model';
import { content1 } from './testContent';

dayjs.extend(isBetween);

function calcEdgeDate(items: CatalogItem[]) {
  let latestDate = dayjs('1999-01-02');
  let oldestDate = dayjs();

  for (let i = 0; i < items.length; i++) {
    const idate = dayjs(items[i].createTime, 'YYYY-MM-DD');

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
    if (dateMap[item.createTime] === undefined) {
      dateMap[item.createTime] = [];
    }

    dateMap[item.createTime].push(item);
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

  const { accatalog } = useModel('demo.layout.blogs.model', (m: any) => ({
    accatalog: m.accatalog as CatalogItem,
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
        width: navstate ? 0 : '350px',
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingcatalog(false);
      });

    // test content
    setContent(content1);
  }, []);

  useEffect(() => {
    let tcatalog = [...catalog];

    if (catalogfilter.keyword !== '') {
      tcatalog = tcatalog.filter((item) => {
        const title = item.title;

        return title.indexOf(catalogfilter.keyword) !== -1;
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

        setContent(decoded_content);
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
        <ContentView loadingcontent={loadingcontent} content={content} />
      </div>
    </div>
  );
};

export default BlogsView;
