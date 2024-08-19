"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import HeaderContent from "./headerContent";
import BodyContent from "./bodyContent";
import FooterContent from "./footerContent";
import { mainStore } from "@/store/mainStore";

interface ProfileProps {
  id: string | null | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  signOut: () => void;
}

const Profile: React.FC<ProfileProps> = ({ id, username, email, signOut }) => {
  const separator = (
    <Separator
      orientation="horizontal"
      className="w-full h-[2px] bg-blue-800 my-10 rounded-sm"
    />
  );
  const { isSheetOpen, setSheetOpen } = mainStore();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild className="cursor-pointer">
        <Avatar className="relative after:absolute after:w-full after:h-full after:border-2 after:border-blue-400 after:rounded-full after:top-0 after:left-0">
          <AvatarFallback className="capitalize text-blue-600">
            {username && username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>

      <SheetContent className="md:!max-w-xs bg-blue-700 !border-0 px-8 py-4 md:px-10 md:py-6 lg:px-12 lg:py-8  flex flex-col justify-between">
        <section>
          <HeaderContent username={username} email={email} signOut={signOut} />
          {separator}
          <BodyContent username={username} />
          {separator}
        </section>
        <FooterContent username={username} signOut={signOut} />
      </SheetContent>
    </Sheet>
  );
};

export default Profile;
