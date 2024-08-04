import React, { Suspense } from "react";
import ListLoader from "@/components/main/loaders/coursesListLoader";
import WatchedList from "./watchedList";

interface WatchedProps {
  params: {
    username: string;
  };
}

const WatchedItem: React.FC<WatchedProps> = async ({
  params: { username },
}) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-10 pb-20">
        <Suspense fallback={<ListLoader />}>
          <WatchedList username={username} />
        </Suspense>
      </article>
    </section>
  );
};

export default WatchedItem;
