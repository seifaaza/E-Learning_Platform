import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ListLoader = ({ count = 9 }) => {
  const skeletonClass =
    "w-full h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 rounded-lg bg-gray-300";

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={skeletonClass} />
      ))}
    </>
  );
};

export default ListLoader;
