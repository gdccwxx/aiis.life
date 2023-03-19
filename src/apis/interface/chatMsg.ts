export interface ResTypeSessionCreate {
  code: number;
  msg: string;
  data: string;
}

export interface ResTypeChatAns {
  code: number;
  msg: string;
  data: ChatData;
}

export interface ChatData {
  answer: Answer;
  usage: Usage;
}

export interface Answer {
  role: string;
  content: string;
}

export interface Usage {
  used: number;
  quota: number;
  expired_quota: number;
}
