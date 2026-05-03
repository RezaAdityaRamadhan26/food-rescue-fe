"use client";

import Image from "next/image";
import { CreditCard, MapPin, ShieldCheck, TicketPercent, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const handleCompleteOrder = () => {
    window.location.href = "/landing_page";
  }
  

  return (
    <div className="bg-[#FFFCFB] lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* LEFT */}
      <section className="border-r border-[#E3DBD1] p-10">
        <div className="mb-10">
          <Link href="/menu_page" className="text-sm text-[#091413]/65 flex items-center gap-3" ><X /> Shopping Cart | Orders</Link>

          <div className="mt-8 flex items-center gap-3">
            <h1 className="text-4xl font-bold text-[#091413]">Order Summary</h1>

            <span className="rounded-full bg-[#BBAB8C] px-3 py-1 text-xs font-medium text-[#FFFCFB]">
              2 items
            </span>
          </div>
        </div>

        {/* PRODUCT 1 */}
        <div className="mb-5 rounded-3xl border border-[#E3DBD1] bg-[#FFFCFB] p-5">
          <div className="flex gap-5">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-[#FFFCFB]">
              <Image
                src="https://images.unsplash.com/photo-1680674814945-7945d913319c"
                alt="food"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#091413]">
                  Nasi Goreng
                </h2>

                <p className="mt-1 text-sm text-[#8D7B68]">
                  Fresh food rescue • Ready today
                </p>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-[#FFFAF5] px-3 py-1 text-xs text-[#091413]/65">
                    Qty 1
                  </span>

                  <span className="rounded-full bg-[#FFFAF5] px-3 py-1 text-xs text-[#091413]/65">
                    Medium
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-[#091413]">Rp10.000</p>

                <p className="mt-2 text-sm text-[#091413]/65 line-through">
                  Rp15.000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT 2 */}
        <div className="mb-6 rounded-3xl border border-[#E3DBD1] bg-[#FFFCFB] p-5">
          <div className="flex gap-5">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-[#FFFCFB]">
              <Image
                src="https://images.unsplash.com/photo-1666239308347-4292ea2ff777"
                alt="food"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#091413]">
                  Paket Ayam Bakar
                </h2>

                <p className="mt-1 text-sm text-[#091413]/65">
                  Rescue food package
                </p>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-[#FFFAF5] px-3 py-1 text-xs text-[#091413]/65">
                    Qty 1
                  </span>

                  <span className="rounded-full bg-[#FFFAF5] px-3 py-1 text-xs text-[#091413]/65">
                    Random Mix
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-[#091413]">Rp20.000</p>

                <p className="mt-2 text-sm text-[#091413]/65 line-through">
                  Rp35.000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DISCOUNT */}
        <div className="mb-8 flex items-center justify-between rounded-3xl border border-dashed border-[#D8C2A3] bg-[#FFF8EE] p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-[#E3DBD1] p-3">
              <TicketPercent className="text-[#7B6248]" size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-[#091413]">Discount Code</h3>

              <p className="text-sm text-[#8D7B68]">Save more rescued meals</p>
            </div>
          </div>

          <button className="rounded-2xl border border-[#D9C5A8] bg-[#FFFCFB] px-5 py-3 text-sm font-medium text-[#5D4631] transition hover:bg-[#F5EFE6]">
            Add Code
          </button>
        </div>

        {/* TOTAL */}
        <div className="rounded-3xl border border-[#E3DBD1] bg-[#FFFCFB] p-6">
          <div className="mb-4 flex justify-between">
            <span className="text-[#091413]/65">Nasi Goreng</span>
            <span className="font-semibold text-[#091413]">Rp10.000</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span className="text-[#091413]/65">Paket Ayam Bakar</span>
            <span className="font-semibold text-[#091413]">Rp20.000</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span className="text-[#091413]/65">Subtotal</span>
            <span className="font-semibold text-[#091413]">Rp30.000</span>
          </div>

          <div className="mb-5 flex justify-between">
            <span className="text-[#091413]/65">Delivery</span>
            <span className="font-semibold text-[#73946B]">Free</span>
          </div>

          <div className="h-px bg-[#EEE2D1]" />

          <div className="mt-5 flex justify-between">
            <span className="text-2xl font-bold text-[#091413]">Total</span>

            <span className="text-3xl font-bold text-[#091413]">Rp30.000</span>
          </div>
        </div>
      </section>

      {/* RIGHT */}
      <section className="bg-[#FFFCFB] p-10">
        {/* PAYMENT METHOD */}
        <div className="mb-8">
          <h2 className="mb-5 text-2xl font-bold text-[#091413]">Payment</h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="rounded-2xl border-2 border-[#A67B5B] bg-[#F4E8D5] px-5 py-4 text-left">
              <CreditCard className="mb-3 text-[#7B6248]" size={22} />

              <p className="font-semibold text-[#091413]">Pay by Card</p>

              <span className="text-sm text-[#8D7B68]">
                BCA / BRI / Mandiri / BNI
              </span>
            </button>

            <button className="rounded-2xl border border-[#E5D7C4] bg-[#FFFCFB] px-5 py-4 text-left">
              <MapPin className="mb-3 text-[#7B6248]" size={22} />

              <p className="font-semibold text-[#091413]">Cash on Delivery</p>

              <span className="text-sm text-[#8D7B68]">Pay at your door</span>
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#091413]">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-4 outline-none transition focus:border-[#B88B67]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#091413]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-4 outline-none transition focus:border-[#B88B67]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#091413]">
              Delivery Address
            </label>

            <textarea
              rows={4}
              placeholder="Enter delivery address"
              className="w-full rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-4 outline-none transition focus:border-[#B88B67]"
            />
          </div>
        </div>

        {/* SECURITY */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#F3E8D8] p-4">
          <ShieldCheck className="text-[#7B6248]" />

          <p className="text-sm text-[#091413]">
            Secure payment & trusted UMKM partners
          </p>
        </div>

        {/* BUTTON */}
        <Button onClick={handleCompleteOrder} className="mt-8 w-full h-15 rounded-2xl bg-[#BBAB8C] py-5 text-lg font-semibold text-[#FFFCFB] transition hover:bg-[#9c8f76]">
          Complete Order
        </Button>

        <p className="mt-5 text-center text-sm text-[#8D7B68]">
          By continuing you support food waste reduction ♻️
        </p>
      </section>
    </div>
  );
}
