import Link from "next/link";
import Image from "next/image";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchInput } from "@/modules/home/ui/components/home-navbar/search-input";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";

export function HomeNavbar() {
  return (
    <nav className="fixed top-0 left-0 h-16 bg-white flex items-center px-2 pr-5 z-50 w-full">
      <div className="flex items-center gap-4 w-full">
        {/* 메뉴 & 로고 */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/">
            <div className="p-4 flex items-center gap-1">
              <Image src="/logo.svg" width={32} height={32} alt="logo" />
              <p className="text-xl font-semibold tracking-tighter">NewTube</p>
            </div>
          </Link>
        </div>

        {/* 검색창 */}
        <div className="flex-1 flex justify-center max-w-[720px] pr-4 mx-auto">
          <SearchInput />
        </div>
      </div>

      {/* 로그인 & 로그아웃 버튼 */}
      <div className="flex flex-shrink-0 items-center gap-4">
        <AuthButton />
      </div>
    </nav>
  );
}
