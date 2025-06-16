"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ videoId: string }>();

  return <div>Page: {params.videoId}</div>;
}
