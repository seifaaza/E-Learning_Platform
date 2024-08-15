import { Separator } from "@radix-ui/react-separator";
import LessonControl from "./lessonControl";
import { notFound } from "next/navigation";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}?lesson=${lessonId}`
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

  const topicsList = lesson.topics.map((item: string, index: number) => (
    <Badge
      key={index}
      className="rounded-md !border-none !bg-blue-100 text-blue-800 text-sm p-2 w-fit font-normal capitalize"
    >
      {item}
    </Badge>
  ));

  return (
    <>
      <h3 className="text-blue-600">
        Lesson {lesson.index}: {lesson.title}
      </h3>
      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex flex-col gap-1">
        <h5 className=" text-gray-900 font-medium">About This Lesson</h5>
        <h6 className="text-gray-700">{lesson.description}</h6>
      </article>
      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex flex-col gap-1">
        <h5 className=" text-gray-900 font-medium">Topics</h5>
        <ul className="flex flex-wrap gap-2 md:gap-3">{topicsList}</ul>
      </article>
      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex flex-col gap-1">
        <h5 className=" text-gray-900 font-medium">About This Lesson</h5>
        <h6 className="text-gray-700">{lesson.description}</h6>
      </article>
    </>
  );
};

export default LessonInfo;
