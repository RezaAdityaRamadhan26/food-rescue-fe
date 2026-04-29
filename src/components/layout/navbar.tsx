"use client";

import Link from "next/link";
import { Bell, CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

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
      }
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

  return (
    <nav className="w-full bg-[#E3DBD1] px-8 py-6 lg:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-[#091413]"
        >
          LOGO
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
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