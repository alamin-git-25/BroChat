import Footer from "@/components/landingPage/Footer";
import LandingPage from "@/components/landingPage/Hero";
import KeyFeatures from "@/components/landingPage/Key";
import Pricing from "@/components/landingPage/Pricing";
import Image from "next/image";

export default function Home() {
  return (
    <section className="overflow-hidden">
      <LandingPage />
      <KeyFeatures />
      <Pricing />
      <Footer />
    </section>
  );
}
