import { Suspense } from "react";
import LessonData from "./lessonData";
import CourseInfoLoader from "@/components/main/loaders/courseInfoLoader";

interface LessonItemProps {
  username: string;
  courseId: string;
  lessonId: string;
}

const Lesson: React.FC<LessonItemProps> = ({
  username,
  courseId,
  lessonId,
}) => {
  return (
    <Suspense fallback={<CourseInfoLoader />}>
      <LessonData username={username} courseId={courseId} lessonId={lessonId} />
    </Suspense>
  );
};

export default Lesson;
