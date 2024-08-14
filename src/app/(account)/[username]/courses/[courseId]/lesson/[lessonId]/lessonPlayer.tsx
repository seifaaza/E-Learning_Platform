import axios from "axios";
import { notFound } from "next/navigation";
import Player from "./player";

interface LessonPlayerProps {
  courseId: string;
  lessonId: string;
}

const LessonPlayer: React.FC<LessonPlayerProps> = async ({
  courseId,
  lessonId,
}) => {
  const fetchLessonById = async (courseId: string, lessonId: string) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/courses/${courseId}?lesson=${lessonId}`
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

  return (
    <>
      <p className="text-sm text-gray-700 mr-2 text-right mb-2">
        Lesson {lesson.index} of {lesson.lessonIds.length}
      </p>
      <Player
        src={`https://res.cloudinary.com/depztpide/video/upload/${lesson.video}`}
      />
    </>
  );
};

export default LessonPlayer;
