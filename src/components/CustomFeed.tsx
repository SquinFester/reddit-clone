import { db } from "@/lib/db";
import { PostFeed } from "./PostFeed";
import { getAuthSession } from "@/lib/auth";

export const CustomFeed = async () => {
  const session = await getAuthSession();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunities.map(({ subreddit }) => subreddit.name),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: 2,
  });

  return <PostFeed initialPosts={posts} userId={session?.user.id} />;
};
