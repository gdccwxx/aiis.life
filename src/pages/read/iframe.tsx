import React, { useEffect, useRef } from 'react';

interface Props {
  url: string;
}

const Iframe: React.FC<Props> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // 定义要注入的 JS 代码
    const script = document.createElement('script');
    script.text = `console.log('Custom script loaded!')`;

    // 监听 iframe 的加载完成事件
    const onLoad = () => {
      // 向 iframe 中注入 JS 代码
      console.log('=======666');
      const script = document.createElement('script');
      script.innerHTML = "console.log('Custom JS code executed=========')";
      console.log(window.document);
      const frameObj = document.getElementById('frameId') as HTMLIFrameElement;

      const frameContent = frameObj.contentWindow?.document.body.innerHTML;
      console.log(frameContent);

      console.log('=======6666');

      //   iframe.contentWindow?.document.body.appendChild(script);
    };
    iframe.addEventListener('load', onLoad);

    // 如果 iframe 加载失败，则在控制台输出错误信息
    const onError = () => {
      console.error(`Failed to load ${url}`);
    };
    iframe.addEventListener('error', onError);

    // 移除事件监听器
    return () => {
      iframe.removeEventListener('load', onLoad);
      iframe.removeEventListener('error', onError);
    };
  }, [url]);

  return (
    <iframe
      id="frameId"
      src={url}
      ref={iframeRef}
      width="100%"
      height="100%"
      //   sandbox="allow-scripts"
      allowFullScreen
      title={url}
    />
  );
};

export default Iframe;
