"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export function CourseProgress() {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(25), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="text-right w-full">
      <p className="text-sm font-medium text-blue-600 mb-2">
        {progress}% complete
      </p>
      <Progress value={progress} className="w-full h-1 bg-blue-200" />;
    </section>
  );
}
