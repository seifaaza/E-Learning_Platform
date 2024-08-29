import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CompletedCourseLoader = () => {
  return (
    <ul className="w-full mt-4 mb-2 flex flex-col justify-center items-center sm:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
      <li className="h-fit w-full md:w-1/2 lg:w-1/3 flex flex-col">
        <Skeleton className="aspect-video bg-main/10 rounded-lg" />
      </li>
      <li className="flex flex-col gap-3 w-10/12 sm:w-1/2 xl:w-5/12">
        <Skeleton className="w-72 h-5 bg-main/10 rounded-lg my-4" />
        <Skeleton className="w-60 h-5 bg-main/10 rounded-lg" />
        <Skeleton className="w-48 h-5 bg-main/10 rounded-lg " />
        <ul className="flex gap-4 mt-3 xl:mt-5">
          <Skeleton className="w-36 h-10 bg-main/10 rounded-lg" />
          <Skeleton className="w-36 h-10 bg-main/10 rounded-lg" />
        </ul>
      </li>
    </ul>
  );
};

export default CompletedCourseLoader;
