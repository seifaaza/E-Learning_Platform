import React from "react";
import { CommentRatings } from "../rating";
import { Progress } from "@/components/ui/progress";
import {
  BsFillPatchCheckFill,
  BsMortarboardFill,
  BsStopwatch,
} from "react-icons/bs";

interface CardProps {
  thumbnail: string;
  title: string;
  time?: string;
  averageRating?: number;
  isCertified?: boolean;
  achieversCount?: number;
  btn?: React.ReactNode;
  link?: boolean;
  progress?: number;
  miniCard?: boolean;
}

const Card: React.FC<CardProps> = ({
  thumbnail,
  title,
  time,
  averageRating,
  isCertified,
  achieversCount,
  btn,
  link = true,
  progress,
  miniCard,
}) => {
  return (
    <section
      className={`${miniCard && "flex gap-4 xl:gap-5"} p-2 md:p-4 ${
        link
          ? "hover:scale-[1.02] duration-300 bg-white/50 hover:bg-white/80 w-full"
          : ""
      }`}
    >
      <article className={`relative ${miniCard ? "h-32 w-32" : "min-w-fit"} `}>
        <img
          // src={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
          src={`https://media.istockphoto.com/id/461863313/vector/blue-geometrical-mosaic-background.jpg?s=612x612&w=0&k=20&c=xwIMaK-eNrqy49rOE1IEGFrUGeHMKK9W9XOxMfah2m4=`}
          alt={`${title} poster`}
          className={`${
            miniCard ? "aspect-square" : "aspect-video"
          }  w-full h-full object-cover rounded-lg`}
        />
      </article>
      <ul
        className={`${
          miniCard ? "flex-col items-start gap-2" : "gap-8 pl-1 pb-1 pt-2"
        }   flex justify-between`}
      >
        <li className="flex flex-col gap-1 ">
          <h4 className="text-gray-700 font-medium max-w-64 truncate text-lg">
            {title}
          </h4>

          {!miniCard && !btn && (
            <CommentRatings
              rating={averageRating ?? 0}
              size={18}
              className="pl-1 w-fit"
            />
          )}
        </li>
        <li
          className={`flex flex-col ${
            miniCard ? "items-start gap-2" : "items-end gap-1"
          } `}
        >
          {btn
            ? btn
            : isCertified && (
                <ul className="flex items-center gap-2">
                  <h6 className="!text-sm text-main whitespace-nowrap ">
                    With Certificate
                  </h6>
                  <BsFillPatchCheckFill
                    className={`${miniCard && "-order-1"} h-6 text-main`}
                  />
                </ul>
              )}
          <ul className="flex items-center gap-2">
            <h6 className="!text-sm text-gray-600 whitespace-nowrap flex gap-2">
              {achieversCount} {miniCard && "Achievers"}
            </h6>
            <BsMortarboardFill
              className={`${miniCard && "-order-1"} h-6 text-gray-600`}
            />
          </ul>
          {time && (
            <ul className="flex items-center gap-2">
              <BsStopwatch className=" h-6 text-gray-600" />
              <h6 className="!text-sm text-gray-600 whitespace-nowrap flex gap-2">
                {time}
              </h6>
            </ul>
          )}
        </li>
      </ul>

      {progress !== undefined && (
        <ul className="flex gap-3 items-center">
          <Progress value={progress} className="w-full h-[.2rem] bg-main/20" />
          <span className="text-main text-sm">
            {progress === 0.1 ? 0 : progress}%
          </span>
        </ul>
      )}
    </section>
  );
};

export default Card;
