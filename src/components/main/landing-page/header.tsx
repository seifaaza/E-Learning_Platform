import {
  Doodle1,
  Doodle10,
  Doodle11,
  Doodle12,
  Doodle13,
  Doodle14,
  Doodle15,
  Doodle16,
  Doodle17,
  Doodle18,
  Doodle19,
  Doodle2,
  Doodle20,
  Doodle3,
  Doodle4,
  Doodle5,
  Doodle6,
  Doodle7,
  Doodle8,
  Doodle9,
} from "../SVGs/doodles";
import { BsCollectionPlayFill, BsClipboard2CheckFill } from "react-icons/bs";

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const Header: React.FC = () => {
  const featuresList: Feature[] = [
    {
      title: "dynamic courses",
      description:
        "Enjoy our video courses, save your progress, and continue from where you left off.",
      icon: (
        <BsCollectionPlayFill className="text-lg md:text-xl lg:text-2xl text-white" />
      ),
    },
    {
      title: "engaging quizzes",
      description:
        "Test your knowledge with interactive quizzes and track your progress.",
      icon: (
        <BsClipboard2CheckFill className="text-lg md:text-xl lg:text-2xl text-white" />
      ),
    },
  ];

  const features = featuresList.map((feature, index) => (
    <ul
      key={index}
      className="sm:w-1/2 bg-blue-700 p-4 lg:p-5 xl:p-6 rounded-lg"
    >
      <li className="flex items-center gap-3 mb-2 md:mb-3">
        {feature.icon}

        <h3 className=" text-lg md:text-xl font-bold text-white capitalize">
          {feature.title}
        </h3>
      </li>
      <p className="text-sm md:text-base text-blue-100 text-left">
        {feature.description}
      </p>
    </ul>
  ));

  const content = (
    <ul className=" place-self-center lg:col-span-7 text-center lg:text-left">
      <h1 className="max-w-2xl mb-4 text-3xl sm:text-4xl font-black !leading-tight tracking-tight md:text-5xl xl:text-[3.2rem] text-white">
        Interactive Learning, Infinite Possibilities !
      </h1>
      <p className=" max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-xl text-blue-50">
        Unlock your potential with our interactive e-learning platform, Engage
        with video lessons and quizzes.
      </p>
      <li className="mt-4 lg:mt-8 xl:mt-10 flex flex-col sm:flex-row gap-x-8 xl:gap-x-6 gap-y-2 md:gap-12 md:max-w-2xl">
        {features}
      </li>
    </ul>
  );

  return (
    <section className="px-3 py-16 md:py-20 lg:py-24 xl:py-32 bg-blue-600 isolate overflow-hidden">
      <article className="relative xl:container ">
        <Doodle1 className="-top-4 left-10 w-24 " />
        <Doodle2 className="invisible lg:visible -top-16 left-64 w-48 " />
        <Doodle3 className="top-40 left-60 w-80 " />
        <Doodle4 className="-bottom-16 left-60 w-20 " />
        <Doodle5 className="-bottom-16 left-6 w-20 " />
        <Doodle6 className="lg:invisible xl:visible -top-32 right-96 w-32 " />
        <Doodle7 className="-top-20 right-0 lg:right-28 w-16 " />
        <Doodle8 className="-bottom-16 right-32 w-32 " />
        <Doodle9 className="-top-32 right-64 w-28 " />
        <Doodle10 className="bottom-10 right-10 w-12 lg:invisible" />
        <Doodle11 className="invisible lg:visible -bottom-16 right-20 w-28 " />
        <Doodle11 className="invisible xl:visible -top-20 left-32 w-20 " />
        <Doodle12 className="bottom-0 left-[45%] w-28 " />
        <Doodle13 className="-top-10 left-1/2 w-28 " />
        <Doodle14 className="lg:invisible xl:visible -top-16 left-[40%] w-28 " />
        <Doodle15 className="invisible lg:visible -bottom-24 left-1/2 w-28 " />
        <Doodle16 className="invisible lg:visible bottom-24 left-[55%] w-20 " />
        <Doodle17 className="invisible lg:visible -bottom-20 left-[60%] w-40 " />
        <Doodle18 className="top-1/4 -left-20 w-52 " />
        <Doodle19 className="top-2/4 -left-10 w-52 lg:invisible" />
        <Doodle20 className="top-[60%] lg:top-2/4 right-4 w-28 lg:w-32 " />

        <ul className=" h-full flex md:justify-center items-center relative">
          <li className=" mx-auto flex flex-col lg:flex-row justify-center xl:justify-between items-center gap-8 sm:gap-10 lg:gap-20">
            {content}
            <img
              src="/illustration-1.svg"
              alt=""
              className="w-60 sm:w-72 md:w-80 lg:w-[22rem] xl:w-[27rem] select-none"
            />
          </li>
        </ul>
      </article>
    </section>
  );
};

export default Header;
