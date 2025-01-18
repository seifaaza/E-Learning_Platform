import BackButton from "@/components/main/backButton";

import { Suspense } from "react";
import TestData from "./testData";
import TestInfoLoader from "@/components/main/loaders/testInfoLoader";

interface TestItemProps {
  params: {
    username: string;
    testId: string;
  };
}

const TestItem: React.FC<TestItemProps> = async ({
  params: { username, testId },
}) => {
  return (
    <section className="bg-blue-50 ">
      <article className="container px-3 xl:px-8 pt-6 pb-20 min-h-[calc(100vh-56px)]">
        <BackButton />
        <Suspense fallback={<TestInfoLoader />}>
          <TestData testId={testId} />
        </Suspense>
      </article>
    </section>
  );
};

export default TestItem;
