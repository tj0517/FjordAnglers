import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import FeaturedGuides from "@/components/FeaturedGuides";
import Destinations from "@/components/Destinations";
import WhyUs from "@/components/WhyUs";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <FeaturedGuides />
        <Destinations />
        <WhyUs />
        <EmailSignup />
      </main>
      <Footer />
    </>
  );
}
