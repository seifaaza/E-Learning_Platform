import { Skeleton } from "@/components/ui/skeleton";

const LessonLoader = () => {
  return (
    <ul className="mt-4 xl:mt-6 flex flex-col gap-6 xl:gap-12 lg:flex-row lg:justify-between">
      <section className="w-full flex flex-col gap-2">
        <article className="aspect-video">
          <Skeleton className="w-16 h-5 bg-main/10 rounded-lg mb-2 xl:mb-4" />
          <Skeleton className="w-full aspect-video bg-main/10 rounded-lg " />
        </article>
      </section>

      <section className=" mt-4 lg:mt-0 flex flex-col gap-4 xl:gap-5 lg:w-2/3">
        <Skeleton className="self-end w-36 h-10 bg-main/10 rounded-lg " />
        <Skeleton className="mb-2 w-20 h-5 bg-main/10 rounded-lg " />
        <ul className="mt-6 flex flex-col gap-2 xl:gap-3">
          <li>
            <Skeleton className="mb-2 w-36 h-5 bg-main/10 rounded-lg " />
            <Skeleton className="mb-2 w-72 h-5 bg-main/10 rounded-lg " />
          </li>
          <li>
            <Skeleton className="mb-2 w-36 h-5 bg-main/10 rounded-lg " />
            <Skeleton className="mb-2 w-72 h-5 bg-main/10 rounded-lg " />
          </li>
        </ul>
      </section>
    </ul>
  );
};

export default LessonLoader;
