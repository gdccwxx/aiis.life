import { HTMLAttributes } from 'react';
import './style.scss';

interface Props extends HTMLAttributes<HTMLElement> {
  className?: string;
}

const SkeletonRectangle = ({ className }: Props) => (
  <div className={`skeleton ${className}`}></div>
);

export default SkeletonRectangle;
