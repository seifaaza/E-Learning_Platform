import React from "react";

interface CardProps {
  img: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  img,
  title,
  description,
  icon,
  progress,
}) => {
  return (
    <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 rounded-lg overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500">
      <img
        src={img}
        alt={`${title} poster`}
        className="h-full w-full object-cover object-center opacity-80 group-hover:opacity-100 duration-700"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
        <h3 className="mt-5 mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-white truncate">{description}</p>
      </div>
      <div className="absolute h-10 md:h-12 w-10 md:w-12 top-[42%] md:top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2">
        {icon}
      </div>
      {progress && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black/70 p-6">
          {progress}
        </div>
      )}
    </div>
  );
};

export default Card;
