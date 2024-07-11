import React from "react";
import Link from "next/link";
import Card from "@/components/main/card";

interface Item {
  id: number;
  img: string;
  title: string;
  description: string;
}

const items: Item[] = [
  {
    id: 1,
    img: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    title: "Hello",
    description: "lorem ipsum dolor sit amet lore mauris in he accus tempus",
  },
  {
    id: 2,
    img: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    title: "Hello",
    description: "lorem ipsum dolor sit amet lore mauris in he accus tempus",
  },
];

const LessonsList: React.FC = () => {
  const playIcon = (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 512 512"
      className="absolute h-10 md:h-12 w-10 md:w-12 top-[42%] md:top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <path
        d="M405.2 232.9 126.8 67.2c-3.4-2-6.9-3.2-10.9-3.2-10.9 0-19.8 9-19.8 20H96v344h.1c0 11 8.9 20 19.8 20 4.1 0 7.5-1.4 11.2-3.4l278.1-165.5c6.6-5.5 10.8-13.8 10.8-23.1s-4.2-17.5-10.8-23.1z"
        fill="#ffffff"
      ></path>
    </svg>
  );

  return (
    <>
      {items.map((lesson) => (
        <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
          <Card
            img={lesson.img}
            title={lesson.title}
            description={lesson.description}
            icon={playIcon}
          />
        </Link>
      ))}
    </>
  );
};

export default LessonsList;
