"use client";

import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  playbackId?: string | null | undefined;
  thumbnailUrl?: string | null | undefined;
  autoPlay?: boolean;
  onPlay?: () => void;
}

function VideoPlayer({ playbackId, thumbnailUrl, autoPlay, onPlay }: VideoPlayerProps) {
  if (!playbackId) {
    return null;
  }

  return (
    <MuxPlayer
      className="w-full h-full object-contain"
      playbackId={playbackId}
      poster={thumbnailUrl || "/placeholder.svg"}
      autoPlay={autoPlay}
      onPlay={onPlay}
      playerInitTime={0}
      thumbnailTime={0}
      accentColor="#FF2056"
    />
  );
}

export default VideoPlayer;
