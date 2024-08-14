import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { Suspense } from "react";
import CourseInfoLoader from "@/components/main/loaders/courseInfoLoader";
import CourseInfo from "./courseInfo";
import Lesson from "./lesson/[lessonId]/page";
import { CourseProgress } from "./courseProgress";

interface CourseItemProps {
  params: {
    username: string;
    courseId: string;
  };
  searchParams: {
    lesson: string;
  };
}

const CourseItem: React.FC<CourseItemProps> = async ({
  params: { username, courseId },
  searchParams: { lesson },
}) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 xl:px-8 pt-2 pb-20">
        <Link href={`/${username}/courses`} className="block w-fit mt-6">
          <Button
            variant="link"
            className="!pl-[.65rem] hover:!no-underline !border-blue-600 border-[1px] hover:!bg-blue-600 hover:!text-white"
          >
            <BsChevronLeft className="mr-2 h-4" />
            Back
          </Button>
        </Link>
        <ul className="mt-4 flex flex-col gap-6 xl:gap-12 lg:flex-row lg:justify-between">
          <Lesson courseId={courseId} lessonId={lesson} />
          <section className=" mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-6 lg:w-2/3">
            <CourseProgress username={username} courseId={courseId} />
            <Suspense fallback={<CourseInfoLoader />}>
              <CourseInfo courseId={courseId} />
            </Suspense>
          </section>
        </ul>
      </article>
    </section>
  );
};

export default CourseItem;
