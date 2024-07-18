"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinksProps {
  userId: string | null | undefined;
}

const Links: React.FC<LinksProps> = ({ userId }) => {
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
      <li>
        <Link href={`/watching${userId ? `?userId=${userId}` : ""}`}>
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
