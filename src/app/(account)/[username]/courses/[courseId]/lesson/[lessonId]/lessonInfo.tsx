import { Badge } from "@/components/ui/badge";
import {
  BsBox,
  BsFillRecordFill,
  BsInfoCircle,
  BsLightbulb,
  BsPinAngle,
} from "react-icons/bs";
import React from "react";

// Define the types for the component props
interface LessonInfoProps {
  description: string;
  objective: string;
  topics: string[];
  tips: string[];
}

const LessonInfo: React.FC<LessonInfoProps> = ({
  description,
  objective,
  topics,
  tips,
}) => {
  const topicsList = topics.map((item, index) => (
    <Badge
      key={index}
      className="rounded-md !border-none !bg-main/5 text-main text-xs p-2 w-fit font-normal capitalize"
    >
      {item}
    </Badge>
  ));

  const tipsList = tips.map((item, index) => (
    <li key={index} className="flex gap-2 text-gray-700">
      <BsFillRecordFill className="h-3 mt-2" />
      <h6>{item}</h6>
    </li>
  ));

  return (
    <section className="mt-4 lg:mt-6 xl:mt-8 flex flex-col md:flex-row gap-4 md:gap-16 lg:gap-20 xl:gap-24 ">
      <ul className="md:w-1/2 flex flex-col gap-4 xl:gap-6">
        <li className="flex flex-col gap-1">
          <h6 className="text-gray-900 font-medium flex items-center gap-2">
            <BsInfoCircle className="h-4" />
            About This Lesson
          </h6>
          <h6 className="text-gray-700">{description}</h6>
        </li>
        <li className="flex flex-col gap-1">
          <h6 className="text-gray-900 font-medium flex items-center gap-2">
            <BsPinAngle className="h-4" />
            Objective
          </h6>
          <h6 className="text-gray-700">{objective}</h6>
        </li>
      </ul>
      <ul className="md:w-1/2 flex flex-col gap-4 xl:gap-6">
        <li className="flex flex-col gap-2">
          <h6 className="text-gray-900 font-medium flex items-center gap-2">
            <BsBox className="h-[.9rem]" />
            Topics
          </h6>
          <ul className="flex flex-wrap gap-2 md:gap-3">{topicsList}</ul>
        </li>
        <li className="flex flex-col gap-2">
          <h6 className="text-gray-900 font-medium flex items-center gap-[.35rem]">
            <BsLightbulb className="h-[.9rem]" />
            Tips & Tricks
          </h6>
          <ul className="flex flex-col gap-2">{tipsList}</ul>
        </li>
      </ul>
    </section>
  );
};

export default LessonInfo;
