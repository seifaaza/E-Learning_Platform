import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignInForm from "./signInForm";

const SignInModal = () => {
  return (
    <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px] bg-gray-900 border-none">
      <DialogHeader>
        <DialogTitle className="capitalize text-white mb-4">
          Sign in to your account
        </DialogTitle>
      </DialogHeader>
      <SignInForm />
    </DialogContent>
  );
};

export default SignInModal;
