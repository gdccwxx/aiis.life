import { FC, ReactNode } from 'react';
import './index.css';

type RoundButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const RoundButton: FC<RoundButtonProps> = ({
  children,
  className,
  onClick,
  isLoading,
  disabled
}) => {
  return (
    <button
      className={`min-w-[132px] items-center justify-center rounded-full border px-7 py-1 text-lg hover:bg-gray-100 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default RoundButton;
