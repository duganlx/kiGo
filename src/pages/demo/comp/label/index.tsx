import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Bodies, Engine, Render, World } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

// https://brm.io/matter-js/
// https://bruceau.com/about
// https://reactcommunity.org/react-transition-group/css-transition
// https://github.com/ArthurYung/react-my-website

const LabelView: React.FC = () => {
  const divRef = useRef();
  const [inProp, setInProp] = useState(false);
  const isPressed = useRef(false);
  const nodeRef = useRef(null);
  const engine = useRef(Engine.create());

  const className = useEmotionCss(() => {
    return {
      margin: '40px 10vw',
      width: '80vw',
      height: '300px',
      // backgroundColor: 'yellow',

      '.my-node-appear': {
        color: 'blue',
        fontWeight: 'bold',
      },

      '.my-node-enter': {
        color: 'yellow',
      },

      '.my-node-enter-active': {
        color: 'red',
        fontSize: '32px',
        transition: 'font-size 500ms',
      },

      '.my-node-enter-done': {
        color: 'blue',
        fontSize: '48px',
      },

      '.my-node-exit': {
        color: 'yellow',
      },

      '.my-node-exit-active': {
        fontSize: '64px',
        transition: 'font-size 500ms',
      },

      '.my-node-exit-done': {
        // color: 'red',
        fontSize: '24px',
      },
    };
  });

  useEffect(() => {
    const cw = 700;
    const ch = 300;

    const render = Render.create({
      element: divRef.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      },
    });

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    Engine.run(engine.current);
    Render.run(render);
  }, []);

  const handleDown = () => {
    isPressed.current = true;
  };

  const handleUp = () => {
    isPressed.current = false;
  };

  const handleAddCircle = (e: any) => {
    if (isPressed.current) {
      const ball = Bodies.circle(e.clientX, e.clientY, 10 + Math.random() * 30, {
        mass: 10,
        restitution: 0.9,
        friction: 0.005,
        render: {
          fillStyle: '#0000ff',
        },
      });
      World.add(engine.current.world, [ball]);
    }
  };
  console.log(inProp);

  return (
    <>
      <div className={className}>
        <CSSTransition
          ref={nodeRef}
          in={inProp}
          timeout={200}
          classNames="my-node"
          onEnter={() => {
            console.log('enter');
          }}
          onEntering={() => {
            console.log('entering');
          }}
          onEntered={() => {
            console.log('entered');
          }}
          onExited={() => {
            console.log('exit');
            setInProp(false);
          }}
          onExit={() => {
            console.log('exit');
          }}
          onExiting={() => {
            console.log('exiting');
          }}
          // unmountOnExit
          // mountOnEnter
        >
          <div ref={nodeRef}>{"I'll receive my-node-* classes"}</div>
        </CSSTransition>
        <button type="button" onClick={() => setInProp(!inProp)}>
          Click to Enter
        </button>
      </div>
      <div
        style={{ width: '80vw', height: '400px' }}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseMove={handleAddCircle}
      >
        <div ref={divRef as any} style={{ width: '100%', height: '100%' }}></div>
      </div>
    </>
  );
};

export default LabelView;
