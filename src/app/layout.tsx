import { Navbar } from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/Toaster";
import { Provider } from "@/components/Provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className="bg-secondaryBg text-black">
          <Navbar />
          {authModal}

          <div className="container mx-auto max-w-7xl">{children}</div>
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
