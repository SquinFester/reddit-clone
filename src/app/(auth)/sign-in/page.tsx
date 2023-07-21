import { SignIn } from "@/components/SignIn";
import { X } from "lucide-react";

const page = () => {
  return (
    <div className="max-w-2xl flex flex-col w-2/3 mx-auto bg-white py-4 mt-5 rounded-lg gap-8">
      <div className="flex w-full justify-end px-4">
        <X className="w-6 h-6 text-zinc-500 " />
      </div>
      <div className="px-12">
        <SignIn />
      </div>
    </div>
  );
};
export default page;
