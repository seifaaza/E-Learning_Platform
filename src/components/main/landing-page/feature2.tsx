import { BsBookmarkFill, BsCollectionFill } from "react-icons/bs";
import { Doodle2, Doodle3, Doodle4, Doodle5, Doodle8 } from "../SVGs/doodles";

const Feature2 = () => {
  return (
    <section className="bg-least isolate overflow-hidden">
      <article className="relative xl:container">
        <Doodle2 color="least" className="top-10 left-32 w-24" />
        <Doodle3 color="least" className="bottom-10 left-16 w-44" />
        <Doodle4 color="least" className="bottom-1/2 left-1/2 w-60" />
        <Doodle5 color="least" className="bottom-32 right-40 w-24" />
        <Doodle8 color="least" className="bottom-1/3 left-[38%] w-32" />
        <ul className="px-3 py-16 md:py-20 lg:py-24 container flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 justify-evenly ">
          <img
            src="/feature-2.svg"
            alt="mockup"
            className="w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[21rem]"
          />

          <article className="max-w-[35rem] text-center lg:text-left">
            <h2 className="text-white max-w-xl">
              your seamless learning experience at your own pace
            </h2>
            <p className="text-blue-50 mb-6 text-center lg:text-left">
              Learn at your own pace with our video lessons. Save your progress
              and seamlessly pick up where you left off using our convenient
              in-progress list feature, making education both flexible and
              accessible.
            </p>
            <ul className=" flex justify-center lg:justify-start gap-8 lg:gap-12 xl:gap-14 text-white font-medium">
              <li className=" flex items-center gap-2 ">
                <BsBookmarkFill className="text-white text-lg " />
                <h5>Saved Courses</h5>
              </li>
              <li className="flex items-center gap-2">
                <BsCollectionFill className="text-white text-lg " />
                <h5>In Progress</h5>
              </li>
            </ul>
          </article>
        </ul>
      </article>
    </section>
  );
};

export default Feature2;
