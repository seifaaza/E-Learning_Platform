"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsXLg } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CancelCourseButtonProps {
  username: string;
  courseId: string;
}

const CancelCourseButton: React.FC<CancelCourseButtonProps> = ({
  username,
  courseId,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCancelCourse = async () => {
    if (status === "loading") return;

    setIsLoading(true);

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start?courseId=${courseId}`
      );
      router.push("/courses");
    } catch (error) {
      console.error("Error unsaving course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCancelCourse}
      variant="destructive"
      className="w-fit self-end"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          Cancelling...
          <Loader2 className="ml-2 h-4 animate-spin" />
        </>
      ) : (
        <>
          Cancel Course
          <BsXLg className="ml-2 h-4" />
        </>
      )}
    </Button>
  );
};

export default CancelCourseButton;
