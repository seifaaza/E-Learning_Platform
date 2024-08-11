"use client";

import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

interface ActionProps {
  isPaused: boolean;
}

const Action: React.FC<ActionProps> = ({ isPaused }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ul
      className="absolute top-0 left-0 h-full w-full flex justify-center items-center gap-0 hover:gap-2 bg-blue-600 transition-all duration-400 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? "scale(1.1)" : "scale(1)",
      }}
    >
      <li className="text-sm text-white capitalize">
        {isPaused ? "resume" : "start"} course
      </li>
      <li>
        <BsArrowRight className="text-[1.4rem] text-white" />
      </li>
    </ul>
  );
};

export default Action;
