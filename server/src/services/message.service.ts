import Chat from "../models/chat.model";
import Message from "../models/message.model";
import {
  BadRequestException,
  NotFoundException,
} from "../utils/app-error.util";
import type { SendMessageSchemaType } from "../validators/message.validator";

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
    });
    if (!replyMessage) {
      throw new NotFoundException("Reply message not found");
    }

    let imageUrl;

    if (image) {
      //Cloudinary upload logic here
    }

    const newMessage = await Message.create({
      chatId,
      sender: userId,
      content,
      image: imageUrl,
      replyTo: replyToId,
    });

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

    //Websocket

    return { message: newMessage, chat };
  }
};
