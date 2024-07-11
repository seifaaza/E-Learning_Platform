import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/main/navbar";

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
        {children}
      </body>
    </html>
  );
}
