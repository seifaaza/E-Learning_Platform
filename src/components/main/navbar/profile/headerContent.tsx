import { Button } from "@/components/ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { BsBoxArrowRight, BsPersonCircle } from "react-icons/bs";

interface HeaderContentProps {
  username: string | null | undefined;
  email: string | null | undefined;
  signOut: () => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  username,
  email,
  signOut,
}) => {
  const [isLoading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SheetHeader className="gap-2">
      <section className="flex flex-row items-center justify-center gap-4">
        <BsPersonCircle className="text-white text-5xl opacity-80" />
        <article className="text-left">
          <SheetTitle className="text-white font-normal text-base md:text-lg capitalize">
            {username}
          </SheetTitle>
          <SheetDescription className="text-blue-100 text-sm md:text-base">
            {email}
          </SheetDescription>
        </article>
      </section>
      <Button
        disabled={isLoading}
        onClick={handleSignOut}
        className="capitalize w-full focus:!ring-offset-0 outline-none text-blue-600"
        variant="secondary"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 animate-spin" />
        ) : (
          <BsBoxArrowRight className="mr-2 h-4" />
        )}
        Logout
      </Button>
    </SheetHeader>
  );
};

export default HeaderContent;
