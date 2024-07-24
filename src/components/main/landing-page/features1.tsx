import { BsBookmarkFill, BsCollectionFill } from "react-icons/bs";
import { Doodle2, Doodle3, Doodle4, Doodle5, Doodle8 } from "../SVGs/doodles";

const Features1 = () => {
  return (
    <section className="bg-blue-500 isolate overflow-hidden">
      <article className="relative xl:container !fill-blue-600/30">
        <Doodle2 className="top-10 left-32 w-24 !fill-blue-600/30" />
        <Doodle3 className="bottom-10 left-16 w-44 !fill-blue-600/30" />
        <Doodle4 className="bottom-1/2 left-1/2 w-60 !fill-blue-600/30" />
        <Doodle5 className="bottom-32 right-40 w-24 !fill-blue-600/30" />
        <Doodle8 className="bottom-1/3 left-[38%] w-32 !fill-blue-600/30" />
        <ul className="px-3 py-16 md:py-20 lg:py-24 container flex flex-col lg:flex-row items-center lg:items-start gap-10 justify-evenly ">
          <img
            src="/illustration-2.svg"
            alt="mockup"
            className="w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[22rem] select-none"
          />

          <article className="max-w-xl text-center lg:text-left">
            <h1 className="mb-5 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold !leading-tight tracking-tight text-white capitalize">
              your seamless learning experience
            </h1>
            <p className="text-sm md:text-base lg:text-lg mb-6 lg:mb-8 text-blue-50">
              Learn at your own pace with our video lessons. Save your progress
              and continue right where you left off with our convenient watching
              list feature, making education flexible and convenient.
            </p>
            <ul className="mt-6 flex justify-center lg:justify-start gap-8 lg:gap-12 xl:gap-14">
              <li className="flex items-center gap-2 xl:gap-3 mb-[6px] md:mb-2">
                <BsBookmarkFill className="text-white text-lg " />
                <h3 className="text-sm md:text-base font-medium text-white capitalize">
                  save progress
                </h3>
              </li>
              <li className="flex items-center gap-2 xl:gap-3 mb-[6px] md:mb-2">
                <BsCollectionFill className="text-white text-lg " />
                <h3 className="text-sm md:text-base font-medium text-white capitalize">
                  watching list
                </h3>
              </li>
            </ul>
          </article>
        </ul>
      </article>
    </section>
  );
};

export default Features1;
