"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsBookmarkXFill, BsBookmarkFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

interface SaveCourseButtonProps {
  courseId: string;
}

const SaveCourseButton: React.FC<SaveCourseButtonProps> = ({ courseId }) => {
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const username = session?.user?.username;

  useEffect(() => {
    const fetchSavedCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/save`
        );
        const savedCourses = response.data;

        // Check if the current course is already saved
        const courseIsSaved = savedCourses.some(
          (course: { _id: string }) => course._id === courseId
        );
        setIsSaved(courseIsSaved);
      } catch (error) {
        console.error("Error fetching saved courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedCourses();
  }, [status, username, courseId]);

  const handleSaveCourse = async () => {
    setIsProcessing(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/save?courseId=${courseId}`
      );
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUnsaveCourse = async () => {
    setIsProcessing(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/save?courseId=${courseId}`
      );
      setIsSaved(false);
    } catch (error) {
      console.error("Error unsaving course:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={isSaved ? handleUnsaveCourse : handleSaveCourse}
      variant="link"
      className="hover:!no-underline !border-[1px] !border-main hover:!bg-main hover:!text-white"
      disabled={isLoading || isProcessing}
    >
      {isProcessing ? (
        <>
          {isSaved ? "Unsaving..." : "Saving..."}
          <Loader2 className="ml-2 h-4 animate-spin" />
        </>
      ) : (
        <>
          {isSaved ? "Unsave" : "Save For Later"}
          {isSaved ? (
            <BsBookmarkXFill className="ml-2 h-4" />
          ) : (
            <BsBookmarkFill className="ml-2 h-4" />
          )}
        </>
      )}
    </Button>
  );
};

export default SaveCourseButton;
