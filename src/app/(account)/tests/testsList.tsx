import axios from "axios";
import Link from "next/link";
import Card from "@/components/main/card/page";
import DataNotFound from "@/components/main/errors/dataNotFound";
import { notFound } from "next/navigation";

interface Test {
  _id: string;
  initialLessonId: string;
  thumbnail: string;
  title: string;
  lessonsCount: number;
  averageRating: number;
  isCertified: boolean;
}

const TestsList = async () => {
  let tests: Test[] = [];

  const dataNotFound = (
    <DataNotFound
      error
      text="Sorry, we cannot find any tests. Please check back later."
    />
  );

  return (
    <>
      {tests && tests.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"></ul>
      ) : (
        dataNotFound
      )}
    </>
  );
};

export default TestsList;
