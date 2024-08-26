"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import { BsChevronLeft, BsChevronRight, BsFillLockFill } from "react-icons/bs";
import { lessonStore } from "@/store/lessonStore";

interface LessonControlProps {
  username: string;
  courseId: string;
  lessonId: string;
  index: number;
  lessonIds: string[];
}

const LessonControl: React.FC<LessonControlProps> = ({
  username,
  courseId,
  lessonId,
  index,
  lessonIds,
}) => {
  const completedLessons = lessonStore((state) => state.completedLessons);

  if (!lessonIds || lessonIds.length === 0) {
    notFound();
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkLessonCompletion = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/complete-lesson?courseId=${courseId}`
        );
        const completedLessonIds = new Set(response.data); // Response is an array of IDs

        completedLessonIds.forEach((id) => {
          lessonStore.getState().markLessonComplete(id);
        });
      } catch (error) {
        console.error("Failed to check lesson completion", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLessonCompletion();
  }, [lessonId]);

  // Find the index of the current lesson in the array
  const currentIndex = index - 1;

  // Get previous and next lesson IDs
  const prevLessonId = currentIndex > 0 ? lessonIds[currentIndex - 1] : null;
  const nextLessonId =
    currentIndex < lessonIds.length - 1 ? lessonIds[currentIndex + 1] : null;

  const isNextDisabled = !completedLessons.has(lessonId);

  return (
    <section className="flex gap-2 md:gap-3">
      {prevLessonId && (
        <Link
          href={`/${username}/courses/${courseId}?lesson=${prevLessonId}`}
          passHref
        >
          <Button
            variant="link"
            className="!pl-[.65rem] hover:!no-underline !border-main border-[1px] hover:!bg-main hover:!text-white"
          >
            <BsChevronLeft className="mr-2 h-4" />
            Previous
          </Button>
        </Link>
      )}

      {nextLessonId && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
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
              </div>
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
      )}
    </section>
  );
};

export default LessonControl;
