import NavbarLanding from "@/components/NavbarLanding";
import HeroSimple from "@/components/HeroSimple";
import MissionVision from "@/components/MissionVision";
import GuideForm from "@/components/GuideForm";
import FooterLanding from "@/components/FooterLanding";

export default function Home() {
  return (
    <>
      <NavbarLanding />
      <main>
        <HeroSimple />
        <MissionVision />
        <GuideForm />
      </main>
      <FooterLanding />
    </>
  );
}
