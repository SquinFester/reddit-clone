import { z } from "zod";

export const VodeValidator = z.object({
  postId: z.string(),
  voteType: z.enum(["UP", "DOWN", "DELETE"]),
});

export type VodeValidatorType = z.infer<typeof VodeValidator>;
