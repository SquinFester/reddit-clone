"use client";

import { Image, Link2 } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { Input } from "./ui/Input";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/Button";

const MiniPostCreator = ({
  image,
  subscribeExist,
}: {
  image: string | null;
  subscribeExist: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="bg-white w-full mt-5 pt-4 px-2 rounded-md border border-secondaryRd flex flex-col gap-2 md:flex-row md:pb-4">
      <div className="flex gap-2 justify-between items-center w-full">
        <div className="relative w-fit h-fit">
          <UserAvatar
            user={{
              image,
            }}
            className="w-8 h-8"
          />
          <span
            className="absolute bg-green-500 w-2 h-2 outline outline-[2px] outline-white rounded-full
        bottom-0 right-0
        "
          />
        </div>
        <Input
          placeholder="Create post"
          onClick={() => {
            subscribeExist
              ? router.push(`${pathname}/submit`)
              : router.push("/sign-in");
          }}
        />
      </div>
      <div className="flex items-center justify-end text-zinc-500">
        <Button
          onClick={() => {
            subscribeExist
              ? router.push(`${pathname}/submit`)
              : router.push("/sign-in");
          }}
          variant="ghost"
        >
          <Image />
        </Button>
        <Button
          onClick={() => {
            subscribeExist
              ? router.push(`${pathname}/submit`)
              : router.push("/sign-in");
          }}
          variant="ghost"
        >
          <Link2 />
        </Button>
      </div>
    </section>
  );
};
export default MiniPostCreator;
