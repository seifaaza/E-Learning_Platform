import Link from "next/link";
import CourseInfo from "./courseInfo";
import { Button } from "@/components/ui/button";
import { BsChevronLeft } from "react-icons/bs";

interface CourseItemProps {
  params: {
    courseId: string;
  };
}

const CourseItem: React.FC<CourseItemProps> = async ({
  params: { courseId },
}) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 xl:px-8 pt-2 pb-20">
        <Link href={`/courses`} className=" mt-6">
          <Button
            variant="link"
            className="!pl-[.65rem] hover:!no-underline !border-blue-600 border-[1px] hover:!bg-blue-600 hover:!text-white"
          >
            <BsChevronLeft className="mr-2 h-4" />
            Back
          </Button>
        </Link>
        <CourseInfo courseId={courseId} />
      </article>
    </section>
  );
};

export default CourseItem;
