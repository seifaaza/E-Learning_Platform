import React from "react";
import { Button } from "@/components/ui/button";
import { BsBoxArrowInRight, BsPlusLg } from "react-icons/bs";
import SignUpModal from "../auth/sign-up/page";
import SignInModal from "../auth/sign-in/page";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function Auth() {
  return (
    <ul className="flex gap-4">
      <li>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className=" capitalize text-main">
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
            <Button
              variant="ghost"
              className=" capitalize text-white hover:text-main"
            >
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
