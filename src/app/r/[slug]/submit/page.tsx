import { Editor } from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

const Page = async ({ params: { slug } }: PageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
  });

  if (!subreddit) return notFound();

  return (
    <main className="flex flex-col gap-5 pb-5">
      <h1 className="text-2xl font-semibold">
        Create Post{" "}
        <span className="text-zinc-500 font-medium">in r/{slug}</span>
      </h1>
      <Editor subredditId={subreddit.id} />
    </main>
  );
};
export default Page;
