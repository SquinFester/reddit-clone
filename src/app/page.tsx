import { buttonVariants } from "@/components/ui/Button";
import { HomeIcon, PenLine } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-7">
      <h1 className="text-2xl font-semibold">Your Feed</h1>
      <section className="grid grid-cols-1 md:grid-cols-3">
        <div className="mt-4 border border-secondaryRd rounded-lg bg-white divide-y overflow-hidden">
          <div className="bg-emerald-100 flex p-4 gap-1 font-semibold items-center md:text-xl">
            <HomeIcon className="w-4 h-4 md:w-5 md:h-5" />
            Home
          </div>
          <div className="p-4 flex flex-col gap-6">
            <p className="text-sm text-zinc-500">
              Your personal Reddit homepage. Come here to check it with your
              favorite communities
            </p>
            <Link
              href="/r/create"
              className={buttonVariants({
                className: "w-full flex gap-2",
              })}
            >
              <PenLine className="w-4 h-4" />
              Create Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
