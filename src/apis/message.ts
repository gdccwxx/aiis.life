import toast from '@/ui/toast/toast';
import { getCookie } from '@/utils/cookie';
import request from '@/utils/request';
import { ResTypeChatAns } from './interface/chatMsg';
import { apiMeGet } from './login';

/**
 * @description 发送聊天消息
 */
export const apiChatPost = async (sessionId: number, msg: string) => {
  // 如果上次请求大于一小时，则访问签到接口
  const currentTime = new Date().getTime();
  const lastRequestTime: number = parseInt(getCookie('lastRequestTime') || '0');
  const timeDiff = (currentTime - lastRequestTime) / (1000 * 60 * 60); // convert to hours
  if (timeDiff >= 3) {
    // perform the request and update the last request time
    await apiMeGet();
  }
  const res: ResTypeChatAns = await request(`/api/v1/main/chat`, {
    method: 'POST',
    body: {
      session_id: sessionId,
      msg: msg
    }
  });
  return res;
};
