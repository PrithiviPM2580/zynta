import Chat from "../models/chat.model";
import User from "../models/user.model";
import { NotFoundException } from "../utils/app-error.util";
import type { CreateChatSchemaType } from "../validators/chat.validator";

export const createChatService = async (
  userId: string,
  body: CreateChatSchemaType,
) => {
  const { participantId, participants, groupName, isGroup } = body;
  let chat;
  let allParticipantIds: string[] = [];

  if (isGroup && participants?.length && groupName) {
    allParticipantIds = [userId, ...participants];
    chat = await Chat.create({
      participants: allParticipantIds,
      isGroup: true,
      groupName,
      createdBy: userId,
    });
  } else if (participantId) {
    const otherUser = await User.findById(participantId).lean();
    if (!otherUser) {
      throw new NotFoundException("User not found");
    }
    allParticipantIds = [userId, participantId];
    const existingChat = await Chat.findOne({
      participants: { $all: allParticipantIds, $size: 2 },
    }).populate("participants", "name avatar");

    if (existingChat) {
      return existingChat;
    }
    chat = await Chat.create({
      participants: allParticipantIds,
      isGroup: false,
      createdBy: userId,
    });
  }

  //Implement websocket
  return chat;
};

export const getUserChatsService = async (userId: string) => {
  const chats = await Chat.find({
    participants: {
      $in: [userId],
    },
  })
    .populate("participants", "name avatar")
    .populate({
      path: "lastMessage",
      populate: { path: "sender", select: "name avatar" },
    })
    .sort({ updatedAt: -1 })
    .lean();
  return chats;
};
