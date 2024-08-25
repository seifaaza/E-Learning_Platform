import React from "react";

interface EmptyDataProps {
  imgSrc: string;
  text: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ imgSrc, text }) => {
  return (
    <article className="px-4 mx-auto max-w-screen-sm flex flex-col items-center gap-8 my-10 md:my-16 lg:my-20">
      <img
        src={imgSrc}
        alt="Empty data"
        className="h-64 md:h-72 lg:h-80 xl:h-96"
      />
      <p className="text-main max-w-md !text-center">{text}</p>
    </article>
  );
};

export default EmptyData;
