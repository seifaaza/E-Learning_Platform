import { Suspense } from "react";

import LessonLoader from "@/components/main/loaders/lessonLoader";
import QuestionData from "./questionData";

interface QuestionItemProps {
  username: string;
  testId: string;
  questionId: string;
}

const Question: React.FC<QuestionItemProps> = ({
  username,
  testId,
  questionId,
}) => {
  return (
    <Suspense fallback={<LessonLoader />}>
      <QuestionData
        username={username}
        testId={testId}
        questionId={questionId}
      />
    </Suspense>
  );
};

export default Question;
