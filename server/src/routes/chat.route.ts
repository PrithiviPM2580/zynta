import { Router } from "express";
import {
  createChatController,
  getUserChatsController,
} from "../controllers/chat.controller";
import { passportAuthenticateJwt } from "../config/passport.config";

const chatRouter: Router = Router();

chatRouter.post("/create", passportAuthenticateJwt, createChatController);

chatRouter.get("/all", passportAuthenticateJwt, getUserChatsController);

chatRouter.get("/:id", passportAuthenticateJwt, getUserChatsController);

export default chatRouter;
