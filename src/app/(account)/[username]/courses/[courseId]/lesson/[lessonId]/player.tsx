"use client";

import { FC } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface PlayerProps {
  src: string;
}

const Player: FC<PlayerProps> = ({ src }) => {
  return (
    <MuxPlayer
      streamType="on-demand"
      src={src}
      primaryColor="#ffffff"
      accentColor="#2563eb"
      className="w-full rounded-lg aspect-video overflow-hidden"
      autoPlay
      onPause={() => console.log("Video paused")}
      onPlay={() => console.log("Video started playing")}
      onError={() => console.log("Video error")}
      onLoadedData={() => console.log("Video data loaded")}
    />
  );
};

export default Player;
