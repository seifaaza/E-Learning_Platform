import { Button } from "@/components/ui/button";
import { mainStore } from "@/store/mainStore";
import Link from "next/link";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEye,
  BsEyeFill,
  BsClipboard2Data,
  BsClipboard2DataFill,
} from "react-icons/bs";
import { usePathname } from "next/navigation";

interface BodyContentProps {
  username: string | null | undefined;
}

const BodyContent: React.FC<BodyContentProps> = ({ username }) => {
  const iconStyle = "mr-2 h-5";
  const linksList = [
    {
      title: "saved",
      link: "/saved",
      icon: <BsBookmark className={iconStyle} />,
      fillIcon: <BsBookmarkFill className={iconStyle} />,
    },
    {
      title: "watched",
      link: "/watched",
      icon: <BsEye className={iconStyle} />,
      fillIcon: <BsEyeFill className={iconStyle} />,
    },
    {
      title: "learning",
      link: "/learning",
      icon: <BsClipboard2Data className={iconStyle} />,
      fillIcon: <BsClipboard2DataFill className={iconStyle} />,
    },
  ];

  const pathname = usePathname(); // Get the current path

  const { setSheetOpen } = mainStore();

  const links = linksList.map((item, index) => {
    // Determine if the current link matches the pathname
    const isActive =
      pathname === `/${username ? `${username}${item.link}` : ""}`;

    return (
      <li key={index} className="w-full">
        <Link
          href={`/${username ? `${username}${item.link}` : ""}`}
          onClick={() => setSheetOpen(false)}
          className="w-full"
        >
          <Button
            variant="link"
            className={`w-full flex justify-start text-white hover:no-underline hover:bg-blue-800/50 duration-300 ${
              isActive ? "bg-blue-800" : ""
            }`}
          >
            {isActive ? item.fillIcon : item.icon}
            <span>{item.title}</span>
          </Button>
        </Link>
      </li>
    );
  });

  return <ul className="w-full flex flex-col gap-4">{links}</ul>;
};

export default BodyContent;
