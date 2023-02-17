import { apiUserRegisterPost } from '@/apis/login';
import RoundButton from '@/ui/bnt';
import toast from '@/ui/toast/toast';
import { FC, useEffect, useRef, useState } from 'react';

export const LoginModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef(null);

  // 模拟本地缓存
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsModalOpen(false);
      setIsLogin(true);
    } else {
      setTimeout(() => {
        setIsLogin(false);
        setIsModalOpen(true);
      }, 3000);
    }
  }, []);

  // 倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 处理获取验证码点击事件
  const handleGetCodeClick = async () => {
    if (emailInputRef && emailInputRef.current) {
      if (!email) {
        emailInputRef.current.focus();
        toast.warning('请输入正确的邮箱');
        return;
      }
      setIsCodeLoading(true);
      // 发送获取验证码的请求
      try {
        // 模拟请求延迟
        const res = await apiUserRegisterPost(email);
        setCountdown(60);
        if (res.code == 0) {
          toast.success('登录成功');
        } else {
          toast.error('服务器异常，请稍后再试');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsCodeLoading(false);
      }
    }
  };

  // 处理登录点击事件
  const handleLoginClick = async () => {
    if (!email || !code) {
      return;
    }
    setIsLoading(true);
    // 发送登录请求
    try {
      // 模拟请求延迟
      setIsModalOpen(false);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // localStorage.setItem('token', 'fake_token');
      // setIsLogin(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isModalOpen ? (
        <div
          className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-stone-400 bg-opacity-20"
          style={{ display: isLogin ? 'none' : 'block' }}
        >
          <div className="m-auto mt-40 rounded-lg bg-white p-8 shadow-lg sm:w-1/2 lg:w-1/3">
            <h2 className="mb-4 text-2xl font-bold">登录</h2>
            <div className="form">
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded border border-gray-400 px-3 py-2"
                  placeholder="邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailInputRef}
                />
              </div>
              <div className="flex">
                <input
                  type="text"
                  id="code"
                  className="mr-2 w-full rounded border border-gray-400 px-3 py-2"
                  value={code}
                  placeholder="验证码"
                  onChange={(e) => setCode(e.target.value)}
                  ref={codeInputRef}
                />
                <RoundButton
                  onClick={handleGetCodeClick}
                  disabled={countdown > 0 || isLoading}
                  className="h-20 text-sm"
                >
                  {countdown > 0 ? `${countdown}` : '获取验证码'}
                </RoundButton>
              </div>
              <RoundButton
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                disabled={!email || !code || isLoading}
                onClick={handleLoginClick}
              >
                {isLoading ? '正在登录...' : '登录'}
              </RoundButton>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
