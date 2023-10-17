import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import { Empty, Spin, Tag } from 'antd';
import React from 'react';

type BlogInfoItem = {
  id: number;
  title: string;
  tags: string[];
  createTime: string;
  updateTime: string;
};

interface AcardViewProps {
  // key: any;
  item: BlogInfoItem;
}

const AcardView: React.FC<AcardViewProps> = (props) => {
  const { item } = props;
  const { title, tags, updateTime } = item;

  const { accatalog, setAccatalog } = useModel('travelogue.blogs.model', (m: any) => ({
    accatalog: m.accatalog,
    setAccatalog: m.udAccatalog,
  }));

  const className = useEmotionCss(() => {
    return {
      borderBottom: '1px solid #d9d9d9',
      padding: '5px 2px 1px 5px',
      cursor: 'pointer',
      backgroundColor: accatalog && accatalog.id === item.id ? '#f9f0ff' : 'white',

      '&:hover': {
        backgroundColor: '#fafafa',
      },

      '.acard-title': {
        color: 'black',
        marginBottom: '5px',
        fontSize: '15px',
        wordSpacing: '1px',
      },

      '.acard-info': {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: '2px',
        alignItems: 'center',

        '.acardinfo-tags': {
          '.ant-tag ': {
            height: '18px',
            lineHeight: '14px',
          },
        },

        '.acardinfo-time': {
          lineHeight: '14px',
          fontSize: '13px',
          minWidth: '70px',
          color: '#8c8c8c',
          // float: 'right',
        },
      },
    };
  });

  return (
    <div
      className={className}
      onClick={() => {
        setAccatalog(item);
      }}
    >
      <div className="acard-title">{title}</div>
      <div className="acard-info">
        <div className="acardinfo-tags">
          {tags.map((itag) => {
            return (
              <Tag color="orange" key={itag}>
                {itag}
              </Tag>
            );
          })}
        </div>
        <div className="acardinfo-time">{updateTime}</div>
      </div>
    </div>
  );
};

interface ListViewProps {
  blogItems: BlogInfoItem[];
  loading: boolean;
}

const ListView: React.FC<ListViewProps> = (props) => {
  const { blogItems: data, loading } = props;

  const className = useEmotionCss(() => {
    return {
      border: '2px dashed #ffccc7',
      borderRadius: '5px',
      padding: '5px 3px 2px 3px',
      position: 'relative',
      display: 'flex',
      height: 'calc(100% - 95px)',
      flexDirection: 'column',
      justifyContent: 'space-between',

      '.title': {
        position: 'absolute',
        top: '-13px',
        left: '10px',
        backgroundColor: 'white',
        zIndex: 10,
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
        // margin: '0 3px',
      },

      '.content': {
        height: '100%',
        overflowY: 'scroll',

        '.loading': {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },

        '::-webkit-scrollbar': {
          backgroundColor: 'white',
          width: '5px',
        },

        '::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          backgroundColor: '#d9d9d9',
        },
      },
    };
  });

  return (
    <div className={className}>
      <div className="title">List</div>
      <div className="content">
        {loading ? (
          <div className="loading">
            <Spin />
          </div>
        ) : data.length > 0 ? (
          data.map((item) => <AcardView key={item.id} item={item} />)
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default ListView;
