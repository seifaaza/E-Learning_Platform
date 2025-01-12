import React, { Suspense } from "react";
import CoursesListLoader from "@/components/main/loaders/coursesListLoader";
import TestsList from "./testsList";

const Tests: React.FC = () => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-4 pb-14 min-h-[calc(100vh-56px)]">
        <Suspense fallback={<CoursesListLoader count={12} />}>
          <TestsList />
        </Suspense>
      </article>
    </section>
  );
};

export default Tests;
