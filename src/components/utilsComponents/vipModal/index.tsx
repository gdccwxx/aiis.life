import React from 'react';

interface VIPBadgeProps {
  level: number;
}

const VIPBadge: React.FC<VIPBadgeProps> = ({ level }) => {
  let classNames = '';

  switch (level) {
    case 1:
      classNames = 'bg-yellow-500 text-gray-800';
      break;
    case 2:
      classNames = 'bg-pink-500 text-gray-800';
      break;
    case 3:
      classNames = 'bg-purple-500 text-white';
      break;
    default:
      classNames = 'bg-gray-300 text-gray-800';
      break;
  }

  return (
    <span className={`rounded-full py-1 px-2 text-xs font-bold ${classNames}`}>
      VIP{level}
    </span>
  );
};

export default VIPBadge;
