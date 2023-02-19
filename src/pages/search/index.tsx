import IconSearch from '@/components/icons/search';
import React, { useEffect, useRef, useState } from 'react';
import InputBox from './InputBox';
import ChatMessage from './ChatMessage';
import { LoginModal } from '@/components/loginModal';
import { apiSessionCreatePost, apiSessionGet } from '@/apis/session';
import { apiChatPost } from '@/apis/message';
import toast from '@/ui/toast/toast';
import { getCookie } from '@/utils/cookie';
import Loading from '@/ui/loading';

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

  // 页面状态
  const [msgPageLoading, setMsgPageLoading] = useState(false);
  const [tabPageLoading, setTabPageLoading] = useState(false);

  // tab 点击态
  const [activeIndex, setActiveIndex] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    getMsgFromSession(index);
  };

  const [tabs, setTabs] = useState([{ id: 0, title: '新会话' }]);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      getSessionList();
    }
  }, []);

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
    const submitString = inputValue.toString();
    setInputLastValue(submitString);

    // 清空用户输入框
    setInputValue('');
    inputRef.current?.blur();
    handleAnimationEnd();

    // 如果是新会话
    if (activeIndex === 0) {
      createSession(submitString);
    } else {
      getAnsRander(activeIndex, submitString);
    }
  };

  // 创建 session
  const createSession = async (msg: string) => {
    const res = await apiSessionCreatePost();
    if (res.code === 0) {
      // 赋值 id
      const newTab = {
        id: res.data.id,
        title: msg,
        content: 'Content 3'
      };
      await getAnsRander(res.data.id, msg);
      setTabs((preTabs) => [
        ...preTabs.slice(0, 1),
        newTab,
        ...preTabs.slice(1)
      ]);
      setTimeout(() => {
        if (chatRef.current) {
          setActiveIndex(res.data.id);
        }
      }, 5);
    }
  };

  // 请求回答并渲染
  const getAnsRander = async (sessionId: number, msg: string) => {
    // 访问 api
    const res = await apiChatPost(sessionId, msg);
    if (res.code === 0) {
      // 赋值 id
      const ansMessage = {
        id: messages.length + 1,
        message: res.data,
        isAI: true
      };
      setMessages((prevMessages) => [...prevMessages, ansMessage]);
      handleAnimationEnd();
    }
  };

  // 获取某个 session 历史消息
  const getMsgFromSession = async (sessionId: number) => {
    setMsgPageLoading(true);
    try {
      const res = await apiSessionGet(sessionId);
      if (res.code === 0) {
        if (res.data.length > 0) {
          const messageList = res.data[0].prompt.map((msg, index) => {
            const isAI = msg.toString().startsWith('\nAI');
            const msgStartIndex = msg.indexOf(':') + 1;
            return {
              id: index,
              message: msg.toString().slice(msgStartIndex),
              isAI: isAI
            };
          });
          setMessages(messageList);
        } else {
          setMessages([]);
        }
        handleAnimationEnd();
      }
    } catch (error: any) {
      toast.warning(error.toString());
    } finally {
      setMsgPageLoading(false);
    }
  };

  // 获取 session 列表
  const getSessionList = async () => {
    setTabPageLoading(true);
    try {
      const res = await apiSessionGet();
      if (res.code === 0) {
        const sessionList = res.data.map((session) => {
          return {
            id: session.id,
            title: session.title
          };
        });
        setTabs((preTabs) => [...preTabs.slice(0, 1), ...sessionList]);
        handleAnimationEnd();
      }
    } catch (error: any) {
      toast.warning(error.toString());
    } finally {
      setTabPageLoading(false);
    }
  };

  // 发消息后滑动到底部
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
          {tabPageLoading ? (
            <Loading />
          ) : (
            tabs.map((tab, index) => (
              <button
                key={index}
                className={`w-full py-2 px-4 text-left ${
                  tab.id === activeIndex ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.title}
              </button>
            ))
          )}
        </div>
      </div>
      <div
        className="h-screen w-full divide-y divide-gray-200 rounded-lg shadow-xl md:w-3/4"
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          className="absolute top-0 bottom-[145px] w-full overflow-y-scroll px-4 pt-3 md:w-3/4"
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
              inputRef={inputRef}
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
      <LoginModal />
    </div>
  );
};

export default SearchPage;
