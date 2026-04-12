import { z } from "zod";

export const sendMessageSchema = z
  .object({
    chatId: z.string().trim().min(1, "Chat ID is required"),
    content: z.string().trim().optional(),
    image: z.string().trim().optional(),
    replyToId: z.preprocess(
      (value) => {
        if (typeof value !== "string") return value;
        const trimmed = value.trim();
        return trimmed === "" ? undefined : trimmed;
      },
      z.string().optional(),
    ),
  })
  .refine((data) => data.content || data.image, {
    message: "Either content or image must be provided",
    path: ["content"],
  });

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema>;
