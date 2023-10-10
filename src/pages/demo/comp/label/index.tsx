import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useRef } from 'react';
// import { CSSTransition } from 'react-transition-group';

// https://bruceau.com/about
// https://reactcommunity.org/react-transition-group/css-transition
const LabelView: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  // const nodeRef = useRef<HTMLDivElement>(null);

  const className = useEmotionCss(() => {
    return {
      margin: '40px 10vw',
      width: '80vw',
      height: '300px',
      // backgroundColor: 'yellow',
    };
  });

  return (
    <div className={className} ref={divRef}>
      xxx
      {/* <CSSTransition ref={nodeRef}>xxx</CSSTransition> */}
    </div>
  );
};

export default LabelView;
