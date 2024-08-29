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
      console.log(response);

      if (
        response.error === "Incorrect password" ||
        response.error === "No user found with this email"
      ) {
        setErrors({ server: "Email or password incorrect" });
      } else {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: "Failed to sign in. Please try again later.",
        });
      }
    } else if (response?.ok) {
      // Reset form and close the dialog on successful sign in
      setEmail("");
      setPassword("");
      setErrors({});
      router.replace("/courses");

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
          <Label htmlFor="email" className="text-base text-blue-100">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2 bg-main text-white placeholder:text-white/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <h6 className="text-white font-medium mt-2 ml-1">{errors.email}</h6>
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
            className="mt-2 bg-main text-white placeholder:text-white/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <h6 className="text-white font-medium my-2 ml-1">{errors.server}</h6>

      <DialogFooter>
        <Button
          disabled={!isFormValid || isLoading}
          type="submit"
          variant="secondary"
          className="text-main"
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
