"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { FilterBar } from "@/components/shop/FilterBar";
import { ProductGrid } from "@/components/shop/ProductGrid";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    if (["light", "medium", "dark"].includes(activeFilter)) {
      return products.filter((p) => p.roastLevel.includes(activeFilter));
    }
    return products.filter((p) => p.category.includes(activeFilter as never));
  }, [activeFilter]);

  return (
    <div className="section-padding bg-cream">
      <div className="flex flex-col gap-5 mb-12">
        <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">Shop</span>
        <h1 className="font-heading text-4xl md:text-5xl font-normal">Our Coffee</h1>
        <p className="text-base text-text-mid max-w-lg leading-relaxed">
          Every bag is roasted after you order — never sitting in a warehouse. Specialty-grade beans, traceable origins, shipped free.
        </p>
      </div>
      <div className="flex flex-col gap-10">
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
