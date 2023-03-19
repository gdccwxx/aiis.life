import { getCookie } from '@/utils/cookie';
import request from '@/utils/request';
import { ResTypePayCode } from './interface/typePay';

/**
 * @description 获取付款二维码
 */
export const apiPayCodeGet = async () => {
  const uid = getCookie('userId');
  const res: ResTypePayCode = await request(
    `https://215qspl2.minapp-faas.com/prod/paycode/?uid=${uid}&slug=aiis`
  );
  return res;
};
