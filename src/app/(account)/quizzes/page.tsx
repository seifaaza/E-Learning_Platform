import React, { Suspense } from "react";
import ListLoader from "@/components/main/loaders/coursesListLoader";
import QuizzesList from "./QuizzesList";

const Quizzes: React.FC = async () => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-10 pb-20">
        <Suspense fallback={<ListLoader />}>
          <QuizzesList />
        </Suspense>
      </article>
    </section>
  );
};

export default Quizzes;
