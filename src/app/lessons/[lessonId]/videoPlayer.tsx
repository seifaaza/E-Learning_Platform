"use client";

import { useRef, useEffect } from "react";

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startTime = 5; // Specify the start time in seconds

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  return (
    <div className="w-full xl:w-11/12 mx-auto rounded-lg overflow-hidden">
      <video ref={videoRef} controls className="w-full">
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
