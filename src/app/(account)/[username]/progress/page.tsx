import React from "react";
import StartedCoursesList from "./startedCoursesList";

interface StartedCoursesProps {
  params: {
    username: string;
  };
}

const StartedCourses: React.FC<StartedCoursesProps> = ({
  params: { username },
}) => {
  return (
    <section className="bg-blue-50 ">
      <article className="container px-3 pt-4 pb-14 min-h-[calc(100vh-56px)]">
        <StartedCoursesList username={username} />
      </article>
    </section>
  );
};

export default StartedCourses;
