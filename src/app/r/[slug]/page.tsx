import MiniPostCreator from "@/components/MiniPostCreator";
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
  });
  if (!subreddit) return notFound();

  const checkSubscription = !session
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: subreddit.name,
          },
          user: {
            id: session?.user.id,
          },
        },
      });

  return (
    <main>
      <h1 className="text-2xl font-semibold">r/{subreddit.name}</h1>
      <MiniPostCreator
        image={session?.user?.image || null}
        subscribeExist={!!checkSubscription}
      />
    </main>
  );
};
export default Page;
