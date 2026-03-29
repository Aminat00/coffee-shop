import { Award, Flame, Truck, Recycle } from "lucide-react";
import { Product } from "@/types";

interface CharacteristicsProps {
  product: Product;
}

const trustBadges = [
  { icon: Award, label: "Specialty Grade" },
  { icon: Flame, label: "Roasted Fresh" },
  { icon: Truck, label: "Carbon-Neutral Shipping" },
  { icon: Recycle, label: "Compostable Packaging" },
];

export function Characteristics({ product }: CharacteristicsProps) {
  const hasOrigin = product.origin.region !== "";
  const characteristics = [
    { label: "Tasting Notes", value: product.tastingNotes.join(", ") },
    ...(hasOrigin ? [
      { label: "Region", value: `${product.origin.region}, ${product.origin.country}` },
      { label: "Traceability", value: product.origin.traceability },
      { label: "Altitude", value: product.origin.altitude },
      { label: "Varieties", value: product.origin.varieties },
      { label: "Process", value: product.origin.process },
    ] : []),
    { label: "Bag Size", value: product.sizes.map((s) => s.label).join(", ") },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Trust badges row */}
      <div className="flex flex-wrap gap-6 justify-center bg-warm-gray rounded-2xl p-6">
        {trustBadges.map((badge) => (
          <div key={badge.label} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-warm-white rounded-2xl flex items-center justify-center">
              <badge.icon size={22} className="text-navy" />
            </div>
            <span className="text-xs font-semibold text-text-mid text-center max-w-[100px]">{badge.label}</span>
          </div>
        ))}
      </div>

      {/* Characteristics table */}
      <div className="bg-warm-gray rounded-2xl p-6 md:p-8">
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-2xl font-normal">Characteristics</h3>
          {characteristics.map((char) => (
            <div key={char.label} className="flex items-center justify-between py-3 border-b border-navy/[0.06] last:border-b-0">
              <span className="text-sm text-text-light">{char.label}</span>
              <span className="text-sm font-medium text-text-dark text-right">{char.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
