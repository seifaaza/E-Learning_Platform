import React, { Suspense } from "react";
import CoursesList from "./coursesList";
import Search from "../[username]/courses/filter/search";
import SelectLoader from "@/components/main/loaders/selectLoader";
import Categories from "../[username]/courses/filter/categories";
import CoursesListLoader from "@/components/main/loaders/coursesListLoader";

const Courses: React.FC = () => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-4 pb-14">
        <section className="flex justify-between items-center gap-4 bg-blue-50 sticky top-[56px] z-10 py-4">
          <Search />
          <Suspense fallback={<SelectLoader />}>
            <Categories />
          </Suspense>
        </section>
        <Suspense fallback={<CoursesListLoader count={12} />}>
          <CoursesList />
        </Suspense>
      </article>
    </section>
  );
};

export default Courses;
