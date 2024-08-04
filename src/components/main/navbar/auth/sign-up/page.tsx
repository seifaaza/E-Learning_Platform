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
        <DialogTitle className="text-white text-base md:text-xl xl:text-2xl normal-case mb-0">
          Sign up to your account
        </DialogTitle>
      </DialogHeader>
      <SignUpForm />
    </DialogContent>
  );
};

export default SignUpModal;
