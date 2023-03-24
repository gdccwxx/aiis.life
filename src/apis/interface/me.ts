export interface ResTypeMe {
  code: number;
  msg: string;
  data: MineData;
}

export interface MineData {
  email: string;
  invite_code: string;
  id: number;
  used: number;
  quota: number;
  expired_quota: number;
  last_paid_at: string;
}
