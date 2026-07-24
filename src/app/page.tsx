import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HeroSequence from "@/components/HeroSequence";
import ProductGrid from "@/components/ProductGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSequence totalFrames={241} imagePathPattern="/frames/frame_%04d.webp" />
      <Ticker />
      <Nav />
      <Hero />
      <ProductGrid />
      <CTA />
      <Footer />
    </main>
  );
}
