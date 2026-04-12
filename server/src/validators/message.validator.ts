import { z } from "zod";

export const sendMessageSchema = z
  .object({
    chatId: z.string().trim().min(1, "Chat ID is required"),
    content: z.string().trim().min(1).optional(),
    image: z.string().trim().min(1).optional(),
    replyToId: z.string().trim().min(1).optional(),
  })
  .refine((data) => data.content || data.image, {
    message: "Either content or image must be provided",
    path: ["content"],
  });

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema>;
