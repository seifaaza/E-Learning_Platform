import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CourseRatingLoader = () => {
  return (
    <ul className="w-fit mx-auto flex flex-col items-center text-center">
      <Skeleton className="w-52 h-5 bg-main/10 rounded-lg mb-8 mt-3" />
      <Skeleton className="w-44 h-5 bg-main/10 rounded-lg mb-12 xl:mb-14" />
      <Skeleton className="w-28 h-10 bg-main/10 rounded-lg" />
    </ul>
  );
};

export default CourseRatingLoader;
