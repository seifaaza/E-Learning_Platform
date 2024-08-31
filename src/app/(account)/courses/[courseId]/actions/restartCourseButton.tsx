"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { mainStore } from "@/store/mainStore";

interface RestartCourseButtonProps {
  courseId: string;
  lessonId: string;
}

const RestartCourseButton: React.FC<RestartCourseButtonProps> = ({
  courseId,
  lessonId,
}) => {
  const { data: session } = useSession();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  const username = session?.user?.username;

  const { toast } = useToast();
  const { setDialogOpen } = mainStore();

  const handleRestartCourse = async () => {
    setIsProcessing(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/restart-course?courseId=${courseId}`
      );
      setDialogOpen(false);
      router.push(`/${username}/courses/${courseId}?lesson=${lessonId}`);
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
          title: "Course Already Started",
          description: "Please go to In Progress section to complete it.",
          variant: "destructive",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handleRestartCourse}
      disabled={isProcessing}
      className="hover:!bg-main brightness-90"
    >
      {isProcessing ? (
        <>
          Restarting...
          <Loader2 className="ml-2 h-4 animate-spin" />
        </>
      ) : (
        <>
          Restart Course
          <BsArrowCounterclockwise className="ml-2 h-4" />
        </>
      )}
    </Button>
  );
};

export default RestartCourseButton;
