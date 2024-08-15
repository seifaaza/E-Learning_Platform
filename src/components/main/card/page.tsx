import React from "react";
import CardIcon from "./cardIcon";
import { CommentRatings } from "../rating";

interface CardProps {
  size?: "large" | "small";
  thumbnail: string;
  title: string;
  lessonsCount: number;
  averageRating: number;
}

const Card: React.FC<CardProps> = ({
  size = "large",
  thumbnail,
  title,
  lessonsCount,
  averageRating,
}) => {
  return (
    <section className="p-2 md:p-4 hover:scale-[1.02] duration-300 ">
      <article className="relative">
        <img
          src={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
          alt={`${title} poster`}
          className="aspect-video w-full h-full object-cover rounded-lg"
        />
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
          <h6 className="text-gray-700 whitespace-nowrap">
            {lessonsCount} Lessons
          </h6>
        )}
      </ul>
      <CommentRatings rating={averageRating} size={16} className="pl-1 w-fit" />
    </section>
  );
};

export default Card;
