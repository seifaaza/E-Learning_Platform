"use client";
import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
  videoSrc: string;
  pausedTime: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, pausedTime }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startTime = pausedTime;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  return (
    <div className="w-full xl:w-11/12 rounded-lg overflow-hidden">
      <video ref={videoRef} controls className="w-full">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
