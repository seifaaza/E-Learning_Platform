"use client";

import axios from "axios";
import useSWR from "swr";
import Card from "@/components/main/card/page";
import EmptyData from "@/components/main/errors/dataEmpty";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UnsaveCourseButton from "./actions/unsaveCourseButton";
import { BsArrowRight, BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CoursesListLoader from "@/components/main/loaders/coursesListLoader";

interface SavedCourse {
  _id: string;
  initialLessonId: string;
  thumbnail: string;
  title: string;
  lessonsCount: number;
  averageRating: number;
}

interface SavedCoursesListProps {
  username: string;
}

const fetchSavedCourses = async (url: string) => {
  const response = await axios.get<SavedCourse[]>(url);
  return response.data;
};

const SavedCoursesList = ({ username }: SavedCoursesListProps) => {
  const {
    data: savedCourses,
    error,
    mutate,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/save`,
    fetchSavedCourses
  );

  if (error)
    return (
      <EmptyData
        imgSrc="/no-saved.svg"
        text="Oops! No saved courses found. Please save some for easy access later."
      />
    );
  if (!savedCourses) return <CoursesListLoader count={12} />;

  return (
    <>
      {savedCourses.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {savedCourses.map((item) => (
            <Card
              key={item._id}
              thumbnail={item.thumbnail}
              title={item.title}
              lessonsCount={item.lessonsCount}
              btn={
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="!p-0 cursor-pointer">
                      <BsThreeDotsVertical className="text-xl text-main " />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit">
                    <ul className="flex flex-col gap-3">
                      <UnsaveCourseButton
                        courseId={item._id}
                        username={username}
                        mutate={mutate} // Pass mutate function here
                      />
                      <Link href={`/courses/${item._id}`}>
                        <Button
                          variant="link"
                          className="!pl-[.65rem] hover:!no-underline hover:!bg-main hover:!text-white "
                        >
                          <BsArrowRight className="mr-2 h-4" />
                          Go To Course
                        </Button>
                      </Link>
                    </ul>
                  </PopoverContent>
                </Popover>
              }
              link={false}
            />
          ))}
        </ul>
      ) : (
        <EmptyData
          imgSrc="/no-saved.svg"
          text="Oops! No saved courses found. Please save some for easy access later."
        />
      )}
    </>
  );
};

export default SavedCoursesList;
