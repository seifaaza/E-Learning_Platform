import React from "react";

interface SavedItemProps {
  params: {
    username: string;
  };
}

const SavedItem: React.FC<SavedItemProps> = ({ params: { username } }) => {
  return (
    <section className="bg-blue-50">
      <article className="container px-3 xl:px-8 pt-12 pb-20">
        {/* <ul className="mt-8 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <Suspense fallback={<ListLoader />}>
        <LessonsList />
        </Suspense>
      </ul> */}
      </article>
    </section>
  );
};

export default SavedItem;
