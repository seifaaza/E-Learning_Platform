import React from "react";
import CardIcon from "./cardIcon";
import Action from "./action";
import { Progress } from "@/components/ui/progress";

interface CardProps {
  size?: "large" | "small";
  thumbnail: string;
  title: string;
  description?: string;
  pausedAt?: number;
  isPaused?: boolean;
}

const Card: React.FC<CardProps> = ({
  size = "large",
  thumbnail,
  title,
  description,
  pausedAt = 0,
  isPaused = false,
}) => {
  return (
    <section
      className={`${
        size === "large"
          ? "h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60"
          : "h-full w-full"
      } relative rounded-lg overflow-hidden group cursor-pointer hover:scale-[101%] transition-transform duration-500`}
    >
      <img
        src={thumbnail}
        alt={`${title} poster`}
        className="h-full w-full object-cover object-center group-hover:opacity-75 duration-500"
      />
      <article
        className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/65 to-transparent ${
          size === "large" ? "p-4 lg:p-5 xl:p-6" : "p-2 xl:p-4"
        } `}
      >
        <h3
          className={`text-white font-medium truncate ${
            size !== "large" ? "text-sm md:text-lg !leading-4" : ""
          } `}
        >
          {title}
        </h3>
        {description && <h5 className="text-white truncate">{description}</h5>}
      </article>
      <span className="absolute h-10 md:h-12 w-10 md:w-12 top-[42%] md:top-[47%] left-1/2 -translate-y-1/2 -translate-x-1/2">
        <CardIcon
          type={isPaused ? "pause" : "play"}
          className="h-8 md:h-10 w-8 md:w-10 fill-white"
        />
      </span>
      {size === "large" && (
        <>
          <Action isPaused={isPaused} />
          {isPaused && (
            <section className="absolute bottom-0 left-0 w-full h-1">
              <Progress value={pausedAt} className="w-full h-1 bg-blue-300" />
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default Card;
