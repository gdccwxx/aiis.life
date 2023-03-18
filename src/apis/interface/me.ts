export interface ResTypeMe {
  code: number;
  msg: string;
  data: MineData;
}

export interface MineData {
  email: string;
  invite_code: string;
  used: number;
  quota: number;
  expired_quota: number;
}
