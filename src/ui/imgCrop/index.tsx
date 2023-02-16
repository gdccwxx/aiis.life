import { FC, HTMLAttributes, ReactNode } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImgCropProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  imgSrc?: string;
  aspect?: number;
  onChange?: (e: any) => void;
  onCrop?: (e: any) => void;
}

const ImgCrop: FC<ImgCropProps> = (props: ImgCropProps) => {
  return (
    <Cropper
      className={`imgCrop w-[100%] ${props.className}`}
      zoomTo={0.5}
      zoomable={false} // 是否允许放大图像
      preview=".img-preview"
      src={props.imgSrc}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={false} // 是否显示背景的马赛克
      responsive={true}
      autoCropArea={1}
      rotatable={false}
      aspectRatio={props.aspect || 1 / 1}
      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
      onInitialized={(instance) => {
        props.onCrop ? props.onCrop(instance) : null;
      }}
      guides={true} // 显示在裁剪框上方的虚线
      {...props}
    />
  );
};

export default ImgCrop;
