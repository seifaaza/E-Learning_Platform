import React from "react";

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <h1 className="text-blue-600 text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold capitalize mb-2">
      {title}
    </h1>
  );
};

export default Heading;
