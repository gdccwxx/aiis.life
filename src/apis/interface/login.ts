export interface ResTypeRegister {
  code: number;
  msg: string;
  data?: any;
}

export interface ResTypeLogin {
  code: number;
  msg: string;
  data?: string; // token
}
