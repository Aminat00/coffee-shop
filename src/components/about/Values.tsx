import { Leaf, Globe, Flame, Recycle, Heart, Truck } from "lucide-react";

const values = [
  {
    icon: Flame,
    title: "Roasted to Order",
    description:
      "Every bag is roasted after purchase and shipped within hours — never pre-roasted, never stale.",
  },
  {
    icon: Globe,
    title: "Ethical Sourcing",
    description:
      "Direct partnerships with small-farm cooperatives across 15+ countries, built on fair practices.",
  },
  {
    icon: Recycle,
    title: "Zero-Waste Packaging",
    description:
      "Recyclable bags with CO\u2082-valve technology that keep beans fresh and reduce waste.",
  },
  {
    icon: Leaf,
    title: "Sustainability First",
    description:
      "We offset our carbon footprint and support World Coffee Research to protect coffee farming for future generations.",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description:
      "Our sourcing partners fund schools, fight child labor, and build stronger futures for farming communities.",
  },
  {
    icon: Truck,
    title: "Free Nationwide Shipping",
    description:
      "Every order ships free across the United States — no minimums, no hidden fees, delivered in 2–5 business days.",
  },
];

export function Values() {
  return (
    <section className="section-padding bg-warm-gray">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">
            What We Stand For
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-tight">
            Caring for the land that cares for us.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-4 bg-white rounded-2xl p-8"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-navy-pale rounded-xl">
                <value.icon size={22} className="text-navy" />
              </div>
              <h3 className="text-base font-bold text-text-dark">
                {value.title}
              </h3>
              <p className="text-sm text-text-mid leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
