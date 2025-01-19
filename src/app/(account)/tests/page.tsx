import React, { Suspense } from "react";
import TestsList from "./testsList";
import TestsListLoader from "@/components/main/loaders/testsListLoader";

interface TestsProps {
  params: {
    username: string;
  };
}

const Tests: React.FC<TestsProps> = ({ params: { username } }) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-4 pb-14 min-h-[calc(100vh-56px)]">
        <Suspense fallback={<TestsListLoader count={12} />}>
          <TestsList username={username} />
        </Suspense>
      </article>
    </section>
  );
};

export default Tests;
