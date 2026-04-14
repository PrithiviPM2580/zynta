import { API } from "@/lib/axios-client";
import type { UserType } from "@/types/auth.type";
import type { ChatType, CreateChatType, MessageType } from "@/types/chat.type";
import { toast } from "sonner";
import { create } from "zustand";

interface SingleChatType {
  chat: ChatType;
  messages: MessageType[];
}

interface ChatState {
  chats: ChatType[];
  users: UserType[];
  singleChat: SingleChatType | null;
  isChatsLoading: boolean;
  isUsersLoading: boolean;
  isCreatingChat: boolean;
  isSingleChatLoading: boolean;

  fetchAllUsers: () => void;
  fetchChats: () => void;
  createChat: (payload: CreateChatType) => void;
  fetchSingleChat: (chatId: string) => void;
}

export const useChat = create<ChatState>((set, get) => ({
  chats: [],
  users: [],
  singleChat: null,
  isChatsLoading: false,
  isUsersLoading: false,
  isCreatingChat: false,
  isSingleChatLoading: false,

  fetchAllUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await API.get("/user/all");
      set({ users: data.users });
      toast.success("Users fetched successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  fetchChats: async () => {
    set({ isChatsLoading: true });
    try {
      const { data } = await API.get("/chat/all");
      set({ chats: data.chats });
      toast.success("Chats fetched successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch chats");
    } finally {
      set({ isChatsLoading: false });
    }
  },
  createChat: async (payload: CreateChatType) => {
    set({ isCreatingChat: true });
    try {
      const { data } = await API.post("/chat", payload);
      set({ chats: [...get().chats, data.chat] });
      toast.success("Chat created successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create chat");
    } finally {
      set({ isCreatingChat: false });
    }
  },
  fetchSingleChat: async (chatId: string) => {
    set({ isSingleChatLoading: true });
    try {
      const { data } = await API.get(`/chat/${chatId}`);
      set({ singleChat: data.chat });
      toast.success("Single chat fetched successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch single chat",
      );
    } finally {
      set({ isSingleChatLoading: false });
    }
  },
}));
