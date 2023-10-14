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
      backgroundColor: '#f0f0f0',
      position: 'relative',
      height: 'calc(100vh - 40px)',
      display: 'flex',
      flexDirection: 'row',

      '.left': {
        width: '230px',
        padding: '10px 15px 5px',
        marginLeft: '8vw',
        backgroundColor: 'white',
      },

      '.scrollview': {
        height: '100%',
        width: 'calc(100% - 230px - 8vw)',
        overflow: 'auto',
        backgroundColor: '#f0f0f0',
        '::-webkit-scrollbar': {
          backgroundColor: 'white',
          width: '5px',
        },

        '::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          backgroundColor: '#d9d9d9',
        },
      },

      '.right': {
        padding: '15px 5px 3px 30px',
        marginRight: '7vw',
        backgroundColor: 'white',
      },
    };
  });

  return (
    <div className={className}>
      <div className="left">
        <Authordesc />
      </div>
      <div className="scrollview">
        <div className="right">
          <Contentview />
        </div>
      </div>
    </div>
  );
};

export default Me;
