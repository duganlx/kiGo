import Markdown from '@/components/Markdown';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { message } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Octokit } from 'octokit';
import { useEffect, useState } from 'react';
import ListView from './components/listView';
import SearchView from './components/searchView';

dayjs.extend(isBetween);

type CatalogItem = {
  id: number;
  title: string;
  tags: string[];
  dir: string;
  createTime: string;
  updateTime: string;
};

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
  // todo 完成功能
  const dateMap: Record<string, CatalogItem[]> = {};

  items.forEach((item) => {
    if (dateMap[item.createTime] === undefined) {
      dateMap[item.createTime] = [];
    }

    dateMap[item.createTime].push(item);
  });
}

const BlogsView: React.FC = () => {
  const octokit = new Octokit({});

  const [navstate, setNavstate] = useState<boolean>(false); // false: opening, true: closed

  const [catalog, setCatalog] = useState<CatalogItem[]>([]); // 按createTime降序 latest -> oldest
  const [oldestDate, setOldestDate] = useState<dayjs.Dayjs | null>(null);
  const [latestDate, setLatestDate] = useState<dayjs.Dayjs | null>(null);
  const [tagselectopt, setTagselectopt] = useState<any[]>([]);
  const [catalogfilter, setCatalogfilter] = useState<any>({});
  const [rendercatalog, setRendercatalog] = useState<CatalogItem[]>([]);

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
        backgroundColor: 'white',
        marginRight: '5px',
        padding: '10px 5px 3px 5px',
      },
    };
  });

  useEffect(() => {
    octokit
      .request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'duganlx',
        repo: 'datahub',
        path: 'blogs/catalog.json',
      })
      .then((res) => {
        if (res.status !== 200) {
          message.info('获取数据失败');
          return;
        }

        const base64_str = (res.data as { content: string | undefined }).content || '';
        const decoded_content = Buffer.from(base64_str, 'base64').toString();
        const catalogjson = JSON.parse(decoded_content);
        // todo 时间排序
        sortCatalogItems(catalogjson);
        const [od, ld] = calcEdgeDate(catalogjson);
        const tso = genTagSelectOpt(catalogjson);

        setTagselectopt(tso);
        setOldestDate(od);
        setLatestDate(ld);
        setCatalog(catalogjson);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // todo 完成过滤
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

    // todo 时间过滤
    // if (catalogfilter.timeorder) {
    //   tcatalog =
    // }

    setRendercatalog(tcatalog);
  }, [catalogfilter]);

  const content = `
# xxxx

1 + 2 = 35 
~~~go
fmt.Println("xxx");
fmt.Println("yyy");
~~~
`;

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
          <SearchView
            oldestDate={oldestDate}
            latestDate={latestDate}
            selectOpts={tagselectopt}
            notifyFilterCondition={(fc: any) => {
              setCatalogfilter(fc);
            }}
          />
          <div style={{ width: '100%', height: '15px' }} />
          <ListView blogItems={rendercatalog} />
        </div>
      </div>
      <div className="main">
        <Markdown content={content} />
      </div>
    </div>
  );
};

export default BlogsView;
