"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="link"
      className="!pl-[.65rem] hover:!no-underline !border-main border-[1px] hover:!bg-main hover:!text-white"
    >
      <BsChevronLeft className="mr-2 h-4" />
      Back
    </Button>
  );
};

export default BackButton;
