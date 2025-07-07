"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import ResponsiveModal from "@/components/responsive-dialog";
import StudioUploader from "@/modules/studio/ui/components/studio-uploader";

function StudioUploadModal() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const create = trpc.video.create.useMutation({
    onSuccess: () => {
      toast.success("Video created");
      utils.studio.getAll.invalidate();
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSuccess = () => {
    if (!create.data?.video.id) return;

    create.reset();
    router.push(`/studio/videos/${create.data.video.id}`);
  };

  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        open={!!create.data?.url}
        onOpenChange={() => create.reset()}
      >
        {create.data?.url ? (
          <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
        ) : (
          <Loader2Icon />
        )}
      </ResponsiveModal>
      <Button
        variant={"secondary"}
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
        <span>Create</span>
      </Button>
    </>
  );
}

export default StudioUploadModal;
