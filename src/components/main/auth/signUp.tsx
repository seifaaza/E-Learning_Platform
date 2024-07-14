import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsPlusLg } from "react-icons/bs";
import { userStore } from "@/store/userStore";
import { Loader2 } from "lucide-react";
import { mainStore } from "@/store/mainStore";

// Validation functions
const validateUsername = (username: string) => {
  if (username && (username.length < 6 || username.length > 16)) {
    return "Username must be between 6 and 16 characters.";
  }
  return "";
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    return "Please enter a valid email.";
  }
  return "";
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (password && !passwordRegex.test(password)) {
    return "Password must be at least 8 characters long, include a number, an uppercase and a lowercase letter.";
  }
  return "";
};

function useFormValidity() {
  const { username, email, password, setErrors } = userStore();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
    });

    setIsFormValid(
      !!username &&
        !!email &&
        !!password &&
        !usernameError &&
        !emailError &&
        !passwordError
    );
  }, [username, email, password, setErrors]);

  return isFormValid;
}

function SignUp() {
  const {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    signUp,
    isLoading,
    resetForm,
    errors,
  } = userStore();

  const { setSignUpOpen } = mainStore();
  const isFormValid = useFormValidity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(username, email, password);

    let { errors } = userStore.getState();
    if (!errors.server) {
      resetForm();
      setSignUpOpen(false);
    }
  };
  return (
    <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px] bg-gray-900 border-none">
      <DialogHeader>
        <DialogTitle className="capitalize text-white mb-4">
          Sign up to your account
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 py-4">
          <div>
            <Label htmlFor="username" className="text-gray-200">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="mt-2 bg-gray-950/30 border-none focus-visible:ring-offset-0 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-2 ml-1">
                {errors.username}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-2 bg-gray-950/30 border-none focus-visible:ring-offset-0 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-2 ml-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-2 bg-gray-950/30 border-none focus-visible:ring-offset-0 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-2 ml-1">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm text-red-500 mt-1 ml-1">{errors.server}</p>

        <DialogFooter>
          <Button
            type="submit"
            variant="secondary"
            className="capitalize"
            disabled={!isFormValid || isLoading}
          >
            Sign Up
            {isLoading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <BsPlusLg className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default SignUp;
