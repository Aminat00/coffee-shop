import Image from "next/image";

export function AboutHero() {
  return (
    <section className="section-padding bg-cream">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text content */}
        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">
            About Colipse
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.08]">
            Coffee that grounds you in the moment.
          </h1>
          <p className="text-base text-text-mid leading-relaxed max-w-lg">
            We are a family-run specialty coffee brand built on a simple idea —
            your coffee should be roasted only after you order, never before.
          </p>
        </div>

        {/* Image */}
        <div className="relative h-[320px] md:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden">
          <Image
            src="/images/about/about-colipse-coffee.webp"
            alt="Colipse Coffee — Colombian Espresso and Espresso Dark bags"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
