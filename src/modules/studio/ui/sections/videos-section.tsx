"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Globe2Icon, LockIcon } from "lucide-react";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import InfiniteScroll from "@/components/infinite-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import VideoThumbnail from "@/modules/videos/ui/components/video-thumbnail";
import { snakeCaseToTitle } from "@/lib/utils";

function VideosSection() {
  return (
    <Suspense fallback={<VideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
}

function VideosSectionSkeleton() {
  return (
    <>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-36" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function VideosSectionSuspense() {
  const router = useRouter();
  const [videos, query] = trpc.studio.getAll.useSuspenseInfiniteQuery(
    { limit: DEFAULT_LIMIT },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <TableRow
                  key={video.id}
                  onClick={() => router.push(`/studio/videos/${video.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-4">
                      <div className="relative aspect-video w-36 shrink-0">
                        <VideoThumbnail
                          title={video.title}
                          imageUrl={video.thumbnailUrl}
                          previewUrl={video.previewUrl}
                          duration={video.duration || 0}
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden gap-y-1">
                        <span className="text-sm line-clamp-1">{video.title}</span>
                        <span className="text-xs line-clamp-1">
                          {video.description || "No description"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {video.visibility === "private" ? (
                        <LockIcon className="size-4 mr-4" />
                      ) : (
                        <Globe2Icon className="size-4 mr-4" />
                      )}
                      {snakeCaseToTitle(video.visibility)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {snakeCaseToTitle(video.muxStatus || "Error")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {format(new Date(video.updatedAt), "yyyy.MM.dd")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">views</TableCell>
                  <TableCell className="text-right">comments</TableCell>
                  <TableCell className="text-right pr-6">likes</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
}

export default VideosSection;
