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
import { useEffect, useRef } from 'react';

const Labelshow: React.FC = () => {
  const divRef = useRef<HTMLElement>();
  const engine = useRef(Engine.create());

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
    Runner.run(engine.current);

    return () => {
      Render.stop(render);
      // World.clear(engine.current.world)
      Engine.clear(engine.current);
      render.canvas.remove();
      // render.canvas = null
      // render.context = null
      render.textures = {};
    };
  }, []);

  const className = useEmotionCss(() => {
    return {
      width: '100%',
      height: '100%',
    };
  });

  return (
    <div className={className}>
      <div ref={divRef as any} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Labelshow;
