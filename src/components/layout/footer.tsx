"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#E3DBD1] px-6 py-12 md:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <h2 className="text-[32px] font-semibold tracking-[-0.03em] text-[#091413]">
              Food Rescue
            </h2>
            <p className="mt-6 max-w-full lg:max-w-[440px] text-base md:text-lg leading-[1.8] text-[#5F5F5F]">
              Selamatkan makanan berkualitas, kurangi limbah, dan bantu UMKM
              berkembang bersama Food Rescue.
            </p>
            <div className="mt-10 flex items-center gap-5">
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B98D67] text-[#FFFCFB] transition hover:opacity-90"
              >
                <FaInstagram size={22} />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B98D67] text-[#FFFCFB] transition hover:opacity-90"
              >
                <FaTwitter size={22} />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B98D67] text-[#FFFCFB] transition hover:opacity-90"
              >
                <FaFacebookF size={22} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[24px] text-[#091413]">Navigation</h3>

            <ul className="mt-7 flex flex-col gap-5">
              <li>
                <Link
                  href="#home"
                  className="text-lg text-[#5F5F5F] transition hover:text-[#B98D67]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="#menu"
                  className="text-lg text-[#5F5F5F] transition hover:text-[#B98D67]"
                >
                  Menu
                </Link>
              </li>

              <li>
                <Link
                  href="#benefits"
                  className="text-lg text-[#5F5F5F] transition hover:text-[#B98D67]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="#seller"
                  className="text-lg text-[#5F5F5F] transition hover:text-[#B98D67]"
                >
                  Seller
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[24px] text-[#091413]">Company</h3>

            <ul className="mt-7 flex flex-col gap-5">
              <li>
                <Link
                  href="#"
                  className="text-lg text-[#5F5F5F] transition hover:text-[#B98D67]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-lg text-[#5F5F5F] transition hover:text-[#B98D67]"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-lg text-[#5F5F5F] transition hover:text-[#B98D67]"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-lg text-[#5F5F5F] transition hover:text-[#B98D67]"
                >
                  Partnership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[24px] text-[#091413]">Contact</h3>

            <div className="mt-7 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <MapPin size={22} className="mt-1 text-[#B98D67]" />

                <p className="max-w-70 text-lg leading-[1.7] text-[#5F5F5F]">
                  Jakarta, Indonesia
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={22} className="text-[#B98D67]" />
                <p className="text-lg text-[#5F5F5F]">hello@foodrescue.id</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={22} className="text-[#B98D67]" />

                <p className="text-lg text-[#5F5F5F]">+62 812 3456 7890</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-18 border-t border-[#BDBDBD] pt-8">
          <p className="text-center text-base text-[#7A7A7A]">
            © 2026 Food Rescue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
