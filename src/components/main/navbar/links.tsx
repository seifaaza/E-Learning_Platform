import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Links = () => {
  return (
    <ul className="flex justify-center items-center gap-2">
      <li>
        <Link href="/lessons">
          <Button
            variant="link"
            className="capitalize text-white hover:no-underline hover:opacity-80"
          >
            Lessons
          </Button>
        </Link>
      </li>
      <li className="bg-white h-8 w-[.5px]"></li>
      <li>
        <Link href="/watching">
          <Button
            variant="link"
            className="capitalize text-white hover:no-underline hover:opacity-80"
          >
            Watching
          </Button>
        </Link>
      </li>
    </ul>
  );
};

export default Links;
