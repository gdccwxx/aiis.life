import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '@/components/copyBnt';
interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const copyTextRef = useRef(null);

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      children={markdown}
      components={{
        a: ({ ...data }): JSX.Element => (
          <a
            className="mx-2 cursor-pointer rounded-full bg-gray-100 px-2 py-1 font-mono text-sm font-bold dark:bg-gray-700"
            onClick={() => window.open(String(data.href))}
          >
            {data.children} ({String(data.href)})
          </a>
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="my-2 rounded-lg bg-[#2b2b2b] text-sm">
              <div className="flex rounded-t-lg bg-slate-600 py-2 px-4">
                <div className="grow text-gray-200">{match[1]}</div>
                <CopyButton text={String(children)} />
              </div>
              <div
                className="w-full max-w-md p-2 md:w-[50vw]"
                style={{ maxWidth: '90vw' }}
                ref={copyTextRef}
                data-clipboard-text={children}
              >
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={darcula}
                  customStyle={{ whiteSpace: 'pre-wrap' }}
                />
              </div>
            </div>
          ) : String(children).length > 20 ? (
            <div className="my-2 rounded-lg bg-[#2b2b2b] text-sm">
              <div className="flex rounded-t-lg bg-slate-600 py-2 px-4">
                <div className="grow text-gray-200">unknow</div>
                <CopyButton text={String(children)} />
              </div>
              <div
                className="w-full max-w-md p-2 md:w-[50vw]"
                style={{ maxWidth: '90vw' }}
                ref={copyTextRef}
                data-clipboard-text={children}
              >
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  language={'text'}
                  style={darcula}
                  customStyle={{ whiteSpace: 'pre-wrap' }}
                />
              </div>
            </div>
          ) : (
            <code
              className={`mx-[1px] rounded-md bg-gray-100 px-1 py-[2px] font-mono text-sm font-bold dark:bg-gray-700 ${className}`}
              {...props}
            >
              {children}
            </code>
          );
        }
      }}
    />
  );
};

type Props = {
  message: string;
  isAI: boolean;
};

const ChatMessage: React.FC<Props> = ({ message, isAI }) => {
  return (
    <div className={`flex pb-4 ${isAI ? '' : 'flex-row-reverse'}`}>
      <div
        className={`rounded-lg px-4 py-2 ${
          isAI
            ? 'mr-4 bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-400'
            : 'ml-4 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-300'
        }`}
      >
        <MarkdownRenderer markdown={message} />
      </div>
    </div>
  );
};

export default ChatMessage;
