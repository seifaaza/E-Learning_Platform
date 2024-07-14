"use client";
import React from "react";
interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const Home: React.FC = () => {
  const backgroundShapes = (
    <>
      <img
        src="/blur.png"
        alt="ss"
        className="absolute bottom-0 left-1/4 w-full -z-10"
      />
      <img
        src="/blur-2.png"
        alt="ss"
        className="absolute bottom-44 -left-1/4 w-2/3 -z-10"
      />
      <img
        src="/blur-3.png"
        alt="ss"
        className="absolute -bottom-10 left-20 h-2/3 -z-10"
      />
      <img
        src="/blur-4.png"
        alt="ss"
        className="absolute top-0 left-1/4 h-2/3 -z-10"
      />
      <img
        src="/shape.svg"
        alt="ss"
        className="absolute top-24 -left-12 w-64 -z-10"
      />
      <img
        src="/shape.svg"
        alt="ss"
        className="absolute bottom-16 left-12 w-32 -z-10"
      />
      <img
        src="/shape.svg"
        alt="ss"
        className="absolute top-6 left-1/3 w-80 -z-10"
      />
      <img
        src="/shape.svg"
        alt="ss"
        className="absolute top-1/4 -right-12 w-96 -z-10"
      />
      <img
        src="/shape.svg"
        alt="ss"
        className="absolute -bottom-2 left-1/4 w-52 -z-10"
      />
      <img
        src="/shape-2.svg"
        alt="ss"
        className="absolute bottom-24 left-[52%] w-52 -z-10 "
      />
      <img
        src="/shape-2.svg"
        alt="ss"
        className="absolute top-24 left-3/4 w-36 -z-10 "
      />
    </>
  );

  const featuresList: Feature[] = [
    {
      title: "interactive video",
      description:
        "Enjoy our video lessons, save your progress, and continue from where you left off.",
      icon: (
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
      ),
    },
    {
      title: "engaging quizzes",
      description:
        "Test your knowledge with interactive quizzes and track your progress.",
      icon: (
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        ></path>
      ),
    },
  ];

  const features = featuresList.map((feature, index) => (
    <div
      key={index}
      className="sm:w-1/2 bg-slate-900 p-3 sm:p-4 lg:p-5 xl:p-6 rounded-lg"
    >
      <div className="flex items-center gap-2 xl:gap-3 mb-[6px] md:mb-2">
        <svg
          className="w-5 md:w-6 xl:w-8 h-5 md:h-6 xl:h-8 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {feature.icon}
        </svg>
        <h3 className=" text-lg md:text-xl font-bold text-white capitalize">
          {feature.title}
        </h3>
      </div>
      <p className="text-sm md:text-base text-gray-200 text-left">
        {feature.description}
      </p>
    </div>
  ));

  const content = (
    <div className=" place-self-center lg:col-span-7 text-center lg:text-left">
      <h1 className="max-w-2xl mb-4 text-3xl sm:text-4xl font-black italic !leading-tight tracking-tight md:text-5xl xl:text-[3.2rem] text-white">
        Interactive Learning, Infinite Possibilities !
      </h1>
      <p className=" max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-200">
        Unlock your potential with our interactive e-learning platform, Engage
        with video lessons and quizzes.
      </p>
      <div className="lg:mt-8 xl:mt-10 flex flex-col sm:flex-row gap-x-8 xl:gap-x-6 gap-y-2 md:gap-12 max-w-2xl">
        {features}
      </div>
    </div>
  );

  const characterShapes = (
    <>
      <img
        src="/circle.svg"
        alt="circle"
        className="absolute w-3 bottom-36 xl:bottom-14 left-16 sm:left-28 md:left-52 lg:left-[57%]"
      />
      <img
        src="/circle.svg"
        alt="circle"
        className="absolute w-2 invisible lg:visible top-32 left-2/4"
      />
      <img
        src="/disc.svg"
        alt="disc"
        className="absolute w-2 bottom-56 sm:bottom-80 lg:bottom-16 right-16 sm:right-20 md:right-36 lg:right-1/4"
      />
      <img
        src="/star.svg"
        alt="star"
        className="absolute w-6 bottom-10 sm:bottom-20 lg:bottom-44 right-24 sm:right-32 md:right-48 lg:right-20"
      />
    </>
  );

  return (
    <div className="h-[calc(100vh-62px)] bg-black relative isolate overflow-hidden">
      {backgroundShapes}
      <section className="pt-10 lg:pt-0 h-full flex md:justify-center items-center relative">
        <div className="container mx-auto px-4 lg:px-10 xl:px-20 flex flex-col lg:flex-row justify-center xl:justify-between items-center gap-8 sm:gap-10 lg:gap-20">
          {content}
          <img
            src="/character.svg"
            alt="character"
            className="w-52 sm:w-72 md:w-80 lg:w-[22rem] xl:w-[27rem]"
          />
          {characterShapes}
        </div>
      </section>
    </div>
  );
};

export default Home;
