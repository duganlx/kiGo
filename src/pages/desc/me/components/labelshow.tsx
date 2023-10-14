import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
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
import React, { useEffect, useRef } from 'react';

interface LabelItemProps {
  text: string;
}

const LabelItem: React.FC<LabelItemProps> = (props) => {
  const { text } = props;
  const fontSizeEnum = [14, 20, 28, 36, 44, 52];
  const colorEnum = [
    '#ffa39e',
    '#fa541c',
    '#873800',
    '#faad14',
    '#614700',
    '#7cb305',
    '#52c41a',
    '#36cfc9',
    '#1677ff',
    '#531dab',
    '#f759ab',
  ];

  const aimFontSize = fontSizeEnum[Math.floor(Math.random() * fontSizeEnum.length)];
  const aimColor = colorEnum[Math.floor(Math.random() * colorEnum.length)];

  return <li style={{ fontSize: aimFontSize, color: aimColor }}>{text}</li>;
};

const Labelshow: React.FC = () => {
  const wrapperdiv = useRef<HTMLElement>();
  const divRef = useRef<HTMLElement>();
  const engine = useRef(Engine.create());

  const { layoutchgSign } = useModel('desc.me.model', (m: any) => ({
    layoutchgSign: m.layoutchgSign,
  }));

  useEffect(() => {
    if (!wrapperdiv.current || !divRef.current) {
      return;
    }

    const cw = wrapperdiv.current.clientWidth;
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
    const mouse = Mouse.create(divRef.current);
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
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      // render.canvas = null
      // render.context = null
      render.textures = {};
    };
  }, [layoutchgSign]);

  const className = useEmotionCss(() => {
    return {
      width: '100%',
      height: '100%',
      position: 'relative',

      '.playgraph': {
        position: 'absolute',
        zIndex: 30,
      },

      '.mylabel': {
        position: 'absolute',
        padding: '10px 30px 0',
        zIndex: 20,
        // height: '90%',
        width: '100%',
        // backgroundColor: 'yellow',

        ul: {
          listStyle: 'none',
          paddingLeft: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'center',

          li: {
            display: 'block',
            padding: '0.125rem 0.25rem',
            position: 'relative',
            marginBottom: 0,
          },
        },
      },
    };
  });

  const myLabel: string[] = [
    'xxx',
    'xxxx',
    'yyy',
    'gg',
    'ee',
    'kk',
    'ee',
    'ek',
    'lsdf',
    'cds',
    'wps',
    'fdf',
    'fdf',
    'xxx',
    'xxxx',
    'yyy',
    'gg',
    'ee',
    'kk',
    'ee',
    'ek',
    'lsdf',
    'cds',
    'wps',
    'fdf',
    'fdf',
  ];

  return (
    <div className={className} ref={wrapperdiv as any}>
      <div className="playgraph">
        <div ref={divRef as any} style={{ width: '100%', height: '100%', zIndex: 30 }} />
      </div>
      <div className="mylabel">
        <ul>
          {myLabel.map((item) => (
            <LabelItem text={item} key={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Labelshow;
