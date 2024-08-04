import React from "react";

interface DataEmptyProps {
  imgSrc: string;
  text: string;
}

const DataEmpty: React.FC<DataEmptyProps> = ({ imgSrc, text }) => {
  return (
    <article className="px-4 mx-auto max-w-screen-sm flex flex-col items-center gap-8 my-10">
      <img
        src={imgSrc}
        alt="Empty data"
        className="h-64 md:h-72 lg:h-80 xl:h-96"
      />
      <p className="text-blue-600 max-w-md !text-center">{text}</p>
    </article>
  );
};

export default DataEmpty;
