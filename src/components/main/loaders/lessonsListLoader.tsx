import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface LessonsListLoaderProps {
  count?: number;
}

const LessonsListLoader: React.FC<LessonsListLoaderProps> = ({ count = 1 }) => {
  return (
    <ul className="w-full flex gap-2 md:gap-3 mt-2 md:mt-3">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-1/3 h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 rounded-lg bg-blue-100 even:delay-500"
        />
      ))}
    </ul>
  );
};

export default LessonsListLoader;
