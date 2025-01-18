import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface TestsListLoaderProps {
  count?: number; // Optional prop with a default value
}

const TestsListLoader: React.FC<TestsListLoaderProps> = ({ count = 1 }) => {
  return (
    <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
      {Array.from({ length: count }).map((_, index) => (
        <ul key={index} className="flex gap-4 xl:gap-5 ">
          <Skeleton
            key={index}
            className="aspect-square h-32 w-32 object-cover rounded-lg bg-main/10 even:delay-500"
          />
          <li className="flex flex-col gap-4 w-full">
            <Skeleton className="w-3/4 h-5 bg-main/10" />
            <Skeleton className="w-2/5 h-5 bg-main/10" />
            <Skeleton className="w-[35%] h-5 bg-main/10" />
            <Skeleton className="w-1/5 h-5 bg-main/10" />
          </li>
        </ul>
      ))}
    </ul>
  );
};

export default TestsListLoader;
