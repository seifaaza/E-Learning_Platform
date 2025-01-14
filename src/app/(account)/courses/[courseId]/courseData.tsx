import React from "react";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";

import CourseInfoHeader from "./courseInfoHeader";
import CourseInfoBody from "./courseInfoBody";
import CourseInfoFooter from "./courseInfoFooter";

interface CourseDataProps {
  courseId: string;
}

const CourseData: React.FC<CourseDataProps> = async ({ courseId }) => {
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
        error();
      } else {
        throw error;
      }
    }
  };

  const course = await fetchCourseById(courseId);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="mt-4 xl:mt-6">
      <CourseInfoHeader
        courseId={courseId}
        firstLessonId={course.firstLessonId}
        thumbnail={course.thumbnail}
        title={course.title}
        rating={course.averageRating}
        description={course.description}
        isCertified={course.isCertified}
        language={course.language}
        createdAt={formatDate(course.created_at)}
        source={course.source}
        creator={course.creator}
        category={course.categoryName}
      />
      <Separator
        orientation="vertical"
        className="h-[1px] bg-gray-800 opacity-20 my-10"
      />
      <CourseInfoBody
        objectives={course.objectives}
        lessonsTitles={course.lessonsTitles}
      />
      <Separator
        orientation="vertical"
        className="h-[1px] bg-gray-800 opacity-20 my-10"
      />

      <CourseInfoFooter
        totalLessons={course.lessonsTitles.length}
        totalArticles={course.totalArticles}
        totalTopics={course.totalTopics}
        quiz={course.isCertified}
      />
    </section>
  );
};

export default CourseData;
