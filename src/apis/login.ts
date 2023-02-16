import request from '@/utils/request';
import { ResTypeLogin, ResTypeRegister } from './interface/login';

/**
 * @description 注册
 */
export const apiUserRegisterPost = async (mail: string) => {
  const res: ResTypeRegister = await request(`/api/be/buidler`, {
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
  const res: ResTypeLogin = await request(`/api/user/login`, {
    method: 'POST',
    body: {
      email: mail,
      verify_code: code
    }
  });
  return res;
};
