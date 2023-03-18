import React, { FC, memo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import unwrapImages from 'remark-unwrap-images';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from '@/components/utilsComponents/copyBnt';
import { extractDomains } from '@/utils/getDomain';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = memo(
  ({ markdown }: MarkdownRendererProps) => {
    const copyTextRef = useRef(null);

    return (
      <ReactMarkdown
        remarkPlugins={[gfm, unwrapImages]}
        children={markdown.toString().replace('/n/n', '/n')}
        components={{
          h1: ({ ...data }): JSX.Element => {
            return (
              <h3 className="pt-3 pb-1 text-xl font-bold italic">
                {data.children}
              </h3>
            );
          },
          h2: ({ ...data }): JSX.Element => {
            return (
              <h3 className="pt-3 pb-1 text-lg font-bold italic">
                {data.children}
              </h3>
            );
          },
          h3: ({ ...data }): JSX.Element => {
            return (
              <h3 className="pt-3 pb-1 text-base font-bold italic">
                {data.children}
              </h3>
            );
          },
          a: ({ ...data }): JSX.Element => (
            <a
              className="mx-2 cursor-pointer rounded-full bg-gray-100 px-2 py-1 font-mono text-sm font-bold dark:bg-gray-700"
              onClick={() =>
                window.open(
                  String(data.href).includes('?')
                    ? String(data.href) + '&ref=aiis'
                    : String(data.href) + '?ref=aiis'
                )
              }
            >
              {data.children}
              {extractDomains(String(data.href ?? '')).length > 0
                ? extractDomains(String(data.href ?? ''))[0].replace('www.', '')
                : ''}
            </a>
          ),
          ul: ({ ...data }): JSX.Element => (
            <div className="py-1 font-mono text-sm font-bold">
              {data.children}
            </div>
          ),
          ol: ({ children }) => {
            children = children.filter((child) => child != '\n');
            return (
              <ol>
                {children.map((child, index) => (
                  <div key={index} className="flex">
                    <div className="text-bold mx-1 font-mono">{`${
                      index + 1
                    }.`}</div>{' '}
                    {child}
                  </div>
                ))}
              </ol>
            );
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="my-2 rounded-lg bg-[#272823] text-sm">
                <div className="flex rounded-t-lg bg-slate-600 py-2 px-4">
                  <div className="grow text-gray-200">{match[1]}</div>
                  <CopyButton text={String(children)} />
                </div>
                <div
                  className="w-[80vw] bg-transparent p-2 sm:w-[90vw] md:w-[65vw]"
                  ref={copyTextRef}
                >
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={monokai}
                    PreTag="span"
                    customStyle={{
                      whiteSpace: 'pre-wrap',
                      scrollX: 'auto',
                      scrollbars: {
                        height: '8px',
                        width: '9px',
                        backgroundColor: '#2a2a2a'
                      },
                      WebkitScrollbarHorizontal: {
                        height: '9px',
                        scrollbarWidth: '9px'
                      }
                    }}
                  />
                </div>
              </div>
            ) : String(children).length > 25 ? (
              <div className="my-2 rounded-lg bg-[#2b2b2b] text-sm">
                <div className="flex rounded-t-lg bg-slate-600 py-2 px-4">
                  <div className="grow text-gray-200">unknow</div>
                  <CopyButton text={String(children)} />
                </div>
                <div
                  className="w-full max-w-md p-2 md:w-[50vw]"
                  style={{ maxWidth: '90vw' }}
                  ref={copyTextRef}
                >
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    language={'text'}
                    style={darcula}
                    PreTag="span"
                    customStyle={{
                      whiteSpace: 'pre-wrap'
                    }}
                  />
                </div>
              </div>
            ) : (
              <span
                className={`mx-[1px] rounded-md bg-gray-100 px-1 py-[2px] font-mono text-sm font-bold dark:bg-gray-700 ${className}`}
                // dangerouslySetInnerHTML={{
                //   __html: String(children).replace('div>', 'span>')
                // }}
                {...props}
              >
                {children}
              </span>
            );
          }
        }}
      />
    );
  }
);

MarkdownRenderer.displayName = 'MarkdownRenderer';

type Props = {
  message: string;
  isAI: boolean;
};

const ChatMessage: FC<Props> = memo(({ message, isAI }: Props) => {
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
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
