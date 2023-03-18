import IconSearch from '@/components/icons/search';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import InputBox from './InputBox';
import ChatMessage from './ChatMessage';
import { LoginModal } from '@/components/loginModal';
import { apiSessionCreatePost, apiSessionGet } from '@/apis/session';
import { apiChatPost } from '@/apis/message';
import toast from '@/ui/toast/toast';
import { getCookie } from '@/utils/cookie';
import { Loading } from '@/ui/loading';
import {
  firstMsgConfig,
  firstTabConfig,
  newUserFirstMsgConfig
} from './initConfig';
import {
  deleteSearchParam,
  getQueryString,
  setSearchParam
} from '@/utils/helpers';

import { ChakraDrawerDemo, SideBar } from './sideBar';

const SearchPage: React.FC = () => {
  const [messages, setMessages] = useState([firstMsgConfig]);
  // const [inputLastValue, setInputLastValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // 输入框变更事件
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  // 页面状态
  const [msgPageLoading, setMsgPageLoading] = useState(false);
  const [tabPageLoading, setTabPageLoading] = useState(false);
  const [askFromUrlLoading, setAskFromUrlLoading] = useState(false);

  // tab 点击态
  const [activeIndex, setActiveIndex] = useState(0);
  const handleTabClick = (sessionId: number) => {
    if (sessionId === activeIndex) return;
    setActiveIndex(sessionId);
    setSearchParam('sessionId', sessionId.toString());
    getMsgFromSession(sessionId);
  };

  const [tabs, setTabs] = useState([firstTabConfig]);

  // 用户名获取
  const email = localStorage.getItem('email') ?? 'Aiis';

  // 默认一次加载数据
  let firstLoad = true;
  useEffect(() => {
    const token = getCookie('token');
    const querySessionId = getQueryString('sessionId');
    const defaultSessionId = isNaN(Number(String(querySessionId)))
      ? 0
      : Number(String(querySessionId));

    if (token && firstLoad) {
      getSessionList(defaultSessionId);
      firstLoad = false;
    }
  }, []);

  // 用户点击发送，检查是否为空
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }

    // 请求回答
    userAskAndFetchAns(inputValue);

    // 清空用户输入框并滑动到底部
    setInputValue('');
    inputRef.current?.blur();
    handleAnimationEnd();
  };

  // 渲染用户消息，并通过 tabIndex 判断是新建 session 还是基于现有的 session 回答
  const userAskAndFetchAns = (msg: string, fromUrl = false) => {
    const newMessage = {
      id: messages.length,
      message: msg,
      isAI: false
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // 设置缓存，用户发送失败重新发送
    const submitString = msg.toString();
    // setInputLastValue(submitString);

    // 如果是新会话
    if (activeIndex === 0) {
      createSession(submitString, fromUrl);
    } else {
      getAnsRander(activeIndex, submitString);
    }
  };

  // 创建 session 并获取回答
  const createSession = async (msg: string, fromUrl = false) => {
    try {
      if (fromUrl) setAskFromUrlLoading(true);
      const res = await apiSessionCreatePost();
      if (res.code === 0) {
        // 赋值 id
        const newTab = {
          id: res.data.id,
          title: msg,
          content: 'Content 3'
        };

        // 获取回答
        await getAnsRander(res.data.id, msg).then((res) => {
          if (fromUrl) setAskFromUrlLoading(false);
        });

        // 更新 tab 和 url 参数
        setTabs((preTabs) => [
          ...preTabs.slice(0, 1),
          newTab,
          ...preTabs.slice(1)
        ]);

        setTimeout(() => {
          if (chatRef.current) {
            setActiveIndex(res.data.id);
            setSearchParam('sessionId', res.data.id.toString());
          }
        }, 3);
      }
    } catch (error: any) {
      toast.error(String(error));
    } finally {
      if (fromUrl) {
        setAskFromUrlLoading(false);
        deleteSearchParam('ask');
      }
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
    return res.data;
  };

  // 重新请求回答 inputLastValue
  // const getAnsRanderAgain = async (sessionId: number) => {
  //   // 访问 api
  //   await getAnsRander(sessionId, inputLastValue);
  // };

  // 获取某个 session 历史消息
  const getMsgFromSession = async (sessionId: number) => {
    if (sessionId === 0) {
      setMessages([firstMsgConfig]);
      return;
    }
    try {
      setMsgPageLoading(true);
      const res = await apiSessionGet(sessionId);
      if (res.code === 0) {
        if (res.data.length > 0) {
          const messageList = res.data[0].chat_history.map((msg, index) => {
            const isAI = msg.role == 'assistant';
            return {
              id: index,
              message: msg.content,
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
  const getSessionList = async (toSessionId = 0) => {
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
        sessionList.reverse();
        const sessionIdList = sessionList.map((session) => session.id);
        setTabs((preTabs) => [...preTabs.slice(0, 1), ...sessionList]);

        const urlAskParam = getQueryString('ask');
        if (sessionList.length === 0) {
          // 新用户
          if (urlAskParam != null) {
            userAskAndFetchAns(urlAskParam!, true);
          } else {
            setMessages([newUserFirstMsgConfig]);
          }
        } else if (
          sessionList.length > 0 &&
          sessionIdList.includes(toSessionId)
        ) {
          // 老用户刷新，或从 URL 进入某个 session
          setActiveIndex(toSessionId);
          setSearchParam('sessionId', toSessionId.toString());
          getMsgFromSession(toSessionId);
        } else if (toSessionId === 0 && urlAskParam != null) {
          // 老用户搜索页面进入会话
          userAskAndFetchAns(urlAskParam!, true);
        } else {
          // 默认进入最近的话题
          setActiveIndex(sessionList[0].id);
          setSearchParam('sessionId', sessionList[0].id.toString());
          getMsgFromSession(sessionList[0].id);
        }

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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <SideBar
        tabs={tabs}
        activeIndex={activeIndex}
        onTabClick={handleTabClick}
        name={email}
        progress={0}
        progressMax={0}
        tabPageLoading={tabPageLoading}
        askFromUrlLoading={askFromUrlLoading}
      />
      <div
        className="h-screen w-full divide-y divide-gray-200 rounded-lg shadow-xl dark:divide-gray-700 md:w-3/4"
        onAnimationEnd={handleAnimationEnd}
      >
        {/* msg 列表 */}
        <div
          className="absolute top-0 bottom-[145px] w-full overflow-y-scroll px-4 pt-3 md:w-3/4"
          ref={chatRef}
        >
          {msgPageLoading ? (
            <Loading />
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.message}
                isAI={message.isAI}
              />
            ))
          )}
        </div>
        {/* 底部输入框 */}
        <div className="absolute bottom-0 w-full bg-gray-50 p-4 dark:bg-gray-900 md:w-3/4">
          <form onSubmit={handleSubmit}>
            <InputBox
              value={inputValue}
              onChange={handleInputChange}
              inputRef={inputRef}
            >
              <button
                type="submit"
                className="w-14 rounded-r bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                <IconSearch className="h-6 w-6" />
              </button>
            </InputBox>
          </form>
        </div>
        {/* 移动端显示的抽屉按钮 */}
        <div className="visible absolute z-20 md:invisible md:hidden">
          <ChakraDrawerDemo
            tabs={tabs}
            activeIndex={activeIndex}
            onTabClick={handleTabClick}
            name={email}
            progress={0}
            progressMax={0}
            tabPageLoading={tabPageLoading}
            askFromUrlLoading={askFromUrlLoading}
          />
        </div>
      </div>
      <LoginModal />
    </div>
  );
};

export default SearchPage;
