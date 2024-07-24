import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsPlusLg } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// Validation function for email
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    return "Please enter a valid email.";
  }
  return "";
};

function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    server?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emailError = validateEmail(email);

    setErrors({
      email: emailError,
    });
  }, [email]);

  const isFormValid = !!email && !!password && !errors.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      setErrors({ server: "Email or password incorrect" });
    } else if (response?.ok) {
      // Reset form and close the dialog on successful sign in
      setEmail("");
      setPassword("");
      setErrors({});
      router.replace("/courses");

      // Show the toast notification on successful sign in
      toast({
        title: "Welcome Back",
        description: "You have successfully signed in",
      });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 py-4">
        <div>
          <Label htmlFor="email" className="text-blue-100">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2 bg-blue-800/50 border-none focus-visible:ring-offset-0 focus-visible:ring-0 text-white placeholder:text-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-red-200 mt-2 ml-1">{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="text-blue-100">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mt-2 bg-blue-800/50 border-none focus-visible:ring-offset-0 focus-visible:ring-0 text-white placeholder:text-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <p className="text-sm text-red-200 mt-1 ml-1">{errors.server}</p>

      <DialogFooter>
        <Button
          disabled={!isFormValid || isLoading}
          type="submit"
          variant="secondary"
          className="capitalize"
        >
          Sign In
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

export default SignInForm;
