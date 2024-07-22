import React from "react";
import VideoPlayer from "./videoPlayer";
import { BsCalendarCheck, BsGlobe } from "react-icons/bs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
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
}) => {
  const tagsList =
    tags &&
    tags.map((tag, index) => (
      <Badge
        key={index}
        className="rounded-md !border-none !bg-gray-400 p-2 w-fit font-normal capitalize"
      >
        {tag}
      </Badge>
    ));

  return (
    <>
      <section className="w-full">
        <VideoPlayer img={img} videoSrc={videoSrc} pausedTime={pausedTime} />

        <article className="mt-4 xl:mt-6  w-full flex justify-between h-fit">
          <ul className="xl:ml-2 flex items-center gap-4 lg:gap-6">
            <li className=" flex items-center gap-2 text-gray-900">
              <BsGlobe className="h-[.9rem] md:h-4 " />
              <p className="capitalize !leading-[1rem] text-sm">{language}</p>
            </li>
            <li className=" flex items-center gap-2 text-gray-900">
              <BsCalendarCheck className="h-[.9rem] md:h-4 " />
              <p className="capitalize !leading-[1rem] text-sm">{date}</p>
            </li>
          </ul>
          <Button className="capitalize">add to watching list</Button>
        </article>
      </section>

      <section className="mt-4 lg:mt-0 lg:max-w-lg xl:max-w-xl flex flex-col gap-6 lg:w-2/3">
        <article className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-[1rem] text-gray-900 capitalize font-medium">
            title
          </h3>
          <p className="text-xl md:text-2xl xl:text-3xl font-bold text-blue-600 capitalize">
            {title}
          </p>
        </article>
        <Separator
          orientation="horizontal"
          className="h-[1px] bg-gray-800 opacity-15"
        />
        <article className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-[1rem] text-gray-900 capitalize font-medium">
            description
          </h3>
          <p className=" text-sm text-gray-600 leading-[1.6]">{description}</p>
        </article>
        <Separator
          orientation="horizontal"
          className="h-[1px] bg-gray-800 opacity-15"
        />
        <article className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-[1rem] text-gray-900 capitalize font-medium">
            source
          </h3>
          <p className=" text-sm text-gray-600 leading-[1.6]">{source}</p>
        </article>
        <Separator
          orientation="horizontal"
          className="h-[1px] bg-gray-800 opacity-15"
        />
        <article className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-[1rem] text-gray-900 capitalize font-medium">
            tags
          </h3>
          <div className="flex flex-wrap gap-2 md:gap-3">{tagsList}</div>
        </article>
      </section>
    </>
  );
};

export default ItemContent;
