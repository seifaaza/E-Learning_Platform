"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsBoxArrowInRight } from "react-icons/bs";

function SignIn() {
  const SignInForm = (
    <form>
      <div className="grid gap-5 py-4">
        <div>
          <Label htmlFor="email" className="text-gray-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter you Email"
            className="mt-2 bg-gray-950/30 border-none focus-visible:ring-offset-0 text-white"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-gray-200">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter you Password"
            className="mt-2 bg-gray-950/30 border-none focus-visible:ring-offset-0 text-white"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" variant="secondary" className="capitalize">
          sign in
          <BsBoxArrowInRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogFooter>
    </form>
  );
  return (
    <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px] bg-gray-900 border-none ">
      <DialogHeader>
        <DialogTitle className="capitalize text-white mb-4">
          sign in to your account
        </DialogTitle>
      </DialogHeader>
      {SignInForm}
    </DialogContent>
  );
}

export default SignIn;
