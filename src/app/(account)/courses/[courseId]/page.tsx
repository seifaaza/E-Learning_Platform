import { Suspense } from "react";
import CourseInfoLoader from "@/components/main/loaders/courseInfoLoader";
import BackButton from "@/components/main/backButton";
import CourseData from "./courseData";

interface CourseItemProps {
  params: {
    courseId: string;
  };
}

const CourseItem: React.FC<CourseItemProps> = async ({
  params: { courseId },
}) => {
  return (
    <section className="bg-blue-50 ">
      <article className="container px-3 xl:px-8 pt-6 pb-20 min-h-[calc(100vh-56px)]">
        <BackButton />
        <Suspense fallback={<CourseInfoLoader />}>
          <CourseData courseId={courseId} />
        </Suspense>
      </article>
    </section>
  );
};

export default CourseItem;
