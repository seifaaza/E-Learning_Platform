import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Doodle1, Doodle15, Doodle2, Doodle20, Doodle8 } from "../SVGs/doodles";

const FAQ = () => {
  const questionsList = [
    {
      title: "Can I retake quizzes?",
      response:
        "Yes, you can retake quizzes to improve your scores and enhance your learning.",
    },
    {
      title: "Do I receive a certificate after completing a course?",
      response:
        "Yes, you will receive a verified certificate upon successful completion of each course.",
    },
    {
      title: "How are my test results tracked?",
      response:
        "Test results are recorded automatically. You can view and track your results over time in your profile.",
    },
    {
      title: "How do I resume a course from where I left off?",
      response:
        "Courses automatically remember your last watched point. When you return, it will start from where you left off.",
    },
  ];

  const questions = questionsList.map((item, index) => (
    <AccordionItem key={index} value={`item-${index}`} className="border-none">
      <AccordionTrigger className="text-lg hover:!no-underline hover:translate-x-1 hover:opacity-75 duration-500 text-left">
        <h3 className="text-white font-medium ">{item.title}</h3>
      </AccordionTrigger>
      <AccordionContent>
        <p className="text-blue-50">{item.response}</p>
      </AccordionContent>
    </AccordionItem>
  ));

  return (
    <section className="bg-least isolate overflow-hidden">
      <ul className="relative xl:container ">
        <Doodle1 color="least" className="bottom-20 left-40 w-32 absolute" />
        <Doodle2
          color="least"
          className="bottom-1/2 left-0 xl:left-[30%] w-52 absolute"
        />
        <Doodle8 color="least" className="top-24 left-64 w-24 absolute" />
        <Doodle20 color="least" className="bottom-20 right-44 w-28 absolute" />
        <Doodle15
          color="least"
          className="invisible lg:visible bottom-[15%] left-[45%] w-44 absolute"
        />
        <article className="px-3 py-16 md:py-20 lg:py-24 container text-center relative">
          <h2 className="text-white">Frequently Asked Questions</h2>
          <Accordion
            type="single"
            collapsible
            className="max-w-xl mx-auto text-white"
          >
            {questions}
          </Accordion>
        </article>
      </ul>
    </section>
  );
};

export default FAQ;
