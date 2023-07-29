"use client";

import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "react-query";
import axios from "axios";
import { VodeValidatorType } from "@/lib/validators/vote";

type PostVoteClient = {
  postId: string;
  initialUpVoteAmt: number;
  initialDownVoteAmt: number;
  initialVote?: VoteType | null;
};

export const PostVoteClient = ({
  postId,
  initialUpVoteAmt,
  initialDownVoteAmt,
  initialVote,
}: PostVoteClient) => {
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  const [votesAmt, setVotesAmt] = useState({
    upVote: initialUpVoteAmt,
    downVote: initialDownVoteAmt,
  });

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const currentVoteHandler = (vote: VoteType) => {
    if (vote === currentVote) {
      setCurrentVote(null);
      votesAmtHandler("DELETE");
      mutate("DELETE");
    } else {
      setCurrentVote(vote);
      votesAmtHandler(vote);
      mutate(vote);
    }
  };

  const votesAmtHandler = (vote: VoteType | "DELETE") => {
    if (vote === "UP") {
      setVotesAmt(() => ({
        upVote: votesAmt.upVote + 1,
        downVote:
          currentVote === "DOWN" ? votesAmt.downVote + 1 : votesAmt.downVote,
      }));
    }
    if (vote === "DOWN") {
      setVotesAmt(() => ({
        upVote: currentVote === "UP" ? votesAmt.upVote - 1 : votesAmt.upVote,
        downVote: votesAmt.downVote - 1,
      }));
    }
    if (vote === "DELETE") {
      setVotesAmt(() => ({
        upVote: currentVote === "UP" ? votesAmt.upVote - 1 : votesAmt.upVote,
        downVote:
          currentVote === "DOWN" ? votesAmt.downVote + 1 : votesAmt.downVote,
      }));
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (vote: VoteType | "DELETE") => {
      const payload: VodeValidatorType = {
        postId,
        voteType: vote,
      };
      const { data } = await axios.post("/api/subreddit/post/vote", payload);
      return data as string;
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("succes");
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
          {votesAmt.upVote}
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
          {votesAmt.downVote}
        </p>
      </Button>
    </div>
  );
};
