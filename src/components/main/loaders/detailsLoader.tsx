import { Skeleton } from "@/components/ui/skeleton";

const DetailsLoader = () => {
  return (
    <>
      <div className="w-full">
        <Skeleton className="aspect-video rounded-lg opacity-80" />
      </div>
      <div className="mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-3 lg:w-2/3 opacity-80">
        <Skeleton className="w-1/6 h-5" />
        <Skeleton className="w-3/4 h-5" />
      </div>
    </>
  );
};

export default DetailsLoader;
