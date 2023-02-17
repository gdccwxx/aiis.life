import request from '@/utils/request';
import { ResTypeChatAns } from './interface/chatMsg';

/**
 * @description 发送聊天消息
 */
export const apiChatPost = async (sessionId: number, msg: string) => {
  const res: ResTypeChatAns = await request(`/api/chat`, {
    method: 'POST',
    body: {
      session_id: sessionId,
      msg: msg
    }
  });
  return res;
};
