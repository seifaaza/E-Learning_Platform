import StartCourseButton from "@/app/(account)/courses/[courseId]/actions/startCourseButton";
import React from "react";
import {
  BsCalendarCheck,
  BsCollection,
  BsGlobe,
  BsPatchCheck,
  BsPerson,
} from "react-icons/bs";

// Define the props interface
interface TestInfoHeaderProps {
  testId: string;
  title: string;
  thumbnail: string;
  description: string;
  time: string;
  source: string;
  language: string;
  createdAt: string;
  passingScore: number;
  numberOfQuestions: number;
  firstQuestionId: string;
}

export default function TestInfoHeader({
  testId,
  title,
  thumbnail,
  description,
  time,
  source,
  language,
  createdAt,
  numberOfQuestions,
  passingScore,
  firstQuestionId,
}: TestInfoHeaderProps) {
  return (
    <ul className="w-full mt-4 mb-2 flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
      <li className="h-fit w-full sm:w-1/3 lg:w-1/6 flex flex-col gap-4 lg:gap-6 ">
        <img
          src={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
          alt={`${title} poster`}
          className="aspect-video sm:aspect-square object-cover rounded-lg border-[1px] !border-main/20"
        />
      </li>
      <li className="flex flex-col gap-3 xl:ml-6">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-main capitalize !mb-0">
          {title}
        </h2>
        <article className="flex flex-col gap-1">
          <h5 className="text-gray-900 font-medium">About This Test</h5>
          <h6 className="text-gray-700 max-w-xl">{description}</h6>
        </article>
        <h6 className="text-gray-900 font-medium flex gap-2">
          <BsPatchCheck className="h-6" />
          Certificate of completion
        </h6>

        <ul className="mt-2 flex flex-wrap items-center gap-4">
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
          <li className="flex items-center gap-[.4rem] text-gray-900">
            <BsPerson className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">{time}</h6>
          </li>
          <li className="flex items-center gap-[.4rem] text-gray-900">
            <BsPerson className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">
              {numberOfQuestions}
            </h6>
          </li>
        </ul>
      </li>
      <li className="-order-1 sm:order-none ml-auto self-start ">
        <StartCourseButton
          courseId={firstQuestionId}
          lessonId={firstQuestionId}
        />
      </li>
    </ul>
  );
}
