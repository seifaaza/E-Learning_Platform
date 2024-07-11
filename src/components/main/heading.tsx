import React from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold capitalize mb-2">
        {title}
      </h1>
      <p className="text-base font-light text-gray-300">{subtitle}</p>
    </>
  );
};

export default Heading;
