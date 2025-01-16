import axios from "axios";
import LessonPlayer from "./lessonPlayer";
import CancelCourseButton from "./actions/cancelCourseButton";
import LessonInfo from "./lessonInfo";
import LessonArticles from "./lessonArticles";
import { Separator } from "@radix-ui/react-separator";
import { CourseProgress } from "./courseProgress";

// Define the type for the fetched
interface LessonDataProps {
  username: string;
  courseId: string;
  lessonId: string;
}

const LessonData: React.FC<LessonDataProps> = async ({
  username,
  courseId,
  lessonId,
}) => {
  const fetchLessonById = async (courseId: string, lessonId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start/${courseId}?lessonId=${lessonId}`
      );

      return response.data;
    } catch (error: any) {
      console.log(error);

      if (
        error.response &&
        (!lessonId ||
          error.response.status === 404 ||
          error.response.status === 500)
      ) {
        error();
      } else {
        throw error;
      }
    }
  };

  const lesson = await fetchLessonById(courseId, lessonId);

  return (
    <>
      <ul className="mt-4 xl:mt-6 flex flex-col gap-4 lg:gap-10 xl:gap-12 lg:flex-row lg:justify-between">
        <LessonPlayer
          username={username}
          courseId={courseId}
          lessonId={lessonId}
          video={lesson.video}
          thumbnail={lesson.thumbnail}
          title={lesson.title}
          index={lesson.currentLessonIndex}
          lessonsLength={lesson.lessonIds.length}
          lessonIds={lesson.lessonIds}
        />

        <section className="flex flex-col gap-2 xl:gap-5 lg:w-2/3">
          <CourseProgress
            username={username}
            courseId={courseId}
            lessonId={lessonId}
          />
          <LessonArticles articles={lesson.articles} />
          <CancelCourseButton username={username} courseId={courseId} />
        </section>
      </ul>
      <Separator
        orientation="vertical"
        className="h-[1px] bg-gray-800 opacity-20 my-8"
      />
      <LessonInfo
        description={lesson.description}
        objective={lesson.objective}
        topics={lesson.topics}
        tips={lesson.tips}
      />
    </>
  );
};

export default LessonData;
