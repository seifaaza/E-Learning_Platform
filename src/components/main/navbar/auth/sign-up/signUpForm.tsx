import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsPlusLg } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const validateUsername = (username: string) => {
  const usernameRegex = /^[ \t]*(?!.*\s{2,})([a-zA-Z]{6,12})[ \t]*$/;
  if (username && !usernameRegex.test(username)) {
    return "Username must be between 8 and 12 letters long, with no spaces";
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

function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    server?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
    });
  }, [username, email, password]);

  const isFormValid =
    !!username &&
    !!email &&
    !!password &&
    !errors.username &&
    !errors.email &&
    !errors.password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    try {
      const response = await axios.post("/api/sign-up", {
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      });

      // Attempt to sign in after successful sign up
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInResponse?.error) {
        setErrors({ server: "Sign in failed after sign up." });
      } else {
        setUsername("");
        setEmail("");
        setPassword("");
        setErrors({});
        router.replace("/courses");
        toast({
          title: "Welcome To Learnify",
          description: "You have successfully signed up.",
        });
      }

      setIsLoading(false);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setErrors({ server: "Email or username already exists" });
        } else if (error.response?.status === 500) {
          setErrors({ server: "An error occurred. Please try again later." });
        } else {
          setErrors({ server: "An unexpected error occurred." });
        }
      } else {
        setErrors({ server: "Failed to sign up." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 py-4">
        <div>
          <Label htmlFor="username" className="text-base text-blue-100">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="mt-2 bg-blue-800/50 text-white placeholder:text-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <h6 className="text-red-100 font-medium  mt-2 ml-1">
              {errors.username}
            </h6>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="text-base text-blue-100">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2 bg-blue-800/50 text-white placeholder:text-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <h6 className="text-red-100 font-medium  mt-2 ml-1">
              {errors.email}
            </h6>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="text-base text-blue-100">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mt-2 bg-blue-800/50 text-white placeholder:text-blue-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <h6 className="text-red-100 font-medium  mt-2 ml-1">
              {errors.password}
            </h6>
          )}
        </div>
      </div>

      <h6 className="text-red-100 font-medium my-2 ml-1">{errors.server}</h6>

      <DialogFooter>
        <Button
          disabled={!isFormValid || isLoading}
          type="submit"
          variant="secondary"
          className="text-blue-600"
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
  );
}

export default SignUpForm;
