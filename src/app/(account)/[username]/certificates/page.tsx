import EmptyData from "@/components/main/errors/dataEmpty";
import React from "react";
import { BsAwardFill } from "react-icons/bs";

interface CertificatesProps {
  params: {
    username: string;
  };
}

const Certificates: React.FC<CertificatesProps> = ({
  params: { username },
}) => {
  return (
    <section className="bg-blue-50 ">
      <article className="container px-3 pt-4 pb-14 min-h-[calc(100vh-56px)]">
        <ul className="flex lg:items-center gap-[.6rem] mt-4 ml-4">
          <BsAwardFill className="text-gray-700 mt-1 lg:mt-[1px] text-sm" />
          <p className="text-gray-700 text-base">Your Certificates</p>
        </ul>
        <EmptyData
          imgSrc="/no-certif.svg"
          text="Oops! You don’t have any certificates yet. Complete a course and pass a test to earn your first certificate!"
        />
      </article>
    </section>
  );
};

export default Certificates;
