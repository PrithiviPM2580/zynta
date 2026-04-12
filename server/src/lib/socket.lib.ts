import type { Server as HTTPServer } from "node:http";
import { Server, type Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { Env } from "../config/env.config";

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

let io: Server | null = null;

const onlineUsers = new Map<string, string>();

export const initilizeSocket = (httpServer: HTTPServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: Env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;
      if (!rawCookie)
        return next(new Error("Unauthorized: No cookie provided"));
      const token = rawCookie?.split("=")?.[1]?.trim();
      if (!token) return next(new Error("Unauthorized: Invalid cookie format"));

      const decodeToken = jwt.verify(token, Env.JWT_SECRET);
      if (!decodeToken) return next(new Error("Unauthorized: Invalid token"));

      const { userId } = decodeToken as { userId: string };
      socket.userId = userId;
      next();
    } catch (error) {
      next(new Error("Unauthorized: " + (error as Error).message));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    if (!socket.userId) {
      socket.disconnect(true);
      return;
    }
    const userId = socket.userId!;
    const newSocketId = socket.id;

    console.log("Socket Connected", { userId, newSocketId });
    onlineUsers.set(userId, newSocketId);

    //Broadcast online users to all sockets
    io?.emit("online:users", Array.from(onlineUsers.keys()));
  });
};
