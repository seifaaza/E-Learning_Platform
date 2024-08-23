import { BsFillQuestionCircleFill, BsCheckCircleFill } from "react-icons/bs";
import {
  Doodle11,
  Doodle13,
  Doodle18,
  Doodle19,
  Doodle9,
} from "../SVGs/doodles";

const Feature3 = () => {
  return (
    <section className="bg-main isolate overflow-hidden">
      <article className="relative xl:container ">
        <Doodle9 className="top-10 left-32 w-24 " />
        <Doodle19 className="bottom-10 left-16 w-32 " />
        <Doodle11 className="bottom-1/2 left-1/2 w-60 " />
        <Doodle18 className="bottom-8 right-32 w-44 " />
        <Doodle13 className="bottom-1/4 left-[32%] w-44 " />

        <ul className="px-3 py-16 md:py-20 lg:py-24 container flex flex-col lg:flex-row items-center lg:items-start gap-12 justify-evenly ">
          <article className="max-w-[35rem] text-center lg:text-left">
            <h2 className="text-white max-w-xl">
              advance your expertise with custom tests and instant insights
            </h2>
            <p className="text-blue-50 mb-6 text-center lg:text-left">
              Boost your skills with our specialized tests, which provide a
              personalized learning experience. Receive instant feedback on your
              answers to quickly correct mistakes and improve your
              understanding.
            </p>
            <ul className=" flex justify-center lg:justify-start gap-8 lg:gap-12 xl:gap-14 text-white font-medium">
              <li className="flex items-center gap-2">
                <BsFillQuestionCircleFill className="text-white text-lg " />
                <h5>Specialized Tests</h5>
              </li>
              <li className="flex items-center gap-2">
                <BsCheckCircleFill className="text-white text-lg " />
                <h5>Instant Feedback</h5>
              </li>
            </ul>
          </article>
          <img
            src="/feature-3.svg"
            alt="mockup"
            className="w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[21rem] "
          />
        </ul>
      </article>
    </section>
  );
};

export default Feature3;
