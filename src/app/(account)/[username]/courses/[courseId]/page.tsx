import CourseCompleted from "./course-completion/page";
import Lesson from "./lesson/[lessonId]/page";
import BackButton from "@/components/main/backButton";

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
    <section className="bg-blue-50 min-h-[calc(100vh-56px)]">
      <article className="container px-3 xl:px-8 pt-6 pb-20">
        <BackButton />
        <Lesson username={username} courseId={courseId} lessonId={lesson} />
      </article>
      <CourseCompleted username={username} courseId={courseId} />
    </section>
  );
};

export default CourseItem;
