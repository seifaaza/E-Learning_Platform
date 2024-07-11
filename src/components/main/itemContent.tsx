import React from "react";
import VideoPlayer from "./videoPlayer";
import { Alert } from "../ui/alert";
import { BsCalendarCheck, BsGlobe } from "react-icons/bs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

interface ItemContentProps {
  videoSrc: string;
  pausedTime: number;
  language: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
}

const ItemContent: React.FC<ItemContentProps> = ({
  videoSrc,
  pausedTime,
  language,
  date,
  title,
  description,
  tags,
}) => {
  const tagsList = tags.map((tag, index) => (
    <Badge
      key={index}
      className="rounded-md !border-gray-700 !bg-gray-950 p-2 w-fit font-normal capitalize"
    >
      {tag}
    </Badge>
  ));

  return (
    <>
      <div className="w-full">
        <VideoPlayer videoSrc={videoSrc} pausedTime={pausedTime} />
        <div className="xl:ml-6 mt-4 xl:mt-8 flex items-center gap-4">
          <Alert className=" flex items-center bg-transparent !border-gray-800 text-gray-200 w-fit">
            <BsGlobe className="h-[.9rem] md:h-4 !text-gray-300" />
            <p className="capitalize !leading-[1.2rem] text-sm md:text-base">
              {language}
            </p>
          </Alert>
          <Alert className="flex items-center bg-transparent !border-gray-800 text-gray-200 w-fit">
            <BsCalendarCheck className="h-[.9rem] md:h-4 !text-gray-300" />
            <span className="capitalize !leading-[1.2rem] text-sm md:text-base">
              {date}
            </span>
          </Alert>
        </div>
      </div>
      <div className="mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-6 lg:w-2/3">
        <div className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-lg text-white capitalize font-medium">Title:</h3>
          <p className="text-lg md:text-xl xl:text-2xl font-semibold text-white capitalize">
            {title}
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
            {description}
          </p>
        </div>
        <Separator
          orientation="horizontal"
          className="h-[1px] bg-white opacity-20"
        />
        <div className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-lg text-white capitalize font-medium">Tags:</h3>
          <div className="flex gap-2 md:gap-3">{tagsList}</div>
        </div>
      </div>
    </>
  );
};

export default ItemContent;
