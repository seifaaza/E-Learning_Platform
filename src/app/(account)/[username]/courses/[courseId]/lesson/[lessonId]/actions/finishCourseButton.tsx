"use state";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { lessonStore } from "@/store/lessonStore";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { BsChevronRight, BsFillLockFill } from "react-icons/bs";
import { mainStore } from "@/store/mainStore";

interface FinishCourseButtonProps {
  isNextDisabled: boolean;
  username: string;
  courseId: string;
}

const FinishCourseButton: React.FC<FinishCourseButtonProps> = ({
  isNextDisabled,
  username,
  courseId,
}) => {
  const isLoading = lessonStore((state) => state.isLoading);
  const setLoading = lessonStore((state) => state.setLoading);
  const clearCompletedLessons = lessonStore(
    (state) => state.clearCompletedLessons
  );

  const { setDialogOpen } = mainStore();

  const handleFinishCourse = async () => {
    setLoading(true);

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/complete-course?courseId=${courseId}`
      );
      clearCompletedLessons();
      setDialogOpen(true); // Open the modal when course is completed successfully
    } catch (error) {
      console.error("Error finishing course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ul>
            {isNextDisabled ? (
              <Button disabled className="hover:!bg-main brightness-90">
                Finish
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 animate-spin" />
                ) : (
                  <BsFillLockFill className="ml-2 h-4" />
                )}
              </Button>
            ) : (
              <Button
                onClick={handleFinishCourse}
                className="hover:!bg-main brightness-90"
              >
                Finish
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 animate-spin" />
                ) : (
                  <BsChevronRight className="ml-2 h-4" />
                )}
              </Button>
            )}
          </ul>
        </TooltipTrigger>
        <TooltipContent side="top">
          <h6 className="text-main">
            {isNextDisabled
              ? "Complete the current video to finish your last lesson"
              : "Finish your last lesson"}
          </h6>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FinishCourseButton;