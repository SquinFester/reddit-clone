"use client";

import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "react-query";
import axios from "axios";

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

  const currentVoteHandler = (vote: VoteType) => {
    if (vote === currentVote) {
      setCurrentVote(null);
      mutate("");
    } else {
      setCurrentVote(vote);
    }
  };

  // empty vote is equal to delete vote from db

  const { mutate } = useMutation({
    mutationFn: async (vote: VoteType | "") => {
      const { data } = await axios.post("/api/post/vote", vote);
      return data as string;
    },
  });

  return (
    <div className="flex justify-normal items-center">
      <Button
        size="sm"
        variant="ghost"
        aria-label="upvote"
        onClick={() => currentVoteHandler("UP")}
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
        <p className="text-center py-2 font-medium text-sm text-zinc-900">
          {initialUpVoteAmt}
        </p>
      </Button>
      <Button
        size="sm"
        variant="ghost"
        aria-label="downvote"
        onClick={() => currentVoteHandler("DOWN")}
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-red-500 fill-red-500": currentVote === "DOWN",
          })}
        />
        <p className="text-center py-2 font-medium text-sm text-zinc-900">
          {initialDownVoteAmt}
        </p>
      </Button>
    </div>
  );
};
