import React, { Suspense } from "react";
import WatchingList from "./watchingList";
import ListLoader from "@/components/main/loaders/listLoader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface WatchingProps {
  params: {
    username: string;
  };
}

const WatchingItem: React.FC<WatchingProps> = async ({
  params: { username },
}) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <section className="bg-blue-50">
      <article className="container px-3 pt-12 pb-20">
        <div className="mt-8 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <Suspense fallback={<ListLoader />}>
            <WatchingList username={username} />
          </Suspense>
        </div>
      </article>
    </section>
  );
};

export default WatchingItem;
