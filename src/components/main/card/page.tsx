import React from "react";
import CardIcon from "./cardIcon";
import { CommentRatings } from "../rating";

interface CardProps {
  size?: "large" | "small";
  thumbnail: string;
  title: string;
  pausedAt?: number;
  isPaused?: boolean;
}

const Card: React.FC<CardProps> = ({
  size = "large",
  thumbnail,
  title,
  pausedAt = 0,
  isPaused = false,
}) => {
  return (
    <section className="p-2 md:p-4 hover:scale-[1.02] duration-300 ">
      <article className="relative">
        <img
          src={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
          alt={`${title} poster`}
          className="aspect-video w-full h-full object-cover rounded-lg"
        />

        <span className="absolute h-10 md:h-12 w-10 md:w-12 top-[42%] md:top-[47%] left-1/2 -translate-y-1/2 -translate-x-1/2">
          <CardIcon
            type={isPaused ? "pause" : "play"}
            className="h-8 md:h-10 w-8 md:w-10 fill-white"
          />
        </span>
      </article>

      <ul
        className={`${
          size === "large" && "gap-8"
        } pl-1 pb-1 pt-2 flex justify-between items-center`}
      >
        <h4
          className={`text-blue-600 font-medium truncate ${
            size !== "large" ? "text-sm md:text-base" : ""
          } `}
        >
          {title}
        </h4>
        {size == "large" && (
          <h6 className="text-gray-700 whitespace-nowrap">4 Lessons</h6>
        )}
      </ul>
      <CommentRatings rating={4} size={16} className="pl-1 w-fit" />
    </section>
  );
};

export default Card;
