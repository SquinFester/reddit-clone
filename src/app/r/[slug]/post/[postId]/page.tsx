import { EditorOutput } from "@/components/EditorOutput";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    postId: string;
  };
};

const Page = async ({ params: { postId } }: PageProps) => {
  const cachedPost = await db.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      votes: true,
      author: true,
      comments: true,
    },
  });

  if (!cachedPost) return notFound();

  return <EditorOutput content={cachedPost?.content} />;
};
export default Page;
