import { getUuidShort } from '@/services/utils';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import Authordesc from './components/authordesc';
import Contentview from './components/contentview';

const Me: React.FC = () => {
  const { setLayoutchgSign } = useModel('desc.me.model', (m: any) => ({
    setLayoutchgSign: m.udLayoutchgSign,
  }));

  useEffect(() => {
    const debounceRender = debounce(function () {
      setLayoutchgSign(getUuidShort(64));
    }, 300);

    window.addEventListener('resize', () => {
      debounceRender();
    });

    setLayoutchgSign(getUuidShort(64));
  }, []);

  const className = useEmotionCss(() => {
    return {
      width: '100vw',
      height: 'calc(100vh - 40px)',
      backgroundColor: '#f0f0f0',
      overflow: 'auto',

      '::-webkit-scrollbar': {
        backgroundColor: 'white',
        width: '5px',
      },

      '::-webkit-scrollbar-thumb': {
        borderRadius: '5px',
        backgroundColor: '#d9d9d9',
      },

      '.scrollview': {
        marginLeft: '8vw',
        marginRight: '7vw',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
      },

      '.left': {
        width: '230px',

        '.fixed': {
          width: '230px',
          padding: '10px 15px 5px',
          top: 0,
          position: 'sticky',
        },
      },

      '.right': {
        width: 'calc(100% - 230px)',
        padding: '15px 5px 3px 30px',
      },
    };
  });

  return (
    <div className={className}>
      <div className="scrollview">
        <div className="left">
          <div className="fixed">
            <Authordesc />
          </div>
        </div>
        <div className="right">
          <Contentview />
        </div>
      </div>
    </div>
  );
};

export default Me;
