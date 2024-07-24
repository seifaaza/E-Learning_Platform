"use client";
import React from "react";
import Link from "next/link";
import Auth from "./auth";
import Links from "./links";
import { signOut, useSession } from "next-auth/react";
import useScroll from "./UseScroll";
import { Logo } from "../SVGs/logos";
import Profile from "./profile/page";

// Define the User type
interface User {
  id: string;
  username: string;
  email: string; // Add email to the user type
}

// Define the Session type
interface Session {
  user?: User;
}

export default function Navbar() {
  const { data: session } = useSession() as { data: Session | null };

  // Destructure session.user safely and ensure id is string or undefined
  const { id, username, email } = session?.user || {
    id: null,
    username: null,
    email: null,
  };

  const { scrollDirection } = useScroll();

  const navbarDisplay = {
    show: "visible duration-500",
    hide: "invisible -translate-y-full duration-500",
  };
  const navScrollAnim =
    scrollDirection === "down" ? navbarDisplay.show : navbarDisplay.hide;

  return (
    <header
      className={`      ${
        !session ? navScrollAnim : ""
      } min-h-[60px] bg-blue-600 sticky top-0 z-10`}
    >
      <nav className="container px-4 lg:px-6 py-2.5 flex justify-between items-center">
        <Link href="/">
          <Logo className="h-8" />
        </Link>

        {session && <Links username={username} />}
        {session ? (
          <Profile
            id={id}
            username={username}
            email={email}
            signOut={signOut}
          />
        ) : (
          <Auth />
        )}
      </nav>
    </header>
  );
}
