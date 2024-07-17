import ItemContent from "@/components/main/itemContent";
import axios from "axios";

interface LessonDetailsProps {
  lessonId: string;
}

const LessonDetails: React.FC<LessonDetailsProps> = async ({ lessonId }) => {
  const fetchLessonById = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/api/lessons/${id}`);
    return response.data;
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
          pausedTime={lesson.pausedTime || 0}
          tags={lesson.tags}
          language={lesson.language}
          date={formatDate(lesson.created_at)}
        />
      )}
    </>
  );
};

export default LessonDetails;
