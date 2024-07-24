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
      title: "Are there any limits to how many videos I can save?",
      response:
        "No, there are no limits to the number of videos you can save to your saved lessons",
    },
    {
      title: "How do I resume a video from where I left off?",
      response:
        "If you’ve saved a video to your watching list, it will automatically remember the last watched point. When you come back to watch the video, it will start from where you left off.",
    },
    {
      title: "How do I access my watching list?",
      response:
        'You can access your watching list from the main menu. Click on "Watching List" to view all the videos you’ve saved to watch later.',
    },
    {
      title: "Can I retake quizzes?",
      response:
        "Yes, you can retake quizzes to improve your scores. Just go to the quiz section and select the quiz you want to retake.",
    },
    {
      title: "How are my quiz results tracked?",
      response:
        "Quiz results are recorded automatically. After completing a quiz, you can view your results and track your progress over time in your profile.",
    },
  ];

  const questions = questionsList.map((item, index) => (
    <AccordionItem key={index} value={`item-${index}`} className="border-none">
      <AccordionTrigger className="hover:!no-underline hover:translate-x-1 hover:opacity-75 duration-500 text-left">
        {item.title}
      </AccordionTrigger>
      <AccordionContent className="text-left">{item.response}</AccordionContent>
    </AccordionItem>
  ));

  return (
    <section className="bg-blue-500 isolate overflow-hidden">
      <ul className="relative xl:container ">
        <Doodle1 className="bottom-20 left-40 w-32 absolute !fill-blue-600/30" />
        <Doodle2 className="bottom-1/2 left-0 xl:left-[30%] w-52 absolute !fill-blue-600/30" />
        <Doodle8 className="top-24 left-64 w-24 absolute !fill-blue-600/30" />
        <Doodle20 className="bottom-20 right-44 w-28 absolute !fill-blue-600/30" />
        <Doodle15 className="invisible lg:visible bottom-[15%] left-[45%] w-44 absolute !fill-blue-600/30" />
        <article className="px-3 py-16 md:py-20 lg:py-24 container text-center relative">
          <h1 className="mb-5 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold !leading-tight tracking-tight text-white capitalize">
            Frequently Asked Questions
          </h1>
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
