"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsBookmarkDash } from "react-icons/bs";
import { Loader2 } from "lucide-react";

interface UnsaveCourseButtonProps {
  courseId: string;
  username: string;
  mutate: () => void; // Add mutate prop
}

const UnsaveCourseButton: React.FC<UnsaveCourseButtonProps> = ({
  courseId,
  username,
  mutate,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUnsaveCourse = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/save?username=${username}`
      );
      mutate(); // Trigger revalidation
    } catch (error) {
      console.error("Error unsaving course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleUnsaveCourse}
      className="!pl-[.65rem] hover:!no-underline hover:!bg-blue-600 hover:!text-white "
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 animate-spin" />
      ) : (
        <BsBookmarkDash className="mr-2 h-4" />
      )}
      {isLoading ? "Unsaving..." : "Unsave Course"}
    </Button>
  );
};

export default UnsaveCourseButton;
