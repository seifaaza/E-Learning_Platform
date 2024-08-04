import {
  Doodle12,
  Doodle15,
  Doodle2,
  Doodle5,
} from "@/components/main/SVGs/doodles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

export default function NotFound() {
  return (
    <section className="bg-blue-600 h-screen flex justify-center items-center isolate overflow-hidden">
      <ul className="relative xl:container ">
        <article className="px-4 mx-auto max-w-screen-sm flex flex-col items-center gap-6 my-10">
          <img
            src="/not-found.svg"
            alt=""
            className="h-64 md:h-72 lg:h-80 xl:h-96"
          />
          <p className="text-white mt-8 max-w-md !text-center">
            {/* Sorry, something went wrong on our end. Please try again later. */}
            Sorry, we can not find that page.
          </p>
          <Link href="/">
            <Button variant="secondary" className="text-blue-600">
              <BsChevronLeft className="mr-2 h-5" />
              back to home
            </Button>
          </Link>
        </article>
      </ul>
    </section>
  );
}
