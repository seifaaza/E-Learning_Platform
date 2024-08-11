import axios from "axios";
import LessonPlayer from "./lessonPlayer";
import LessonsControl from "./lessonsControl";
import LessonPlayerLoader from "@/components/main/loaders/lessonPlayerLoader";
import LessonsListLoader from "@/components/main/loaders/lessonsListLoader";
import { Suspense } from "react";
import LessonInfo from "./lessonInfo";

interface LessonItemProps {
  courseId: string;
  lessonId: string;
  initialLessonId: string;
  lessonsCount: number;
  lessonIds: string[];
}

const Lesson: React.FC<LessonItemProps> = async ({
  courseId,
  lessonId,
  initialLessonId,
  lessonIds,
}) => {
  const fetchLessonById = async (courseId: string, lessonId: string) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/courses/${courseId}?lesson=${
          lessonId || initialLessonId
        }`
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };

  const lesson = await fetchLessonById(courseId, lessonId);

  return (
    <section className="w-full ">
      <article className="aspect-video">
        <LessonPlayer
          title={lesson.title}
          thumbnail={lesson.thumbnail}
          video={lesson.video}
          index={lesson.index}
          lessonsCount={lessonIds.length}
        />
        <LessonsControl
          title={lesson.title}
          index={lesson.index}
          courseId={courseId}
          lessonIds={lessonIds}
        />
        <LessonInfo />
      </article>
    </section>
  );
};

export default Lesson;
