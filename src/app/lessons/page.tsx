import React, { Suspense } from "react";
import LessonsList from "./lessonsList";
import Heading from "@/components/main/heading";
import ListLoader from "@/components/main/loaders/listLoader";

const Lessons: React.FC = () => {
  return (
    <section className="container px-3 py-12">
      <Heading
        title="engage with interactive video lessons"
        subtitle="Discover engaging interactive video lessons for deep learning and real-time application."
      />
      <div className="mt-8 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <Suspense fallback={<ListLoader />}>
          <LessonsList />
        </Suspense>
      </div>
    </section>
  );
};

export default Lessons;
