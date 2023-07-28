"use client";

import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import axios from "axios";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { Post } from "./Post";

type PostFeed = {
  initialPosts: ExtendedPost[];
  subredditName?: string;
  userId: string | undefined;
};

export const PostFeed = ({ initialPosts, subredditName, userId }: PostFeed) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/post?limit=2&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col gap-8 mt-5">
      {posts.map((post, index) => {
        const votesAmnt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find((vote) => vote.userId === userId);
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post subredditName={post.subreddit.name} post={post} />
            </li>
          );
        } else {
          return (
            <Post
              subredditName={post.subreddit.name}
              post={post}
              key={post.id}
            />
          );
        }
      })}
    </ul>
  );
};
