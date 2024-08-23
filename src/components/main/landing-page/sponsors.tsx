import React from "react";
import { Doodle12 } from "../SVGs/doodles";
import { CodeCademy, Udemy, Udacity, Duolingo, Edx } from "../SVGs/logos";
import Link from "next/link";

const Sponsors = () => {
  const logoStyle = "h-6 md:h-8 ld:h-10 ";
  const sponsorsList = [
    <Link key="udemy" href="https://www.udemy.com" target="_blank">
      <Udemy className={logoStyle} />
    </Link>,
    <Link key="edx" href="https://www.edx.org" target="_blank">
      <Edx className={logoStyle} />
    </Link>,
    <Link key="codecademy" href="https://www.codecademy.com" target="_blank">
      <CodeCademy className={logoStyle} />
    </Link>,
    <Link key="udacity" href="https://www.udacity.com" target="_blank">
      <Udacity className={logoStyle} />
    </Link>,
    <Link key="duolingo" href="https://www.duolingo.com" target="_blank">
      <Duolingo className={logoStyle} />,
    </Link>,
  ];

  const sponsors = sponsorsList.map((item, index) => (
    <li key={index} className="w-fit">
      {item}
    </li>
  ));
  return (
    <section className="bg-least px-3 py-16 md:py-20 lg:py-24 relative isolate overflow-hidden text-center">
      <Doodle12
        color="least"
        className="rotate-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 md:w-60"
      />

      <h2 className="text-white !mb-14">trusted course providers</h2>
      <ul className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-14 xl:gap-16">
        {sponsors}
      </ul>
    </section>
  );
};

export default Sponsors;
