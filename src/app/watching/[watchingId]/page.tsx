import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import WatchingDetails from "./watchingDetails";

interface WatchingItemProps {
  params: {
    watchingId: string;
  };
}

const WatchingItem: React.FC<WatchingItemProps> = ({
  params: { watchingId },
}) => {
  return (
    <section className="container px-3 xl:px-8 my-10">
      <Link href="/watching" className="my-6">
        <Button>
          <BsChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="mt-6 flex flex-col gap-10 xl:gap-12 lg:flex-row lg:justify-between">
        <WatchingDetails watchingId={watchingId} />
      </div>
    </section>
  );
};

export default WatchingItem;
