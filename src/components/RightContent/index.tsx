import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';

export type SiderTheme = 'light' | 'dark';

export const Github = () => {
  return (
    <div
      style={{
        color: 'white',
        fontSize: '18px',
        marginRight: '5px',
      }}
      onClick={() => {
        window.open('https://github.com/duganlx');
      }}
    >
      <GithubOutlined />
    </div>
  );
};

export const AboutMe = () => {
  return (
    <div
      style={{ color: 'white', fontSize: '18px' }}
      onClick={() => {
        const path = '/me';
        history.push(path);
      }}
    >
      <UserOutlined />
    </div>
  );
};
