export type MessageType = {
  avatarUrl: string;
  username: string;
  content: string;
};

export type Props = {
  message: MessageType;
  isUser: boolean;
};
