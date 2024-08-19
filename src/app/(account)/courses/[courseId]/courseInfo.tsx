import React from "react";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { notFound } from "next/navigation";
import CourseInfoHeader from "./courseInfoHeader";
import CourseInfoBody from "./courseInfoBody";
import CourseInfoFooter from "./courseInfoFooter";

interface CourseInfoProps {
  courseId: string;
}

const CourseInfo: React.FC<CourseInfoProps> = async ({ courseId }) => {
  const fetchCourseById = async (courseId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <CourseInfoHeader
        courseId={courseId}
        firstLessonId={course.firstLessonId}
        thumbnail={course.thumbnail}
        title={course.title}
        rating={course.averageRating}
        description={course.description}
        language={course.language}
        createdAt={formatDate(course.created_at)}
        source={course.source}
        creator={course.creator}
      />
      <Separator
        orientation="vertical"
        className="h-[1px] bg-gray-800 opacity-15 my-8"
      />
      <CourseInfoBody
        objectives={course.objectives}
        lessonsTitles={course.lessonsTitles}
      />
      <Separator
        orientation="vertical"
        className="h-[1px] bg-gray-800 opacity-15 my-8"
      />

      <CourseInfoFooter
        totalLessons={course.lessonsTitles.length}
        totalArticles={course.totalArticles}
        totalTopics={course.totalTopics}
      />
    </>
  );
};

export default CourseInfo;
