import React from "react";
import SavedCoursesList from "./savedCoursesList";

interface SavedCoursesProps {
  params: {
    username: string;
  };
}

const SavedCourses: React.FC<SavedCoursesProps> = ({
  params: { username },
}) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-4 pb-14 min-h-[calc(100vh-56px)]">
        <SavedCoursesList username={username} />
      </article>
    </section>
  );
};

export default SavedCourses;
