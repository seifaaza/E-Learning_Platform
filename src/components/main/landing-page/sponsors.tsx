import React from "react";
import { Doodle12 } from "../SVGs/doodles";
import { CodeCademy, Udemy, Udacity, Duolingo, Edx } from "../SVGs/logos";

const Sponsors = () => {
  const logoStyle = "h-6 md:h-8 ld:h-10 ";
  const sponsorsList = [
    <Udemy key={1} className={logoStyle} />,
    <Edx key={2} className={logoStyle} />,
    <CodeCademy key={3} className={logoStyle} />,
    <Udacity key={4} className={logoStyle} />,
    <Duolingo key={5} className={logoStyle} />,
  ];
  const sponsors = sponsorsList.map((item, index) => (
    <li key={index} className="w-fit">
      {item}
    </li>
  ));
  return (
    <section className="bg-blue-600 px-3 py-16 md:py-20 lg:py-24 relative isolate overflow-hidden text-center">
      <Doodle12 className="rotate-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 md:w-60" />

      <h1 className=" mb-12 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold !leading-tight tracking-tight text-white capitalize">
        trusted course providers
      </h1>
      <ul className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-14 xl:gap-16">
        {sponsors}
      </ul>
    </section>
  );
};

export default Sponsors;
