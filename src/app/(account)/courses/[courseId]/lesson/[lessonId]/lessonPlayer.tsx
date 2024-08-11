"use client";
import MuxPlayer from "@mux/mux-player-react";

interface LessonPlayerProps {
  title: string;
  index: number;
  thumbnail: string;
  video: string;
  lessonsCount: number;
}

const LessonPlayer: React.FC<LessonPlayerProps> = ({
  title,
  index,
  thumbnail,
  video,
  lessonsCount,
}) => {
  return (
    <>
      <p className="text-sm text-gray-700 mr-2 text-right mb-2">
        Lesson {index} of {lessonsCount}
      </p>
      <MuxPlayer
        streamType="on-demand"
        src={`https://res.cloudinary.com/depztpide/video/upload/${video}`}
        primaryColor="#ffffff"
        accentColor="#2563eb"
        className="w-full rounded-lg aspect-video overflow-hidden"
        autoPlay
      />
    </>
  );
};

export default LessonPlayer;
