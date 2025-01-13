import EmptyData from "@/components/main/errors/dataEmpty";
import React from "react";

interface LearningProps {
  params: {
    username: string;
  };
}

const Learning: React.FC<LearningProps> = ({ params: { username } }) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-4 pb-14 min-h-[calc(100vh-56px)]">
        <EmptyData
          imgSrc="/no-learning.svg"
          text="Oops! Your learning progress is empty. Start a course or take a test to begin tracking your achievements!"
        />
      </article>
    </section>
  );
};

export default Learning;
