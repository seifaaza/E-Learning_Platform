import DataNotFound from "@/components/main/errors/dataNotFound";
import React from "react";
import { BsExclamationCircleFill } from "react-icons/bs";

const QuizzesList = () => {
  return (
    <DataNotFound text="Sorry, we cannot find any quizzes. Please check back later." />
  );
};

export default QuizzesList;
