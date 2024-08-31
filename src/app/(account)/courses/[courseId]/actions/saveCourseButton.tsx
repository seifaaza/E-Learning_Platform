"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsBookmarkXFill, BsBookmarkFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SaveCourseButtonProps {
  courseId: string;
}

const SaveCourseButton: React.FC<SaveCourseButtonProps> = ({ courseId }) => {
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const username = session?.user?.username;
  const { toast } = useToast();

  useEffect(() => {
    const fetchSavedCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/save?courseId=${courseId}`
        );
        setIsSaved(response.data.isSaved);
      } catch (error: any) {
        if (username) {
          toast({
            title: "Server Error",
            description:
              "An error occurred on the server. Please try again later.",
            variant: "destructive",
          });
        }
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
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        toast({
          title: "Server Error",
          description:
            "An error occurred on the server. Please refresh the page or try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Course Already saved",
          description: "Please go to Saved section to complete it.",
          variant: "destructive",
        });
      }
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
    } catch (error: any) {
      toast({
        title: "Server Error",
        description:
          "Failed to remove course from saved courses. Please refresh the page or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const isButtonDisabled = isLoading || isProcessing;

  return (
    <Button
      onClick={isSaved ? handleUnsaveCourse : handleSaveCourse}
      variant="link"
      className="hover:!no-underline !border-[1px] !border-main hover:!bg-main hover:!text-white"
      disabled={isButtonDisabled}
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
