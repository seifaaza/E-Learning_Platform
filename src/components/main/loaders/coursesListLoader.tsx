import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface CoursesListLoaderProps {
  count?: number; // Optional prop with a default value
}

const CoursesListLoader: React.FC<CoursesListLoaderProps> = ({ count = 1 }) => {
  return (
    <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  xl:gap-x-8">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-full h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 rounded-lg bg-blue-100 even:delay-500"
        />
      ))}
    </ul>
  );
};

export default CoursesListLoader;
