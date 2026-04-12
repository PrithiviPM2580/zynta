import { z } from "zod";

export const createChatSchema = z.object({
  participantId: z
    .string()
    .trim()
    .min(1, "Participant ID is required")
    .optional(),
  isGroup: z.boolean().optional(),
  participants: z
    .array(z.string().trim().min(1, "Participant ID is required"))
    .optional(),
  groupName: z.string().trim().min(1, "Group name is required").optional(),
});

export const chatIdSchema = z.object({
  id: z.string().trim().min(1, "Chat ID is required"),
});

export type CreateChatSchemaType = z.infer<typeof createChatSchema>;
export type ChatIdSchemaType = z.infer<typeof chatIdSchema>;
