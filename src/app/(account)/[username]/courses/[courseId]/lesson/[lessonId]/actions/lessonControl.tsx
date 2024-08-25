import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface LessonControlProps {
  username: string;
  courseId: string;
  index: number;
  lessonIds: string[];
}

const LessonControl: React.FC<LessonControlProps> = ({
  username,
  index,
  courseId,
  lessonIds,
}) => {
  if (!lessonIds || lessonIds.length === 0) {
    notFound();
  }

  // Find the index of the current lesson in the array
  const currentIndex = index - 1;

  // Get previous and next lesson IDs
  const prevLessonId = currentIndex > 0 ? lessonIds[currentIndex - 1] : null;
  const nextLessonId =
    currentIndex < lessonIds.length - 1 ? lessonIds[currentIndex + 1] : null;

  return (
    <section className="flex gap-2 md:gap-3">
      {prevLessonId && (
        <Link
          href={`/${username}/courses/${courseId}?lesson=${prevLessonId}`}
          passHref
        >
          <Button
            variant="link"
            className="!pl-[.65rem] hover:!no-underline !border-main border-[1px] hover:!bg-main hover:!text-white"
          >
            <BsChevronLeft className="mr-2 h-4" />
            Previous
          </Button>
        </Link>
      )}
      {nextLessonId && (
        <Link
          href={`/${username}/courses/${courseId}?lesson=${nextLessonId}`}
          passHref
        >
          <Button className="hover:!bg-main brightness-90">
            Next
            <BsChevronRight className="ml-2 h-4" />
          </Button>
        </Link>
      )}
    </section>
  );
};

export default LessonControl;
