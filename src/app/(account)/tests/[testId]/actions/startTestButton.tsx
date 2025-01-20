"use client";

import { Button } from "@/components/ui/button";
import { BsArrowRight, BsCheck2Square } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface StartTestButtonProps {
  testId: string;
  questionId: string;
}

const StartTestButton: React.FC<StartTestButtonProps> = ({
  testId,
  questionId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );

  const { data: session } = useSession();
  const username = session?.user?.username;

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkTestCompletion = async () => {
      try {
        const completionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/complete-test?testId=${testId}`
        );
        console.log(completionResponse);

        setIsCompleted(completionResponse.data.isCompleted);
        if (completionResponse.data.isStarted) {
          setIsStarted(true);
          setCurrentQuestionId(completionResponse.data.currentQuestionId);
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
    checkTestCompletion();
  }, [username, testId]);

  if (isLoading) {
    return (
      <Button className="hover:!bg-main brightness-90" disabled>
        Loading...
        <Loader2 className="ml-2 h-4 animate-spin" />
      </Button>
    );
  }

  const handleStartTest = async () => {
    setIsProcessing(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start-test?testId=${testId}`
      );
      router.push(`/${username}/tests/${testId}?question=${questionId}`);
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
          title: "Test Already Started",
          description: "Failed to start the test. Please try again later",
          variant: "destructive",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {isCompleted ? (
        <li className="flex items-center gap-2 text-main bg-main/10 rounded-lg py-2 px-4 whitespace-nowrap">
          <h6 className="!font-medium"> Test Passed</h6>
          <BsCheck2Square />
        </li>
      ) : isStarted ? (
        <Link
          href={`/${username}/tests/${testId}?question=${currentQuestionId}`}
        >
          <Button className="hover:!bg-main brightness-90">
            Continue
            <BsArrowRight className="ml-2 h-4" />
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleStartTest}
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
              Start Test
              <BsArrowRight className="ml-2 h-4" />
            </>
          )}
        </Button>
      )}
    </>
  );
};

export default StartTestButton;
