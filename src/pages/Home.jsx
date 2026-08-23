import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import CredibilityCTA from "@/components/home/CredibilityCTA";
import ServicesOverview from "@/components/home/ServicesOverview";
import FeaturedSections from "@/components/home/FeaturedSections";
import PerformanceVisuals from "@/components/home/PerformanceVisuals";
import IndustriesPreview from "@/components/home/IndustriesPreview";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import Process from "@/components/home/Process";
import AboutPreview from "@/components/home/AboutPreview";
import ResourcesPreview from "@/components/home/ResourcesPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CredibilityCTA />
      <ServicesOverview />
      <FeaturedSections />
      <PerformanceVisuals />
      <IndustriesPreview />
      <CaseStudiesPreview />
      <Process />
      <AboutPreview />
      <ResourcesPreview />
      <FinalCTA />
    </>
  );
}
