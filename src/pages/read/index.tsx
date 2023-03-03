import { LoadingPage } from '@/ui/loading';
import React, { useEffect, useState } from 'react';
import Iframe from './iframe';

const Read = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [iframeContent, setIframeContent] = useState<string | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const readUrl = urlParams.get('readUrl');

  useEffect(() => {
    // Check if readUrl is valid
    if (!readUrl) {
      setLoading(false);
      return;
    }

    try {
      new URL(readUrl);
      setIsValidUrl(true);
      setIframeUrl(readUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [readUrl]);

  useEffect(() => {
    // Handle loading iframe content
    const iframe = document.getElementById('iframe');

    if (iframe) {
      iframe.addEventListener('load', () => {
        setLoading(false);
      });
    }
  }, []);

  let firstLoad = true;
  useEffect(() => {
    if (!firstLoad) return;
    firstLoad = false;
    // loadIframe();
    // Handle X-Frame-Options
  }, [iframeUrl]);

  const loadIframe = () => {
    const iframe = document.getElementById('iframe') as HTMLIFrameElement;
    console.log('-========');
    if (iframe && iframe.contentWindow) {
      try {
        // Try to access iframe's contentDocument

        const contentDocument = iframe.contentWindow.document;
        const iframeContent = contentDocument.body.innerHTML;
        console.log('-========1');
        console.log(iframeContent);

        // setTimeout(() => {
        //   if (iframeContent == '') {
        //     setIframeContent(`无法加载该网址，请尝试其他网址`);
        //     return;
        //   }
        // }, 10000);

        if (iframeContent) {
          console.log(iframeContent);
          // setIframeContent(iframeContent);
        }
      } catch (error) {
        console.log('-========2');

        if ((error as Error)?.message?.includes('X-Frame-Options')) {
          console.log('-========3');

          fetch(iframeUrl ?? '')
            .then((response) => {
              if (response.ok) {
                return response.text();
              } else {
                throw new Error(`请求错误: ${response.status}`);
              }
            })
            .then((data) => {
              setIframeContent(data);
            })
            .catch((error) => {
              setIframeContent(
                `无法加载该网址，请尝试其他网址 (${error.message})`
              );
            });
        } else {
          console.log('-========4');
          setIframeContent(`无法加载该网址，请尝试其他网址`);
        }
      }
    }
  };

  const handleInjectScript = (iframe) => {
    if (iframe && iframe.contentWindow) {
      console.log('handleInjectScript=====');
      const script = document.createElement('script');
      script.src = './main.js';
      console.log(script.textContent);
      iframe.contentWindow.document.body.appendChild(script);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (!isValidUrl) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">网址不正确</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        {/* <iframe
          id="iframe"
          src={iframeUrl ?? 'https://www.aiis.life'}
          className="h-full w-full border-0"
          onLoad={(e) => handleInjectScript(e.target)}
        /> */}
        <Iframe url={String(readUrl)} />
      </div>
      {/* {iframeContent ? (
        <div dangerouslySetInnerHTML={{ __html: iframeContent }} />
      ) : (
        <div className="flex h-screen items-center justify-center">
          <iframe
            id="iframe"
            src={iframeUrl ?? 'https://www.aiis.life'}
            className="h-full w-full border-0"
            onLoad={(e) => handleInjectScript(e.target)}
          />
        </div>
      )} */}
    </>
  );
};

export default Read;
