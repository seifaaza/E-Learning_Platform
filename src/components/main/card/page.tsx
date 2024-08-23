import React from "react";
import { CommentRatings } from "../rating";
import { Progress } from "@/components/ui/progress";

interface CardProps {
  thumbnail: string;
  title: string;
  lessonsCount: number;
  averageRating?: number;
  btn?: React.ReactNode;
  link?: boolean;
  progress?: number;
}

const Card: React.FC<CardProps> = ({
  thumbnail,
  title,
  lessonsCount,
  averageRating,
  btn,
  link = true,
  progress,
}) => {
  return (
    <section
      className={`p-2 md:p-4 ${
        link && "hover:scale-[1.02] duration-300 transition-transform"
      } `}
    >
      <article className="relative">
        <img
          src={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
          alt={`${title} poster`}
          className="aspect-video w-full h-full object-cover rounded-lg"
        />
      </article>
      <ul className="gap-8 pl-1 pb-1 pt-2 flex justify-between items-center">
        <h4 className="text-main font-medium truncate text-sm md:text-base">
          {title}
        </h4>
        {btn ? (
          btn
        ) : (
          <h6 className="text-gray-700 whitespace-nowrap">
            {lessonsCount} Lessons
          </h6>
        )}
      </ul>
      {!btn && (
        <CommentRatings
          rating={averageRating ?? 0}
          size={16}
          className="pl-1 w-fit"
        />
      )}
      {progress && (
        <ul className="flex gap-3 items-center">
          <Progress value={progress} className="w-full h-[.2rem] bg-blue-200" />
          <span className="text-main text-sm">
            {progress === 0.1 ? 0 : progress}%
          </span>
        </ul>
      )}
    </section>
  );
};

export default Card;
