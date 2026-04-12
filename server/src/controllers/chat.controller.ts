import type { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { chatIdSchema, createChatSchema } from "../validators/chat.validator";
import {
  createChatService,
  getUserChatsService,
  getChatService,
} from "../services/chat.service";

export const createChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = createChatSchema.parse(req.body);

    const chat = await createChatService(userId, body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Chat created successfully",
      chat,
    });
  },
);

export const getUserChatsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const chat = await getUserChatsService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User chats retrieved successfully",
      chat,
    });
  },
);

export const getChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { id } = chatIdSchema.parse(req.params);

    const { chat, messages } = await getChatService(userId, id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Chat retrieved successfully",
      chat,
      messages,
    });
  },
);
