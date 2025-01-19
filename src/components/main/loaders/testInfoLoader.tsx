import { Skeleton } from "@/components/ui/skeleton";

const TestInfoLoader = () => {
  return (
    <>
      <ul className="w-full mt-6 mb-2 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
        <li className="h-fit w-full sm:w-1/3 lg:w-1/6 flex flex-col gap-4 lg:gap-6">
          <Skeleton className="aspect-video sm:aspect-square bg-main/10 rounded-lg" />
        </li>

        <li className="flex flex-col gap-6 xl:ml-6">
          <Skeleton className="w-44 h-5 bg-main/10 rounded-lg" />
          <ul className="flex flex-col gap-4">
            <Skeleton className="w-20 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-72 h-5 bg-main/10 rounded-lg" />
          </ul>
          <ul className="flex flex-wrap lg:justify-between items-center gap-4">
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
            <Skeleton className="w-16 h-5 bg-main/10 rounded-lg" />
          </ul>
          <Skeleton className="mt-2 w-32 h-5 bg-main/10 rounded-lg" />
        </li>
        <li className="-order-1 md:order-none ml-auto self-start">
          <Skeleton className="w-28 h-10 bg-main/10 rounded-lg" />
        </li>
      </ul>
      <Skeleton className="my-6 mx-auto w-44 h-5 bg-main/10 rounded-lg mt-20" />
    </>
  );
};

export default TestInfoLoader;
