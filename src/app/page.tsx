import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import ThrivacaEngine from "@/components/ThrivacaEngine";
import Products from "@/components/Products";
import Results from "@/components/Results";
import Stakeholders from "@/components/Stakeholders";
import Industries from "@/components/Industries";
import Triggers from "@/components/Triggers";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <HowItWorks />
        <ThrivacaEngine />
        <Products />
        <Results />
        <Industries />
        <Triggers />
        <Stakeholders />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
