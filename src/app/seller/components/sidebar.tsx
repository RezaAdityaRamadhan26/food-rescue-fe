"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ChartColumn,
  Store,
  Settings,
  LogOut,
  Leaf,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/seller",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/seller/orders",
    icon: ShoppingBag,
  },
  {
    label: "Products",
    href: "/seller/products",
    icon: Package,
  },
  {
    label: "Analytics",
    href: "/seller/analytics",
    icon: ChartColumn,
  },
  {
    label: "Store",
    href: "/seller/store",
    icon: Store,
  },
  {
    label: "Settings",
    href: "/seller/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-[#EADFD3] bg-[#FFFCFB]">
      <SidebarHeader className="border-b border-[#F1E7DD] px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#AC7F5E] shadow-md">
            <Leaf size={20} className="text-[#FFFCFB]" />
          </div>

          <div>
            <h1 className="font-serif text-[1rem] text-[#091413]">
              Food Rescue
            </h1>

            <p className="text-[0.72rem] text-[#091413]/65">Seller Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={`group flex h-13 items-center justify-between rounded-2xl px-3 transition-all duration-200 ${
                          isActive
                            ? "bg-[#BBAB8C] text-[#FFFCFB] shadow-md"
                            : "text-[#091413]/75 hover:bg-[#F7F1EA]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                              isActive
                                ? "bg-[#FFFCFB]/10"
                                : "bg-[#F3E8DC] group-hover:bg-[#EADBCB]"
                            }`}
                          >
                            <Icon
                              size={18}
                              className={
                                isActive ? "text-[#FFFCFB]" : "text-[#AC7F5E]"
                              }
                            />
                          </div>

                          <span className="text-[0.88rem] font-medium">
                            {item.label}
                          </span>
                        </div>

                        <ChevronRight
                          size={16}
                          className={`transition-all duration-200 ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#F1E7DD] p-3">
        <button className="flex h-13 w-full items-center gap-3 rounded-2xl px-3 text-[#c23737] transition-all duration-200 hover:bg-[#F8F2EC]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5EDE4]">
            <LogOut size={18} />
          </div>

          <span className="text-[0.88rem] font-medium">Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
