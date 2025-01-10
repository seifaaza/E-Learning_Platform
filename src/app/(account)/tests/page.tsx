import React, { Suspense } from "react";
import CoursesListLoader from "@/components/main/loaders/coursesListLoader";
import TestsList from "./testsList";

const Tests: React.FC = () => {
  return (
    <section className="bg-blue-50 min-h-[100vh]">
      <article className="container px-3 pt-4 pb-14">
        <Suspense fallback={<CoursesListLoader count={12} />}>
          <TestsList />
        </Suspense>
      </article>
    </section>
  );
};

export default Tests;
