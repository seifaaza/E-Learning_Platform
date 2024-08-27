"use client";

import axios from "axios";
import useSWR from "swr";
import Card from "@/components/main/card/page";
import EmptyData from "@/components/main/errors/dataEmpty";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CoursesListLoader from "@/components/main/loaders/coursesListLoader";

interface StartedCourse {
  _id: string;
  initialLessonId: string;
  currentLessonId: string;
  thumbnail: string;
  title: string;
  lessonsCount: number;
  averageRating: number;
  progressPercentage: number;
}

interface StartedCoursesListProps {
  username: string;
}

const fetchStartedCourses = async (url: string) => {
  const response = await axios.get<StartedCourse[]>(url);
  return response.data;
};

const StartedCoursesList = ({ username }: StartedCoursesListProps) => {
  const { data: startedCourses, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start`,
    fetchStartedCourses
  );

  if (error)
    return (
      <EmptyData
        imgSrc="/no-started.svg"
        text="Oops! No started courses found. Begin a course to track your progress easily."
      />
    );
  if (!startedCourses) return <CoursesListLoader count={12} />;

  return (
    <>
      {startedCourses.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {startedCourses.map((item) => (
            <Card
              key={item._id}
              thumbnail={item.thumbnail}
              title={item.title}
              progress={
                item.progressPercentage === 0 ? 0.1 : item.progressPercentage
              }
              btn={
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <Link
                        href={`/${username}/courses/${item._id}?lesson=${item.currentLessonId}`}
                      >
                        <BsArrowRight className="h-4 text-main" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <h6 className="text-main">Continue Course</h6>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
              link={false}
            />
          ))}
        </ul>
      ) : (
        <EmptyData
          imgSrc="/no-started.svg"
          text="Oops! No started courses found. Begin a course to track your progress easily."
        />
      )}
    </>
  );
};

export default StartedCoursesList;
