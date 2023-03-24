export interface ResTypePayCode {
  code: number;
  msg: string;
  data: PayData;
}

export interface PayData {
  qrcode: string;
}
