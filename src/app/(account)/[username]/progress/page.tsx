import React, { Suspense } from "react";

interface StartedCoursesProps {
  params: {
    username: string;
  };
}

const StartedCourses: React.FC<StartedCoursesProps> = ({
  params: { username },
}) => {
  return <p className="text-black">{username}</p>;
};

export default StartedCourses;
