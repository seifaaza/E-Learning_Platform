import Lesson from "./lesson/[lessonId]/page";
import { CourseProgress } from "./courseProgress";
import CancelCourseButton from "./lesson/[lessonId]/actions/cancelCourseButton";
import BackButton from "@/components/main/backButton";
import LessonData from "./lesson/[lessonId]/lessonData";

interface CourseItemProps {
  params: {
    username: string;
    courseId: string;
  };
  searchParams: {
    lesson: string;
  };
}

const CourseItem: React.FC<CourseItemProps> = async ({
  params: { username, courseId },
  searchParams: { lesson },
}) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 xl:px-8 pt-6 pb-20">
        <BackButton />
        <Lesson username={username} courseId={courseId} lessonId={lesson} />
      </article>
    </section>
  );
};

export default CourseItem;
