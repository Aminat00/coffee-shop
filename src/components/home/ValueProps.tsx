import { Flame, Package, Leaf, Zap } from "lucide-react";

const props = [
  { icon: Flame, title: "Roasted to Order", subtitle: "Maximum freshness guaranteed" },
  { icon: Package, title: "Free Shipping", subtitle: "On every U.S. order" },
  { icon: Leaf, title: "Eco Packaging", subtitle: "Recyclable & CO₂-valve bags" },
  { icon: Zap, title: "Ships in 1–2 Days", subtitle: "From roaster to your door" },
];

export function ValueProps() {
  return (
    <div className="bg-white border-y border-navy/[0.08]">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {props.map((prop, i) => (
          <div
            key={prop.title}
            className={`flex items-center gap-4 px-6 py-7 lg:px-10 lg:py-8 ${
              i < props.length - 1 ? "border-b lg:border-b-0 lg:border-r border-navy/[0.08]" : ""
            } ${i === 1 || i === 3 ? "border-l lg:border-l-0 border-navy/[0.08]" : ""}`}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-navy-pale rounded-xl shrink-0">
              <prop.icon size={20} className="text-navy" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-[1px] text-text-dark">{prop.title}</span>
              <span className="text-xs text-text-light">{prop.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
