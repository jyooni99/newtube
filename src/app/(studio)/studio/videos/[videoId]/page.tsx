import { HydrateClient, trpc } from "@/trpc/server";
import VideoView from "@/modules/studio/ui/views/video-view";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ videoId: string }>;
}

async function Page({ params }: PageProps) {
  const { videoId } = await params;
  void trpc.studio.getOne.prefetch({ id: videoId });
  void trpc.categories.getAll.prefetch();

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
}

export default Page;
