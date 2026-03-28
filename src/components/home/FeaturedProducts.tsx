import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FeaturedProducts() {
  const featured = [
    products.find((p) => p.slug === "ethiopia-sidama")!,
    products.find((p) => p.slug === "colombia-tolima")!,
    products.find((p) => p.slug === "french-roast")!,
  ];

  return (
    <section className="section-padding bg-cream">
      <SectionHeader
        tag="Our Coffee"
        title="Every cup is different, and so is every morning."
        link={{ text: "View all coffees →", href: "/shop" }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
