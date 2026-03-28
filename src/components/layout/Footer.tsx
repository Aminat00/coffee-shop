import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "All Coffee", href: "/shop" },
    { label: "Single Origin", href: "/shop?category=single-origin" },
    { label: "Blends", href: "/shop?category=blend" },
    { label: "Espresso", href: "/shop?category=espresso" },
    { label: "Subscriptions", href: "#" },
    { label: "Gift Cards", href: "#" },
  ],
  Company: [
    { label: "Our Story", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Wholesale", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "FAQs", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-text-dark text-white">
      <div className="section-padding">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-16 mb-16">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <span className="text-2xl font-bold tracking-[4px] uppercase">Colipse</span>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Big Deal in Small Batches. Premium specialty coffee, roasted to order and shipped fresh to your door.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-5">
              <h4 className="text-xs font-semibold uppercase tracking-[2px] text-gold-light">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-8">
          <span className="text-xs text-white/40">&copy; {new Date().getFullYear()} Powerbean Coffee LLC. All rights reserved.</span>
          <div className="flex items-center gap-5">
            {["Instagram", "TikTok", "Facebook", "YouTube"].map((social) => (
              <a key={social} href="#" className="text-xs text-white/40 hover:text-white transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
