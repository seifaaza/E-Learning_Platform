import {
  Doodle12,
  Doodle15,
  Doodle17,
  Doodle2,
  Doodle8,
} from "@/components/main/SVGs/doodles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

export default function NotFound() {
  return (
    <section className=" bg-blue-600 h-screen flex justify-center items-center isolate overflow-hidden">
      <ul className="relative xl:container ">
        <Doodle2 className="bottom-1/2 left-0 xl:left-[30%] w-52" />
        <Doodle8 className="top-24 left-64 w-24" />
        <Doodle12 className="bottom-20 left-40 w-32" />
        <Doodle15 className="invisible lg:visible bottom-[15%] left-[45%] w-44" />
        <Doodle17 className="bottom-20 right-44 w-28" />
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl  text-white">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">
              Something&apos;s missing.
            </p>
            <p className="mb-4 text-lg font-light  text-blue-100">
              Sorry, we can&apos;t find that page. You&apos;ll find lots to
              explore on the home page.{" "}
            </p>
            <Link href="/">
              <Button variant="secondary" className="text-blue-600 capitalize">
                <BsChevronLeft className="mr-2 h-4 w-4 mb-1" />
                back to home
              </Button>
            </Link>
          </div>
        </div>
      </ul>
    </section>
  );
}
