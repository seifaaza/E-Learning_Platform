import StartCourseButton from "@/app/(account)/courses/[courseId]/actions/startCourseButton";
import React from "react";
import {
  BsCalendarCheck,
  BsCollection,
  BsGlobe,
  BsMortarboard,
  BsPatchCheck,
  BsQuestionCircle,
  BsStopwatch,
} from "react-icons/bs";
import { Separator } from "@radix-ui/react-separator";
import StartTestButton from "./actions/startTestButton";

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
  achieversNumber: number;
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
  achieversNumber,
}: TestInfoHeaderProps) {
  return (
    <>
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
            <h5 className="text-gray-900 font-medium">About This Test :</h5>
            <h6 className="text-gray-700 max-w-xl">{description}</h6>
          </article>

          <ul className="flex flex-wrap items-center gap-4">
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
              <BsStopwatch className="h-[.9rem] pt-[1px]" />
              <h6 className="text-gray-900 !text-sm capitalize">{time}</h6>
            </li>
            <li className="flex items-center gap-[.4rem] text-gray-900">
              <BsQuestionCircle className="h-[.9rem] pt-[1px]" />
              <h6 className="text-gray-900 !text-sm capitalize">
                {numberOfQuestions} Questions
              </h6>
            </li>
          </ul>
          <ul className="flex items-center gap-4 xl:gap-6 mt-2">
            <h6 className="text-gray-900 font-medium flex gap-2">
              <BsPatchCheck className="h-6" />
              Certificate of completion
            </h6>
            <Separator
              orientation="horizontal"
              className="w-[1px] h-5 bg-gray-800 opacity-30"
            />
            <h6 className="text-gray-900 font-medium flex gap-2">
              <BsMortarboard className="h-6" />
              {achieversNumber} Achievers
            </h6>
          </ul>
        </li>
        <li className="-order-1 sm:order-none ml-auto self-start ">
          <StartTestButton
            testId={firstQuestionId}
            questionId={firstQuestionId}
          />
        </li>
      </ul>
      <Separator
        orientation="vertical"
        className="h-[1px] bg-gray-800 opacity-20 mt-12 mb-7"
      />
      <ul className="flex flex-col gap-4 justify-center max-w-xl mx-auto ">
        <h3 className=" lg:!text-2xl text-center">Passing Criteria</h3>
        <h6 className="text-gray-700 text-center">
          To pass this test, you need to achieve a minimum score of
          <span className="text-lg lg:text-xl text-primary font-semibold mx-2">
            {passingScore}
          </span>
          out of
          <span className="text-lg lg:text-xl text-primary font-semibold mx-2">
            {numberOfQuestions}
          </span>
          This demonstrates a strong understanding of the material and readiness
          to progress.
        </h6>
      </ul>
    </>
  );
}
