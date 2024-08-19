import React from "react";
import { BsExclamationCircleFill } from "react-icons/bs";

interface DataNotFoundProps {
  text: string;
}

const DataNotFound: React.FC<DataNotFoundProps> = ({ text }) => {
  return (
    <article className="px-4 mx-auto max-w-screen-sm flex flex-col items-center gap-8 my-52 mg:my-60 lg:my-72">
      <ul className="flex lg:items-center gap-3">
        <BsExclamationCircleFill className="text-blue-600 mt-1 lg:mt-[1px] text-lg min-w-[1.125rem]" />
        <p className="text-blue-600">{text}</p>
      </ul>
    </article>
  );
};

export default DataNotFound;
