import { z } from "zod";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { VodeValidator } from "@/lib/validators/vote";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { voteType, postId } = VodeValidator.parse(body);

    const existedVote = await db.vote.findFirst({
      where: {
        postId,
        userId: session.user.id,
      },
    });

    if (!existedVote && voteType === "DELETE") {
      return new Response("Can remove opinion with doesn't exist", {
        status: 409,
      });
    }

    if (existedVote && voteType !== "DELETE") {
      await db.vote.update({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
        data: {
          type: voteType,
        },
      });
    }

    if (!existedVote && voteType !== "DELETE") {
      await db.vote.create({
        data: {
          postId,
          userId: session.user.id,
          type: voteType,
        },
      });
    }

    if (voteType === "DELETE") {
      await db.vote.delete({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
      });
    }

    return new Response(voteType);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not give opinion", { status: 500 });
  }
}
