import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/main/navbar";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import Providers from "@/components/main/ProgressBarProvider";

export const metadata: Metadata = {
  title: "Learnify",
  description: "E-learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
