import BackButton from "@/components/main/backButton";
import QuestionData from "./question/[questionId]/questionData";

interface TestItemProps {
  params: {
    username: string;
    testId: string;
  };
  searchParams: {
    question: string;
  };
}

const TestItem = async ({
  params: { username, testId },
  searchParams: { question },
}: TestItemProps) => {
  return (
    <section className="bg-blue-50 min-h-[calc(100vh-56px)]">
      <article className="container px-3 xl:px-8 pt-6 pb-20">
        <BackButton />
        <QuestionData
          username={username}
          testId={testId}
          questionId={question}
        />
      </article>
      {/* <CourseCompleted username={username} testId={testId} /> */}
    </section>
  );
};

export default TestItem;
