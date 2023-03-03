import { LoadingPage } from '@/ui/loading';
import React, { useEffect, useState } from 'react';

const Read = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [iframeContent, setIframeContent] = useState<string | null>(null);
  const [errorTip, setErrorTip] = useState('');

  const urlParams = new URLSearchParams(window.location.search);

  const isUrlValid = (url: string | null): boolean => {
    if (url === null) return false;
    try {
      new URL(url);
      setIsValidUrl(true);
      setIframeUrl(url);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    setTimeout(() => loadIframePage(), 300);
  }, [iframeUrl]);

  const loadIframePage = () => {
    const readUrl = urlParams.get('readUrl');
    const ifUrlValid = isUrlValid(readUrl);

    const iframe = document.getElementById('iframe') as HTMLIFrameElement;
    console.log(ifUrlValid && iframe && iframe.contentWindow);
    if (ifUrlValid && iframe != null && iframe.contentWindow != null) {
      try {
        // Try to access iframe's contentDocument
        const contentDocument = iframe.contentWindow.document;
        const iframeContent = contentDocument.body.innerHTML;

        if (iframeContent) {
          setIframeContent(iframeContent);
          if (iframe) {
            iframe.addEventListener('load', () => {
              setLoading(false);
            });
          }
        }
      } catch (error) {
        // Handle X-Frame-Options
        if ((error as Error)?.message?.includes('X-Frame-Options')) {
          try {
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
                if (iframe) {
                  iframe.addEventListener('load', () => {
                    setLoading(false);
                  });
                }
              })
              .catch((error) => {
                setErrorTip(
                  `无法加载该网址，请尝试其他网址 (${error.message})`
                );
              });
          } catch (fetchError) {
            setErrorTip(`无法加载该网址，请尝试其他网址`);
          }
        } else {
          setErrorTip(`无法加载该网址，请尝试其他网址`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInjectScript = (iframe) => {
    if (iframe && iframe.contentWindow) {
      const script = document.createElement('script');
      script.src = './main.js';
      iframe.contentWindow.document.body.appendChild(script);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingPage />
      </div>
    );
  }

  if (!isValidUrl) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">网址不正确</h1>
      </div>
    );
  }

  if (errorTip != '') {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">{errorTip}</h1>
      </div>
    );
  }

  if (iframeContent != null) {
    return <div dangerouslySetInnerHTML={{ __html: iframeContent }} />;
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <iframe
          id="iframe"
          src={iframeUrl ?? 'https://www.aiis.life'}
          className="h-full w-full border-0"
          onLoad={(e) => handleInjectScript(e.target)}
        />
      </div>
    </>
  );
};

export default Read;
