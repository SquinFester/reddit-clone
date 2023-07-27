"use client";

import { useMutation } from "react-query";
import { Button } from "./ui/Button";
import { CreateSubscriptionPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/use-toast";
import { title } from "process";

type SubscriptionToggleProps = {
  isSubscribed: boolean;
  isAuthor: boolean;
  subredditId: string;
  isLogged: boolean;
};

export const SubscriptionToggle = ({
  isSubscribed,
  isAuthor,
  subredditId,
  isLogged,
}: SubscriptionToggleProps) => {
  const router = useRouter();

  const { mutate: addSubscription, isLoading: addSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubscriptionPayload = { subredditId };
      const { data } = await axios.post("/api/subreddit/subscription", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          router.push("/sign-in");
          return;
        }
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { mutate: removeSubscription, isLoading: rmSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubscriptionPayload = { subredditId };
      const { data } = await axios.post(
        "/api/subreddit/unsubscription",
        payload
      );
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          router.push("/sign-in");
        }
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const content = () => {
    if (isAuthor) return <p>You created this subreddit</p>;
    if (isSubscribed) {
      return (
        <Button
          className="w-full"
          onClick={() => {
            isLogged ? removeSubscription() : router.push("/sign-in");
          }}
          isLoading={rmSubLoading}
          disabled={rmSubLoading}
        >
          Unsubscribe
        </Button>
      );
    } else {
      return (
        <Button
          className="w-full"
          onClick={() => {
            isLogged ? addSubscription() : router.push("/sign-in");
          }}
          isLoading={addSubLoading}
          disabled={addSubLoading}
        >
          Subscribe
        </Button>
      );
    }
  };

  return <>{content()}</>;
};
