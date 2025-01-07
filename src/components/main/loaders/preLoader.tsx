import React from "react";
import { Logo } from "../SVGs/logos";

const Preloader: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-main">
      <div className="loader w-40 h-44 flex gap-6 flex-col items-center ">
        <div className="flex justify-center items-center gap-2">
          <Logo className="h-7 " />
          <span className="text-white text-3xl xl:text-4xl font-black">
            Learnify
          </span>
        </div>
        <div className="loading w-full h-[.12rem] relative overflow-hidden">
          <div className="absolute top-0 left-0 h-2 w-1/2 bg-white rounded-md animate-loading"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
