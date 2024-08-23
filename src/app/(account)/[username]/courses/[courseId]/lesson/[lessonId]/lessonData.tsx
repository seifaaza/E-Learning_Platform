import { notFound } from "next/navigation";
import axios from "axios";
import LessonPlayer from "./lessonPlayer";
import CancelCourseButton from "./actions/cancelCourseButton";
import { CourseProgress } from "../../courseProgress";
import LessonInfo from "./lessonInfo";
import LessonArticles from "./lessonArticles";

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/started/${courseId}?lessonId=${lessonId}`
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

  console.log(lesson);

  return (
    <>
      <ul className="mt-4 xl:mt-6 flex flex-col gap-6 xl:gap-12 lg:flex-row lg:justify-between">
        <LessonPlayer
          video={lesson.video}
          thumbnail={lesson.thumbnail}
          title={lesson.title}
          index={lesson.currentLessonIndex}
          lessonsLength={lesson.lessonIds.length}
        />
        <section className=" mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-4 xl:gap-5 lg:w-2/3">
          <CancelCourseButton username={username} courseId={courseId} />
          <CourseProgress username={username} courseId={courseId} />
          <LessonArticles />
        </section>
      </ul>
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
