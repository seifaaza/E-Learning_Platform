import { BsFillQuestionCircleFill, BsCheckCircleFill } from "react-icons/bs";
import {
  Doodle11,
  Doodle13,
  Doodle18,
  Doodle19,
  Doodle9,
} from "../SVGs/doodles";

const Features2 = () => {
  return (
    <section className="bg-blue-500 isolate overflow-hidden">
      <article className="relative xl:container ">
        <Doodle9 className="top-10 left-32 w-24 !fill-blue-600/30" />
        <Doodle19 className="bottom-10 left-16 w-32 !fill-blue-600/30" />
        <Doodle11 className="bottom-1/2 left-1/2 w-60 !fill-blue-600/30" />
        <Doodle18 className="bottom-8 right-32 w-44 !fill-blue-600/30" />
        <Doodle13 className="bottom-1/4 left-[32%] w-44 !fill-blue-600/30" />
        <ul className="px-3 py-16 md:py-20 lg:py-24 container flex flex-col-reverse lg:flex-row items-center lg:items-start gap-10 justify-evenly ">
          <li className="max-w-xl text-center lg:text-left">
            <h1 className="mb-5 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold !leading-tight tracking-tight text-white capitalize">
              your personalized learning journey
            </h1>
            <p className="text-sm md:text-base lg:text-lg  mb-6 lg:mb-8 text-blue-50">
              Boost your skills with our adaptive quizzes, which provide a
              personalized learning experience. Receive instant feedback on your
              answers to quickly correct mistakes and improve your
              understanding.
            </p>
            <ul className="mt-6 flex justify-center lg:justify-start gap-8 lg:gap-12 xl:gap-14">
              <li className="flex items-center gap-2 xl:gap-3 mb-[6px] md:mb-2">
                <BsFillQuestionCircleFill className="text-white text-lg " />
                <h3 className="text-sm md:text-base font-medium text-white capitalize">
                  adaptive quizzes
                </h3>
              </li>
              <li className="flex items-center gap-2 xl:gap-3 mb-[6px] md:mb-2">
                <BsCheckCircleFill className="text-white text-lg " />
                <h3 className="text-sm md:text-base font-medium text-white capitalize">
                  instant feedback
                </h3>
              </li>
            </ul>
          </li>
          <img
            src="/illustration-3.svg"
            alt="mockup"
            className="w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[22rem] select-none"
          />
        </ul>
      </article>
    </section>
  );
};

export default Features2;
