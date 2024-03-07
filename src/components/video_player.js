import React from "react";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";

export function VideoPlayer() {
  const { videoId } = useParams();

  const opts = {
    height: "490",
    width: "740",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
}
