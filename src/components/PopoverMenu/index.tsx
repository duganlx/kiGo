import { AppstoreOutlined } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Link } from '@umijs/max';
import { Divider, Popover } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import style from './index.less';

export type PopoverMenuViewProps = {
  user?: number; // 登陆的用户信息
  menuData?: MenuDataItem[]; // 本地配置的路由信息
};

const renderIcon = (icon?: string | React.ReactNode) => {
  if (!icon) {
    return null;
  }

  if (typeof icon === 'string') {
    return <img src={icon} alt="" />;
  }
  return icon;
};

// subItem.name.indexOf('Dugan (吕翔) - ') === -1
// ? subItem.name
// : subItem.name.split(' - ')[1]

function getShowName(name: string) {
  const index = name.indexOf(' - Dugan (吕翔)');

  if (index === -1) {
    return name;
  }

  return name.split(' - ')[0];
}

const PopoverMenuView: React.FC<PopoverMenuViewProps> = (props) => {
  const { menuData } = props;

  const validRouters = [...(menuData || [])]
    .filter((item) => item.path !== '/')
    .map((item) => {
      // name 命名有两种形式 xxx 或 xxx - Dugan (吕翔)
      const newitem = { ...item };

      // second level
      if (item.children && item.children.length > 0) {
        newitem.children = item.children.map((ichildren) => {
          const newchildren = { ...ichildren };

          // third level
          if (ichildren.children && ichildren.children.length > 0) {
            newchildren.children = ichildren.children.map((igrandson) => {
              return { ...igrandson, name: getShowName(igrandson.name ?? '') };
            });
          }

          return { ...newchildren, name: getShowName(ichildren.name ?? '') };
        });
      }

      return { ...newitem, name: getShowName(item.name ?? '') };
    });

  const validMap: Record<string, any> = {};
  validRouters.forEach((item) => {
    validMap[item.name!] = item;
  });

  const [activeTopMenu, setActiveTopMenu] = useState<string>(validRouters[0].name!);
  const [open, setOpen] = useState<boolean>(false);

  const menuContentClass = useEmotionCss(({ token }) => {
    return {
      fontFamily: '"Trebuchet MS",Helvetica,sans-serif',
      backgroundColor: token.colorBgElevated,
      // 菜单栏左侧一级菜单栏 css样式效果
      '.block-left': {
        'ul > li ': {
          '.active, &:hover, &:active': {
            background: token.colorBgTextActive,
            '.title': {
              color: token.colorPrimaryActive,
            },
          },
          // 左侧菜单栏底部动画效果背景色
          '.title .menu-border': {
            borderBottomColor: token.colorPrimaryActive,
          },
        },
      },

      // 菜单栏右侧二级菜单栏以及三级菜单栏 css样式效果
      '.block-right': {
        '.second-menu-container .second-menu-item': {
          '.second-menu-title': {
            color: token.colorPrimary,
          },

          '.second-menu-subMenu > a': {
            color: token.colorTextSecondary,
            '&:hover': {
              fontWeight: 'bold',
              color: token.colorPrimaryActive,
            },
          },
        },
      },
    };
  });

  function renderRight(vMap: Record<string, MenuDataItem>, atMenu: string) {
    const routers = vMap[atMenu]?.children || [vMap[atMenu]];
    return (
      <div className="second-menu-wrap">
        <div className="second-menu-container">
          {routers.map((item) => {
            if (item.hideInMenu || !item.name || !item.path || item.path === '/') return null;
            return (
              <div key={item.path} className="second-menu-item">
                {/* 二级菜单头 */}
                <div className="second-menu-title">{item.name}</div>
                {/* 二级菜单子项 */}
                {(item.children || [item]).map((subItem) => {
                  if (subItem.hideInMenu || !subItem.name || !subItem.path) return null;
                  return (
                    <div key={subItem.path} className="second-menu-subMenu">
                      {subItem.path.startsWith('http') ? (
                        <a href={subItem.path} target="_blank" rel="noreferrer">
                          {subItem.name}
                        </a>
                      ) : (
                        <Link
                          to={subItem.path}
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          {subItem.name}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    return (
      <div className={classNames(style.popoverMenu, menuContentClass)}>
        <div className="block-left">
          {validRouters.map((item) => {
            return (
              <ul
                key={item.name}
                onMouseEnter={() => {
                  setActiveTopMenu(item.name!);
                }}
              >
                <li className={item.name === activeTopMenu ? 'active' : ''}>
                  <div className={'title'}>
                    {renderIcon(item.icon)}
                    {(item.name ?? '').indexOf('Dugan (吕翔) - ') === -1
                      ? item.name
                      : item.name!.split(' - ')[1]}
                    <div className="menu-border" />
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
        <div className="block-right">{renderRight(validMap, activeTopMenu)}</div>
      </div>
    );
  };

  return (
    <div>
      <Divider style={{ height: '1.5em', backgroundColor: '#bfbfbf' }} type="vertical" />
      <Popover
        placement="bottom"
        overlayStyle={{
          width: 'calc(100vw - 24px)',
          padding: '4px',
          top: '32px',
        }}
        arrow={false}
        content={renderContent()}
        open={open}
        onOpenChange={(openIn) => {
          setOpen(openIn);
        }}
      >
        <span
          className={classNames('popover-menu-icon', style.popoverMenuIcon)}
          style={{ color: 'rgb(122, 130, 136)' }}
        >
          <AppstoreOutlined />
        </span>
      </Popover>
    </div>
  );
};

export default PopoverMenuView;
