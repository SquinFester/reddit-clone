import { SubscriptionToggle } from "@/components/SubscriptionToggle";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
  });

  if (!subreddit) return notFound();

  const session = await getAuthSession();

  const members = await db.subscription.count({
    where: {
      subredditId: subreddit.id,
    },
  });

  const checkSubscription = !session
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },

          user: {
            id: session?.user.id,
          },
        },
      });

  const subscriptionExists = !!checkSubscription;

  return (
    <main className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-2">{children}</div>
      <div className="border hidden overflow-hidden md:block border-secondaryRd rounded-md divide-y divide-secondaryRd h-fit sticky top-0">
        <div className="bg-primaryBg font-semibold p-4 text-white">
          About r/{subreddit.name}
        </div>
        <div className="bg-white p-4 flex justify-between text-sm text-zinc-500">
          <p>Created</p>
          <time>{format(subreddit.createdAt, "MMM d, yyyy")}</time>
        </div>
        <div className="bg-white flex flex-col p-4 gap-6">
          <div className=" flex justify-between text-sm text-zinc-500 w-full">
            Members
            <p>{members}</p>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <SubscriptionToggle
              isSubscribed={subscriptionExists}
              isAuthor={
                session?.user ? session?.user.id === subreddit.creatorId : false
              }
              subredditId={subreddit.id}
              isLogged={!!session?.user}
            />
            <Link
              className={buttonVariants({
                variant: "secondary",
                className: "w-full",
              })}
              href={`/r/${slug}/submit`}
            >
              Create a post
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Layout;
