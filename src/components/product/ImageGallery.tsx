"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  mainImage: string;
  productName: string;
}

export function ImageGallery({ mainImage, productName }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const images = [mainImage];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square bg-warm-gray rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="relative w-3/4 h-3/4">
          <Image src={images[activeImage]} alt={productName} fill className="object-contain" priority sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button key={i} onClick={() => setActiveImage(i)} className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-navy" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <Image src={src} alt={`${productName} view ${i + 1}`} fill className="object-contain" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
