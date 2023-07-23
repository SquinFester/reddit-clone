"use client";

import { useMutation } from "react-query";
import { Button } from "./ui/Button";
import { CreateSubscriptionPayload } from "@/lib/validators/subreddit";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    onSuccess: () => {
      router.refresh();
    },
  });

  const content = () => {
    if (isAuthor) return <p>You created this subreddit</p>;
    if (isSubscribed) {
      return (
        <Button
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
