import { useEmotionCss } from '@ant-design/use-emotion-css';
import {
  Bodies,
  Common,
  Composites,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from 'matter-js';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

// https://brm.io/matter-js/
// https://bruceau.com/about
// https://reactcommunity.org/react-transition-group/css-transition
// https://github.com/ArthurYung/react-my-website

const LabelView: React.FC = () => {
  const divRef = useRef<HTMLElement>();
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  const engine = useRef(Engine.create());

  const className = useEmotionCss(() => {
    return {
      margin: '40px 10vw',
      width: '80vw',
      // height: '300px',
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
    if (!divRef.current) {
      return;
    }

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
        showAngleIndicator: true,
      },
    });

    const stack = Composites.stack(0, 120, 10, 2, 0, 0, function (x: number, y: number) {
      const sides = Math.round(Common.random(1, 8));

      // round the edges of some bodies
      let chamfer = {};
      if (sides > 2 && Common.random() > 0.7) {
        chamfer = {
          radius: 10,
        };
      }

      switch (Math.round(Common.random(0, 1))) {
        case 0:
          if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), {
              chamfer: chamfer,
            });
          } else {
            return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), {
              chamfer: chamfer,
            });
          }
        case 1:
          return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
      }
    });

    const mouse = Mouse.create(divRef.current);

    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        // friction: 0.5,
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      mouseConstraint,
      stack,
    ]);

    Render.run(render);
    const runner = Runner.run(engine.current);

    return () => {
      Runner.stop(runner);
      Render.stop(render);
      // World.clear(engine.current.world)
      Engine.clear(engine.current);
      render.canvas.remove();
      // render.canvas = null
      // render.context = null
      render.textures = {};
    };
  }, []);

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
      <div style={{ width: '700px', height: '300px', position: 'relative' }}>
        <div ref={divRef as any} style={{ width: '100%', height: '100%', zIndex: 100 }} />
        <div style={{ position: 'absolute', top: '30px', zIndex: 10 }}>xxx</div>
      </div>
    </>
  );
};

export default LabelView;
