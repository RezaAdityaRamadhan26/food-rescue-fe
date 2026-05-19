"use client";

import Link from "next/link";
import { Bell, CircleUserRound, Leaf, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// 1. Definisikan tipe data NavLink
type NavLink = {
  href: string;
  label: string;
  isFullUrl?: boolean;
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, token, fetchProfile, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
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
            const id = entry.target.id;
            if (id === "benefits" || id === "about") {
              setActiveSection("about");
            } else if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-80px 0px -40% 0px",
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

  // 2. Terapkan tipe NavLink[] ke array
  const baseNavLinks: NavLink[] = [
    { href: "home", label: "Home" },
    { href: "menu", label: "Menu" },
  ];

  const authNavLinks: NavLink[] = token && user?.role === "CUSTOMER" ? [
    { href: "buyer-profile?tab=dashboard", label: "Dashboard", isFullUrl: true },
    { href: "buyer-profile?tab=orders", label: "Pesanan Saya", isFullUrl: true },
  ] : [];

  const footerNavLinks: NavLink[] = [
    { href: "about", label: "About Us" },
    { href: "contact", label: "Contact Us" },
  ];

  const navLinks: NavLink[] = [...baseNavLinks, ...authNavLinks, ...footerNavLinks];

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
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (window.location.pathname !== "/" && window.location.pathname !== "/home") {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/85 py-4 shadow-xs border-b border-black/5 backdrop-blur-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Left side - Logo */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="text-2xl flex items-center gap-2 italic tracking-tighter text-[#091413]"
          >
            <Leaf></Leaf> Food Rescue
          </Link>
        </div>

        {/* Center - Navigation Links (Desktop) */}
        <div className="hidden lg:flex justify-center">
          <ul className="flex items-center gap-8">
            {navLinks.map((item) => (
              <li key={item.href}>
                {item.isFullUrl ? (
                  <Link
                    href={item.href}
                    className={`text-sm font-bold transition-colors duration-300 ${
                      activeSection === item.href
                        ? "text-[#AC7F5E]"
                        : "text-[#091413]/70 hover:text-[#091413]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`text-sm font-bold transition-colors duration-300 ${
                      activeSection === item.href
                        ? "text-[#AC7F5E]"
                        : "text-[#091413]/70 hover:text-[#091413]"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - User Actions (Desktop) */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-6 text-[#091413]">
          {token ? (
            <>
              <button className="transition-colors hover:text-[#AC7F5E]">
                <Bell size={22} strokeWidth={2.5} className="text-[#091413] hover:text-[#AC7F5E] transition-colors" />
              </button>

              <Link
                href={user?.role === "MERCHANT" ? "/seller" : "/buyer-profile"}
                className="transition-colors hover:text-[#AC7F5E]"
              >
                <CircleUserRound size={22} strokeWidth={2.5} className="text-[#091413] hover:text-[#AC7F5E] transition-colors" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-[#091413] transition hover:text-[#AC7F5E]"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#BBAB8C] px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#9c8f76]"
              >
                Daftar
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden flex-1 justify-end">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 backdrop-blur-md transition-all duration-300 ${
              scrolled
                ? "bg-white ring-black/[0.05] text-[#091413]"
                : "bg-white/50 ring-white/20 text-[#091413]"
            }`}
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-full px-4 lg:hidden"
          >
            <div className="flex flex-col overflow-hidden rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
              <ul className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    {item.isFullUrl ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                          activeSection === item.href
                            ? "bg-[#AC7F5E]/10 text-[#AC7F5E]"
                            : "text-[#091413]/70 hover:bg-black/5 hover:text-[#091413]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={`#${item.href}`}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={`block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                          activeSection === item.href
                            ? "bg-[#AC7F5E]/10 text-[#AC7F5E]"
                            : "text-[#091413]/70 hover:bg-black/5 hover:text-[#091413]"
                        }`}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <div className="my-3 h-px w-full bg-black/5" />

              <div className="flex flex-col gap-2">
                {token ? (
                  <>
                    <Link
                      href={user?.role === "MERCHANT" ? "/seller" : "/buyer-profile"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-[#091413]/70 transition-colors hover:bg-black/5 hover:text-[#091413]"
                    >
                      <CircleUserRound size={18} strokeWidth={2.5} />
                      Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-[#AC7F5E] transition-colors hover:bg-[#AC7F5E]/10"
                    >
                      <LogOut size={18} strokeWidth={2.5} />
                      Keluar
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center rounded-xl bg-black/5 px-4 py-3 text-sm font-bold text-[#091413] transition hover:bg-black/10"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center rounded-xl bg-[#BBAB8C] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#9c8f76]"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}