"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import RestartCourseButton from "./restartCourseButton";
import { useToast } from "@/components/ui/use-toast";

interface StartCourseButtonProps {
  courseId: string;
  lessonId: string;
}

const StartCourseButton: React.FC<StartCourseButtonProps> = ({
  courseId,
  lessonId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  const { data: session } = useSession();
  const username = session?.user?.username;
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkCourseCompletion = async () => {
      try {
        const completionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/complete-course?courseId=${courseId}`
        );

        setIsCompleted(completionResponse.data.isCompleted);
        if (completionResponse.data.isStarted) {
          setIsStarted(true);
          setCurrentLessonId(completionResponse.data.currentLessonId);
        }
      } catch (error: any) {
        if (username && error.response && error.response.status === 500) {
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
    checkCourseCompletion();
  }, [username, courseId]);

  const handleStartCourse = async () => {
    setIsProcessing(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start-course?courseId=${courseId}`
      );
      router.push(`/${username}/courses/${courseId}?lesson=${lessonId}`);
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        toast({
          title: "Server Error",
          description:
            "An error occurred on the server. Please try again later.",
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

  if (isLoading) {
    return (
      <Button className="hover:!bg-main brightness-90" disabled>
        Loading...
        <Loader2 className="ml-2 h-4 animate-spin" />
      </Button>
    );
  }

  return (
    <>
      {isCompleted ? (
        <RestartCourseButton courseId={courseId} lessonId={lessonId} />
      ) : isStarted ? (
        <Link
          href={`/${username}/courses/${courseId}?lesson=${currentLessonId}`}
        >
          <Button className="hover:!bg-main brightness-90">
            Continue
            <BsArrowRight className="ml-2 h-4" />
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleStartCourse}
          disabled={isLoading || isProcessing}
          className="hover:!bg-main brightness-90"
        >
          {isProcessing ? (
            <>
              Starting...
              <Loader2 className="ml-2 h-4 animate-spin" />
            </>
          ) : (
            <>
              Start Course
              <BsArrowRight className="ml-2 h-4" />
            </>
          )}
        </Button>
      )}
    </>
  );
};

export default StartCourseButton;
