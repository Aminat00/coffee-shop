import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
  return (
    <section id="story" className="section-padding bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left — photo */}
        <div className="relative h-[380px] md:h-[460px] rounded-3xl overflow-hidden">
          <Image
            src="/images/about/about-colipse-coffee.webp"
            alt="Colipse Coffee bags — Colombian Espresso and Espresso Dark"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right — text content */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">Our Story</span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-tight">
            Coffee + Eclipse — a brand made to stand out.
          </h2>
          <p className="text-base text-text-mid leading-relaxed">
            Founded in 2024 by Michal and Emiliia as a family business, Colipse was born from a simple idea: coffee should be roasted only after you order. No warehouses, no stale bags — just beans at their absolute peak, shipped fresh within hours of roasting.
          </p>
          <blockquote className="pl-6 border-l-[3px] border-navy font-heading text-xl italic text-navy leading-relaxed">
            &ldquo;Great coffee, like an eclipse, should be a rare and awe-inspiring experience.&rdquo;
          </blockquote>
          <p className="text-base text-text-mid leading-relaxed">
            We source specialty-grade beans from 15+ countries through small-farm cooperatives — from Ethiopia and Peru to Costa Rica and beyond. Every bag is traceable, every partnership built on fair practices and sustainability.
          </p>
          <Link href="/about" className="text-sm font-semibold text-navy tracking-wide border-b-2 border-navy pb-0.5 transition-opacity hover:opacity-70 self-start">
            Read our full story &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
