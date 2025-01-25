import BackButton from "@/components/main/backButton";
import Question from "./question/[questionId]/page";

interface TestItemProps {
  params: {
    username: string;
    testId: string;
  };
  searchParams: {
    question: string;
  };
}

const TestItem: React.FC<TestItemProps> = async ({
  params: { username, testId },
  searchParams: { question },
}) => {
  return (
    <section className="bg-blue-50 min-h-[calc(100vh-56px)]">
      <article className="container px-3 xl:px-8 pt-6 pb-20">
        <BackButton />
        <Question username={username} testId={testId} questionId={question} />
      </article>
      {/* <CourseCompleted username={username} testId={testId} /> */}
    </section>
  );
};

export default TestItem;
