import type mongoose from "mongoose";
import cloudinary from "../config/cloudinary.config";
import Chat from "../models/chat.model";
import Message from "../models/message.model";
import {
  BadRequestException,
  NotFoundException,
} from "../utils/app-error.util";
import type { SendMessageSchemaType } from "../validators/message.validator";
import {
  emitLastMessageToParticipants,
  emitNewMessageToChatRoom,
} from "../lib/socket.lib";

export const sendMessageService = async (
  userId: string,
  body: SendMessageSchemaType,
) => {
  const { chatId, content, image, replyToId } = body;
  const chat = await Chat.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  });

  if (!chat) {
    throw new BadRequestException("Chat not found or unauthorized");
  }
  if (replyToId) {
    const replyMessage = await Message.findOne({
      _id: replyToId,
      chatId,
    }).lean();

    if (!replyMessage) {
      throw new NotFoundException("Reply message not found");
    }
  }

  let imageUrl;

  if (image) {
    //Cloudinary upload logic here
    const uploadRes = await cloudinary.uploader.upload(image);
    imageUrl = uploadRes.secure_url;
  }

  const messagePayload = {
    chatId,
    sender: userId,
    content,
    image: imageUrl,
    ...(replyToId ? { replyTo: replyToId } : {}),
  };

  const newMessage = await Message.create(messagePayload);

  await newMessage.populate([
    {
      path: "sender",
      select: "name avatar",
    },
    {
      path: "replyTo",
      select: "content image sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    },
  ]);

  chat.lastMessage = newMessage._id as mongoose.Types.ObjectId;
  await chat.save();

  emitNewMessageToChatRoom(userId, chatId, newMessage);

  //Websocket
  const allParticipantIds = chat.participants.map((p) => p.toString());
  emitLastMessageToParticipants(allParticipantIds, chatId, newMessage);

  return { userMessage: newMessage, chat };
};
