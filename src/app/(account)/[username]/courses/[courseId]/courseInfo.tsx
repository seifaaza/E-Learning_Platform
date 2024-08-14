import React from "react";
import { BsCalendarCheck, BsGlobe, BsBookmark } from "react-icons/bs";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommentRatings } from "@/components/main/rating";
import axios from "axios";
import { notFound } from "next/navigation";

interface CourseInfoProps {
  courseId: string;
}

const CourseInfo: React.FC<CourseInfoProps> = async ({ courseId }) => {
  const fetchCourseById = async (courseId: string) => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/courses/${courseId}`
      );
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 500)
      ) {
        notFound();
      } else {
        throw error;
      }
    }
  };

  const course = await fetchCourseById(courseId);

  if (!course) {
    return <p>No course details available.</p>;
  }

  const tagsList = course.tags.map((item: string, index: number) => (
    <Badge
      key={index}
      className="rounded-md !border-none !bg-blue-100 text-blue-800 text-sm p-2 w-fit font-normal capitalize"
    >
      {item}
    </Badge>
  ));

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-blue-600 capitalize !mb-0">
        {course.title}
      </h2>

      <CommentRatings
        rating={3.5}
        size={20}
        ratingNumber
        className=" w-fit flex items-center gap-2"
      />
      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex flex-col gap-1">
        <h5 className=" text-gray-900 font-medium">About This Course</h5>
        <h6 className="text-gray-700">{course.description}</h6>
      </article>
      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex justify-between">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2 text-gray-900">
            <BsGlobe className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">
              {course.language}
            </h6>
          </li>
          <li className="flex items-center gap-2 text-gray-900">
            <BsCalendarCheck className="h-[.9rem] pt-[1px]" />
            <h6 className="text-gray-900 !text-sm capitalize">
              {formatDate(course.created_at)}
            </h6>
          </li>
        </ul>
      </article>

      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex flex-col gap-1">
        <h5 className=" text-gray-900 font-medium">Tags</h5>

        <ul className="flex flex-wrap gap-2 md:gap-3">{tagsList}</ul>
      </article>

      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />

      <ul className="flex items-center gap-6 md:gap-8 lg:gap-10">
        <li className="flex flex-col gap-1">
          <h5 className=" text-gray-900 font-medium">Source</h5>
          <h6 className="text-gray-700 capitalize">{course.source}</h6>
        </li>
        <li className="flex flex-col gap-1">
          <h5 className=" text-gray-900 font-medium">Creator</h5>
          <h6 className="text-gray-700 capitalize">{course.creator}</h6>
        </li>
      </ul>
    </>
  );
};

export default CourseInfo;
