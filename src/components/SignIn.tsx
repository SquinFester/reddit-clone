"use client";

import Image from "next/image";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/lib/use-toast";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Sign in Error",
        description: "Could not sign in",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="text-black px-6 md:px-12 bg-white">
      <h1 className="text-2xl font-semibold mb-2">Sign In</h1>
      <p className="text-sm">
        By continuing, you are setting up a Reddit account and agree to our{" "}
        <span className="hover:underline text-sky-500 cursor-pointer">
          User Agreement
        </span>{" "}
        and{" "}
        <span className="hover:underline text-sky-500 cursor-pointer">
          Privacy Policy
        </span>
        .
      </p>
      <div className="mt-7 flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={loginWithGoogle}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {!isLoading && (
            <Image
              src="/google-logo.svg"
              width={1}
              height={1}
              alt="google logo"
              className="w-6 h-6 mr-2"
            />
          )}
          Continue with Google
        </Button>
      </div>
    </div>
  );
};
