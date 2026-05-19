import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import AppSidebar from "./components/sidebar";
import MobileSidebarTrigger from "./components/MobileSidebarTrigger";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* Sidebar for desktop & mobile */}
      <AppSidebar />

      <SidebarInset>
        {/* Hamburger button only on mobile */}
        <div className="md:hidden sticky top-0 z-30 flex h-14 items-center bg-[#FFFCFB] px-4 shadow-sm">
          <span className="sr-only">Open menu</span>
          <MobileSidebarTrigger />
          <span className="ml-3 font-serif text-lg text-[#091413]">Menu</span>
        </div>
        <main className="min-h-screen bg-[#FFFCFB] p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}