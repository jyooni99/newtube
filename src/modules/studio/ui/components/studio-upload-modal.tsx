import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

function StudioUploadModal() {
  return (
    <Button variant={"secondary"}>
      <PlusIcon />
      <span>Create</span>
    </Button>
  );
}

export default StudioUploadModal;
