import BackButton from "@/components/main/backButton";

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
    <section className="bg-blue-50 min-h-[calc(100vh-56px)]">
      <article className="container px-3 xl:px-8 pt-6 pb-20">
        <BackButton />
        {username}
        {testId}
      </article>
    </section>
  );
};

export default TestItem;
