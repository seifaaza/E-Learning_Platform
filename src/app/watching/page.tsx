import React, { Suspense } from "react";
import Heading from "@/components/main/heading";
import WatchingList from "./watchingList";
import ListLoader from "@/components/main/loaders/listLoader";

export default function InProgress() {
  return (
    <section className="container px-3 py-12">
      <Heading
        title="resume learning at your convenience"
        subtitle="Access videos you've started watching but haven't completed."
      />
      <div className="mt-8 grid gap-x-6 gap-y-6 lg:gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <Suspense fallback={<ListLoader />}>
          <WatchingList />
        </Suspense>
      </div>
    </section>
  );
}
