"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinksProps {
  username: string | null | undefined;
}

const Links: React.FC<LinksProps> = ({ username }) => {
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
        <Link href={`/${username ? `${username}/watching` : ""}`}>
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
