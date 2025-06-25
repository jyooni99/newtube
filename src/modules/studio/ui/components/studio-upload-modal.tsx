"use client";

import { toast } from "sonner";
import { Loader2Icon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

function StudioUploadModal() {
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

  return (
    <Button
      variant={"secondary"}
      onClick={() => create.mutate()}
      disabled={create.isPending}
    >
      {create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
      <span>Create</span>
    </Button>
  );
}

export default StudioUploadModal;
