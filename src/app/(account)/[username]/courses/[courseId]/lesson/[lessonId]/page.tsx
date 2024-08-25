import { Suspense } from "react";
import LessonData from "./lessonData";
import LessonLoader from "@/components/main/loaders/lessonLoader";

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
    <Suspense fallback={<LessonLoader />}>
      <LessonData username={username} courseId={courseId} lessonId={lessonId} />
    </Suspense>
  );
};

export default Lesson;
