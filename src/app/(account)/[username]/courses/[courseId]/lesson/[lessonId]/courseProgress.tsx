"use client";

import { Progress } from "@/components/ui/progress";
import { lessonStore } from "@/store/lessonStore";
import { useEffect, useState } from "react";
import { BsFillFlagFill } from "react-icons/bs";

interface CourseProgressProps {
  username: string;
  courseId: string;
  lessonId: string;
}

export function CourseProgress({
  username,
  courseId,
  lessonId,
}: CourseProgressProps) {
  const [progress, setProgress] = useState(0);
  const { completedLessons } = lessonStore();

  useEffect(() => {
    // Fetch progress from the API
    async function fetchProgress() {
      try {
        const progressResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/get-progress?type=course&id=${courseId}`
        );
        const data = await progressResponse.json();

        setProgress(data.progressPercentage);
      } catch (error: any) {
        throw error;
      }
    }

    fetchProgress();
  }, [username, courseId, lessonId, completedLessons]);

  return (
    <section className="w-full mb-2">
      <p className="text-sm font-medium text-main">{progress}% complete</p>
      <ul className="w-full flex items-end gap-2">
        <Progress
          value={progress}
          className="w-full h-[.2rem] bg-main/20 mb-[.3rem]"
        />
        <BsFillFlagFill className="h-6 text-main" />
      </ul>
    </section>
  );
}
