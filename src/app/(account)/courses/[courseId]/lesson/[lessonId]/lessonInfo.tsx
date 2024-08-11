import { Separator } from "@radix-ui/react-separator";

const LessonInfo = () => {
  return (
    <ul className="pt-4 flex flex-col gap-2">
      <Separator
        orientation="horizontal"
        className="h-[1px] bg-gray-800 opacity-15"
      />
      <article className="flex flex-col gap-1">
        <h5 className=" text-gray-900 font-medium">Description</h5>
        <h6 className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut
          nesciunt, velit nostrum ratione doloremque magnam corporis saepe
          beatae earum, nisi, quaerat neque autem distinctio eos nulla! Nulla,
          maiores obcaecati?
        </h6>
      </article>
    </ul>
  );
};

export default LessonInfo;
