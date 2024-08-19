import { Separator } from "@radix-ui/react-separator";
import { BsCheck2 } from "react-icons/bs";

// Define the interface for the props
interface CourseInfoBodyProps {
  objectives: string[];
  lessonsTitles: string[];
}

const CourseInfoBody: React.FC<CourseInfoBodyProps> = ({
  objectives,
  lessonsTitles,
}) => {
  return (
    <>
      <h3 className="my-6 lg:!text-2xl text-center">What you&apos;ll learn</h3>
      <article className="mt-4 flex flex-col md:flex-row gap-6 md:gap-14 lg:gap-24 xl:gap-32">
        <section className="w-full md:w-1/2">
          <h5 className="text-gray-900 font-medium mb-4 md:text-center">
            Objectives
          </h5>
          <ul className="flex flex-col gap-4">
            {objectives.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-900">
                <BsCheck2 className="min-w-6 mt-1" />
                <h6 className="max-w-xl">{item}</h6>
              </li>
            ))}
          </ul>
        </section>
        <Separator
          orientation="vertical"
          className="h-[1px] md:w-[1px] w-full md:h-40 bg-gray-800 opacity-15 self-center"
        />
        <section className="w-full md:w-1/2">
          <h5 className="text-gray-900 font-medium mb-4 md:text-center">
            Lessons
          </h5>
          <ul className="flex flex-col gap-4">
            {lessonsTitles.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-900">
                <h6 className="font-medium whitespace-nowrap capitalize">
                  Lesson {index + 1}:
                </h6>
                <h6 className="max-w-xl">{item}</h6>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
};

export default CourseInfoBody;
