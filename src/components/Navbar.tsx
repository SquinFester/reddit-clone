import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";

export const Navbar = () => {
  return (
    <header className="py-2 bg-primaryBg border-b border-secondaryRd/20 w-full">
      <nav className="flex justify-between items-center mx-auto max-w-7xl container">
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

        <Button
          asChild
          variant="outline"
          className="bg-transparent text-secondaryRd outline-secondaryRd h-8"
        >
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </nav>
    </header>
  );
};
