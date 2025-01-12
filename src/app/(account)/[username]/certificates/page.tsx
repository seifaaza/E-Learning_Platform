import EmptyData from "@/components/main/errors/dataEmpty";
import React from "react";

interface CertificatesProps {
  params: {
    username: string;
  };
}

const Certificates: React.FC<CertificatesProps> = ({
  params: { username },
}) => {
  return (
    <section className="bg-blue-50 min-h-[calc(100vh-56px)]">
      <article className="container px-3 pt-4 pb-14 ">
        <EmptyData
          imgSrc="/no-started.svg"
          text="Your Certificates progress is empty. Start a course or take a test to begin tracking your achievements!"
        />
      </article>
    </section>
  );
};

export default Certificates;
