import { Socket, io } from "socket.io-client";
import { create } from "zustand";
import { appEnv } from "@/lib/env";

const BASE_URL = appEnv.NODE_ENV === "development" ? appEnv.API_URL : "/";

interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocket = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],
  connectSocket: () => {
    const { socket } = get();
    if (socket) return;

    const newSocket = io(BASE_URL, {
      withCredentials: true,
      autoConnect: true,
    });
    set({ socket: newSocket });

    newSocket.on("connect", () => {
      console.log("Socket connected", newSocket.id);
    });

    newSocket.on("online:users", (userIds) => {
      console.log("Online users:", userIds);
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
