import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import UserBenefitSection from "@/components/sections/userBenefit";
import CaraKerjaSection from "@/components/sections/caraKerja";
import MenuSection from "@/components/sections/menu";
import SellerHook from "@/components/sections/SellerHook";
import CTASection from "@/components/sections/CTAsection";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <CaraKerjaSection />
      <UserBenefitSection />
      <MenuSection />
      <SellerHook />
      <CTASection />
      <Footer/>
    </div>
  )
}
