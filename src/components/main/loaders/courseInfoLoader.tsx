import { Skeleton } from "@/components/ui/skeleton";

const CourseInfoLoader = () => {
  return (
    <>
      <ul className="w-full mt-4 xl:mt-6 mb-2 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
        <li className="h-fit w-full md:w-1/2 lg:w-1/3 flex flex-col gap-4 lg:gap-6">
          <Skeleton className="aspect-video bg-main/10 rounded-lg" />
          <ul className="flex flex-wrap lg:justify-between items-center gap-4 sm:gap-3">
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
          </ul>
        </li>
        <li className="flex flex-col gap-6">
          <Skeleton className="w-44 h-5 bg-main/10 rounded-lg" />
          <article className="flex flex-col gap-4">
            <Skeleton className="w-20 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-72 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="mt-4 w-32 h-5 bg-main/10 rounded-lg" />
          </article>
        </li>
      </ul>
      <Skeleton className="my-6 mx-auto w-44 h-5 bg-main/10 rounded-lg mt-16" />
    </>
  );
};

export default CourseInfoLoader;
