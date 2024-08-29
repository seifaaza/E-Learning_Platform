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
    <section className="bg-blue-50 min-h-[calc(100vh-56px)]">
      <article className="container px-3 xl:px-8 pt-6 pb-20">
        <BackButton />
        <Suspense fallback={<CourseInfoLoader />}>
          <CourseData courseId={courseId} />
        </Suspense>
      </article>
    </section>
  );
};

export default CourseItem;
