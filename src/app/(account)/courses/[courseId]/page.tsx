import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { Suspense } from "react";
import CourseInfoLoader from "@/components/main/loaders/courseInfoLoader";
import axios from "axios";

import Lesson from "./lesson/[lessonId]/page";
import { notFound } from "next/navigation";
import { CourseProgress } from "./courseProgress";
import CourseInfo from "./courseInfo";

interface CourseItemProps {
  params: {
    courseId: string;
  };
  searchParams: {
    lesson?: string;
  };
}

const CourseItem: React.FC<CourseItemProps> = async ({
  params: { courseId },
  searchParams: { lesson },
}) => {
  const fetchCourseById = async (courseId: string) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/courses/${courseId}`
      );
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 500)
      ) {
        notFound();
      } else {
        throw error;
      }
    }
  };

  const course = await fetchCourseById(courseId);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="bg-blue-50">
      <article className="container px-3 xl:px-8 pt-2 pb-20">
        <Link href="/courses" className="block w-fit mt-6">
          <Button
            variant="link"
            className="!pl-[.65rem] hover:!no-underline !border-blue-600 border-[1px] hover:!bg-blue-600 hover:!text-white"
          >
            <BsChevronLeft className="mr-2 h-4" />
            Back
          </Button>
        </Link>
        <ul className="mt-4 flex flex-col gap-6 xl:gap-12 lg:flex-row lg:justify-between">
          {course ? (
            <>
              {lesson && (
                <Lesson
                  lessonId={lesson}
                  courseId={courseId}
                  initialLessonId={course.lessonIds[0]}
                  lessonsCount={course.lessonsCount}
                  lessonIds={course.lessonIds}
                />
              )}

              <section className=" mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-6 lg:w-2/3">
                <Suspense fallback={<CourseInfoLoader />}>
                  <>
                    <CourseProgress />
                    <CourseInfo
                      title={course.title}
                      language={course.language}
                      date={formatDate(course.created_at)}
                      description={course.description}
                      source={course.source}
                      creator={course.creator}
                      tags={course.tags}
                    />
                  </>
                </Suspense>
              </section>
            </>
          ) : (
            <p>No course details available.</p>
          )}
        </ul>
      </article>
    </section>
  );
};

export default CourseItem;
