import Image from "next/image";

export function Philosophy() {
  return (
    <section className="section-padding bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Image — left on desktop, below text on mobile */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden order-2 lg:order-1">
          <Image
            src="/images/about/colipse-coffee-name.webp"
            alt="Colipse Coffee — Costa Rica Perez Zeledon bag"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Text content — right on desktop, above image on mobile */}
        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">
            Our Story
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-tight">
            Slow down. Drink better.
          </h2>
          <p className="text-base text-text-mid leading-relaxed">
            Colipse was founded in January 2024 by Michal Sieroslawski and
            Emiliia Hrinvald — a husband-and-wife team who believed coffee
            deserved more care. The name combines &ldquo;coffee&rdquo; and
            &ldquo;eclipse&rdquo; — a brand made to stand out, the way an
            eclipse stands out in the sky.
          </p>
          <blockquote className="pl-6 border-l-[3px] border-navy font-heading text-xl italic text-navy leading-relaxed">
            &ldquo;Coffee shouldn&apos;t be a commodity. It should be a craft
            — roasted with intention, delivered with care.&rdquo;
          </blockquote>
          <p className="text-base text-text-mid leading-relaxed">
            Every bag is roasted only after you order. No warehouses, no stale
            inventory — just beans at their absolute peak, shipped fresh within
            hours. We source specialty-grade Arabica and Robusta (SCA 85+) from
            15+ countries through small-farm cooperatives in Ethiopia, Peru,
            Costa Rica, Colombia, Honduras, and beyond.
          </p>
          <p className="text-base text-text-mid leading-relaxed">
            Today, from our roasting facility in Oceanside, California, we
            serve coffee lovers across the entire United States with free
            shipping on every order.
          </p>
        </div>
      </div>
    </section>
  );
}
