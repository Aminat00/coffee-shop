"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-cream z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8 p-8">
          <button
            onClick={onClose}
            className="self-end text-text-dark hover:text-navy transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col gap-6">
            {[
              { href: "/shop", label: "Shop Coffee" },
              { href: "/shop?category=single-origin", label: "Single Origin" },
              { href: "/shop", label: "Subscriptions" },
              { href: "#story", label: "Our Story" },
              { href: "#", label: "About" },
              { href: "#", label: "FAQs" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="text-lg font-medium text-text-dark hover:text-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
