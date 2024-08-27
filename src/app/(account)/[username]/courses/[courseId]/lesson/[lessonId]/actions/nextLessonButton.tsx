import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { lessonStore } from "@/store/lessonStore";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { BsChevronRight, BsFillLockFill } from "react-icons/bs";

interface NextLessonButtonProps {
  isNextDisabled: boolean;
  username: string;
  courseId: string;
  nextLessonId: string;
}

const NextLessonButton: React.FC<NextLessonButtonProps> = ({
  isNextDisabled,
  username,
  courseId,
  nextLessonId,
}) => {
  const isLoading = lessonStore((state) => state.isLoading);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ul>
            {isNextDisabled ? (
              <Button disabled className="hover:!bg-main brightness-90">
                Next
                {isLoading ? (
                  <Loader2 className="ml-2 h-4 animate-spin" />
                ) : (
                  <BsFillLockFill className="ml-2 h-4" />
                )}
              </Button>
            ) : (
              <Link
                href={`/${username}/courses/${courseId}?lesson=${nextLessonId}`}
                passHref
              >
                <Button className="hover:!bg-main brightness-90">
                  Next
                  <BsChevronRight className="ml-2 h-4" />
                </Button>
              </Link>
            )}
          </ul>
        </TooltipTrigger>
        <TooltipContent side="top">
          <h6 className="text-main">
            {isNextDisabled
              ? "Complete the current video to unlock the next lesson."
              : "Proceed to the next lesson."}
          </h6>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NextLessonButton;
