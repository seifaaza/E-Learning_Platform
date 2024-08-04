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
      <section className="mt-4 flex flex-row items-center justify-start gap-4">
        <BsPersonCircle className="text-white text-[2.8rem] min-w-[2.8rem] opacity-80" />
        <article className="text-left w-full">
          <SheetTitle className="text-lg md:text-xl text-white font-normal capitalize truncate !mb-0">
            {username}
          </SheetTitle>
          <SheetDescription className="text-base text-blue-100 truncate">
            {email}
          </SheetDescription>
        </article>
      </section>
      <Button
        disabled={isLoading}
        onClick={handleSignOut}
        className=" capitalize w-full focus:!ring-offset-0 outline-none text-blue-600"
        variant="secondary"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 animate-spin" />
        ) : (
          <BsBoxArrowRight className="mr-2 h-5" />
        )}
        Logout
      </Button>
    </SheetHeader>
  );
};

export default HeaderContent;
