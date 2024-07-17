import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import LessonDetails from "./lessonDetails";
import { Suspense } from "react";
import DetailsLoader from "@/components/main/loaders/detailsLoader";

interface LessonItemProps {
  params: {
    lessonId: string;
  };
}

const LessonItem: React.FC<LessonItemProps> = ({ params: { lessonId } }) => {
  return (
    <section className="container px-3 xl:px-8 my-10">
      <Link href="/lessons" className="my-6">
        <Button>
          <BsChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="mt-6 flex flex-col gap-10 xl:gap-12 lg:flex-row lg:justify-between">
        <Suspense fallback={<DetailsLoader />}>
          <LessonDetails lessonId={lessonId} />
        </Suspense>
      </div>
    </section>
  );
};

export default LessonItem;
