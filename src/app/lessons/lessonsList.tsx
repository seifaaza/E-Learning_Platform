"use client";

import Link from "next/link";
import Card from "@/components/main/card";
import { lessonStore } from "@/store/lessonStoe";
import { Skeleton } from "@/components/ui/skeleton";

// Define the Lesson interface
interface Lesson {
  _id: string;
  img: string;
  title: string;
  description: string;
}

const LessonsList: React.FC = () => {
  const { lessons, loading } = lessonStore();

  const playIcon = (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 512 512"
      className="absolute h-10 md:h-12 w-10 md:w-12 top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <path
        d="M405.2 232.9 126.8 67.2c-3.4-2-6.9-3.2-10.9-3.2-10.9 0-19.8 9-19.8 20H96v344h.1c0 11 8.9 20 19.8 20 4.1 0 7.5-1.4 11.2-3.4l278.1-165.5c6.6-5.5 10.8-13.8 10.8-23.1s-4.2-17.5-10.8-23.1z"
        fill="#ffffff"
      ></path>
    </svg>
  );

  return (
    <>
      {lessons &&
        lessons.map((item: Lesson) => (
          <Link href={`/lessons/${item._id}`} key={item._id}>
            <Card
              img={`https://res.cloudinary.com/depztpide/image/upload/${item.img}`}
              title={item.title}
              description={item.description}
              icon={playIcon}
              isLoading={loading}
            />
          </Link>
        ))}
    </>
  );
};

export default LessonsList;
