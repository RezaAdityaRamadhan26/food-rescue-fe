"use client";

import Link from "next/link";
import { Bell, CircleUserRound, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { user, token, fetchProfile, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Fetch profile on mount if token exists but user is null
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const navLinks = [
    { href: "home", label: "Home" },
    { href: "menu", label: "Menu" },
    { href: "about", label: "About Us" },
    { href: "contact", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className={`fixed top-0 z-50 w-full px-8 py-6 transition-all duration-300 lg:px-16 
    ${scrolled 
    ? "border-b border-white/20 bg-[#E3DBD1]/80 backdrop-blur-md" 
    : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between relative">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-[#091413]"
        >
          LOGO
        </Link>

        <ul className="hidden items-center gap-10 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
          {navLinks.map((item) => (
            <li key={item.href}>
              <a
                href={`#${item.href}`}
                className={`text-[15px] font-medium transition-colors duration-300 hover:text-[#AC7F5E]
                ${
                  activeSection === item.href
                    ? "text-[#AC7F5E]"
                    : "text-[#091413]"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 text-[#091413]">
          {token ? (
            <>
              <div className="flex items-center gap-4">
                <button className="flex items-center justify-center transition hover:opacity-70">
                  <Bell size={24} strokeWidth={1.8} />
                </button>

                <Link
                  href={user?.role === "MERCHANT" ? "/seller" : "/buyer-profile"}
                  className="flex items-center justify-center transition hover:opacity-70"
                >
                  <CircleUserRound size={24} strokeWidth={1.8} />
                </Link>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-[#AC7F5E]/10 px-4 py-2.5 text-sm font-medium text-[#AC7F5E] transition hover:bg-[#AC7F5E]/20"
              >
                <LogOut size={16} />
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-[#091413] transition hover:bg-[#091413]/5"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-[#BBAB8C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9c8f76]"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
