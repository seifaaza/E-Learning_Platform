"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

export default function ServerError() {
  return (
    <section className="bg-main h-screen flex justify-center items-center isolate overflow-hidden">
      <ul className="relative xl:container ">
        <article className="px-4 mx-auto max-w-screen-sm flex flex-col items-center gap-6 my-10">
          <img
            src="/server-error.svg"
            alt=""
            className="h-64 md:h-72 lg:h-80 xl:h-96"
          />
          <p className="text-white mt-8 max-w-md !text-center">
            Oops! Something went wrong on our end.
          </p>
          <Link href="/">
            <Button variant="secondary" className="text-main">
              <BsChevronLeft className="mr-2 h-5" />
              back to home
            </Button>
          </Link>
        </article>
      </ul>
    </section>
  );
}
