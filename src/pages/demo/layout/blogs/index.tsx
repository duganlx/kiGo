import Markdown from '@/components/Markdown';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import dayjs from 'dayjs';
import { useState } from 'react';
import ListView from './components/listView';
import SearchView from './components/searchView';

const BlogsView: React.FC = () => {
  const [navstate, setNavstate] = useState<boolean>(false); // false: opening, true: closed

  const data = [
    {
      id: 1,
      title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      tags: ['数据', 'xxx'],
      createTime: '2023-09-25',
    },
    {
      id: 2,
      title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      tags: ['数据', 'ddd'],
      createTime: '2023-09-25',
    },
    {
      id: 3,
      title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      tags: ['数据', 'ddd'],
      createTime: '2023-09-25',
    },
    {
      id: 4,
      title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      tags: ['数据', 'ddd'],
      createTime: '2023-09-25',
    },
    {
      id: 5,
      title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      tags: ['数据', 'ddd'],
      createTime: '2023-09-25',
    },
    {
      id: 6,
      title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      tags: ['数据', 'ddd'],
      createTime: '2023-09-25',
    },
    {
      id: 7,
      title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      tags: ['数据', 'ddd'],
      createTime: '2023-09-25',
    },
    {
      id: 8,
      title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      tags: ['数据', 'ddd'],
      createTime: '2023-09-25',
    },
  ];

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

  const content = `
# xxxx

1 + 2 = 3
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
            oldestDate={dayjs('2017-01-01')}
            latestDate={dayjs()}
            selectOpts={[
              { value: 'gold' },
              { value: 'lime' },
              { value: 'green' },
              { value: 'cyan' },
            ]}
            notifyFilterCondition={(fc: any) => {
              console.log('filter', fc);
            }}
          />
          <div style={{ width: '100%', height: '15px' }} />
          <ListView blogItems={data} />
        </div>
      </div>
      <div className="main">
        <Markdown content={content} />
      </div>
    </div>
  );
};

export default BlogsView;
