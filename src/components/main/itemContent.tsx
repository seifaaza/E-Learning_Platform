import React from "react";
import VideoPlayer from "./videoPlayer";
import { Alert } from "../ui/alert";
import { BsCalendarCheck, BsGlobe } from "react-icons/bs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";

interface ItemContentProps {
  img: string;
  videoSrc: string;
  pausedTime: number;
  language: string;
  date: string;
  title: string;
  description: string;
  source: string;
  tags: string[];
  isLoading?: boolean;
}

const ItemContent: React.FC<ItemContentProps> = ({
  img,
  videoSrc,
  pausedTime,
  language,
  date,
  title,
  description,
  source,
  tags,
  isLoading = true,
}) => {
  const tagsList =
    tags &&
    tags.map((tag, index) => (
      <Badge
        key={index}
        className="rounded-md !border-gray-700 !bg-gray-950 p-2 w-fit font-normal capitalize"
      >
        {tag}
      </Badge>
    ));

  const videoSkeleton = (
    <Skeleton className="aspect-video rounded-lg opacity-80" />
  );
  const headingSkeleton = (
    <div className="mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-3 lg:w-2/3 opacity-80">
      <Skeleton className="w-1/6 h-5" />
      <Skeleton className="w-3/4 h-5" />
    </div>
  );
  return (
    <>
      <div className="w-full">
        {isLoading ? (
          videoSkeleton
        ) : (
          <VideoPlayer img={img} videoSrc={videoSrc} pausedTime={pausedTime} />
        )}
        <div className="mt-4 xl:mt-6  w-full flex justify-between h-fit">
          <div className="xl:ml-2 flex items-center gap-4 lg:gap-6">
            <div className=" flex items-center gap-2 text-gray-200">
              <BsGlobe className="h-[.9rem] md:h-4 !text-gray-300" />
              <p className="capitalize !leading-[1rem] text-sm">{language}</p>
            </div>
            <div className=" flex items-center gap-2 text-gray-200">
              <BsCalendarCheck className="h-[.9rem] md:h-4 !text-gray-300" />
              <p className="capitalize !leading-[1rem] text-sm">{date}</p>
            </div>
          </div>
          <Button variant="destructive">Cancel</Button>
        </div>
      </div>
      {isLoading ? (
        headingSkeleton
      ) : (
        <div className="mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-6 lg:w-2/3">
          <div className="flex flex-col gap-2 lg:gap-3">
            <h3 className="text-[1rem] text-white capitalize font-medium">
              title
            </h3>
            <p className="text-xl md:text-2xl xl:text-3xl font-semibold text-white capitalize">
              {title}
            </p>
          </div>
          <Separator
            orientation="horizontal"
            className="h-[1px] bg-white opacity-15"
          />
          <div className="flex flex-col gap-2 lg:gap-3">
            <h3 className="text-[1rem] text-white capitalize font-medium">
              description
            </h3>
            <p className="font-light text-sm text-gray-300 leading-[1.6]">
              {description}
            </p>
          </div>
          <Separator
            orientation="horizontal"
            className="h-[1px] bg-white opacity-15"
          />
          <div className="flex flex-col gap-2 lg:gap-3">
            <h3 className="text-[1rem] text-white capitalize font-medium">
              source
            </h3>
            <p className="font-light text-sm text-gray-300 leading-[1.6]">
              {source}
            </p>
          </div>
          <Separator
            orientation="horizontal"
            className="h-[1px] bg-white opacity-15"
          />
          <div className="flex flex-col gap-2 lg:gap-3">
            <h3 className="text-[1rem] text-white capitalize font-medium">
              tags
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">{tagsList}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemContent;
