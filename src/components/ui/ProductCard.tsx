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
      className="group flex flex-col pt-44 overflow-visible px-2.5 h-full"
    >
      {/* Card wrapper */}
      <div className="relative flex flex-col flex-1 bg-warm-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 overflow-visible">
        {/* Large floating coffee bag - half overflows above card */}
        <div className="absolute -top-44 left-1/2 -translate-x-1/2 z-10">
          <div className="relative w-64 h-80 md:w-72 md:h-96 group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-500">
            <Image
              src={product.images.bag}
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 256px, 288px"
            />
          </div>
        </div>

        {/* Spacer for the part of bag inside the card */}
        <div className="h-52" />

        {/* Card body */}
        <div className="flex flex-col flex-1 gap-2 px-7 items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-[2px] text-navy/60">
            {roastLabels[product.roastLevel]}
          </span>
          <h3 className="font-heading text-2xl font-medium text-text-dark">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-navy">
            {product.tastingNotes.join(" · ")}
          </p>
          <div className="w-12 h-px bg-navy/15 my-2" />
          <p className="text-sm text-text-mid leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Card footer */}
        <div className="flex flex-col gap-3 px-7 py-7 items-center">
          <div>
            <span className="text-xl font-bold text-text-dark">
              ${product.sizes[0].price.toFixed(2)}
            </span>
            <span className="text-sm text-text-light ml-1">
              / {product.sizes[0].label}
            </span>
          </div>
          <span className="bg-navy text-white rounded-full px-6 py-3 text-sm font-semibold group-hover:bg-navy-dark transition-colors w-full text-center">
            Add to Cart
          </span>
        </div>
      </div>
    </Link>
  );
}
