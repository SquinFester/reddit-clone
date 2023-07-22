import { z } from "zod";

export const SubredditValidator = z.object({
  name: z.string().min(3).max(21),
});

export type CreateSubredditPayload = z.infer<typeof SubredditValidator>;
