import LessonPlayerLoader from "@/components/main/loaders/lessonPlayerLoader";
import LessonInfo from "./lessonInfo";

import { Suspense } from "react";
import LessonPlayer from "./lessonPlayer";

interface LessonItemProps {
  courseId: string;
  lessonId: string;
}

const Lesson: React.FC<LessonItemProps> = ({ courseId, lessonId }) => {
  return (
    <section className="w-full">
      <article className="aspect-video">
        <Suspense fallback={<LessonPlayerLoader />}>
          <LessonPlayer courseId={courseId} lessonId={lessonId} />
        </Suspense>
      </article>
    </section>
  );
};

export default Lesson;
