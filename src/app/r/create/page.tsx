"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";

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
  });

  return (
    <main className="mt-7 container">
      <section className="bg-white p-2 rounded-lg flex flex-col gap-3 border-secondaryRd border max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold ">Create a community</h1>
        <hr className="bg-zinc-500 h-px" />
        <div>
          <h2 className="font-medium text-lg">Name</h2>
          <p className="text-xs leading-none mb-2">
            Community names including capitalization cannot be changed
          </p>
        </div>
        <div className="relative">
          <p className="absolute left-0 w-8 inset-y-0 text-sm grid place-items-center text-zinc-400">
            r/
          </p>
          <Input
            value={input}
            onChange={(e) => setInput(() => e.target.value)}
            className="pl-6"
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
