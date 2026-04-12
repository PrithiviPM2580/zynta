import { Router } from "express";
import {
  createChatController,
  getChatController,
  getUserChatsController,
} from "../controllers/chat.controller";
import { passportAuthenticateJwt } from "../config/passport.config";
import { sendMessageController } from "../controllers/message.controller";

const chatRouter: Router = Router();

chatRouter.post("/create", passportAuthenticateJwt, createChatController);

chatRouter.get("/all", passportAuthenticateJwt, getUserChatsController);

chatRouter.get("/:id", passportAuthenticateJwt, getChatController);

chatRouter.post(
  "/message/send",
  passportAuthenticateJwt,
  sendMessageController,
);

export default chatRouter;
