"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsArrowRight, BsBookmark } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface SaveCourseButtonProps {
  courseId: string;
}

const SaveCourseButton: React.FC<SaveCourseButtonProps> = ({ courseId }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveCourse = async () => {
    if (status === "loading") {
      // Handle loading state if needed
      return;
    }

    const username = session?.user?.username;
    if (!username) {
      // Handle case where username is not available
      console.error("Username not available");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/save?username=${username}`
      );
      console.log("Course started successfully:", response.data);
    } catch (error) {
      console.error("Error starting course:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <Button
      onClick={handleSaveCourse}
      variant="link"
      className="hover:!no-underline !border-blue-600 border-[1px] hover:!bg-blue-600 hover:!text-white"
    >
      Save For Later
      {isLoading ? (
        <Loader2 className=" ml-2 h-4 animate-spin" />
      ) : (
        <BsBookmark className="ml-2 h-4" />
      )}
    </Button>
  );
};

export default SaveCourseButton;
