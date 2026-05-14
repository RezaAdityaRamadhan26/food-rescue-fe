import Navbar from "@/components/layout/navbar";
import Hero from "@/app/(home)/components/hero";
import UserBenefitSection from "@/app/(home)/components/userBenefit";
import CaraKerjaSection from "@/app/(home)/components/caraKerja";
import MenuSection from "@/app/(home)/components/menu";
import SellerHook from "@/app/(home)/components/SellerHook";
import CTASection from "@/app/(home)/components/CTAsection";
import Footer from "@/components/layout/footer";
import ImpactSection from "./components/impact";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <MenuSection />
      <CaraKerjaSection />
      <UserBenefitSection />
      <ImpactSection />
      <SellerHook />
      <CTASection />
      <Footer />
    </div>
  );
}
