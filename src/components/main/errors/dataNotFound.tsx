import React from "react";
import { BsExclamationCircle, BsExclamationTriangle } from "react-icons/bs";

interface DataNotFoundProps {
  text: string;
  error?: boolean;
}

const DataNotFound: React.FC<DataNotFoundProps> = ({ text, error }) => {
  return (
    <article className="px-4 mx-auto max-w-screen-sm flex flex-col items-center gap-8 my-52 mg:my-60 lg:my-72">
      <ul className="flex lg:items-center gap-3">
        {error ? (
          <BsExclamationCircle className="text-main mt-1 lg:mt-[1px] text-lg min-w-[1.125rem]" />
        ) : (
          <BsExclamationTriangle className="text-main mt-1 lg:mt-[1px] text-lg min-w-[1.125rem]" />
        )}
        <p className="text-main">{text}</p>
      </ul>
    </article>
  );
};

export default DataNotFound;
