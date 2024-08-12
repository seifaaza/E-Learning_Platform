import { Separator } from "@radix-ui/react-separator";
import LessonsControl from "./lessonsControl";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import axios from "axios";

// Define the type for the fetched
interface LessonInfoProps {
  courseId: string;
  lessonId: string;
}

const LessonInfo: React.FC<LessonInfoProps> = async ({
  courseId,
  lessonId,
}) => {
  const fetchLessonById = async (courseId: string, lessonId: string) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/courses/${courseId}?lesson=${lessonId}`
      );
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        (!lessonId ||
          error.response.status === 404 ||
          error.response.status === 500)
      ) {
        notFound();
      } else {
        throw error;
      }
    }
  };

  const lesson = await fetchLessonById(courseId, lessonId);
  return (
    <>
      <LessonsControl
        title={lesson.title}
        index={lesson.index}
        courseId={courseId}
        lessonIds={lesson.lessonIds}
      />
      <ul className="pt-4 flex flex-col gap-2">
        <Separator
          orientation="horizontal"
          className="h-[1px] bg-gray-800 opacity-15"
        />
        <article className="flex flex-col gap-1">
          <h5 className=" text-gray-900 font-medium">Description</h5>
          <h6 className="text-gray-700">{lesson.description}</h6>
        </article>
      </ul>
    </>
  );
};

export default LessonInfo;
