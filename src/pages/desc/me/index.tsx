import { WechatOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';

const Me: React.FC = () => {
  const className = useEmotionCss(() => {
    return {
      width: '100vw',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px 3px',
      position: 'relative',

      '.content': {
        width: '95vw',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 3px',

        '.bname': {
          fontSize: '24px',
        },
        '.dividingline': {
          width: '90%',
          height: '1px',
          margin: '10px 0 20px 0',
          backgroundColor: '#bfbfbf',
        },

        '.mimage': {
          height: '150px',
          width: '225px',
        },
        '.descmine': {
          marginTop: '30px',
          width: '100%',
          // backgroundColor: 'yellowgreen',
          padding: '10px 15px',

          p: {
            fontSize: '18px',
          },

          '.wechat': {
            display: 'none',
            cursor: 'pointer',
          },
        },
      },
    };
  });

  return (
    <div className={className}>
      {/* <div className="pinfo">
        <div className="updtime">修改时间: 2023-10-06</div>
      </div> */}
      <div className="content">
        <div className="bname">吕翔 Dugan</div>
        <div className="dividingline" />
        <img className="mimage" src="mine.jpg" alt="我的生活照" />
        <div className="descmine">
          <p>吕翔，男，目前在深圳前海进化论资产担任全栈开发工程师。</p>
          <p>
            联系方式 邮箱：840797783@qq.com 或 微信：Duganlx{' '}
            <div
              className="wechat"
              onMouseEnter={() => {
                console.log('enter');
              }}
              onMouseLeave={() => {
                console.log('leave');
              }}
            >
              <WechatOutlined />
              <img className="wechat-qrcode" src="" alt="微信二维码" />
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Me;
