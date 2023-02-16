import request from '@/utils/request';

/**
 * @description 发送聊天消息
 */
export const apiChatPost = async (sessionId: number, msg: string) => {
  const res: any = await request(`/api/chat`, {
    method: 'POST',
    body: {
      session_id: sessionId,
      msg: msg
    }
  });
  return res;
};

// /**
//  * @description 发送聊天消息
//  */
// export const apiChatMsgGet = async (sessionId: number, msg: string) => {
//   const res: any = await request(`/api/chat`);
//   return res;
// };
