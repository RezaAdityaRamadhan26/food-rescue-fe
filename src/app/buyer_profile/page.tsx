"use client";

import { useState } from "react";
import { Leaf } from "lucide-react";

import { ProfileHero } from "./components/profileHero";
import { ImpactStats } from "./components/impactStats";
import { RecentOrders } from "./components/recentOrder";
import { FavoriteUMKM } from "./components/favoriteUMKM";
import { Achievements } from "./components/achivement";
import { QuickActions } from "./components/quickAction";
import { WeeklyChart } from "./components/weeklyChart";
import Navbar from "../buyer_profile/components/navbarProfile";
import Footer from "@/components/layout/footer";

const OrganicPattern = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="leaf-pattern"
        x="0"
        y="0"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="10" cy="10" r="3" fill="#7C5B3A" />
        <circle cx="40" cy="35" r="2" fill="#5B8A6B" />
        <circle cx="55" cy="8" r="1.5" fill="#C4A882" />
        <circle cx="25" cy="50" r="2.5" fill="#7C5B3A" />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
  </svg>
);

function DashboardPage() {
  return (
    <div className="space-y-6">
      <ProfileHero />

      <ImpactStats />

      <QuickActions />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentOrders />
        </div>

        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>
      </div>

      <FavoriteUMKM />

      <Achievements />
    </div>
  );
}

function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-[1.75rem] text-[#2D1F14]">My Orders</h1>

        <p className="text-sm text-[#9E8A78]">
          Track and review all your food rescue orders
        </p>
      </div>

      <RecentOrders />
    </div>
  );
}

function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-[1.75rem] text-[#2D1F14]">Saved UMKM</h1>

        <p className="text-sm text-[#9E8A78]">
          Your favorite local food rescue partners
        </p>
      </div>

      <FavoriteUMKM />
    </div>
  );
}

function AchievementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-[1.75rem] text-[#2D1F14]">
          Achievements
        </h1>

        <p className="text-sm text-[#9E8A78]">
          Your sustainability journey milestones
        </p>
      </div>

      <Achievements />
    </div>
  );
}

function GenericPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F5E6D3]">
        <Leaf size={32} className="text-[#7C5B3A]" />
      </div>

      <h1 className="mb-2 font-serif text-[1.75rem] text-[#2D1F14]">{title}</h1>

      <p className="text-[0.9rem] text-[#9E8A78]">{subtitle}</p>
    </div>
  );
}

function renderPage(tab: string) {
  switch (tab) {
    case "dashboard":
      return <DashboardPage />;

    case "orders":
      return <OrdersPage />;

    case "favorites":
      return <FavoritesPage />;

    case "achievements":
      return <AchievementsPage />;

    case "nearby":
      return (
        <GenericPage
          title="Nearby UMKM"
          subtitle="Discover food rescue spots near you"
        />
      );

    case "notifications":
      return (
        <GenericPage
          title="Notifications"
          subtitle="Stay updated on flash rescues and deals"
        />
      );

    case "settings":
      return (
        <GenericPage
          title="Settings"
          subtitle="Manage your account preferences"
        />
      );

    default:
      return <DashboardPage />;
  }
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#FFFCFB]">
        <Navbar></Navbar>
      <div className="pointer-events-none fixed inset-0 z-10">
        <OrganicPattern />

        <div className="absolute top-0 right-0 h-150 w-150 translate-x-[30%] translate-y-[-30%] rounded-full bg-[radial-gradient(circle,#C4A882_0%,transparent_70%)] opacity-20" />

        <div className="absolute bottom-0 left-0 h-150 w-150 translate-x-[-40%] translate-y-[40%] rounded-full bg-[radial-gradient(circle,#5B8A6B_0%,transparent_70%)] opacity-10" />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 pt-24 pb-24 md:px-6 lg:px-8 lg:pb-8">
        {renderPage(activeTab)}
      </main>

      <div className="relative z-10 mx-6 mb-4 hidden items-center justify-center gap-3 rounded-2xl border border-[#5B8A6B26] bg-[#5B8A6B1A] py-3 lg:flex">
        <Leaf size={13} className="text-[#7BBF9C]" />

        <span className="text-[0.72rem] text-[#6B9E7A]">
          Bersama Kita Menyelamatkan{" "}
          <strong className="text-[#5B8A6B]">12,847 makanan</strong> dan
          mencegah <strong className="text-[#5B8A6B]">3.2 ton</strong> limbah
          makanan di Indonesia 🌱
        </span>
      </div>
      <Footer></Footer>
    </div>
  );
}
