import {
  BsCalendarCheck,
  BsCollection,
  BsCurrencyDollar,
  BsGlobe,
  BsPerson,
} from "react-icons/bs";

import StartCourseButton from "./actions/startCourseButton";
import { CommentRatings } from "@/components/main/rating";
import SaveCourseButton from "./actions/saveCourseButton";

interface CourseInfoHeaderProps {
  firstLessonId: string;
  courseId: string;
  thumbnail: string;
  title: string;
  rating: number;
  description: string;
  language: string;
  createdAt: string;
  source: string;
  creator: string;
  category: string;
}

const CourseInfoHeader: React.FC<CourseInfoHeaderProps> = ({
  firstLessonId,
  courseId,
  thumbnail,
  title,
  rating,
  description,
  language,
  createdAt,
  source,
  creator,
  category,
}) => {
  return (
    <ul className="w-full mt-4 mb-2 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
      <li className="h-fit w-full md:w-1/2 lg:w-1/3 flex flex-col gap-4 lg:gap-6">
        <img
          src={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
          alt={`${title} poster`}
          className="aspect-video object-cover rounded-lg"
        />
        <ul className="flex flex-wrap lg:justify-between items-center gap-4 sm:gap-3">
          <li className="flex items-center gap-2 text-gray-900">
            <BsGlobe className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">{language}</h6>
          </li>
          <li className="flex items-center gap-2 text-gray-900">
            <BsCalendarCheck className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">{createdAt}</h6>
          </li>
          <li className="flex items-center gap-2 text-gray-900">
            <BsCollection className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">{source}</h6>
          </li>
          <li className="flex items-center gap-2 text-gray-900">
            <BsPerson className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">{creator}</h6>
          </li>
        </ul>
      </li>
      <li className="flex flex-col gap-3">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-main capitalize !mb-0">
          {title}
        </h2>
        <article className="flex flex-col gap-1">
          <h5 className="text-gray-900 font-medium">About This Course</h5>
          <h6 className="text-gray-700 max-w-xl">{description}</h6>
        </article>
        <CommentRatings rating={rating} ratingNumber />
        <ul className="flex gap-4 mt-2">
          <StartCourseButton courseId={courseId} lessonId={firstLessonId} />
          <SaveCourseButton courseId={courseId} />
        </ul>
      </li>
      <li className="-order-1 md:order-none ml-auto self-start text-main bg-main/10 rounded-lg py-2 px-4 whitespace-nowrap">
        <h5 className="!font-medium">{category}</h5>
      </li>
    </ul>
  );
};

export default CourseInfoHeader;
