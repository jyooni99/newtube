"use client";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

function VideosSection() {
  const [data] = trpc.studio.getAll.useSuspenseInfiniteQuery(
    { limit: DEFAULT_LIMIT },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return <div>{JSON.stringify(data)}</div>;
}

export default VideosSection;
