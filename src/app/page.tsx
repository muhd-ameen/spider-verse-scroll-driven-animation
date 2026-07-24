import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Ticker />
      <Nav />
      <Hero />
      <ProductGrid />
      <CTA />
      <Footer />
    </main>
  );
}
