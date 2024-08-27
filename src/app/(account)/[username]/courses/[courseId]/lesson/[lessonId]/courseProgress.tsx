"use client";

import { Progress } from "@/components/ui/progress";
import { lessonStore } from "@/store/lessonStore";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  useEffect(() => {
    // Fetch progress from the API
    async function fetchProgress() {
      try {
        const progressResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/get-progress?courseId=${courseId}`
        );
        const data = await progressResponse.json();

        setProgress(data.progressPercentage);
      } catch (error: any) {
        if (
          error.progressResponse &&
          (error.progressResponse.status === 404 ||
            error.progressResponse.status === 500)
        ) {
          notFound();
        } else {
          throw error;
        }
      }
    }

    fetchProgress();
  }, [username, courseId, lessonId, completedLessons]);

  return (
    <section className="w-full mb-2">
      <p className="text-sm font-medium text-main mb-2">{progress}% complete</p>
      <Progress value={progress} className="w-full h-[.2rem] bg-main/20" />
    </section>
  );
}
