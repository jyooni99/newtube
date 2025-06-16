import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import React from "react";

export function AuthButton() {
  // Todo: 로그인 & 로그아웃 기능 구현
  return (
    <Button
      variant={"outline"}
      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-600; hover:bg-cyan-100/70 border-blue-500/20 rounded-full shadow-none [&_svg]:size-5"
    >
      <UserCircleIcon />
      <span>Sign in</span>
    </Button>
  );
}
