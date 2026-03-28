import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Badge } from "./Badge";

interface ProductCardProps {
  product: Product;
}

const roastGradients: Record<string, string> = {
  light: "from-navy-pale to-blue-100",
  "medium-light": "from-navy-pale to-indigo-100",
  medium: "from-amber-50 to-orange-100",
  "medium-dark": "from-stone-200 to-stone-300",
  dark: "from-stone-300 to-stone-400",
};

const roastLabels: Record<string, string> = {
  light: "Light Roast",
  "medium-light": "Medium-Light",
  medium: "Medium Roast",
  "medium-dark": "Medium-Dark",
  dark: "Dark Roast",
};

export function ProductCard({ product }: ProductCardProps) {
  const gradient =
    roastGradients[product.roastLevel] || roastGradients.medium;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col bg-warm-white rounded-3xl overflow-visible shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image area with floating bag */}
      <div
        className={`relative bg-gradient-to-br ${gradient} rounded-t-3xl h-72 md:h-80 flex items-center justify-center overflow-visible`}
      >
        <Badge className="absolute top-4 right-4 z-10">
          {roastLabels[product.roastLevel]}
        </Badge>
        <div className="relative w-40 h-56 md:w-48 md:h-64 -mb-8 group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-500">
          <Image
            src={product.images.bag}
            alt={product.name}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="(max-width: 768px) 160px, 192px"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2 px-7 pt-12 pb-4">
        <h3 className="font-heading text-2xl font-medium text-text-dark">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-navy">
          {product.tastingNotes.join(" · ")}
        </p>
        <p className="text-sm text-text-light leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-7 pb-7 mt-auto">
        <div>
          <span className="text-xl font-bold text-text-dark">
            ${product.sizes[0].price.toFixed(2)}
          </span>
          <span className="text-sm text-text-light ml-1">
            / {product.sizes[0].label}
          </span>
        </div>
        <span className="bg-navy text-white rounded-full px-6 py-3 text-sm font-semibold group-hover:bg-navy-dark transition-colors">
          Add to Cart
        </span>
      </div>
    </Link>
  );
}
