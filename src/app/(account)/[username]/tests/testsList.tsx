import axios from "axios";
import Link from "next/link";
import Card from "@/components/main/card/page";
import DataNotFound from "@/components/main/errors/dataNotFound";

// Define the interface for the Test object
interface Test {
  id: string;
  username: string;
  title: string;
  time: string;
  thumbnail: string;
  lessonsCount: number;
  averageRating: number;
  isCertified: boolean;
  initialLessonId: string;
}

// Define the props interface for TestsList component
interface TestsListProps {
  username: string; // Explicitly declare 'username' as a string
}

const TestsList = async ({ username }: TestsListProps) => {
  let tests: Test[] = [];

  const dataNotFound = (
    <DataNotFound
      error
      text="Sorry, we cannot find any tests. Please check back later."
    />
  );

  try {
    const response = await axios.get<{ tests: Test[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tests`
    );
    tests = response.data.tests; // Access tests array inside the response
  } catch (error: any) {
    if (
      error.response &&
      (error.response.status === 404 || error.response.status === 500)
    ) {
      error();
    } else {
      throw error;
    }
  }

  return (
    <>
      {tests && tests.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {tests.map((item) => (
            <Link key={item.title} href={`/${username}/tests/${item.id}`}>
              <Card
                thumbnail={item.thumbnail}
                title={item.title}
                time={item.time}
                achieversCount={10}
                isCertified
                miniCard
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

export default TestsList;
