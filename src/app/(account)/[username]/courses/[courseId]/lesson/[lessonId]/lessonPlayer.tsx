"use client";

import React from "react";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { lessonStore } from "@/store/lessonStore";
import LessonControl from "./lessonControl";

interface LessonPlayerProps {
  username: string;
  courseId: string;
  lessonId: string;
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
  lessonId,
  index,
  lessonIds,
  video,
  thumbnail,
  title,
  lessonsLength,
}) => {
  const markLessonComplete = lessonStore((state) => state.markLessonComplete);
  const setLoading = lessonStore((state) => state.setLoading);

  const handleIsVideoEnded = async () => {
    setLoading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${username}/complete-lesson?courseId=${courseId}&lessonId=${lessonId}`
      );
      markLessonComplete(lessonId);
    } catch (error) {
      console.error("Failed to complete the lesson", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <MuxPlayer
        streamType="on-demand"
        src={`https://res.cloudinary.com/depztpide/video/upload/${video}`}
        poster={`https://res.cloudinary.com/depztpide/image/upload/${thumbnail}`}
        primaryColor="#ffffff"
        accentColor="#4b2dd1"
        className="w-full rounded-lg aspect-video overflow-hidden "
        autoPlay
        onEnded={handleIsVideoEnded}
      />

      <ul className="flex gap-4 justify-between md:items-center">
        <p className=" text-gray-700">
          Lesson {index} of {lessonsLength}
        </p>
        <LessonControl
          username={username}
          courseId={courseId}
          lessonId={lessonId}
          index={index}
          lessonIds={lessonIds}
        />
      </ul>
      <h3 className="text-main md:order-first">
        Lesson {index}: {title}
      </h3>
    </section>
  );
};

export default LessonPlayer;
