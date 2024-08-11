import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// Define the structure of each lesson item
interface LessonId {
  id: string;
  title: string;
  index: number;
  thumbnail: string;
}

// Update the interface to reflect the correct type for lessons
interface LessonsControlProps {
  courseId: string;
  title: string;
  index: number;
  lessonIds: string[]; // Array of lesson IDs
}

const LessonsControl: React.FC<LessonsControlProps> = ({
  title,
  index,
  courseId,
  lessonIds,
}) => {
  // Find the index of the current lesson in the array
  const currentIndex = lessonIds.indexOf(lessonIds[index - 1]); // Adjust for 0-based index

  // Get previous and next lesson IDs
  const prevLessonId = currentIndex > 0 ? lessonIds[currentIndex - 1] : null;
  const nextLessonId =
    currentIndex < lessonIds.length - 1 ? lessonIds[currentIndex + 1] : null;

  return (
    <ul className="w-full flex flex-col md:flex-row gap-4 mt-4 md:mt-4 justify-between">
      <li>
        <h3 className="text-blue-600">
          Lesson {index} : {title}
        </h3>
      </li>
      <li className="self-end flex gap-2 md:gap-3">
        {prevLessonId && (
          <Link href={`/courses/${courseId}?lesson=${prevLessonId}`} passHref>
            <Button
              variant="link"
              className="!pl-[.65rem] hover:!no-underline !border-blue-600 border-[1px] hover:!bg-blue-600 hover:!text-white"
            >
              <BsChevronLeft className="mr-2 h-4" />
              Previous
            </Button>
          </Link>
        )}
        {nextLessonId && (
          <Link href={`/courses/${courseId}?lesson=${nextLessonId}`} passHref>
            <Button>
              Next
              <BsChevronRight className="ml-2 h-4" />
            </Button>
          </Link>
        )}
      </li>
    </ul>
  );
};

export default LessonsControl;
