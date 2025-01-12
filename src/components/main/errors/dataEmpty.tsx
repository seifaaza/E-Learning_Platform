import React from "react";

interface EmptyDataProps {
  imgSrc: string;
  text: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ imgSrc, text }) => {
  return (
    <div className="w-full h-[calc(100vh-124px)]">
      <div className="flex flex-col justify-center items-center gap-6 md:gap-8 h-full">
        <img
          src={imgSrc}
          alt="Empty data"
          className="h-44 md:h-52 lg:h-64 xl:h-72"
        />
        <p className="text-main max-w-xs md:max-w-md !text-center">{text}</p>
      </div>
    </div>
  );
};

export default EmptyData;
