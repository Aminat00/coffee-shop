import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-cream">
      <div className="relative z-10 w-full flex flex-col items-center gap-1 px-6 py-16 lg:px-20 lg:py-12">
        {/* Top text content */}
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">
            Big Deal in Small Batches
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.08] whitespace-nowrap">
            Freshly Roasted
            <br />
            <em className="italic text-navy">After You </em>
            Order
          </h1>
          <p className="text-base text-text-mid leading-relaxed max-w-md">
            Discover specialty coffee roasted the moment you order — never
            sitting in a warehouse. Shipped within 1–2 days for peak flavor.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex items-center">
          <Button href="/shop">Shop All Coffee</Button>
        </div>

        {/* Coffee bag with connected feature badges */}
        <div className="relative flex items-center justify-center w-full max-w-6xl">
          {/* Feature badges — left side, overlapping into bag area */}
          <div className="hidden md:flex flex-col gap-24 lg:gap-32 flex-1 relative z-20 mr-[-130px] lg:mr-[-170px]">
            {/* Top-left feature */}
            <div className="flex items-center gap-0">
              <div className="flex flex-col gap-1 text-right shrink-0">
                <span className="text-sm lg:text-base font-semibold text-text-dark">
                  Organic & Ethically Sourced
                </span>
                <span className="text-xs lg:text-sm text-text-mid">
                  Responsibly farmed beans
                </span>
              </div>
              <div className="flex items-center flex-1 min-w-8">
                <div className="flex-1 h-px bg-text-dark/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-text-dark/50 shrink-0" />
              </div>
            </div>

            {/* Bottom-left feature */}
            <div className="flex items-center gap-0">
              <div className="flex flex-col gap-1 text-right shrink-0">
                <span className="text-sm lg:text-base font-semibold text-text-dark">
                  Delivered to Your Door
                </span>
                <span className="text-xs lg:text-sm text-text-mid">
                  Shipped within 1–2 days
                </span>
              </div>
              <div className="flex items-center flex-1 min-w-8">
                <div className="flex-1 h-px bg-text-dark/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-text-dark/50 shrink-0" />
              </div>
            </div>
          </div>

          {/* Coffee bag image — bigger */}
          <div className="relative w-80 h-[460px] md:w-[440px] md:h-[590px] lg:w-[540px] lg:h-[720px] shrink-0">
            <Image
              src="/images/products-nobg/colombia-coffee-beans.png"
              alt="Colipse Coffee — Colombia Tolima"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 440px, 540px"
            />
          </div>

          {/* Feature badges — right side, overlapping into bag area */}
          <div className="hidden md:flex flex-col gap-24 lg:gap-32 flex-1 relative z-20 ml-[-120px] lg:ml-[-160px]">
            {/* Top-right feature */}
            <div className="flex items-center gap-0">
              <div className="flex items-center flex-1 min-w-8">
                <div className="w-2.5 h-2.5 rounded-full bg-text-dark/50 shrink-0" />
                <div className="flex-1 h-px bg-text-dark/30" />
              </div>
              <div className="flex flex-col gap-1 text-left shrink-0">
                <span className="text-sm lg:text-base font-semibold text-text-dark">
                  Roasted Weekly, Always Fresh
                </span>
                <span className="text-xs lg:text-sm text-text-mid">
                  Small-batch perfection
                </span>
              </div>
            </div>

            {/* Bottom-right feature */}
            <div className="flex items-center gap-0">
              <div className="flex items-center flex-1 min-w-8">
                <div className="w-2.5 h-2.5 rounded-full bg-text-dark/50 shrink-0" />
                <div className="flex-1 h-px bg-text-dark/30" />
              </div>
              <div className="flex flex-col gap-1 text-left shrink-0">
                <span className="text-sm lg:text-base font-semibold text-text-dark">
                  Crafted for Flavor
                </span>
                <span className="text-xs lg:text-sm text-text-mid">
                  Peak taste, every cup
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
