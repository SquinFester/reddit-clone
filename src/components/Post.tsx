import { formatTimeToNow } from "@/lib/utils";
import { Comment, Post as PostType, User, Vote } from "@prisma/client";
import { useRef } from "react";
import { MessageSquare } from "lucide-react";

type PostProps = {
  subredditName: string;
  post: PostType & {
    author: User;
    votes: Vote[];
    comments: Comment[];
  };
};

export const Post = ({ subredditName, post }: PostProps) => {
  const pRef = useRef<HTMLDivElement>(null);

  const votesAmnt = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1;
    if (vote.type === "DOWN") return acc - 1;
    return acc;
  }, 0);

  const likeAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1;
  }, 0);

  const disLikeAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === "DOWN") return acc - 1;
  }, 0);

  const currentVote = post.votes.find((vote) => vote.userId === post.authorId);

  return (
    <div className="rounded-md bg-white shadow flex flex-col px-6 py-4">
      <p>
        <a href={`/r/${subredditName}`}>r/{subredditName}</a> • Posted by u/
        {post.author.name} {formatTimeToNow(new Date(post.createdAt))}
      </p>
      <a href={`/r/${subredditName}/post/${post.id}`}>
        <h1>{post.title}</h1>
      </a>
      <div ref={pRef}>
        {pRef.current?.clientHeight === 160 ? <div></div> : null}
      </div>
      <div>
        <a href={`/r/${subredditName}/post/${post.id}`}>
          <MessageSquare /> {post.comments.length}
        </a>
      </div>
    </div>
  );
};
