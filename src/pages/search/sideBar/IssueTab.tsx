import React, { ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

interface IssueTabProps {
  isActive: boolean;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  children?: ReactNode;
}

const IssueTab: React.FC<IssueTabProps> = ({
  isActive,
  title = '',
  onClick,
  className,
  children
}) => {
  return (
    <div
      className={cn(
        'group relative flex cursor-pointer items-center gap-3 break-all rounded-md p-3 hover:bg-[#2A2B32] hover:pr-4',
        {
          'bg-[#2A2B32]': isActive
        }
      )}
    >
      <button
        className={`my-[2px] w-full rounded-l-xl text-left font-mono text-sm font-bold text-white transition-colors duration-75 ${className}`}
        onClick={onClick}
      >
        {children ?? title}
      </button>
    </div>
  );
};

export default IssueTab;
