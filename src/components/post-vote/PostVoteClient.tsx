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
  initalVote?: VoteType | null;
};

export const PostVoteClient = ({
  postId,
  initialUpVoteAmt,
  initialDownVoteAmt,
  initalVote,
}: PostVoteClient) => {
  const [currentVote, setCurrentVote] = useState(initalVote);
  const prevVote = usePrevious(currentVote);

  const [votesAmt, setVotesAmt] = useState({
    upVote: initialUpVoteAmt,
    downVote: initialDownVoteAmt,
  });

  useEffect(() => {
    setCurrentVote(initalVote);
  }, [initalVote]);

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

  // to check curret vote when page is loaded u need chack session inside client side and provider to it

  const votesAmtHandler = (vote: VoteType | "DELETE") => {
    if (vote === "UP") {
      setVotesAmt(() => ({
        upVote: votesAmt.upVote + 1,
        downVote: initialDownVoteAmt,
      }));
    }
    if (vote === "DOWN") {
      setVotesAmt(() => ({
        upVote: initialUpVoteAmt,
        downVote: votesAmt.downVote - 1,
      }));
    }
    if (vote === "DELETE") {
      setVotesAmt(() => ({
        upVote: initialUpVoteAmt,
        downVote: initialDownVoteAmt,
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
