import Navbar from "@/components/layout/navbar";
import Hero from "@/app/landing_page/components/hero";
import UserBenefitSection from "@/app/landing_page/components/userBenefit";
import CaraKerjaSection from "@/app/landing_page/components/caraKerja";
import MenuSection from "@/app/landing_page/components/menu";
import SellerHook from "@/app/landing_page/components/SellerHook";
import CTASection from "@/app/landing_page/components/CTAsection";
import Footer from "@/components/layout/footer";
import ImpactSection from "./components/impact";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <CaraKerjaSection />
      <UserBenefitSection />
      <MenuSection />
      <ImpactSection />
      <SellerHook />
      <CTASection />
      <Footer />
    </div>
  );
}
