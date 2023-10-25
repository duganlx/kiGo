import { CatalogItem, GetBlogsCatalog } from '@/services/github';
import { getUuidShort } from '@/services/utils';
import { useModel } from '@umijs/max';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import Authordesc from './components/authordesc';
import Contentview from './components/contentview';
import style from './index.less';

const Me: React.FC = () => {
  const { setLayoutchgSign } = useModel('me.model', (m: any) => ({
    setLayoutchgSign: m.udLayoutchgSign,
  }));

  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  useEffect(() => {
    const debounceRender = debounce(function () {
      setLayoutchgSign(getUuidShort(64));
    }, 300);

    window.addEventListener('resize', () => {
      debounceRender();
    });

    setLayoutchgSign(getUuidShort(64));
  }, []);

  useEffect(() => {
    GetBlogsCatalog().then((data) => {
      const procItems = (data ?? [])
        .filter((item) => item.publish === true)
        .reverse()
        .slice(0, 5);
      setCatalog(procItems);
    });
  }, []);

  // const className = useEmotionCss(() => {
  //   return {
  //     '.fixed': {
  //       width: '230px',
  //       padding: '10px 15px 5px',
  //       top: '15px',
  //       position: 'sticky',
  //     },
  //   };
  // });

  return (
    <div className={classNames(style.meview)}>
      <div className="scrollview">
        <div className="left">
          <div className="fixed">
            <Authordesc />
          </div>
        </div>
        <div className="right">
          <Contentview catalog={catalog} />
        </div>
      </div>
    </div>
  );
};

export default Me;
