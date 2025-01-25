import { Separator } from "@radix-ui/react-separator";

// Define the type for the fetched
interface QuestionDataProps {
  username: string;
  testId: string;
  questionId: string;
}

const QuestionData: React.FC<QuestionDataProps> = async ({
  username,
  testId,
  questionId,
}) => {
  //   const fetchLessonById = async (testId: string, questionId: string) => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/start-course/${testId}?questionId=${questionId}`
  //       );

  //       return response.data;
  //     } catch (error: any) {
  //       console.log(error);

  //       if (
  //         error.response &&
  //         (!questionId ||
  //           error.response.status === 404 ||
  //           error.response.status === 500)
  //       ) {
  //         error();
  //       } else {
  //         throw error;
  //       }
  //     }
  //   };

  //   const lesson = await fetchLessonById(testId, questionId);

  return (
    <>
      <ul className="mt-4 xl:mt-6 flex flex-col gap-4 lg:gap-10 xl:gap-12 lg:flex-row lg:justify-between"></ul>
      <ul className="text-black text-2xl">
        {username}
        {testId}
        {questionId}
      </ul>
      <Separator
        orientation="vertical"
        className="h-[1px] bg-gray-800 opacity-20 my-8"
      />
    </>
  );
};

export default QuestionData;
