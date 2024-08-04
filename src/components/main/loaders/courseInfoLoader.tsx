import { Skeleton } from "@/components/ui/skeleton";

const CourseInfoLoader = () => {
  return (
    <div className=" mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-3 lg:w-2/3 ">
      <Skeleton className="w-1/6 h-5 bg-blue-100" />
      <Skeleton className="w-3/4 h-5 bg-blue-100" />
    </div>
  );
};

export default CourseInfoLoader;
