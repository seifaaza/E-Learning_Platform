import React from "react";
import { BsCalendarCheck, BsGlobe, BsBookmark } from "react-icons/bs";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommentRatings } from "@/components/main/rating";

interface CourseInfoProps {
  title: string;
  language: string;
  date: string;
  description: string;
  source: string;
  creator: string;
  tags: string[];
}

const CourseInfo: React.FC<CourseInfoProps> = ({
  title,
  language,
  date,
  description,
  source,
  creator,
  tags,
}) => {
  const tagsList = tags.map((item, index) => (
    <Badge
      key={index}
      className="rounded-md !border-none !bg-blue-100 text-blue-800 text-sm p-2 w-fit font-normal capitalize"
    >
      {item}
    </Badge>
  ));

  return (
    <>
      <ul className="flex flex-col sm:flex-row justify-between gap-6 md:gap-8 lg:gap-10 xl:gap-12">
        <li>
          <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-blue-600 capitalize !mb-0">
            {title}
          </h2>
        </li>
        <li className="self-end">
          <Button>
            Save
            <BsBookmark className="ml-2 h-4 " />
          </Button>
        </li>
      </ul>
      <CommentRatings
        rating={3.5}
        size={20}
        className=" w-fit flex items-center gap-2"
      />
      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex flex-col gap-1">
        <h5 className=" text-gray-900 font-medium">About This Course</h5>
        <h6 className="text-gray-700">{description}</h6>
      </article>
      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex justify-between">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2 text-gray-900">
            <BsGlobe className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">{language}</h6>
          </li>
          <li className="flex items-center gap-2 text-gray-900">
            <BsCalendarCheck className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">{date}</h6>
          </li>
        </ul>
      </article>

      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex flex-col gap-1">
        <h5 className=" text-gray-900 font-medium">Tags</h5>

        <div className="flex flex-wrap gap-2 md:gap-3">{tagsList}</div>
      </article>

      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />

      <ul className="flex items-center gap-6 md:gap-8 lg:gap-10">
        <li className="flex flex-col gap-1">
          <h5 className=" text-gray-900 font-medium">Source</h5>
          <h6 className="text-gray-700 capitalize">{source}</h6>
        </li>
        <li className="flex flex-col gap-1">
          <h5 className=" text-gray-900 font-medium">Creator</h5>
          <h6 className="text-gray-700 capitalize">{creator}</h6>
        </li>
      </ul>
    </>
  );
};

export default CourseInfo;
