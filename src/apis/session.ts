import request from '@/utils/request';
import { ResTypeSessionCreate, ResTypeSessionList } from './interface/session';

/**
 * @description 获取 Session 列表
 */
export const apiSessionGet = async (id?: number) => {
  const url = id ? `/api/v1/main/session?id=${id}` : `/api/v1/main/session`;
  const res: ResTypeSessionList = await request(url);
  return res;
};

/**
 * @description 创建 Session 信息
 */
export const apiSessionCreatePost = async () => {
  const res: ResTypeSessionCreate = await request(`/api/v1/main/session`, {
    method: 'POST'
  });
  return res;
};
