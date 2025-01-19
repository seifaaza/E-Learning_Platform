"use client";

import { Button } from "@/components/ui/button";
import { BsArrowRight } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface StartTestButtonProps {
  testId: string;
  questionId: string;
}

const StartTestButton: React.FC<StartTestButtonProps> = ({
  testId,
  questionId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { data: session } = useSession();
  const username = session?.user?.username;

  const router = useRouter();
  const handleStartTest = async () => {
    setIsProcessing(true);

    router.push(`/${username}/tests/${testId}?question=${questionId}`);
  };
  return (
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
  );
};

export default StartTestButton;
