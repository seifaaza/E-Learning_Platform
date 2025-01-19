import React from "react";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";

import TestInfoBody from "./testInfoBody";
import TestInfoHeader from "./testInfoHeader";

interface TestDataProps {
  testId: string;
}

const TestData: React.FC<TestDataProps> = async ({ testId }) => {
  const fetchTestById = async (testId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tests/${testId}`
      );
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 500)
      ) {
        error();
      } else {
        throw error;
      }
    }
  };

  const test = await fetchTestById(testId);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="mt-6">
      <TestInfoHeader
        testId={testId}
        title={test.title}
        thumbnail={test.thumbnail}
        description={test.description}
        time={test.time}
        source={test.source}
        language={test.language}
        createdAt={formatDate(test.createdAt)}
        passingScore={test.passingScore}
        numberOfQuestions={test.numberOfQuestions}
        firstQuestionId={test.firstQuestionId}
        achieversNumber={test.achieversCount}
      />
      <Separator
        orientation="vertical"
        className="h-[1px] bg-gray-800 opacity-20 my-10"
      />
      <TestInfoBody objectives={test.objectives} topics={test.topics} />
    </section>
  );
};

export default TestData;
