"use client";
import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
  img: string;
  videoSrc: string;
  pausedTime: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  img,
  videoSrc,
  pausedTime,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startTime = pausedTime;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <video
        poster={`https://res.cloudinary.com/depztpide/image/upload/${img}`}
        ref={videoRef}
        controls
        className="w-full"
      >
        <source
          src={`https://res.cloudinary.com/depztpide/video/upload/${videoSrc}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
