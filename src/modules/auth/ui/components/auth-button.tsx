"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClapperboardIcon, UserCircleIcon } from "lucide-react";

export function AuthButton() {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<ClapperboardIcon className="size-4" />}
            />
            <UserButton.Action label="manageAccount" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant={"outline"}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-600; hover:bg-cyan-100/70 border-blue-500/20 rounded-full shadow-none [&_svg]:size-5"
          >
            <UserCircleIcon />
            <span>Sign in</span>
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
