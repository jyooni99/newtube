import { SidebarProvider } from "@/components/ui/sidebar";
import { StudioNavbar } from "@/modules/studio/ui/components/studio-navbar/index";
import { StudioSidebar } from "@/modules/studio/ui/components/studio-sidebar/index";

interface StudioLayoutProps {
  children: React.ReactNode;
}

export function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <StudioSidebar />
          <main className="flex flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
