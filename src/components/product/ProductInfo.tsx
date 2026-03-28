"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { SubscriptionToggle } from "./SubscriptionToggle";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[3px] text-navy">{product.tagline}</span>
        <h1 className="font-heading text-3xl md:text-4xl font-normal">{product.name}</h1>
        <p className="text-sm font-medium text-navy">{product.flavorDescriptors}</p>
      </div>
      <p className="text-base text-text-mid leading-relaxed">{product.description}</p>

      <SubscriptionToggle subscription={product.subscription} selectedSize={product.sizes[selectedSize]} />

      {/* Size selector */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[2px] text-text-dark">Size</span>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size, i) => (
            <button key={size.label} onClick={() => setSelectedSize(i)} className={`rounded-xl border-2 px-5 py-3 text-sm font-medium transition-all ${selectedSize === i ? "border-navy bg-navy text-white" : "border-navy/10 hover:border-navy/30 text-text-dark"}`}>
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grind selector */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[2px] text-text-dark">Grind</span>
        <div className="flex flex-wrap gap-2">
          {product.grinds.map((grind, i) => (
            <button key={grind} onClick={() => setSelectedGrind(i)} className={`rounded-xl border-2 px-5 py-3 text-sm font-medium transition-all ${selectedGrind === i ? "border-navy bg-navy text-white" : "border-navy/10 hover:border-navy/30 text-text-dark"}`}>
              {grind}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border-2 border-navy/10 rounded-xl overflow-hidden">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-navy-pale transition-colors" aria-label="Decrease quantity">
            <Minus size={16} />
          </button>
          <span className="px-5 py-3 text-sm font-semibold min-w-[3rem] text-center">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-navy-pale transition-colors" aria-label="Increase quantity">
            <Plus size={16} />
          </button>
        </div>
        <Button fullWidth>Add to Cart</Button>
      </div>
    </div>
  );
}
