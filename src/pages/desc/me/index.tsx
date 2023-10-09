import { useEmotionCss } from '@ant-design/use-emotion-css';
import Authordesc from './components/authordesc';
import Contentview from './components/contentview';

const Me: React.FC = () => {
  const className = useEmotionCss(() => {
    return {
      width: '100vw',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px 3px',
      position: 'relative',

      '.aview': {
        width: '75vw',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px 3px',

        '.left': {
          width: '250px',
          padding: '10px 15px 5px',
        },

        '.right': {
          // height: '100px',
          flex: '1 1 auto',
        },
      },
    };
  });

  return (
    <div className={className}>
      <div className="aview">
        <div className="left">
          <Authordesc />
        </div>
        <div className="right">
          <Contentview />
        </div>
      </div>
    </div>
  );
};

export default Me;
