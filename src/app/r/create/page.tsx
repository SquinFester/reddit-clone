"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
import { toast } from "@/lib/use-toast";

const Page = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          router.push("/sign-in");
        }
        if (err.response?.status === 409) {
          return toast({
            title: "Subreddit already exists.",
            description: "Please choose a different sebreddit name.",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid subreddit name.",
            description: "Please choose a name between 3 and 21 characters.",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });

  return (
    <main className="mt-7 container">
      <section className="bg-white p-2 rounded-lg flex flex-col gap-3 border-secondaryRd border max-w-2xl mx-auto md:p-4">
        <h1 className="text-xl font-semibold md:text-2xl">
          Create a community
        </h1>
        <hr className="bg-zinc-500 h-px" />
        <div>
          <h2 className="font-medium text-lg md:text-xl">Name</h2>
          <p className="text-xs leading-none mb-2 md:text-base">
            Community names including capitalization cannot be changed
          </p>
        </div>
        <div className="relative">
          <p className="absolute left-0 w-8 inset-y-0 text-sm grid place-items-center text-zinc-400 md:text-base">
            r/
          </p>
          <Input
            value={input}
            onChange={(e) => setInput(() => e.target.value)}
            className="pl-6 md:text-base"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => createCommunity()}
            isLoading={isLoading}
            disabled={isLoading || input.length === 0}
          >
            Create
          </Button>
        </div>
      </section>
    </main>
  );
};
export default Page;
