import EmptyData from "@/components/main/errors/dataEmpty";
import React from "react";
import { BsClipboard2PulseFill } from "react-icons/bs";

interface LearningProps {
  params: {
    username: string;
  };
}

const Learning: React.FC<LearningProps> = ({ params: { username } }) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-4 pb-14 min-h-[calc(100vh-56px)]">
        <ul className="flex lg:items-center gap-[.6rem] mt-4 ml-4">
          <BsClipboard2PulseFill className="text-gray-700 mt-1 lg:mt-[1px] text-sm" />
          <p className="text-gray-700 text-base">Your Learning Tracking</p>
        </ul>
        <EmptyData
          imgSrc="/no-learning.svg"
          text="Oops! Your learning progress is empty. Start a course or take a test to begin tracking your achievements!"
        />
      </article>
    </section>
  );
};

export default Learning;
