import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface CoursesListLoaderProps {
  count?: number; // Optional prop with a default value
}

const CoursesListLoader: React.FC<CoursesListLoaderProps> = ({ count = 1 }) => {
  return (
    <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  xl:gap-x-8">
      {Array.from({ length: count }).map((_, index) => (
        <ul key={index} className="flex flex-col gap-2">
          <Skeleton
            key={index}
            className="aspect-video w-full h-full object-cover rounded-lg bg-main/10 even:delay-500"
          />
          <Skeleton className="w-3/4 h-5 bg-main/10" />
          <Skeleton className="w-2/6 h-5 bg-main/10" />
        </ul>
      ))}
    </ul>
  );
};

export default CoursesListLoader;
