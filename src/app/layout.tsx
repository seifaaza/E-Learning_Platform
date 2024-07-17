import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/sessionProvider";
import Providers from "@/components/main/ProgressBarProvider";
import Navbar from "@/components/main/navbar/page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the path as needed

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
          <Navbar />
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
