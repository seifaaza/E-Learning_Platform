import axios from "axios";
import LessonPlayer from "./lessonPlayer";
import LessonsList from "./lessonsList";
import LessonPlayerLoader from "@/components/main/loaders/lessonPlayerLoader";
import LessonsListLoader from "@/components/main/loaders/lessonsListLoader";
import { Suspense } from "react";

interface LessonItemProps {
  courseId: string;
  lessonId: string;
  initialLessonId: string;
  lessonsCount: number;
  otherLessons: string[];
}

const Lesson: React.FC<LessonItemProps> = async ({
  courseId,
  lessonId,
  initialLessonId,
}) => {
  const fetchLessonById = async (courseId: string, lessonId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/courses/${courseId}?lesson=${
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
      <div className="aspect-video">
        <Suspense fallback={<LessonPlayerLoader />}>
          <LessonPlayer
            title={lesson.title}
            thumbnail={lesson.thumbnail}
            video={lesson.video}
            index={lesson.index}
            lessonsCount={lesson.lessonsCount}
          />
        </Suspense>
        <Suspense fallback={<LessonsListLoader />}>
          <LessonsList courseId={courseId} otherLessons={lesson.otherLessons} />
        </Suspense>
      </div>
    </section>
  );
};

export default Lesson;
