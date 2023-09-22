import { useEmotionCss } from '@ant-design/use-emotion-css';
import dayjs from 'dayjs';
import { useState } from 'react';
import SearchView from './components/SearchView';

const DataMarketView: React.FC = () => {
  const [navstate, setNavstate] = useState<boolean>(false); // false: opening, true: closed

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
          height: '40px',
          backgroundColor: 'white',
          top: '20px',
          right: '-22px',
          borderRadius: '0 10px 10px 0',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',

          '.navbtn-label': {
            verticalAlign: 'top',
            lineHeight: '20px',
          },

          '.navbtn-labellt': {
            display: navstate ? 'none' : '',
          },

          '.navbtn-labelgt': {
            display: !navstate ? 'none' : '',
          },
        },

        '.navcontent': {
          width: '100%',
          padding: '15px 5px 2px 5px',
          display: navstate ? 'none' : '',
        },
      },

      '.main': {
        flex: '1 1 auto',
        height: '100%',
        backgroundColor: 'white',
      },
    };
  });

  return (
    <div className={className}>
      <div className="navpart">
        <div
          className="navbtn"
          onClick={() => {
            setNavstate(!navstate);
          }}
        >
          <span className="navbtn-label navbtn-labellt">&lt;</span>
          <span className="navbtn-label navbtn-labelgt">&gt;</span>
        </div>
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
        </div>
      </div>
      <div className="main">yyy</div>
    </div>
  );
};

export default DataMarketView;
