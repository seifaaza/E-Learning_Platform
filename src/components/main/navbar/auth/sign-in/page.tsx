import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignInForm from "./signInForm";

const SignInModal = () => {
  return (
    <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px] bg-least border-none rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-white text-base md:text-xl xl:text-2xl normal-case mb-0">
          Sign in to your account
        </DialogTitle>
      </DialogHeader>
      <SignInForm />
    </DialogContent>
  );
};

export default SignInModal;
