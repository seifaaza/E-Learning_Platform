import DataNotFound from "@/components/main/errors/dataNotFound";
import React from "react";

const QuizzesList = () => {
  return (
    <DataNotFound text="Sorry, we cannot find any quizzes. Please check back later." />
  );
};

export default QuizzesList;
