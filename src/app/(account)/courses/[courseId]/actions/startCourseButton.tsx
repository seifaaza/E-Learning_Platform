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

interface StartCourseButtonProps {
  courseId: string;
  lessonId: string;
}

const StartCourseButton: React.FC<StartCourseButtonProps> = ({
  courseId,
  lessonId,
}) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const router = useRouter();

  const username = session?.user?.username;

  useEffect(() => {
    const checkCourseCompletion = async () => {
      if (!username) return;
      try {
        const completionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/complete-course?courseId=${courseId}`
        );
        setIsCompleted(completionResponse.data.isCompleted);
      } catch (error) {
        console.error("Error fetching course completion status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkCourseCompletion();
  }, [username, courseId]);

  useEffect(() => {
    const checkCourseStarted = async () => {
      if (!username || isCompleted) return; // No need to check if it's completed
      try {
        const startedCoursesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start?courseId=${courseId}`
        );
        setIsStarted(startedCoursesResponse.data.isStarted);
        setCurrentLessonId(startedCoursesResponse.data.currentLessonId);
      } catch (error) {
        console.error("Error fetching course start status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkCourseStarted();
  }, [username, courseId, isCompleted]);

  const handleStartCourse = async () => {
    if (status === "loading") return;

    setIsProcessing(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start?courseId=${courseId}`
      );
      router.push(`/${username}/courses/${courseId}?lesson=${lessonId}`);
    } catch (error) {
      console.error("Error starting course:", error);
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
