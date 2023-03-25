import React, { ReactNode, useEffect, useState } from 'react';

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
    <div className="bg-gray-200 dark:bg-gray-700">
      <button
        className={`my-[2px] w-full rounded-l-xl py-3 px-4 text-left font-mono text-sm font-bold transition-colors duration-75 ${
          isActive
            ? 'bg-blue-600 text-gray-100 hover:bg-blue-500 dark:bg-blue-700 dark:text-gray-200'
            : 'bg-gray-200 text-gray-800 hover:bg-blue-50 dark:bg-gray-700 dark:text-gray-400'
        } ${className}`}
        onClick={onClick}
      >
        {children ?? title}
      </button>
    </div>
  );
};

export default IssueTab;
