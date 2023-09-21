import Markdown from '@/components/Markdown';
import { message } from 'antd';
import { Octokit } from 'octokit';
import { useState } from 'react';

const TestMarkdownView: React.FC = () => {
  const octokit = new Octokit({});

  const [content, setContent] = useState<string>('');

  octokit
    .request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'duganlx',
      repo: 'datahub',
      path: 'tmd.md',
    })
    .then((res) => {
      if (res.status !== 200) {
        message.info('获取数据失败');
        return;
      }

      const base64_str = (res.data as { content: string | undefined }).content || '';
      const decoded_content = Buffer.from(base64_str, 'base64').toString();
      setContent(decoded_content);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div
      style={{ width: '90vw', margin: '0 auto', backgroundColor: '#f0f0f0', padding: '3px 5px' }}
    >
      <Markdown content={content} />
    </div>
  );
};

export default TestMarkdownView;
