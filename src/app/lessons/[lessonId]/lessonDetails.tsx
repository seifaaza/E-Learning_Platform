import ItemContent from "@/components/main/itemContent";
import axios from "axios";
import { redirect } from "next/navigation";

interface LessonDetailsProps {
  lessonId: string;
}

const LessonDetails: React.FC<LessonDetailsProps> = async ({ lessonId }) => {
  const fetchLessonById = async (id: string) => {
    try {
      const response = await axios.get(
        `https://learnify-demo.vercel.app/api/lessons/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        redirect("/lessons");
      } else {
        throw error;
      }
    }
  };

  const lesson = await fetchLessonById(lessonId);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {lesson && (
        <ItemContent
          img={lesson.img}
          videoSrc={lesson.src}
          title={lesson.title}
          description={lesson.description}
          source={lesson.source}
          pausedTime={10}
          tags={lesson.tags}
          language={lesson.language}
          date={formatDate(lesson.created_at)}
        />
      )}
    </>
  );
};

export default LessonDetails;
