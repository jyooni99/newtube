import { HydrateClient, trpc } from "@/trpc/server";
import StudioView from "@/modules/studio/ui/view/studio-view";
import { DEFAULT_LIMIT } from "@/constants";

async function Page() {
  void trpc.studio.getAll.prefetchInfinite({ limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
}

export default Page;
