"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="inset-0 fixed bg-black/20 flex justify-center items-center z-10">
      <div className="flex flex-col justify-center container max-w-2xl bg-white rounded-lg py-4">
        <div className="px-4 flex justify-end text-zinc-500 w-full">
          <X className="w-6 h-6 cursor-pointer" onClick={() => router.back()} />
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
