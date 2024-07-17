import { Button } from "@/components/ui/button";

import React from "react";
import { BsBoxArrowInRight, BsPlusLg } from "react-icons/bs";
import SignUpModal from "../auth/sign-up/page";
import SignInModal from "../auth/sign-in/page";
import { mainStore } from "@/store/mainStore";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function Auth() {
  const { isSignUpOpen, setSignUpOpen } = mainStore();
  return (
    <ul className="flex gap-4">
      <li>
        <Dialog open={isSignUpOpen} onOpenChange={setSignUpOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="capitalize">
              Sign Up
              <BsPlusLg className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <SignUpModal />
        </Dialog>
      </li>
      <li>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="capitalize text-white">
              Sign In
              <BsBoxArrowInRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <SignInModal />
        </Dialog>
      </li>
    </ul>
  );
}
