import Markdown, { LayoutCfg } from '@/components/Markdown';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';

const defaultLayoutCfg: LayoutCfg = {
  height: 100,
  width: 100,
};

interface ContentViewProps {
  loadingcontent: boolean;
  content: string;
  navstate: boolean;
  contentlayout?: LayoutCfg;
  navpartWidth: number;
}

const ContentView: React.FC<ContentViewProps> = (props) => {
  const {
    loadingcontent,
    content,
    navstate,
    contentlayout: tlayoutcfg = defaultLayoutCfg,
    navpartWidth,
  } = props;

  // const [tlayoutcfg, setTlayoutcfg] = useState<LayoutCfg>(defaultLayoutCfg);
  const [blayoutcfg, setBlayoutcfg] = useState<LayoutCfg>(defaultLayoutCfg);
  const [slayoutcfg, setSlayoutcfg] = useState<LayoutCfg>(defaultLayoutCfg);

  // 主题: 自适应屏幕宽高功能处理 (问题顺序连贯)
  //
  // 问题:
  // const divRef = useRef<HTMLDivElement>(null); 然后用 ref={divRef}. 在div变化时发现
  // divRef.current?.clientHeight, divRef.current?.clientWidth 的结果是上一次的宽高, 而非最新的宽高
  //
  // 解决方案: 使用 ResizeObserver 对象去监控 divRef 的变化即可, 如下所示.
  //
  // useEffect(() => {
  //   if (!divRef.current) return;
  //
  //   const resizeObserver = new ResizeObserver(() => {
  //     console.log('--1');
  //     setLoadinglayout(true);
  //
  //     // 在这里处理屏幕大小变化的逻辑
  //     const latestCwidth = divRef.current?.offsetWidth || 500;
  //     const latestCheight = divRef.current?.offsetHeight || 150;
  //
  //     setTlayoutcfg({ height: latestCheight, width: latestCwidth });
  //   });
  //
  //   resizeObserver.observe(divRef.current);
  //
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, []);
  //
  // useEffect(() => {
  //   if (navstate) {
  //     // closed, big
  //     setBlayoutcfg({ ...tlayoutcfg });
  //     setSlayoutcfg({ ...tlayoutcfg, width: tlayoutcfg.width - navpartWidth });
  //   } else {
  //     // opening, small
  //     setBlayoutcfg({ ...tlayoutcfg, width: tlayoutcfg.width + navpartWidth });
  //     setSlayoutcfg({ ...tlayoutcfg });
  //   }
  //
  //   setTimeout(() => {
  //     setLoadinglayout(false);
  //   }, 150);
  // }, [navstate, tlayoutcfg]);
  //
  // ---
  //
  // 问题: 虽然给父元素设置的宽高, 也做好了宽高的计算, 但是因为放大的内容组件会顶开父元素的宽高, 导致放大之后, 没法再收缩回去,
  //      更惨的是, 因为父组件采用了 ResizeObserver 监控宽度, 导致也会出问题.
  //
  // 解决方案: 提前保存缩放状态的宽高, 在切换时直接使用; 另外, 在屏幕大小变化时, 隐藏 md 组件来防止影响.
  //
  // ---
  //
  // 问题: 用鼠标拖拽浏览器来缩小宽度时, 会出现没有触发 ResizeObserver 定义的函数.
  //
  // 解决方案: 考虑使用 window.addEventListener('resize', () => {...});
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widthoffset = 50;
    const heightoffset = 20;

    setBlayoutcfg({
      width: tlayoutcfg.width - widthoffset,
      height: tlayoutcfg.height - heightoffset,
    });
    setSlayoutcfg({
      width: tlayoutcfg.width - navpartWidth - widthoffset,
      height: tlayoutcfg.height - heightoffset,
    });
  }, [navstate, tlayoutcfg]);

  const className = useEmotionCss(() => {
    return {
      width: '100%',
      height: '100%',
      // backgroundColor: 'blue',

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
        // backgroundColor: 'yellow',

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
        {!loadingcontent ? (
          <Markdown content={content} layoutCfg={navstate ? blayoutcfg : slayoutcfg} />
        ) : null}
      </div>
    </div>
  );
};

export default ContentView;
