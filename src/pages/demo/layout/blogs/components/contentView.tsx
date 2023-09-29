import Markdown from '@/components/Markdown';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface ContentViewProps {
  loadingcontent: boolean;
  content: string;
}

const ContentView: React.FC<ContentViewProps> = (props) => {
  const { loadingcontent, content } = props;

  const [cwidth, setCwidth] = useState<number>(100);
  const [cheight, setCheight] = useState<number>(100);

  // 问题:
  // const divRef = useRef<HTMLDivElement>(null); 然后用 ref={divRef}. 在div变化时发现
  // divRef.current?.clientHeight, divRef.current?.clientWidth 的结果是上一次的宽高, 而非最新的宽高
  //
  // 解决方案: 使用 ResizeObserver 对象去监控 divRef 的变化即可, 如下所示.
  //
  // ---
  //
  // 问题: 虽然给父元素设置的宽高, 也做好了宽高的计算, 但是因为放大的内容组件会顶开父元素的宽高, 导致放大之后, 没法再收缩回去,
  //      更惨的是, 因为父组件采用了 ResizeObserver 监控宽度, 导致也会出问题.
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // 在这里处理屏幕大小变化的逻辑
      const latestCwidth = divRef.current?.offsetWidth || 500;
      const latestCheight = divRef.current?.offsetHeight || 150;

      setCheight(latestCheight);
      setCwidth(latestCwidth);
    });

    resizeObserver.observe(divRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const className = useEmotionCss(() => {
    return {
      width: '100%',
      height: '100%',
      backgroundColor: 'blue',

      '.loading': {
        width: '100%',
        height: '100%',
        display: loadingcontent ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
      },

      '.content': {
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        display: !loadingcontent ? '' : 'none',
        backgroundColor: 'yellow',

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
    <div className={className} ref={divRef}>
      <div className="loading">
        <Spin />
      </div>
      <div className="content">
        {!loadingcontent ? <Markdown content={content} width={cwidth} height={cheight} /> : null}
      </div>
    </div>
  );
};

export default ContentView;
