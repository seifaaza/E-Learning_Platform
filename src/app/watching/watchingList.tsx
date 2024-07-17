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
  {
    id: 3,
    img: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    title: "Hello",
    description: "lorem ipsum dolor sit amet lore mauris in he accus tempus",
  },
];

const WatchingList: React.FC = () => {
  const pauseIcon = (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 512 512"
      className="absolute w-10 md:w-12 top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <path
        d="M224 435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8 0-12.2 5.4-12.2 12.1v359.7c0 6.7 5.4 12.2 12.2 12.2h71.6c6.8 0 12.2-5.4 12.2-12.2zM371.8 64h-71.6c-6.7 0-12.2 5.4-12.2 12.1v359.7c0 6.7 5.4 12.2 12.2 12.2h71.6c6.7 0 12.2-5.4 12.2-12.2V76.1c0-6.7-5.4-12.1-12.2-12.1z"
        fill="#ffffff"
      ></path>
    </svg>
  );
  return (
    <>
      {items.map((item) => (
        <Link href={`/watching/${item.id}`} key={item.id}>
          <Card
            img={item.img}
            title={item.title}
            description={item.description}
            icon={pauseIcon}
          />
        </Link>
      ))}
    </>
  );
};

export default WatchingList;
