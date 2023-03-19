import { setCookie } from '@/utils/cookie';
import request from '@/utils/request';
import { ResTypeLogin, ResTypeRegister } from './interface/login';
import { ResTypeMe } from './interface/me';

/**
 * @description 注册
 */
export const apiUserRegisterPost = async (mail: string) => {
  const res: ResTypeRegister = await request(`/api/v1/user/register`, {
    method: 'POST',
    body: {
      email: mail
    }
  });
  return res;
};

/**
 * @description 登录
 */
export const apiUserLoginPost = async (mail: string, code: string) => {
  const res: ResTypeLogin = await request(`/api/v1/user/login`, {
    method: 'POST',
    body: {
      email: mail,
      verify_code: code
    }
  });
  return res;
};

/**
 * @description 获取个人信息
 */
export const apiMeGet = async () => {
  const currentTime = new Date().getTime();
  const res: ResTypeMe = await request(`/api/v1/user/me`);
  setCookie('lastRequestTime', currentTime.toString());
  setCookie('inviteCode', res.data.invite_code);
  setCookie('userId', res.data.invite_code);
  return res;
};
