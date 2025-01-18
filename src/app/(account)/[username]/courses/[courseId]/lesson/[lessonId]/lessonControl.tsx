"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";
import { lessonStore } from "@/store/lessonStore";
import NextLessonButton from "./actions/nextLessonButton";
import FinishCourseButton from "./actions/finishCourseButton";
import GoToQuizButton from "./actions/goToQuizButton";
import { Loader2 } from "lucide-react";

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
  const setLoading = lessonStore((state) => state.setLoading);
  const [isCertified, setIsCertified] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [testId, setTestId] = useState<string>("");
  useEffect(() => {
    if (!lessonIds || lessonIds.length === 0) {
      notFound();
    }

    const checkLessonCompletion = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/complete-lesson?courseId=${courseId}`
        );
        const completedLessonIds = response.data.completedLessonIds;
        setIsCertified(response.data.isCertified);
        response.data.isCertified && setTestId(response.data.test);

        completedLessonIds.forEach((id: string) => {
          lessonStore.getState().markLessonComplete(id);
        });
      } catch (error) {
        console.error("Failed to check lesson completion", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
        setInitialLoading(false); // Set loading state to false after data is fetched
      }
    };

    checkLessonCompletion();
  }, [lessonIds, courseId, username, setLoading]);

  // Find the index of the current lesson in the array
  const currentIndex = index - 1;

  // Get previous and next lesson IDs
  const prevLessonId = currentIndex > 0 ? lessonIds[currentIndex - 1] : null;
  const nextLessonId =
    currentIndex < lessonIds.length - 1 ? lessonIds[currentIndex + 1] : null;

  const isNextDisabled = !completedLessons.includes(lessonId); // Check inclusion in array

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

      {initialLoading ? (
        <Button disabled className="hover:!bg-main brightness-90">
          Loading...
          <Loader2 className="ml-2 h-4 animate-spin" />
        </Button>
      ) : nextLessonId ? (
        <NextLessonButton
          isNextDisabled={isNextDisabled}
          username={username}
          courseId={courseId}
          nextLessonId={nextLessonId}
        />
      ) : isCertified ? (
        <GoToQuizButton
          isNextDisabled={isNextDisabled}
          username={username}
          testId={testId}
        />
      ) : (
        <FinishCourseButton
          isNextDisabled={isNextDisabled}
          username={username}
          courseId={courseId}
        />
      )}
    </section>
  );
};

export default LessonControl;
