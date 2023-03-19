import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Loading } from '../loading';
import { apiPayCodeGet } from '@/apis/pay';

interface ImageComponentProps {
  src: string;
  alt: string;
  width: string;
  height: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height
}) => {
  const [base64, setBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fade, setFade] = useState<boolean>(false);

  useEffect(() => {
    apiPayCodeGet().then((res) => {
      setBase64(res.image);
      setLoading(false);
      setTimeout(() => {
        setFade(true);
      }, 500);
    });
  }, [src]);

  return (
    <div className={clsx('relative h-full w-full')}>
      {loading && (
        <div
          className={clsx(
            'flex h-full w-full items-center justify-center bg-gray-300 shadow-sm'
          )}
        >
          <Loading />
        </div>
      )}
      {!loading && (
        <img
          className={clsx(
            `w-${width} h-${height} ${fade ? 'fade-in' : 'hidden'}`
          )}
          src={`${base64}`}
          alt={alt}
        />
      )}
    </div>
  );
};

export default ImageComponent;
