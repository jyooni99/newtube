interface PageProps {
  params: Promise<{ videoId: string }>;
}

import React from "react";

async function Page({ params }: PageProps) {
  const { videoId } = await params;

  return <div>Page: {videoId}</div>;
}

export default Page;
