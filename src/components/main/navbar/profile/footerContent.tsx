import { Button } from "@/components/ui/button";
import { BsXLg, BsCheck2 } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FooterContentProps {
  id: string | null | undefined;
}

const FooterContent: React.FC<FooterContentProps> = ({ id }) => {
  const deleteAccountModal = (
    <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px] bg-blue-700 border-none rounded-lg">
      <DialogHeader>
        <DialogTitle className="capitalize text-white mb-4">
          delete account
        </DialogTitle>
        <DialogDescription className="text-white">
          Are you sure you want to delete your account? This action cannot be
          undone and you will lose all your data associated with this account.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="secondary" className="capitalize text-blue-600">
          Confirm
          <BsCheck2 className="ml-2 pb-[1px] h-5 w-5" />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex justify-start capitalize text-white !bg-blue-800 hover:!bg-blue-600 duration-300 ">
          <BsXLg className="mr-2 pb-[1px] h-4 " />
          <span>delete account</span>
        </Button>
      </DialogTrigger>
      {deleteAccountModal}
    </Dialog>
  );
};

export default FooterContent;
