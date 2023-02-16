import React from 'react';

type Props = {
  message: string;
  isAI: boolean;
};

const ChatMessage: React.FC<Props> = ({ message, isAI }) => {
  return (
    <div className={`flex pb-4 ${isAI ? '' : 'flex-row-reverse'}`}>
      <div
        className={`rounded-lg px-4 py-2 ${
          isAI
            ? 'mr-4 bg-gray-200 text-gray-700'
            : 'ml-4 bg-blue-500 text-white'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
