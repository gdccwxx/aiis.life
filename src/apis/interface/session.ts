export interface SessionCreateData {
  id: number;
  user: string;
  title: string;
  prompt: any[];
  created_at: Date;
  updated_at: Date;
}

export interface ResTypeSessionCreate {
  code: number;
  msg: string;
  data: SessionCreateData;
}

export interface ResTypeSessionList {
  code: number;
  msg: string;
  data: SessionCreateData[];
}
