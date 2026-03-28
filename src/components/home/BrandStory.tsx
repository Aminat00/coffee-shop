import Link from "next/link";

export function BrandStory() {
  return (
    <section id="story" className="section-padding bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left — asymmetric photo grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="row-span-2 rounded-2xl overflow-hidden min-h-[380px] bg-gradient-to-br from-[#3a2518] to-[#5a3828] flex items-end p-6">
            <span className="text-white/70 text-xs tracking-[1px] uppercase">Sourced with care</span>
          </div>
          <div className="rounded-2xl overflow-hidden min-h-[180px] bg-gradient-to-br from-navy-light to-navy" />
          <div className="rounded-2xl overflow-hidden min-h-[180px] bg-gradient-to-br from-gold to-gold-light" />
        </div>

        {/* Right — text content */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">Our Story</span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-tight">
            We believe great coffee starts with care at every step.
          </h2>
          <p className="text-base text-text-mid leading-relaxed">
            Most coffee sits in warehouses for months before it reaches your cup. We do things differently — every bag is roasted only after you order, so you get beans at their absolute peak.
          </p>
          <blockquote className="pl-6 border-l-[3px] border-navy font-heading text-xl italic text-navy leading-relaxed">
            &ldquo;Coffee shouldn&apos;t be a commodity. It should be a craft — roasted with intention, delivered with care.&rdquo;
          </blockquote>
          <p className="text-base text-text-mid leading-relaxed">
            We partner directly with farms across Colombia, Ethiopia, Indonesia, and beyond. Specialty-grade beans, traceable origins, sustainable practices.
          </p>
          <Link href="#" className="text-sm font-semibold text-navy tracking-wide border-b-2 border-navy pb-0.5 transition-opacity hover:opacity-70 self-start">
            Read our full story &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
