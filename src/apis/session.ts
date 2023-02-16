import request from '@/utils/request';
import { ResTypeSessionCreate, ResTypeSessionList } from './interface/session';

/**
 * @description 获取 Session 列表
 */
export const apiSessionGet = async (id?: number) => {
  const res: ResTypeSessionList = await request(
    `/api/session` + id ? `?id=${id}` : ''
  );
  return res;
};

/**
 * @description 创建 Session 信息
 */
export const apiSessionCreatePost = async () => {
  const res: ResTypeSessionCreate = await request(`/api/session`, {
    method: 'POST'
  });
  return res;
};
