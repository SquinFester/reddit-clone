"use client";

import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

type PostVoteClient = {
  postId: string;
  initialUpVoteAmt: number;
  initialDownVoteAmt: number;
  initalVote?: VoteType | null;
};

export const PostVoteClient = ({
  postId,
  initialUpVoteAmt,
  initialDownVoteAmt,
  initalVote,
}: PostVoteClient) => {
  const [votesAmt, setVoteAmt] = useState({
    upVote: initialUpVoteAmt,
    downVote: initialDownVoteAmt,
  });
  const [currentVote, setCurrentVote] = useState(initalVote);
  const prevVote = usePrevious(currentVote);

  useEffect(() => {
    setCurrentVote(initalVote);
  }, [initalVote]);

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 sm:w-20 pb-4 sm:pb-0">
      <Button size="sm" variant="ghost" aria-label="upvote"></Button>
      <Button size="sm" variant="ghost" aria-label="downvote"></Button>
    </div>
  );
};
