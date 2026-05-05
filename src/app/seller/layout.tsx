import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import AppSidebar from "./components/sidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <main className="min-h-screen bg-[#FFFCFB] p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}