/**
 * author: duganlx
 *
 * reference
 * [1] https://github.com/remarkjs/react-markdown
 * [2] https://github.com/remarkjs/remark-gfm
 * [3] https://github.com/remarkjs/remark-math
 * [4] https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
 */
import { useEmotionCss } from '@ant-design/use-emotion-css';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you

interface MarkdownProps {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = (props) => {
  const { content } = props;

  const className = useEmotionCss(() => {
    return {
      fontSize: '16px',
      h1: {
        fontSize: '28px',
        // verticalAlign: 'middle',

        '&:before': {
          content: '" "',
          display: 'inline-block',
          height: '32px',
          width: '5px',
          marginRight: '5px',
          backgroundColor: '#0050b3',
          verticalAlign: 'text-bottom',
        },
      },
      h2: {
        fontSize: '24px',

        '&:before': {
          content: '" "',
          display: 'inline-block',
          height: '27px',
          width: '5px',
          marginRight: '5px',
          backgroundColor: '#1890ff',
          verticalAlign: 'text-bottom',
        },
      },
      h3: {
        fontSize: '20px',

        '&:before': {
          content: '" "',
          display: 'inline-block',
          height: '27px',
          width: '5px',
          marginRight: '5px',
          backgroundColor: '#69c0ff',
          verticalAlign: 'text-bottom',
        },
      },
      'h4,h5,h6': {
        textDecoration: 'line-through',
      },
      p: {
        marginBottom: '8px',
      },
      blockquote: {
        color: '#999',
        borderLeft: '3px solid #dfe2e5',
        padding: '3px 0 1px 10px',
      },
      ul: {
        listStyle: 'disc',
      },
      ol: {
        listStyle: 'decimal',
      },
      'ul.contains-task-list': {
        listStyle: 'none',
        paddingInlineStart: '30px',
      },
      table: {
        margin: '10px 0',
        tr: {
          'td,th': {
            border: '1px solid rgb(34, 17, 71)',
            padding: '5px 10px',
            textAlign: 'center',
          },
        },
      },
    };
  });

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex as any]}
      className={className}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter {...props} style={atomOneLight} language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;