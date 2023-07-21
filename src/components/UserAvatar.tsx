"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User as UserIcon } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage
          src={user.image}
          alt="user's avatar"
          referrerPolicy="no-referrer"
          className="aspect-square"
        />
      ) : (
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      )}
    </Avatar>
  );
};
