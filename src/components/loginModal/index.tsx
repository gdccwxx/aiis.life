import { apiUserLoginPost, apiUserRegisterPost } from '@/apis/login';
import RoundButton from '@/ui/bnt';
import toast from '@/ui/toast/toast';
import { setCookie } from '@/utils/cookie';
import { FC, useEffect, useRef, useState } from 'react';

type Props = {
  defaultOpen?: boolean;
};

export const LoginModal: FC<Props> = ({ defaultOpen = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultOpen);
  const defaultEmail = localStorage.getItem('account') ?? '';
  const [email, setEmail] = useState(defaultEmail);
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [isRememberAccount, setIsRememberAccount] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef(null);

  // 模拟本地缓存
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (defaultOpen) {
      setTimeout(() => {
        setIsLogin(false);
        setIsModalOpen(true);
      }, 3);
    } else if (token) {
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
        const res = await apiUserRegisterPost(email);
        setCountdown(60);
        if (res.code == 0) {
          toast.success('发送成功');
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

  const handleRememberAccount = () => {
    if (isRememberAccount) {
      localStorage.setItem('account', email);
    } else {
      localStorage.removeItem('account');
    }
  };

  // 处理登录点击事件
  const handleLoginClick = async () => {
    if (!email || !code) {
      toast.warning('请填写完整信息');
      return;
    }
    setIsLoading(true);
    // 发送登录请求
    try {
      const res = await apiUserLoginPost(email, code);
      if (res.data && res.code == 0) {
        localStorage.setItem('token', res.data);
        localStorage.setItem('email', email);
        handleRememberAccount();
        setCookie('token', res.data);
        setCookie('email', email);
        toast.success('登录成功');
        setIsModalOpen(false);
        const searchParams = new URLSearchParams(window.location.search);
        const redirectUrl = searchParams.get('redirectUrl');
        // console.log(redirectUrl);

        if (redirectUrl) {
          window.location.replace(redirectUrl);
        } else {
          // 如果没有重定向 URL，则重定向到默认页面
          window.location.replace('/search');
        }
      } else {
        toast.error('验证码错误');
      }
    } catch (error: any) {
      toast.error(error.toString());
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
          <div className="m-auto mt-40 h-[452px] w-[393px] rounded-lg bg-white py-[30px] px-[20px] shadow-lg dark:bg-gray-800">
            <div className="relative h-full w-full">
              <h2 className="mb-4 text-2xl font-bold dark:text-black">
                Hi, Welcome! 👋
              </h2>
              <div className="form">
                <div className="mb-[6px] mt-[35px]">邮箱</div>
                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    className="h-[56px] w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    placeholder="请输入你邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailInputRef}
                  />
                </div>
                <div className="mb-[6px] mt-[22px]">验证码</div>
                <div className="flex">
                  <input
                    type="text"
                    id="code"
                    className="mr-3 h-[56px] grow rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    value={code}
                    placeholder="验证码"
                    onChange={(e) => setCode(e.target.value)}
                    ref={codeInputRef}
                  />
                  <RoundButton
                    onClick={handleGetCodeClick}
                    disabled={countdown > 0 || isLoading}
                    className="h-[56px] grow-0 rounded-lg text-sm text-slate-600  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    isLoading={isCodeLoading}
                  >
                    {countdown > 0 ? `${countdown}` : '获取验证码'}
                  </RoundButton>
                </div>
                <div className="mt-[10px]">
                  <input
                    type="checkbox"
                    id="remember-account"
                    name="remember-account"
                    defaultChecked={isRememberAccount}
                    onChange={() => setIsRememberAccount(!isRememberAccount)}
                    className="rounded-s align-middle text-black outline-none outline-0 outline-transparent"
                  />
                  <label
                    htmlFor="remember-account"
                    className="ml-[10px] align-middle"
                  >
                    记住我的账号
                  </label>
                </div>
                <RoundButton
                  className="hover:bg-black-600 absolute bottom-0 mt-4 h-[56px] w-full rounded-lg bg-black px-4 py-2 text-xl text-white dark:border-gray-600 dark:text-gray-200"
                  disabled={!email || !code || isLoading}
                  onClick={handleLoginClick}
                  isLoading={isLoading}
                >
                  登录
                </RoundButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
