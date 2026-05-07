"use client";

import Link from "next/link";
import { Bell, CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  return (
    <nav className={`fixed top-0 z-50 w-full px-8 py-6 transition-all duration-300 lg:px-16 
    ${scrolled 
    ? "border-b border-white/20 bg-[#E3DBD1]/80 backdrop-blur-md" 
    : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-[#091413]"
        >
          LOGO
        </Link>

        <ul className="hidden items-center gap-10 md:flex font-medium text-[#091413] text-[15px]">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/#contact">Contact Us</Link></li>
        </ul>

        <div className="flex items-center gap-8 text-[#091413]">
          <button className="transition hover:opacity-70">
            <Bell size={25} strokeWidth={1.8} />
          </button>

          <button className="transition hover:opacity-70">
            <CircleUserRound size={30} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </nav>
  );
}
