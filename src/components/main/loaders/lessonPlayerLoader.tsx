import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LessonPlayerLoader = () => {
  return (
    <div className="w-full">
      <Skeleton className=" aspect-video rounded-lg bg-blue-100" />
    </div>
  );
};

export default LessonPlayerLoader;
