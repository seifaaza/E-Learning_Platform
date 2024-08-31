"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsCheck2, BsXLg } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { lessonStore } from "@/store/lessonStore";

interface CancelCourseButtonProps {
  username: string;
  courseId: string;
}

const CancelCourseButton: React.FC<CancelCourseButtonProps> = ({
  username,
  courseId,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const clearCompletedLessons = lessonStore(
    (state) => state.clearCompletedLessons
  );

  const handleCancelCourse = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start?courseId=${courseId}`
      );
      router.push("/courses");
      clearCompletedLessons();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast({
          title: "Server Error",
          description:
            "Failed to cancel course. Please refresh the page or try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Server Error",
          description:
            "An error occurred on the server. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelCourseModal = (
    <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px]  border-none rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-gray-900 text-base md:text-xl mb-2">
          Cancel Course
        </DialogTitle>
        <DialogDescription className="text-gray-700">
          <h6>
            Are you sure you want to cancel this course? All your progress will
            be lost.
          </h6>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={handleCancelCourse}
          variant="destructive"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Cancelling...
              <Loader2 className="ml-2 h-4 animate-spin" />
            </>
          ) : (
            <>
              Confirm
              <BsCheck2 className="ml-2 h-5" />
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="hover:!no-underline !border-[1px] !text-red-600 !border-red-600 hover:!bg-red-600 hover:!text-white w-fit self-end"
        >
          Cancel Course
          <BsXLg className="ml-2 h-4" />
        </Button>
      </DialogTrigger>
      {cancelCourseModal}
    </Dialog>
  );
};

export default CancelCourseButton;
