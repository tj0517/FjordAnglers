import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import MapSection from "@/components/MapSection";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedDestinations />
        <WhyChooseUs />
        <MapSection />
        <HowItWorks />
        <EmailSignup />
      </main>
      <Footer />
    </>
  );
}
