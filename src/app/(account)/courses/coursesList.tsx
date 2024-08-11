import axios from "axios";
import Link from "next/link";
import Card from "@/components/main/card/page";
import DataNotFound from "@/components/main/errors/dataNotFound";

interface Course {
  _id: string;
  initialLessonId: string;
  thumbnail: string;
  title: string;
  description: string;
  action: string;
}

const CoursesList = async () => {
  let courses: Course[] = [];

  try {
    const response = await axios.get<Course[]>(
      `${process.env.API_URL}/api/courses`
    );
    courses = response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <>
      {courses && courses.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {courses.map((item) => (
            <Link
              key={item.title}
              href={`/courses/${item._id}?lesson=${item.initialLessonId}`}
            >
              <Card thumbnail={item.thumbnail} title={item.title} />
            </Link>
          ))}
        </ul>
      ) : (
        <DataNotFound text="Sorry, we cannot find any courses. Please check back later." />
      )}
    </>
  );
};

export default CoursesList;
