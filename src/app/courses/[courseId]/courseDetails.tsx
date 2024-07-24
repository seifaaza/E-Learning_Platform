import ItemContent from "@/components/main/itemContent";
import axios from "axios";
import { redirect } from "next/navigation";

interface CourseDetailsProps {
  courseId: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = async ({ courseId }) => {
  const fetchCourseById = async (id: string) => {
    try {
      const response = await axios.get(
        `https://learnify-demo.vercel.app/api/courses/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        redirect("/courses");
      } else {
        throw error;
      }
    }
  };

  const course = await fetchCourseById(courseId);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {course && (
        <ItemContent
          img={course.img}
          videoSrc={course.src}
          title={course.title}
          description={course.description}
          source={course.source}
          pausedTime={10}
          tags={course.tags}
          language={course.language}
          date={formatDate(course.created_at)}
        />
      )}
    </>
  );
};

export default CourseDetails;
