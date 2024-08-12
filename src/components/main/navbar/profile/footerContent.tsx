import { Button } from "@/components/ui/button";
import { BsXLg, BsCheck2 } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
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
  signOut: () => void;
}

const FooterContent: React.FC<FooterContentProps> = ({ id, signOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/deleteAccount/${id}`
      );

      signOut();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(
          error.response?.data?.errorMsg ||
            "An error occurred while deleting the account."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccountModal = (
    <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px] bg-blue-700 border-none rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-white text-base md:text-xl mb-2">
          Delete Account
        </DialogTitle>
        <DialogDescription className="text-white">
          <h6>
            Are you sure you want to delete your account? This action cannot be
            undone and you will lose all your data associated with this account.
          </h6>
          {error && <h6 className="text-red-200 font-medium mt-2">{error}</h6>}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="secondary"
          className="capitalize text-blue-600"
          onClick={handleDeleteAccount}
          disabled={isLoading}
        >
          Confirm
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <BsCheck2 className="ml-2 h-5" />
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex justify-center capitalize text-white !bg-blue-600 hover:!bg-blue-800/50 duration-300">
          <BsXLg className="mr-2 pb-[1px] h-4" />
          <span>delete account</span>
        </Button>
      </DialogTrigger>
      {deleteAccountModal}
    </Dialog>
  );
};

export default FooterContent;