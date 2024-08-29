"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import useScroll from "./UseScroll";
import { Logo } from "../SVGs/logos";
import Profile from "./profile/page";
import Auth from "./auth/page";
import Links from "./links";
import NavbarLoader from "../loaders/navbarLoader";

// Define the User type
interface User {
  id: string;
  username: string;
  email: string;
}

// Define the Session type
interface Session {
  user?: User;
}

export default function Navbar() {
  const { data: session, status } = useSession() as {
    data: Session | null;
    status: string;
  };
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    // Skip loading state on the home page
    if (status !== "loading" || pathname === "/") {
      setIsLoading(false);
    }
  }, [status, pathname]);

  const { scrollDirection } = useScroll();
  const navbarDisplay = {
    show: "visible duration-500",
    hide: "invisible -translate-y-full duration-500",
  };
  const navScrollAnim =
    scrollDirection === "down" ? navbarDisplay.show : navbarDisplay.hide;

  return (
    <header
      className={`${
        !session ? navScrollAnim : ""
      } min-h-14 bg-main sticky top-0 z-10`}
    >
      <nav className="container px-4 lg:px-6 py-2 h-14 flex justify-between items-center">
        <Link href="/">
          <Logo className="h-[1.9rem]" />
        </Link>

        {isLoading && pathname !== "/" ? (
          <NavbarLoader />
        ) : session ? (
          <>
            <Links username={session.user?.username || ""} />
            <Profile
              id={session.user?.id}
              username={session.user?.username}
              email={session.user?.email}
              signOut={signOut}
            />
          </>
        ) : (
          <Auth />
        )}
      </nav>
    </header>
  );
}
