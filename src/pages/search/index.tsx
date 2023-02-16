import IconSearch from '@/components/icons/search';
import React, { useRef, useState } from 'react';
import InputBox from './InputBox';
import ChatMessage from './ChatMessage';

const SearchPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: '你好，欢迎使用搜索引擎！',
      isAI: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [inputLastValue, setInputLastValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // tab 点击态
  const [activeIndex, setActiveIndex] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const tabs = [
    { title: 'Tab 3', content: 'Content 3' },
    { title: 'Tab 4', content: 'Content 4' },
    { title: 'Tab 5', content: 'Content 5' },
    { title: 'Tab 10', content: 'Content 10' }
  ];

  // 提交请求
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    const newMessage = {
      id: messages.length + 1,
      message: inputValue,
      isAI: false
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // 设置缓存，用户发送失败重新发送
    setInputLastValue(inputValue);

    // 清空用户输入框
    setInputValue('');
    inputRef.current?.blur();
    handleAnimationEnd();
  };

  // 请求回答并渲染
  const getAnsRander = () => {
    // 访问 api
  };

  // 获取某个 session 历史消息

  // 创建 session

  const handleAnimationEnd = () => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 12);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="invisible w-0 md:visible md:w-1/4">
        <div className="flex h-screen flex-col overflow-y-scroll">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`w-full py-2 px-4 ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div
        className="h-screen w-full divide-y divide-gray-200 rounded-lg shadow-xl md:w-3/4"
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          className="absolute top-0 bottom-[145px] w-full overflow-y-scroll py-0 px-4 md:w-3/4"
          ref={chatRef}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              isAI={message.isAI}
            />
          ))}
        </div>
        <div className="absolute bottom-0 w-full bg-gray-50 p-4 md:w-3/4">
          <form onSubmit={handleSubmit}>
            <InputBox
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
            >
              <button
                type="submit"
                className="w-14 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                <IconSearch className="h-6 w-6" />
              </button>
            </InputBox>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
