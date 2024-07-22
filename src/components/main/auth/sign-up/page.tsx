import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignUpForm from "./signUpForm";
const SignUpModal = () => {
  return (
    <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px] bg-blue-700 border-none">
      <DialogHeader>
        <DialogTitle className="capitalize text-white mb-4">
          Sign up to your account
        </DialogTitle>
      </DialogHeader>
      <SignUpForm />
    </DialogContent>
  );
};

export default SignUpModal;
