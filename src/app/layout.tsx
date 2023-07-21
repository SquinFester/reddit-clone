import { Navbar } from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-secondaryRd">
        <Navbar />
        <div className="container mx-auto max-w-7xl">{children}</div>
      </body>
    </html>
  );
}
