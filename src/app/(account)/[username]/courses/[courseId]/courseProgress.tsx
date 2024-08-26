"use client";

import { Progress } from "@/components/ui/progress";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface CourseProgressProps {
  username: string;
  courseId: string;
}

export function CourseProgress({ username, courseId }: CourseProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch progress from the API
    async function fetchProgress() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/get-progress?courseId=${courseId}`
        );
        const data = await response.json();

        if (response.ok) {
          setProgress(data.progressPercentage);
        } else {
          console.error(data.errorMsg || "Failed to fetch progress");
        }
      } catch (error: any) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 500)
        ) {
          notFound();
        } else {
          throw error;
        }
      }
    }

    fetchProgress();
  }, [username, courseId]);

  return (
    <section className="w-full mb-2">
      <p className="text-sm font-medium text-main mb-2">{progress}% complete</p>
      <Progress value={progress} className="w-full h-[.2rem] bg-main/20" />
    </section>
  );
}
