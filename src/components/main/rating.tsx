"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ratingVariants = {
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-500",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  ratingNumber?: boolean;
}

export const CommentRatings = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "yellow",
  onRatingChange,
  interactive = false,
  ratingNumber = false,
  ...props
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(initialRating);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    setCurrentRating(starIndex);
    setHoverRating(null);
    onRatingChange?.(starIndex);
  };

  // Touch event handlers for mobile devices
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    setHoverRating(starIndex);
  };

  const handleTouchEnd = () => {
    if (!interactive) return;
    setHoverRating(null);
  };

  const handleTouchClick = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    setCurrentRating(starIndex);
    setHoverRating(null);
    onRatingChange?.(starIndex);
  };

  const isMobile = window.innerWidth < 768;
  const iconSize = isMobile ? size * 1.5 : size;

  const displayRating = hoverRating ?? currentRating;
  const fullStars = Math.floor(displayRating);
  const partialStar =
    displayRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={displayRating % 1}
        size={iconSize}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null;

  return (
    <section
      className="flex w-fit items-center gap-2"
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      onTouchEnd={interactive ? handleTouchEnd : undefined}
      {...props}
    >
      <span
        className={`flex items-center ${interactive && "cursor-pointer"}`}
        onMouseEnter={interactive ? handleMouseEnter : undefined}
        onTouchStart={interactive ? handleTouchStart : undefined}
        onClick={interactive ? handleTouchClick : undefined}
      >
        {[...Array(fullStars)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size: iconSize,
            className: cn(
              fill ? "fill-current stroke-1" : "fill-transparent",
              ratingVariants[variant].star
            ),
            "data-star-index": i + 1,
          })
        )}
        {partialStar}
        {[
          ...Array(Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0))),
        ].map((_, i) =>
          React.cloneElement(Icon, {
            key: i + fullStars + 1,
            size: iconSize,
            className: cn("stroke-1", ratingVariants[variant].emptyStar),
            "data-star-index": i + fullStars + 1,
          })
        )}
      </span>
      {ratingNumber && (
        <h5 className="text-yellow-500 font-bold">{currentRating}</h5>
      )}
    </section>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ReactElement;
}

const PartialStar = ({ ...props }: PartialStarProps) => {
  const { fillPercentage, size, className, Icon } = props;
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};
