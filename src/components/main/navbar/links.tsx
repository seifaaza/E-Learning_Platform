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
        <Link href={`/courses`}>
          <Button
            variant="link"
            className="text-base text-white hover:no-underline hover:opacity-80"
          >
            Courses
          </Button>
        </Link>
      </li>
      <li className="bg-white h-8 w-[.5px]"></li>
      <li>
        <Link href={`/tests`}>
          <Button
            variant="link"
            className="text-base text-white hover:no-underline hover:opacity-80"
          >
            Tests
          </Button>
        </Link>
      </li>
    </ul>
  );
};

export default Links;
