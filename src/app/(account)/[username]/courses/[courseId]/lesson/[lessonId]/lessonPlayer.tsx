"use client";

import MuxPlayer from "@mux/mux-player-react";

interface LessonPlayerProps {
  video: string;
  thumbnail: string;
  title: string;
  index: number;
  lessonsLength: number;
}

const LessonPlayer: React.FC<LessonPlayerProps> = async ({
  video,
  thumbnail,
  title,
  index,
  lessonsLength,
}) => {
  return (
    <section className="w-full">
      <article className="aspect-video">
        <ul className="flex flex-col md:flex-row gap-1 justify-between md:items-end mb-2 xl:mb-4">
          <h3 className="text-main">
            Lesson {index}: {title}
          </h3>
          <p className="self-end text-sm text-gray-700">
            Lesson {index} of {lessonsLength}
          </p>
        </ul>
        <MuxPlayer
          streamType="on-demand"
          src={`https://res.cloudinary.com/depztpide/video/upload/${video}`}
          poster={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
          primaryColor="#ffffff"
          accentColor="#2563eb"
          className="w-full rounded-lg aspect-video overflow-hidden"
          autoPlay
        />
      </article>
    </section>
  );
};

export default LessonPlayer;
