import { formatDuration } from "@/lib/utils";
import Image from "next/image";

interface VideoThumbnailProps {
  title: string;
  imageUrl?: string | null;
  previewUrl?: string | null;
  duration: number;
}

function VideoThumbnail({ title, imageUrl, previewUrl, duration }: VideoThumbnailProps) {
  return (
    <div className="relative group">
      {/* 썸네일 부분 */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl ?? "/placeholder.svg"}
          alt={title}
          fill
          className="size-full h-full object-cover group-hover:opacity-0"
        />
        <Image
          unoptimized={!!previewUrl}
          src={previewUrl ?? "/placeholder.svg"}
          alt={title}
          fill
          className="size-full h-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* 재생시간 부분 */}
      <div className="absolute bottom-1.5 right-1.5 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
}

export default VideoThumbnail;
