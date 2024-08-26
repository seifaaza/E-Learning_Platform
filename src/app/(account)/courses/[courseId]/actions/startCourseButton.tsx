"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

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
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const router = useRouter();

  const username = session?.user?.username;

  useEffect(() => {
    const fetchStartedCourses = async () => {
      try {
        if (!username) return;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start`
        );
        const startedCourses = response.data;

        // Check if the current course is in the started courses
        const courseStarted = startedCourses.some(
          (course: { _id: string }) => course._id === courseId
        );
        setIsStarted(courseStarted);
      } catch (error) {
        console.error("Error fetching started courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStartedCourses();
  }, [username, courseId]);

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

  return (
    <>
      {isStarted ? (
        <Link href={`/${username}/courses/${courseId}?lesson=${lessonId}`}>
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
              Start
              <BsArrowRight className="ml-2 h-4" />
            </>
          )}
        </Button>
      )}
    </>
  );
};

export default StartCourseButton;
