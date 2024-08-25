"use client";

import MuxPlayer from "@mux/mux-player-react";
import LessonControl from "./actions/lessonControl";

interface LessonPlayerProps {
  username: string;
  courseId: string;
  title: string;
  lessonIds: string[];
  video: string;
  thumbnail: string;
  index: number;
  lessonsLength: number;
}

const LessonPlayer: React.FC<LessonPlayerProps> = ({
  username,
  courseId,
  index,
  lessonIds,
  video,
  thumbnail,
  title,
  lessonsLength,
}) => {
  return (
    <section className="w-full flex flex-col gap-2">
      <article className="aspect-video">
        <h3 className="text-main mb-2 xl:mb-4">
          Lesson {index}: {title}
        </h3>
        <MuxPlayer
          streamType="on-demand"
          src={`https://res.cloudinary.com/depztpide/video/upload/${video}`}
          poster={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
          primaryColor="#ffffff"
          accentColor="#4b2dd1"
          className="w-full rounded-lg aspect-video overflow-hidden"
          autoPlay
          onEnded={() => console.log("ended")}
        />
      </article>
      <ul className="flex gap-4 justify-between items-center">
        <p className="ml-2 text-gray-700">
          Lesson {index} of {lessonsLength}
        </p>
        <LessonControl
          username={username}
          courseId={courseId}
          index={index}
          lessonIds={lessonIds}
        />
      </ul>
    </section>
  );
};

export default LessonPlayer;
