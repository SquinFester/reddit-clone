import MiniPostCreator from "@/components/MiniPostCreator";
import { PostFeed } from "@/components/PostFeed";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

const Page = async ({ params: { slug } }: PageProps) => {
  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        take: 2,
      },
    },
  });

  if (!subreddit) return notFound();

  const checkSubscription =
    session?.user &&
    (await db.subscription.findFirst({
      where: {
        subredditId: subreddit.id,
        userId: session.user.id,
      },
    }));

  return (
    <main>
      <h1 className="text-2xl font-semibold">r/{subreddit.name}</h1>
      <MiniPostCreator
        image={session?.user?.image || null}
        subscribeExist={!!checkSubscription}
      />
      <PostFeed
        initialPosts={subreddit.posts}
        subredditName={subreddit.name}
        userId={session?.user.id}
      />
    </main>
  );
};
export default Page;
