import { Suspense } from "react";
import LessonLoader from "@/components/main/loaders/lessonLoader";
import QuestionData from "./questionData";

interface PageProps {
  params: {
    username: string;
    testId: string;
    questionId: string;
  };
}

const Question = ({ params }: PageProps) => {
  const { username, testId, questionId } = params;

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
