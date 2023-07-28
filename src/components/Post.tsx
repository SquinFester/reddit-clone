import { formatTimeToNow } from "@/lib/utils";
import {
  Comment,
  Post as PostType,
  User,
  Vote,
  VoteType,
} from "@prisma/client";
import { useRef } from "react";
import { MessageSquare } from "lucide-react";
import { EditorOutput } from "./EditorOutput";
import { PostVoteClient } from "./post-vote/PostVoteClient";

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

  const upVoteAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1;
    return acc;
  }, 0);

  const downVoteAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === "DOWN") return acc - 1;
    return acc;
  }, 0);

  const currentVote = post.votes.find((vote) => {
    vote.userId === post.authorId;
  });

  return (
    <div className="rounded-md bg-white shadow flex flex-col overflow-hidden">
      <div className="px-6 py-4">
        <p>
          <a href={`/r/${subredditName}`} className="underline">
            r/{subredditName}
          </a>{" "}
          <span className="text-zinc-500 text-sm">
            • Posted by u/
            {post.author.name} {formatTimeToNow(new Date(post.createdAt))}
          </span>
        </p>
        <a href={`/r/${subredditName}/post/${post.id}`}>
          <h1 className="text-xl font-semibold">{post.title}</h1>
        </a>
        <div
          ref={pRef}
          className="relative text-sm max-h-40 w-full overflow-clip"
        >
          <EditorOutput content={post.content} />
          {pRef.current?.clientHeight === 160 ? (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
          ) : null}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-100 flex w-full justify-between">
        <a
          href={`/r/${subredditName}/post/${post.id}`}
          className="flex gap-2 items-center"
        >
          <MessageSquare /> {post.comments.length} comments
        </a>
        <PostVoteClient
          postId={post.id}
          initialUpVoteAmt={upVoteAmt}
          initialDownVoteAmt={downVoteAmt}
          initalVote={currentVote?.type}
        />
      </div>
    </div>
  );
};
