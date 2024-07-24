import React, { Suspense } from "react";
import CoursesList from "./coursesList";
import ListLoader from "@/components/main/loaders/listLoader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { MainPagination } from "@/components/main/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Courses: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-10 pb-20">
        <section className="flex justify-between items-center gap-4 bg-blue-50 sticky top-[60px] z-10 py-4">
          <Input
            type="email"
            placeholder="Search"
            className="bg-slate-200 max-w-xs focus-visible:!ring-offset-0 focus-visible:ring-0"
          />
          <Select>
            <SelectTrigger className="w-[180px] h-10 focus:!ring-offset-0 focus:ring-0">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
        <ul className="mt-4 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <Suspense fallback={<ListLoader />}>
            <CoursesList />
          </Suspense>
        </ul>
        <MainPagination />
      </article>
    </section>
  );
};

export default Courses;
