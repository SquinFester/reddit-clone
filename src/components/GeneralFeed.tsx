import { db } from "@/lib/db";
import { PostFeed } from "./PostFeed";

export const GeneralFeed = async () => {
  const posts = await db.post.findMany({
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

  return <PostFeed initialPosts={posts} />;
};
