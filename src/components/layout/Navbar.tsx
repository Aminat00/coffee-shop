"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ShoppingBag, Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-navy/[0.08]">
        <div className="relative flex items-center justify-between px-6 py-5 lg:px-16">
          <div className="hidden lg:flex items-center gap-9">
            <Link href="/shop" className="text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors">
              Shop Coffee
            </Link>
            <Link href="/shop?category=single-origin" className="text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors">
              Subscriptions
            </Link>
            <Link href="#story" className="text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors">
              Our Story
            </Link>
          </div>
          <button className="lg:hidden text-text-dark" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none">
            <span className="font-logo text-3xl lg:text-4xl font-black tracking-[1px] text-text-dark lowercase">
              colipse
            </span>
            <span className="font-logo text-[9px] lg:text-[11px] font-semibold tracking-[4px] text-text-dark uppercase">
              coffee
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hidden lg:block text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors">
              About
            </Link>
            <Link href="#" className="hidden lg:block text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors">
              FAQs
            </Link>
            <button className="text-text-mid hover:text-navy transition-colors" aria-label="Account">
              <User size={20} />
            </button>
            <button className="text-text-mid hover:text-navy transition-colors" aria-label="Cart">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
