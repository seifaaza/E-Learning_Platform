import { Button } from "@/components/ui/button";
import { mainStore } from "@/store/mainStore";
import Link from "next/link";
import {
  BsBookmark,
  BsBookmarkFill,
  BsRocketTakeoff,
  BsRocketTakeoffFill,
  BsClipboard2Data,
  BsClipboard2DataFill,
  BsAwardFill,
  BsAward,
} from "react-icons/bs";
import { usePathname } from "next/navigation";

interface BodyContentProps {
  username: string | null | undefined;
}

const BodyContent: React.FC<BodyContentProps> = ({ username }) => {
  const iconStyle = "mr-2 h-6";
  const linksList = [
    {
      title: "in progress",
      link: "/progress",
      icon: <BsRocketTakeoff className={iconStyle} />,
      fillIcon: <BsRocketTakeoffFill className={iconStyle} />,
    },
    {
      title: "saved",
      link: "/saved",
      icon: <BsBookmark className={iconStyle} />,
      fillIcon: <BsBookmarkFill className={iconStyle} />,
    },
    {
      title: "learning",
      link: "/learning",
      icon: <BsClipboard2Data className={iconStyle} />,
      fillIcon: <BsClipboard2DataFill className={iconStyle} />,
    },
    {
      title: "certificates",
      link: "/certificates",
      icon: <BsAward className={iconStyle} />,
      fillIcon: <BsAwardFill className={iconStyle} />,
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
            className={`w-full flex justify-start text-white hover:no-underline hover:bg-main duration-300 ${
              isActive ? "bg-main" : ""
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
