import { getCookie } from '@/utils/cookie';
import request from '@/utils/request';
import { ResTypePayCode } from './interface/typePay';
import { apiMeGet } from './login';

/**
 * @description 获取付款二维码
 */
export const apiPayCodeGet = async () => {
  const meRes = await apiMeGet();
  const uid = getCookie('userId');
  if (meRes.data.id.toString() == uid?.toString()) {
    const res: ResTypePayCode = await request(
      `https://215qspl2.minapp-faas.com/prod/paycode/?uid=${uid}&slug=aiis`
    );
    return res;
  } else {
    return { image: 'error' };
  }
};
