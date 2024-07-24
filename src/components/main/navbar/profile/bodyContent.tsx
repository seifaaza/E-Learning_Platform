import { Button } from "@/components/ui/button";
import { mainStore } from "@/store/mainStore";
import Link from "next/link";
import {
  BsBookmarkFill,
  BsClipboard2DataFill,
  BsEyeFill,
} from "react-icons/bs";

interface BodyContentProps {
  username: string | null | undefined;
}

const BodyContent: React.FC<BodyContentProps> = ({ username }) => {
  const linksList = [
    {
      title: "saved",
      link: "/saved",
      icon: <BsBookmarkFill className="mr-2 h-[.85rem] pb-[1px]" />,
    },
    {
      title: "watching list",
      link: "/watching",
      icon: <BsEyeFill className="mr-2 h-4 pb-[1px]" />,
    },
    {
      title: "learning path",
      link: "/learning-path",
      icon: <BsClipboard2DataFill className="mr-2 pb-[1px] h-4" />,
    },
  ];

  const { setSheetOpen } = mainStore();
  const links = linksList.map((item, index) => (
    <li key={index} className="w-full">
      <Link
        href={`/${username ? `${username}/${item.link}` : ""}`}
        onClick={() => setSheetOpen(false)}
        className="w-full block"
      >
        <Button
          variant="link"
          className="w-full flex justify-start capitalize text-white hover:no-underline hover:bg-blue-800/60 duration-300"
        >
          {item.icon}
          <span>{item.title}</span>
        </Button>
      </Link>
    </li>
  ));

  return <ul className="w-full flex flex-col gap-4">{links}</ul>;
};

export default BodyContent;
