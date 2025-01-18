"use client";

import { Button } from "@/components/ui/button";
import { BsArrowRight } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useState } from "react";

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
  return (
    <Button
      //   onClick={handleStartCourse}
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
