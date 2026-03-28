import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-cream">
      <div className="w-full flex flex-col lg:flex-row items-center gap-12 px-6 py-16 lg:px-20 lg:py-0">
        {/* Left content */}
        <div className="relative z-10 flex flex-col gap-7 max-w-xl text-center lg:text-left">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">
            Big Deal in Small Batches
          </span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08]">
            Freshly Roasted
            <br />
            <em className="italic text-navy">After You</em>
            <br />
            Order
          </h1>
          <p className="text-base text-text-mid leading-relaxed max-w-md mx-auto lg:mx-0">
            Discover specialty coffee roasted the moment you order — never
            sitting in a warehouse. Shipped within 1–2 days for peak flavor.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button href="/shop">Shop All Coffee</Button>
            <Button href="#quiz" variant="secondary">
              Take the Coffee Quiz
            </Button>
          </div>
        </div>

        {/* Right visual — hero bag + floating beans */}
        <div className="relative flex-1 flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
          {/* Main coffee bag */}
          <div className="relative w-64 h-96 lg:w-80 lg:h-[480px] z-10">
            <Image
              src="/images/products-nobg/colombia-coffee-beans.png"
              alt="Colipse Coffee — Colombia Tolima"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 1024px) 256px, 320px"
            />
          </div>

          {/* Decorative coffee beans */}
          {[
            "top-[10%] right-[5%] w-12 h-7 rotate-[-25deg]",
            "top-[30%] right-[0%] w-9 h-5 rotate-[40deg] opacity-80",
            "top-[55%] right-[-2%] w-11 h-6 rotate-[-15deg]",
            "top-[75%] right-[10%] w-9 h-5 rotate-[55deg] opacity-70",
            "top-[20%] right-[40%] w-7 h-4 rotate-[-45deg] opacity-50",
            "top-[70%] right-[35%] w-10 h-6 rotate-[20deg] opacity-40",
            "top-[5%] left-[10%] w-8 h-5 rotate-[65deg] opacity-30",
            "bottom-[15%] left-[5%] w-9 h-5 rotate-[-35deg] opacity-60",
          ].map((classes, i) => (
            <div
              key={i}
              className={`absolute ${classes} bg-[#3a2518] rounded-full shadow-md hidden lg:block`}
            >
              <div className="absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-[#2a1810] rounded-full -translate-y-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
