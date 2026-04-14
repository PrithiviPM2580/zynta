import type { UserType } from "./auth.type";

export type ChatType = {
  _id: string;
  lastMessage: MessageType;
  participants: UserType[];
  isGroup: boolean;
  createdby: string;
  groupName?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MessageType = {
  _id: string;
  content: string | null;
  sender: UserType | null;
  image: string | null;
  replyTo: MessageType | null;
  chatId: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateChatType = {
  participantId?: string;
  isGroup?: boolean;
  groupName?: string;
  participants?: string[];
};

export type CreateMessageType = {
  chatId: string;
  content?: string;
  image?: string;
  replyTo?: MessageType | null;
};
