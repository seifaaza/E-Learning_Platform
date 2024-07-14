"use client";

import React from "react";
import Link from "next/link";
import {
  BsBoxArrowInRight,
  BsPlusLg,
  BsPersonCircle,
  BsBoxArrowRight,
} from "react-icons/bs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import SignIn from "@/components/main/auth/signIn";
import SignUp from "@/components/main/auth/signUp";
import { mainStore } from "@/store/mainStore"; // Import the main store
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Navbar() {
  const { isSignUpOpen, setSignUpOpen } = mainStore();
  const isAuth = false;

  const profileContent = (
    <SheetHeader className="mb-8">
      <BsPersonCircle className="text-white mx-auto text-8xl lg:text-9xl opacity-40 my-3 mt-6" />
      <SheetTitle className="text-white font-normal text-center text-xl md:text-2xl">
        Seifeddine AAZA
      </SheetTitle>
      <SheetDescription className="text-gray-400 text-center text-sm md:text-lg">
        seifeddine.aaza@gmail.com
      </SheetDescription>
    </SheetHeader>
  );

  const profileAvatar = (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarFallback>Se</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 !border-0">
        {profileContent}
        <SheetFooter>
          <Button variant="destructive" className="capitalize mx-auto">
            Logout
            <BsBoxArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  const account = (
    <div className="flex gap-4">
      <Dialog open={isSignUpOpen} onOpenChange={setSignUpOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="capitalize">
            Sign Up
            <BsPlusLg className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <SignUp />
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="capitalize text-white">
            Sign In
            <BsBoxArrowInRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <SignIn />
      </Dialog>
    </div>
  );

  const navbarContent = (
    <div className="flex justify-center items-center gap-2">
      <Link href="/lessons">
        <Button
          variant="link"
          className="capitalize text-white hover:no-underline hover:opacity-80"
        >
          Lessons
        </Button>
      </Link>
      <Separator orientation="vertical" className="h-8 w-[.5px]" />
      <Link href="/watching">
        <Button
          variant="link"
          className="capitalize text-white hover:no-underline hover:opacity-80"
        >
          Watching
        </Button>
      </Link>
    </div>
  );

  return (
    <header className="bg-black border-b-[1px] !border-gray-800 sticky top-0 z-10">
      <nav className="container px-4 lg:px-6 py-2.5 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            height={40}
            width={40}
            alt="Flowbite Logo"
            className="select-none"
          />
        </Link>
        {isAuth ? navbarContent : ""}
        {isAuth ? profileAvatar : account}
      </nav>
    </header>
  );
}
