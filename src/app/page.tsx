import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
    </>
  );
}
