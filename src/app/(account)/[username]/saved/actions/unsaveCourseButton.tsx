"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsBookmarkDash } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleUnsaveCourse = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/save?courseId=${courseId}`
      );
      mutate(); // Trigger revalidation
    } catch (error: any) {
      toast({
        title: "Server Error",
        description:
          "Failed to remove course from saved courses. Please refresh the page or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleUnsaveCourse}
      disabled={isLoading}
      className="!pl-[.65rem] hover:!no-underline hover:!bg-main hover:!text-white "
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
