import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import { UserAvatarActions } from "./UserAvatarActions";

export const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <header className="py-2 bg-primaryBg border-b border-secondaryRd/20 w-full">
      <nav className="flex justify-between items-center mx-auto max-w-7xl container">
        <Link href="/">
          <Image
            src="/reddit-logo.svg"
            alt="logo"
            width={1}
            height={1}
            className="w-28 hidden md:block"
          />
          <Image
            src="/reddit-sm-logo.svg"
            alt="logo"
            width={1}
            height={1}
            className="w-8 md:hidden"
          />
        </Link>
        {session?.user ? (
          <UserAvatarActions
            user={{
              name: session.user.name || null,
              image: session.user.image || null,
              email: session.user.email || null,
            }}
          />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "outline",
              className:
                "bg-transparent text-secondaryRd outline-secondaryRd h-8",
            })}
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};
