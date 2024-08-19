import axios from "axios";
import Link from "next/link";
import Card from "@/components/main/card/page";
import DataNotFound from "@/components/main/errors/dataNotFound";

interface Course {
  _id: string;
  initialLessonId: string;
  thumbnail: string;
  title: string;
  lessonsCount: number;
  averageRating: number;
}

const CoursesList = async () => {
  let courses: Course[] = [];

  const dataNotFound = (
    <DataNotFound text="Sorry, we cannot find any courses. Please check back later." />
  );

  try {
    const response = await axios.get<Course[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses`
    );
    courses = response.data;
  } catch (error: any) {
    if (
      error.response &&
      (error.response.status === 404 || error.response.status === 500)
    ) {
      return dataNotFound;
    } else {
      throw error;
    }
  }

  return (
    <>
      {courses && courses.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {courses.map((item) => (
            <Link key={item.title} href={`/courses/${item._id}`}>
              <Card
                thumbnail={item.thumbnail}
                title={item.title}
                lessonsCount={item.lessonsCount}
                averageRating={item.averageRating}
              />
            </Link>
          ))}
        </ul>
      ) : (
        dataNotFound
      )}
    </>
  );
};

export default CoursesList;
