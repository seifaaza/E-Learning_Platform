import React from "react";
import ItemContent from "@/components/main/itemContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

interface WatchingItemProps {
  params: {
    watchingId: string;
  };
}

const WatchingItem: React.FC<WatchingItemProps> = ({ params }) => {
  console.log(params.watchingId);

  return (
    <section className="container px-3 xl:px-8 my-10">
      <Link href="/lessons" className="my-6">
        <Button variant="secondary">
          <BsChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="mt-6 flex flex-col gap-6 lg:gap-4 xl:gap-0 lg:flex-row lg:justify-between">
        <ItemContent
          videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
          pausedTime={5}
          language="english"
          date="April 2015"
          title="Watching Item with Language"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          tags={["item", "watch"]}
        />
      </div>
    </section>
  );
};

export default WatchingItem;
