import React from "react";
import VideoPlayer from "./videoPlayer";
import { Alert } from "@/components/ui/alert";
import { BsGlobe, BsCalendarCheck } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-separator";

interface LessonProps {
  params: {
    [key: string]: any;
  };
}

const Lesson: React.FC<LessonProps> = ({ params }) => {
  console.log(params.lessonId);

  return (
    <section className="container px-3 xl:px-8 py-12 flex flex-col gap-6 lg:gap-10 lg:flex-row lg:justify-between">
      <div className="w-full">
        <VideoPlayer />
        <div className="xl:ml-6 mt-4 xl:mt-8 flex items-center gap-4">
          <Alert className=" flex items-center bg-transparent !border-gray-800 text-gray-200 w-fit">
            <BsGlobe className="h-[.9rem] md:h-4 !text-gray-300" />
            <p className="capitalize !leading-[1.2rem] text-sm md:text-base">
              English
            </p>
          </Alert>
          <Alert className="flex items-center bg-transparent !border-gray-800 text-gray-200 w-fit">
            <BsCalendarCheck className="h-[.9rem] md:h-4 !text-gray-300" />
            <span className="capitalize !leading-[1.2rem] text-sm md:text-base">
              April 2019
            </span>
          </Alert>
        </div>
      </div>
      <div className="mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-6 lg:w-2/3">
        <div className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-lg text-white capitalize font-medium">Title:</h3>
          <p className="text-lg md:text-xl xl:text-2xl font-semibold text-white">
            Flowbite helps you connect
          </p>
        </div>
        <Separator
          orientation="horizontal"
          className="h-[1px] bg-white opacity-20"
        />
        <div className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-lg text-white capitalize font-medium">
            Description:
          </h3>
          <p className="font-light text-sm text-gray-300 leading-[1.6]">
            Flowbite helps you connect with friends and communities of people
            who share your interests. Connecting with your friends and family,
            Flowbite helps you connect with friends and communities of people
            who share your interests. Connecting with your friends and family.
          </p>
        </div>
        <Separator
          orientation="horizontal"
          className="h-[1px] bg-white opacity-20"
        />
        <div className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-lg text-white capitalize font-medium">Tags:</h3>
          <div className="flex gap-2 md:gap-3">
            <Badge className="rounded-md !border-gray-700 !bg-gray-950 p-2 w-fit font-normal">
              Badge
            </Badge>
            <Badge className="rounded-md !border-gray-700 !bg-gray-950 p-2 w-fit font-normal">
              Badge
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lesson;
