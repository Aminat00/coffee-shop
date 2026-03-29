import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="section-padding bg-navy-deeper">
      <div className="flex flex-col items-center gap-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[4px] text-gold-light">
          Join the Ritual
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight max-w-2xl">
          We&apos;re more than a coffee brand.
        </h2>
        <p className="text-base text-white/60 leading-relaxed max-w-lg">
          Start your morning with specialty coffee roasted just for you.
          Every cup is different — and so is every morning.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="bg-white text-navy rounded-full px-8 py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Shop All Coffee
          </Link>
        </div>
      </div>
    </section>
  );
}
