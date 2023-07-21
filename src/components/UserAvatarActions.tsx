"use client";
import { User } from "@prisma/client";
import { UserAvatar } from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { signOut } from "next-auth/react";

type UserAvatarActionsProps = {
  user: Pick<User, "name" | "image" | "email">;
};

export const UserAvatarActions = ({ user }: UserAvatarActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user.name,
            image: user.image,
          }}
          className="w-8 h-8 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-primaryBg text-secondaryRd"
      >
        <div className="flex flex-col justify-center space-y-1 leading-none p-2">
          {user.name && <p className="font-medium text-white">{user.name}</p>}
          {user.email && <p className="text-sm">{user.email}</p>}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: "/",
            });
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
