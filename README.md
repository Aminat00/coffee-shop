# Coffee Shop

A premium specialty coffee e-commerce frontend built with Next.js, Tailwind CSS, and TypeScript. This project prioritizes exceptional UI design and thoughtful UX — every detail, from typography to micro-interactions, is crafted to deliver a best-in-class shopping experience.

## Why This UI Stands Out

This isn't a typical template or generic storefront. The design was built from the ground up with deep attention to user experience:

- **Editorial-quality typography** — Fraunces variable serif for expressive headings paired with Plus Jakarta Sans for clean body text, creating a magazine-level reading experience
- **Floating product cards** — Coffee bags break out of their containers with subtle hover animations, adding depth and delight to product browsing
- **Intentional whitespace** — Generous spacing lets every section breathe, guiding the eye naturally through the content hierarchy
- **Glass-morphism testimonials** — Semi-transparent review cards with backdrop blur on a deep navy background create a modern, premium feel
- **Subscription UX** — A thoughtfully designed one-time vs. subscribe toggle with real-time price calculation and benefit callouts
- **Responsive from the ground up** — Not an afterthought. Every component was designed mobile-first, with fluid transitions across phone, tablet, and desktop
- **No emoji shortcuts** — All icons are crisp Lucide SVGs, maintaining visual consistency across platforms
- **Micro-interactions everywhere** — Cards lift on hover, bags rotate subtly, filters animate smoothly — small touches that make the experience feel alive

## Tech Stack

- **Next.js 15** (App Router) — Server components, static generation, API routes
- **Tailwind CSS** — Utility-first styling with a custom brand palette
- **TypeScript** — Full type safety across the entire codebase
- **Lucide React** — Beautiful, consistent SVG icons
- **Google Fonts** — Fraunces (headings) + Plus Jakarta Sans (body)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero section, value propositions, featured products, brand story, testimonials, coffee quiz CTA |
| Shop | `/shop` | Full product catalog with category filters (roast level, origin, type) |
| Product Detail | `/product/[slug]` | Image gallery, subscription toggle, size/grind selectors, tasting characteristics, producer story |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    api/products/         # Mock API endpoints
    shop/                 # Shop catalog page
    product/[slug]/       # Product detail pages
  components/
    layout/               # TopBar, Navbar, Footer, MobileMenu
    home/                 # Homepage sections (Hero, ValueProps, etc.)
    shop/                 # FilterBar, ProductGrid
    product/              # ImageGallery, ProductInfo, Characteristics
    ui/                   # Shared components (Button, Badge, ProductCard)
  data/                   # Product catalog (12 specialty coffees)
  types/                  # TypeScript interfaces
```

## Product Catalog

The store features 12 curated specialty coffees spanning light to dark roasts, single origins, and signature blends — each with real tasting notes, origin details, and pricing.
