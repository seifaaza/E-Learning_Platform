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
    <section className="bg-blue-50 ">
      <article className="container px-3 pt-4 pb-14 min-h-[calc(100vh-56px)]">
        <EmptyData
          imgSrc="/no-started.svg"
          text="Oops! You don’t have any certificates yet. Complete a course and pass a test to earn your first certificate!"
        />
      </article>
    </section>
  );
};

export default Certificates;
