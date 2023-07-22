import { SignIn } from "@/components/SignIn";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="max-w-2xl flex flex-col w-full mx-auto bg-white py-4 mt-5 rounded-lg gap-8">
      <Link href="/" className="px-4 flex items-center text-zinc-500 w-fit">
        <ChevronLeft className="w-6 h-6 " />
        <p>Home</p>
      </Link>

      <SignIn />
    </div>
  );
};
export default page;
