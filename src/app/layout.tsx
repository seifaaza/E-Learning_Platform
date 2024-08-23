import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/sessionProvider";
import Providers from "@/components/main/ProgressBarProvider";
import authOptions from "./api/auth/nextAuthOptions";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Learnify",
  description: "E-learning platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions); // Pass authOptions here
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
