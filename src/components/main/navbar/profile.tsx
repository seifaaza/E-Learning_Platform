"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BsBoxArrowRight, BsPersonCircle } from "react-icons/bs";

interface ProfileProps {
  username: string | null | undefined;
  email: string | null | undefined;
  signOut: () => void;
}

const Profile: React.FC<ProfileProps> = ({ username, email, signOut }) => {
  const profileContent = (
    <SheetHeader className="mb-8">
      <BsPersonCircle className="text-white mx-auto text-8xl lg:text-9xl opacity-40 my-3 mt-6 xl:mt-8" />
      <SheetTitle className="text-white font-normal text-center text-xl md:text-2xl capitalize">
        {username}
      </SheetTitle>
      <SheetDescription className="text-gray-400 text-center text-sm md:text-lg">
        {email}
      </SheetDescription>
    </SheetHeader>
  );

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarFallback className="capitalize">
            {username && username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 !border-0" autoFocus={false}>
        {profileContent}
        <SheetFooter>
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="capitalize mx-auto focus:!ring-offset-0"
          >
            Logout
            <BsBoxArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Profile;
