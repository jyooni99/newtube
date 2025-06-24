import Link from "next/link";
import Image from "next/image";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import StudioUploadModal from "../studio-upload-modal";

export function StudioNavbar() {
  return (
    <nav className="fixed top-0 left-0 h-16 bg-white flex items-center px-2 pr-5 z-50 w-full border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* 메뉴 & 로고 */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="p-4 flex items-center gap-1">
              <Image src="/logo.svg" width={32} height={32} alt="logo" />
              <p className="text-xl font-semibold tracking-tighter">Studio</p>
            </div>
          </Link>
        </div>
      </div>

      {/* 비디오 업로드 버튼 */}
      <div className="flex flex-shrink-0 items-center gap-4">
        <StudioUploadModal />
        <AuthButton />
      </div>
    </nav>
  );
}
