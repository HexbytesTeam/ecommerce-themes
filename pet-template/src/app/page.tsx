import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import BestSellers from "@/components/BestSellers";
import Testimonials from "@/components/Testimonials";
import BrandsSection from "@/components/BrandsSection";
import FloatingFood from "@/components/FloatingFood";
import PetRangeSection from "@/components/PetRangeSection";
import BlogSection from "@/components/BlogSection";
import StoryBand from "@/components/StoryBand";
import MovingAnimals from "@/components/MovingAnimals";
import ScrollReveal from "@/components/ScrollReveal";
import AccessoriesSection from "@/components/AccessoriesSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      <FloatingFood />
      <MovingAnimals />
      <Hero />
      <ScrollReveal direction="up" delay={100}>
        <CategorySection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <BestSellers />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <BrandsSection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <PetRangeSection />
      </ScrollReveal>
      <AccessoriesSection />
      <ScrollReveal direction="up" delay={100}>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <BlogSection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <StoryBand />
      </ScrollReveal>
    </div>
  );
}
