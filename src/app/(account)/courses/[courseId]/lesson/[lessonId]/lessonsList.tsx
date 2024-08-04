import Card from "@/components/main/card/page";
import Link from "next/link";
import React from "react";

// Define the structure of each lesson item
interface Lesson {
  id: string;
  title: string;
  thumbnail: string;
}

// Update the interface to reflect the correct type for otherLessons
interface LessonsListProps {
  courseId: string;
  otherLessons: Lesson[];
}

const LessonsList: React.FC<LessonsListProps> = ({
  courseId,
  otherLessons,
}) => {
  return (
    <ul className="w-full flex gap-2 md:gap-3 mt-2 md:mt-3">
      {otherLessons.map((item) => (
        <li key={item.id} className="w-1/3">
          <Link
            href={`/courses/${courseId}?lesson=${item.id}`}
            className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 rounded-lg hover:scale-[98%] hover:brightness-95 duration-300 cursor-pointer"
          >
            <Card
              size="small"
              thumbnail={`https://res.cloudinary.com/depztpide/image/upload/${item.thumbnail}`}
              title={item.title}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LessonsList;
