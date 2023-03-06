export interface SessionCreateData {
  id: number;
  user: string;
  title: string;
  chatHistory: HistoryMsg[];
  created_at: Date;
  updated_at: Date;
}

export interface HistoryMsg {
  role: 'user' | 'assistant';
  content: string;
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
