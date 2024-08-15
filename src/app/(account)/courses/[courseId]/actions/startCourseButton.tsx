"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface StartCourseButtonProps {
  courseId: string;
  lessonId: string;
}

const StartCourseButton: React.FC<StartCourseButtonProps> = ({
  courseId,
  lessonId,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStartCourse = async () => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/start?username=${username}`
      );
      console.log("Course started successfully:", response.data);

      router.push(`/${username}/courses/${courseId}?lesson=${lessonId}`);
    } catch (error) {
      console.error("Error starting course:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <Button onClick={handleStartCourse} disabled={isLoading}>
      Start Course
      {isLoading ? (
        <Loader2 className=" ml-2 h-4 animate-spin" />
      ) : (
        <BsArrowRight className=" ml-2 h-4" />
      )}
    </Button>
  );
};

export default StartCourseButton;
