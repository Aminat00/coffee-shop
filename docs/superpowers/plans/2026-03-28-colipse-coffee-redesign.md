# Colipse Coffee Frontend Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, editorial-quality frontend for Colipse Coffee with 3 pages (Home, Shop, Product Detail) using Next.js + Tailwind CSS, featuring real product data and images.

**Architecture:** Next.js App Router with shared layout (TopBar + Navbar + Footer). Product data lives in a static TypeScript file served through API routes. Components are organized by page (home/, shop/, product/) with shared UI components. Tailwind config extends the Colipse navy brand palette. All layouts use flex + gap (no hardcoded margins where gap works).

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS 4, TypeScript, Lucide React icons, Fraunces + Plus Jakarta Sans (Google Fonts via next/font)

**Spec:** `docs/superpowers/specs/2026-03-28-colipse-coffee-redesign-design.md`

**Design references:** `desing-images/` (Alder & Co. inspiration), `desing-images/coffee-products/` (real Colipse bag photos)

**IMPORTANT layout rule from CLAUDE.md:** Always use gap and flex. Avoid hardcoded mb/mt/pb/pt when the same result is achievable with gap and flex.

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/aminatmoldalieva/coffee-shop
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git --use-npm
```

If prompted about overwriting existing files, choose yes. The `--no-git` flag prevents re-initializing git since we're in an existing directory.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/aminatmoldalieva/coffee-shop
npm install lucide-react
```

- [ ] **Step 3: Configure Tailwind with Colipse brand palette**

Replace the contents of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#334fb4",
          dark: "#1a2a6c",
          deeper: "#0f1b4d",
          light: "#4a6ad4",
          pale: "#e8ecf7",
        },
        cream: "#faf8f5",
        "warm-white": "#fefdfb",
        "warm-gray": "#f5f3f0",
        "text-dark": "#1a1a2e",
        "text-mid": "#555566",
        "text-light": "#888899",
        gold: {
          DEFAULT: "#c4a265",
          light: "#e8d5b0",
        },
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "28px",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Set up global CSS**

Replace the contents of `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-cream text-text-dark font-body antialiased;
  }
}

@layer utilities {
  .section-padding {
    @apply px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24;
  }
}
```

- [ ] **Step 5: Set up root layout with fonts**

Replace the contents of `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Colipse Coffee — Big Deal in Small Batches",
  description:
    "Premium specialty coffee, roasted to order and shipped fresh to your door. Free shipping on all U.S. orders.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create minimal homepage placeholder**

Replace the contents of `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <h1 className="font-heading text-6xl text-navy">Colipse Coffee</h1>
    </main>
  );
}
```

- [ ] **Step 7: Copy product images to public directory**

```bash
mkdir -p /Users/aminatmoldalieva/coffee-shop/public/images/products
cp /Users/aminatmoldalieva/coffee-shop/desing-images/coffee-products/* /Users/aminatmoldalieva/coffee-shop/public/images/products/
```

- [ ] **Step 8: Verify dev server starts**

```bash
cd /Users/aminatmoldalieva/coffee-shop && npm run dev
```

Open `http://localhost:3000` — should see "Colipse Coffee" in Fraunces serif font on cream background.

- [ ] **Step 9: Initialize git and commit**

```bash
cd /Users/aminatmoldalieva/coffee-shop
git init
echo "node_modules/\n.next/\n.DS_Store\n.superpowers/" > .gitignore
git add -A
git commit -m "feat: initialize Next.js project with Tailwind and Colipse brand config"
```

---

### Task 2: TypeScript Types & Product Data

**Files:**
- Create: `src/types/index.ts`, `src/data/products.ts`

- [ ] **Step 1: Define TypeScript types**

Create `src/types/index.ts`:

```typescript
export interface ProductOrigin {
  region: string;
  country: string;
  altitude: string;
  varieties: string;
  process: string;
  traceability: string;
}

export interface ProductSize {
  label: string;
  weight: string;
  price: number;
}

export interface ProductSubscription {
  available: boolean;
  discountPercent: number;
  frequencies: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  roastLevel: "light" | "medium-light" | "medium" | "medium-dark" | "dark";
  tastingNotes: string[];
  flavorDescriptors: string;
  origin: ProductOrigin;
  producerStory: string;
  category: (
    | "single-origin"
    | "blend"
    | "espresso"
    | "decaf"
    | "flavored"
  )[];
  images: {
    bag: string;
    lifestyle: string[];
  };
  sizes: ProductSize[];
  grinds: string[];
  subscription: ProductSubscription;
  badges: string[];
}
```

- [ ] **Step 2: Create product data file**

Create `src/data/products.ts`:

```typescript
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "blonde-espresso",
    name: "Blonde Espresso",
    tagline: "Bright & Delicate",
    description:
      "A light, approachable espresso with sweet honey notes and vibrant citrus. Perfect for those who prefer a gentler, brighter cup without sacrificing complexity.",
    roastLevel: "light",
    tastingNotes: ["Honey", "Citrus", "Sweet Berries"],
    flavorDescriptors: "Bright · Sweet · Delicate",
    origin: {
      region: "",
      country: "",
      altitude: "",
      varieties: "",
      process: "",
      traceability: "Specialty Grade",
    },
    producerStory: "",
    category: ["espresso"],
    images: {
      bag: "/images/products/blonde-espresso-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: ["Specialty Grade", "Roasted Fresh"],
  },
  {
    id: "2",
    slug: "india-cherry-robusta",
    name: "India Cherry Robusta",
    tagline: "Bold & Distinctive",
    description:
      "A unique 100% Cherry Robusta from Kerala, India. Naturally processed at high altitude, delivering bold popcorn and molasses notes with a rye finish. Unlike any coffee you've tried.",
    roastLevel: "medium",
    tastingNotes: ["Popcorn", "Molasses", "Rye"],
    flavorDescriptors: "Bold · Earthy · Unique",
    origin: {
      region: "Kerala",
      country: "India",
      altitude: "1,200 - 1,650m",
      varieties: "Cherry Robusta",
      process: "Natural",
      traceability: "Direct Trade",
    },
    producerStory:
      "Grown in the lush highlands of Kerala, India, these Cherry Robusta beans are cultivated by smallholder farmers who have perfected natural processing methods over generations. The high altitude and tropical climate create a unique flavor profile that challenges everything you think you know about Robusta coffee.",
    category: ["single-origin"],
    images: {
      bag: "/images/products/robusta-coffee-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.99 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: ["Specialty Grade", "Roasted Fresh", "Single Origin"],
  },
  {
    id: "3",
    slug: "italian-roast",
    name: "Italian Roast",
    tagline: "Rich & Intense",
    description:
      "A classic dark roast with deep berry undertones, rich dark chocolate, and toasted almond. Full-bodied and bold — the quintessential Italian coffee experience.",
    roastLevel: "dark",
    tastingNotes: ["Berries", "Dark Chocolate", "Toasted Almond"],
    flavorDescriptors: "Rich · Bold · Classic",
    origin: {
      region: "",
      country: "",
      altitude: "",
      varieties: "",
      process: "",
      traceability: "Specialty Grade",
    },
    producerStory: "",
    category: ["blend"],
    images: {
      bag: "/images/products/italian-roast-coffee-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: ["Specialty Grade", "Roasted Fresh"],
  },
  {
    id: "4",
    slug: "italian-espresso",
    name: "Italian Espresso",
    tagline: "Smooth & Velvety",
    description:
      "Crafted for espresso lovers who appreciate a velvety, full-bodied shot. Rich caramel sweetness meets dark cocoa depth with a brown sugar finish. La dolce vita in every cup.",
    roastLevel: "dark",
    tastingNotes: ["Caramel", "Dark Cocoa", "Brown Sugar"],
    flavorDescriptors: "Velvety · Sweet · Full-bodied",
    origin: {
      region: "",
      country: "",
      altitude: "",
      varieties: "",
      process: "",
      traceability: "Specialty Grade",
    },
    producerStory: "",
    category: ["espresso", "blend"],
    images: {
      bag: "/images/products/italian-espresso-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 23.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: ["Specialty Grade", "Roasted Fresh"],
  },
  {
    id: "5",
    slug: "arabica-blend",
    name: "Arabica Blend",
    tagline: "Balanced & Versatile",
    description:
      "Our signature Arabica blend delivers a perfectly balanced cup — bright red currant and cherry up front, smooth hazelnut finish. A crowd-pleaser for any brewing method.",
    roastLevel: "medium",
    tastingNotes: ["Red Currant", "Cherry", "Hazelnut"],
    flavorDescriptors: "Balanced · Fruity · Smooth",
    origin: {
      region: "",
      country: "",
      altitude: "",
      varieties: "",
      process: "",
      traceability: "Specialty Grade",
    },
    producerStory: "",
    category: ["blend"],
    images: {
      bag: "/images/products/arabica-coffee-whole-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 21.99 },
      { label: "16oz", weight: "454g", price: 28.99 },
      { label: "2lb", weight: "907g", price: 48.25 },
      { label: "5lb", weight: "2.27kg", price: 95.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: ["Specialty Grade", "Roasted Fresh"],
  },
  {
    id: "6",
    slug: "ethiopia-sidama",
    name: "Ethiopia Sidama",
    tagline: "Complex & Aromatic",
    description:
      "From the birthplace of coffee — a stunning medium-light roast with caramel sweetness, vanilla depth, and floral aromatics. Sun-dried heirloom varieties from the Sidama region at 2,000m+ elevation.",
    roastLevel: "medium-light",
    tastingNotes: [
      "Caramel",
      "Vanilla",
      "Floral",
      "Berry",
      "Bright Acidity",
    ],
    flavorDescriptors: "Complex · Floral · Aromatic",
    origin: {
      region: "Sidama",
      country: "Ethiopia",
      altitude: "2,000 - 2,200m",
      varieties: "Local Heirloom - Sidamo",
      process: "Natural and Sun Dried",
      traceability: "Single Origin, Traceable",
    },
    producerStory:
      "Ethiopia's Sidama region is one of the world's most celebrated coffee origins. At elevations exceeding 2,000 meters, local heirloom Sidamo varieties develop slowly, building extraordinary complexity. These beans are naturally processed and sun-dried by smallholder farmers who have cultivated coffee for centuries, preserving traditions that produce some of the most aromatic and complex coffees on earth.",
    category: ["single-origin"],
    images: {
      bag: "/images/products/ethiopia-coffee-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: [
      "Specialty Grade",
      "Roasted Fresh",
      "Single Origin",
      "Compostable Packaging",
    ],
  },
  {
    id: "7",
    slug: "colombia-tolima",
    name: "Colombia Tolima",
    tagline: "Your Everyday Reset",
    description:
      "A beautifully balanced medium roast from Colombia's Tolima region. Washed and sun-dried Typica and Caturra varieties deliver rich dark chocolate, tropical mango, and stone fruit notes. The perfect daily ritual.",
    roastLevel: "medium",
    tastingNotes: [
      "Dark Chocolate",
      "Mango",
      "Peach",
      "Medium Acidity",
    ],
    flavorDescriptors: "Balanced · Smooth · Versatile",
    origin: {
      region: "Tolima",
      country: "Colombia",
      altitude: "1,500 - 2,100m",
      varieties: "Typica, Caturra",
      process: "Washed and Sun Dried",
      traceability: "Single Origin, Traceable",
    },
    producerStory:
      "Colombia's Tolima department sits in the heart of the Andes, where volcanic soil and high altitude create ideal growing conditions. Smallholder farmers cultivate Typica and Caturra varieties using traditional washed processing, followed by careful sun drying. The result is a clean, balanced cup that showcases the region's renowned chocolate and fruit notes.",
    category: ["single-origin"],
    images: {
      bag: "/images/products/colombia-coffee-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 23.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: [
      "Specialty Grade",
      "Roasted Fresh",
      "Single Origin",
      "Compostable Packaging",
    ],
  },
  {
    id: "8",
    slug: "french-roast",
    name: "French Roast",
    tagline: "Bold & Smoky",
    description:
      "The darkest, boldest roast in our lineup. Rich cocoa depth, toffee sweetness, and subtle berry undertones. Unapologetically intense — for those who like their coffee strong.",
    roastLevel: "dark",
    tastingNotes: ["Rich Cocoa", "Toffee", "Subtle Berry"],
    flavorDescriptors: "Bold · Smoky · Intense",
    origin: {
      region: "",
      country: "",
      altitude: "",
      varieties: "",
      process: "",
      traceability: "Specialty Grade",
    },
    producerStory: "",
    category: ["blend"],
    images: {
      bag: "/images/products/french-roast-coffee-grounds.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: ["Specialty Grade", "Roasted Fresh"],
  },
  {
    id: "9",
    slug: "bali-blue-moon",
    name: "Bali Blue Moon",
    tagline: "Exotic & Layered",
    description:
      "A rare Indonesian gem from Bali's Kintamani highlands. Wet-hulled and sun-dried, delivering layers of bakers chocolate, orange peel, juniper, and molasses. Exotic, complex, unforgettable.",
    roastLevel: "medium-dark",
    tastingNotes: [
      "Bakers Chocolate",
      "Orange Peel",
      "Juniper",
      "Molasses",
    ],
    flavorDescriptors: "Exotic · Layered · Complex",
    origin: {
      region: "Kintamani, Bali",
      country: "Indonesia",
      altitude: "1,200 - 1,600m",
      varieties: "Bourbon, Typica, Catimor",
      process: "Wet-Hulled, Two-Step Sun Dried",
      traceability: "Single Origin, Traceable",
    },
    producerStory:
      "In the volcanic highlands of Kintamani, Bali, coffee grows alongside citrus trees in a traditional agroforestry system. The region's unique wet-hulling process — followed by careful two-step sun drying — creates a flavor profile unlike any other origin. Bourbon, Typica, and Catimor varieties thrive at 1,200-1,600m, producing beans with extraordinary depth and an exotic character that captures the spirit of the island.",
    category: ["single-origin"],
    images: {
      bag: "/images/products/bali-coffee-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: [
      "Specialty Grade",
      "Roasted Fresh",
      "Single Origin",
      "Compostable Packaging",
    ],
  },
  {
    id: "10",
    slug: "brazil-sul-de-minas",
    name: "Brazil Sul de Minas",
    tagline: "Sweet & Nutty",
    description:
      "From Brazil's renowned Sul de Minas region — a naturally processed medium roast with bright mandarin orange, rich chocolate, and medium acidity. Sweet, clean, and endlessly drinkable.",
    roastLevel: "medium",
    tastingNotes: [
      "Mandarin Orange",
      "Chocolate",
      "Medium Acidity",
    ],
    flavorDescriptors: "Sweet · Nutty · Clean",
    origin: {
      region: "Sul de Minas",
      country: "Brazil",
      altitude: "950 - 1,100m",
      varieties: "Mundo Novo, Catuai, Icatu",
      process: "Natural",
      traceability: "Single Origin, Traceable",
    },
    producerStory:
      "Sul de Minas is one of Brazil's most important coffee-producing regions, nestled in the southern highlands of Minas Gerais. The naturally processed Mundo Novo, Catuai, and Icatu varieties benefit from a distinct dry season that allows careful cherry drying on raised beds. The result is a clean, sweet cup that showcases Brazil's best qualities.",
    category: ["single-origin"],
    images: {
      bag: "/images/products/brazil-coffee-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: [
      "Specialty Grade",
      "Roasted Fresh",
      "Single Origin",
      "Compostable Packaging",
    ],
  },
  {
    id: "11",
    slug: "breakfast-blend",
    name: "Breakfast Blend",
    tagline: "Bright & Cheerful",
    description:
      "Rise and shine with our brightest blend. Almond sweetness, zesty lemon-lime, and sweet berry notes make this the perfect morning companion. Light, lively, and impossibly cheerful.",
    roastLevel: "medium",
    tastingNotes: ["Almond", "Lemon/Lime", "Sweet Berries"],
    flavorDescriptors: "Bright · Clean · Sweet",
    origin: {
      region: "",
      country: "",
      altitude: "",
      varieties: "",
      process: "",
      traceability: "Specialty Grade",
    },
    producerStory: "",
    category: ["blend"],
    images: {
      bag: "/images/products/breakfast-blend-coffee-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 21.99 },
      { label: "16oz", weight: "454g", price: 28.99 },
      { label: "2lb", weight: "907g", price: 48.25 },
      { label: "5lb", weight: "2.27kg", price: 95.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: ["Specialty Grade", "Roasted Fresh"],
  },
  {
    id: "12",
    slug: "espresso-blend",
    name: "Espresso Blend",
    tagline: "The Perfect Shot",
    description:
      "Our house espresso blend — crafted for a rich, syrupy shot with dark chocolate depth, brown sugar sweetness, and red berry brightness. Medium-dark roast for maximum crema.",
    roastLevel: "medium-dark",
    tastingNotes: ["Dark Chocolate", "Brown Sugar", "Red Berries"],
    flavorDescriptors: "Rich · Crema · Intense",
    origin: {
      region: "",
      country: "",
      altitude: "",
      varieties: "",
      process: "",
      traceability: "Specialty Grade",
    },
    producerStory: "",
    category: ["espresso", "blend"],
    images: {
      bag: "/images/products/espresso-blend-coffee-grounds.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 23.5 },
      { label: "16oz", weight: "454g", price: 29.99 },
      { label: "2lb", weight: "907g", price: 49.99 },
      { label: "5lb", weight: "2.27kg", price: 99.0 },
    ],
    grinds: [
      "Whole Bean",
      "Fine (Espresso)",
      "Medium (Drip)",
      "Coarse (French Press)",
    ],
    subscription: {
      available: true,
      discountPercent: 10,
      frequencies: [
        "Every 2 weeks",
        "Every 3 weeks",
        "Every month",
        "Every 6 weeks",
      ],
    },
    badges: ["Specialty Grade", "Roasted Fresh"],
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts src/data/products.ts
git commit -m "feat: add product types and 12-product data catalog"
```

---

### Task 3: API Routes

**Files:**
- Create: `src/app/api/products/route.ts`, `src/app/api/products/[slug]/route.ts`

- [ ] **Step 1: Create products list endpoint**

Create `src/app/api/products/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category && category !== "all") {
    const filtered = products.filter((p) => p.category.includes(category as never));
    return NextResponse.json(filtered);
  }

  return NextResponse.json(products);
}
```

- [ ] **Step 2: Create single product endpoint**

Create `src/app/api/products/[slug]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
```

- [ ] **Step 3: Verify API works**

```bash
cd /Users/aminatmoldalieva/coffee-shop && npm run dev
```

Test: `curl http://localhost:3000/api/products | head -c 200`
Test: `curl http://localhost:3000/api/products/blonde-espresso | head -c 200`

Both should return JSON.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/
git commit -m "feat: add product API routes with category filtering"
```

---

### Task 4: Shared UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/ProductCard.tsx`, `src/components/ui/SectionHeader.tsx`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/Button.tsx`:

```tsx
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold";
  href?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold text-sm tracking-wide transition-all duration-300";
  const variants = {
    primary:
      "bg-navy text-white border-2 border-navy px-9 py-4 hover:bg-navy-dark",
    secondary:
      "bg-transparent text-navy border-2 border-navy px-9 py-4 hover:bg-navy-pale",
    gold: "bg-gold text-navy-deeper font-bold px-9 py-4 hover:bg-gold-light",
  };
  const width = fullWidth ? "w-full" : "";
  const classes = `${base} ${variants[variant]} ${width} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create Badge component**

Create `src/components/ui/Badge.tsx`:

```tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-white text-navy font-semibold",
    outline: "bg-transparent text-navy border border-navy",
  };

  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-xs tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create SectionHeader component**

Create `src/components/ui/SectionHeader.tsx`:

```tsx
import Link from "next/link";

interface SectionHeaderProps {
  tag: string;
  title: string;
  link?: { text: string; href: string };
  tagColor?: string;
  titleColor?: string;
}

export function SectionHeader({
  tag,
  title,
  link,
  tagColor = "text-navy",
  titleColor = "text-text-dark",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16">
      <div className="flex flex-col gap-4">
        <span
          className={`text-xs font-semibold uppercase tracking-[4px] ${tagColor}`}
        >
          {tag}
        </span>
        <h2
          className={`font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-tight ${titleColor}`}
        >
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="text-sm font-semibold text-navy tracking-wide border-b-2 border-navy pb-0.5 transition-opacity hover:opacity-70 shrink-0"
        >
          {link.text}
        </Link>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create ProductCard component (Alder & Co. floating bag style)**

Create `src/components/ui/ProductCard.tsx`:

```tsx
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
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add shared UI components (Button, Badge, SectionHeader, ProductCard)"
```

---

### Task 5: Layout Components (TopBar, Navbar, Footer, MobileMenu)

**Files:**
- Create: `src/components/layout/TopBar.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create TopBar**

Create `src/components/layout/TopBar.tsx`:

```tsx
export function TopBar() {
  return (
    <div className="bg-navy-dark text-white text-center py-2.5 px-4">
      <p className="text-xs uppercase tracking-[2.5px] font-normal">
        Free Shipping Always · Get 10% off your first order with code{" "}
        <span className="text-gold-light font-semibold">FRESHBEANS</span>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create MobileMenu**

Create `src/components/layout/MobileMenu.tsx`:

```tsx
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
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
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
```

- [ ] **Step 3: Create Navbar**

Create `src/components/layout/Navbar.tsx`:

```tsx
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
        <div className="flex items-center justify-between px-6 py-5 lg:px-16">
          {/* Left links — desktop */}
          <div className="hidden lg:flex items-center gap-9">
            <Link
              href="/shop"
              className="text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors"
            >
              Shop Coffee
            </Link>
            <Link
              href="/shop?category=single-origin"
              className="text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors"
            >
              Subscriptions
            </Link>
            <Link
              href="#story"
              className="text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors"
            >
              Our Story
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-text-dark"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Center logo */}
          <Link
            href="/"
            className="text-2xl lg:text-[28px] font-bold tracking-[4px] text-navy-dark uppercase"
          >
            Colipse
          </Link>

          {/* Right links */}
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="hidden lg:block text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="hidden lg:block text-sm font-medium text-text-mid tracking-wide hover:text-navy transition-colors"
            >
              FAQs
            </Link>
            <button
              className="text-text-mid hover:text-navy transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </button>
            <button
              className="text-text-mid hover:text-navy transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
```

- [ ] **Step 4: Create Footer**

Create `src/components/layout/Footer.tsx`:

```tsx
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
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <span className="text-2xl font-bold tracking-[4px] uppercase">
              Colipse
            </span>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Big Deal in Small Batches. Premium specialty coffee, roasted to
              order and shipped fresh to your door.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-5">
              <h4 className="text-xs font-semibold uppercase tracking-[2px] text-gold-light">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-8">
          <span className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Powerbean Coffee LLC. All rights
            reserved.
          </span>
          <div className="flex items-center gap-5">
            {["Instagram", "TikTok", "Facebook", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Wire layout components into root layout**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Colipse Coffee — Big Deal in Small Batches",
  description:
    "Premium specialty coffee, roasted to order and shipped fresh to your door. Free shipping on all U.S. orders.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <TopBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify layout renders**

```bash
cd /Users/aminatmoldalieva/coffee-shop && npm run dev
```

Check `http://localhost:3000` — should see TopBar, Navbar, content area, and Footer. Test mobile view (resize or DevTools) — hamburger menu should appear and drawer should slide in/out.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add layout components (TopBar, Navbar, MobileMenu, Footer)"
```

---

### Task 6: Homepage — Hero Section

**Files:**
- Create: `src/components/home/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/home/Hero.tsx`:

```tsx
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
              src="/images/products/colombia-coffee-beans.webp"
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
```

- [ ] **Step 2: Add Hero to homepage**

Replace `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return <Hero />;
}
```

- [ ] **Step 3: Verify hero renders**

```bash
cd /Users/aminatmoldalieva/coffee-shop && npm run dev
```

Check desktop and mobile views — hero should show text left, bag right on desktop; stacked centered on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with floating coffee bag and decorative beans"
```

---

### Task 7: Homepage — ValueProps, FeaturedProducts, BrandStory

**Files:**
- Create: `src/components/home/ValueProps.tsx`, `src/components/home/FeaturedProducts.tsx`, `src/components/home/BrandStory.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ValueProps**

Create `src/components/home/ValueProps.tsx`:

```tsx
import { Flame, Package, Leaf, Zap } from "lucide-react";

const props = [
  {
    icon: Flame,
    title: "Roasted to Order",
    subtitle: "Maximum freshness guaranteed",
  },
  {
    icon: Package,
    title: "Free Shipping",
    subtitle: "On every U.S. order",
  },
  {
    icon: Leaf,
    title: "Eco Packaging",
    subtitle: "Recyclable & CO\u2082-valve bags",
  },
  {
    icon: Zap,
    title: "Ships in 1\u20132 Days",
    subtitle: "From roaster to your door",
  },
];

export function ValueProps() {
  return (
    <div className="bg-white border-y border-navy/[0.08]">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {props.map((prop, i) => (
          <div
            key={prop.title}
            className={`flex items-center gap-4 px-6 py-7 lg:px-10 lg:py-8 ${
              i < props.length - 1 ? "border-b lg:border-b-0 lg:border-r border-navy/[0.08]" : ""
            } ${i === 1 ? "border-l lg:border-l-0 border-navy/[0.08]" : ""} ${i === 3 ? "border-l lg:border-l-0 border-navy/[0.08]" : ""}`}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-navy-pale rounded-xl shrink-0">
              <prop.icon size={20} className="text-navy" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-[1px] text-text-dark">
                {prop.title}
              </span>
              <span className="text-xs text-text-light">{prop.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create FeaturedProducts**

Create `src/components/home/FeaturedProducts.tsx`:

```tsx
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FeaturedProducts() {
  // Show 3 featured products: one light, one medium, one dark
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
        link={{ text: "View all coffees \u2192", href: "/shop" }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create BrandStory**

Create `src/components/home/BrandStory.tsx`:

```tsx
import Link from "next/link";

export function BrandStory() {
  return (
    <section id="story" className="section-padding bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left — asymmetric photo grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="row-span-2 rounded-2xl overflow-hidden min-h-[380px] bg-gradient-to-br from-[#3a2518] to-[#5a3828] flex items-end p-6">
            <span className="text-white/70 text-xs tracking-[1px] uppercase">
              Sourced with care
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden min-h-[180px] bg-gradient-to-br from-navy-light to-navy" />
          <div className="rounded-2xl overflow-hidden min-h-[180px] bg-gradient-to-br from-gold to-gold-light" />
        </div>

        {/* Right — text content */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">
            Our Story
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-tight">
            We believe great coffee starts with care at every step.
          </h2>
          <p className="text-base text-text-mid leading-relaxed">
            Most coffee sits in warehouses for months before it reaches your
            cup. We do things differently — every bag is roasted only after you
            order, so you get beans at their absolute peak.
          </p>
          <blockquote className="pl-6 border-l-[3px] border-navy font-heading text-xl italic text-navy leading-relaxed my-2">
            &ldquo;Coffee shouldn&apos;t be a commodity. It should be a craft —
            roasted with intention, delivered with care.&rdquo;
          </blockquote>
          <p className="text-base text-text-mid leading-relaxed">
            We partner directly with farms across Colombia, Ethiopia, Indonesia,
            and beyond. Specialty-grade beans, traceable origins, sustainable
            practices.
          </p>
          <Link
            href="#"
            className="text-sm font-semibold text-navy tracking-wide border-b-2 border-navy pb-0.5 transition-opacity hover:opacity-70 self-start"
          >
            Read our full story &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update homepage**

Replace `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProducts />
      <BrandStory />
    </>
  );
}
```

- [ ] **Step 5: Verify all sections render**

Check desktop and mobile — value props should be 2x2 on mobile, 4-col on desktop. Product cards should stack. Story section should stack on mobile.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: add ValueProps, FeaturedProducts, and BrandStory homepage sections"
```

---

### Task 8: Homepage — Testimonials, QuizCTA

**Files:**
- Create: `src/components/home/Testimonials.tsx`, `src/components/home/QuizCTA.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Testimonials**

Create `src/components/home/Testimonials.tsx`:

```tsx
import { SectionHeader } from "@/components/ui/SectionHeader";

const reviews = [
  {
    text: "The freshness is unreal. You can taste the difference — knowing it was roasted days ago makes it even better.",
    name: "Jess L.",
    city: "Portland, OR",
    initials: "JL",
  },
  {
    text: "I've tried countless subscriptions, but Colipse is different. The Colombia Tolima is my daily ritual now — smooth, rich, and perfectly balanced.",
    name: "Marco R.",
    city: "Chicago, IL",
    initials: "MR",
  },
  {
    text: "Finally, coffee that lives up to the hype. The eco-packaging is a huge plus — great coffee without the guilt.",
    name: "Sarah A.",
    city: "Austin, TX",
    initials: "SA",
  },
  {
    text: "The Ethiopia Sidama blew my mind. Floral notes I've never tasted in coffee before. This is what specialty means.",
    name: "David K.",
    city: "Seattle, WA",
    initials: "DK",
  },
  {
    text: "I switched from a big-name subscription and the difference is night and day. You can smell the freshness when you open the bag.",
    name: "Lisa M.",
    city: "Denver, CO",
    initials: "LM",
  },
  {
    text: "The French Roast is bold without being bitter. And free shipping? No brainer. Colipse is my go-to now.",
    name: "Ryan J.",
    city: "Brooklyn, NY",
    initials: "RJ",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-navy-deeper">
      <SectionHeader
        tag="Reviews"
        title="People who start their mornings with Colipse"
        tagColor="text-gold-light"
        titleColor="text-white"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.initials}
            className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm hover:bg-white/[0.10] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col gap-5">
              <div className="text-gold text-sm tracking-[2px]">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <p className="text-[15px] text-white/80 leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-sm font-semibold text-white">
                  {review.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {review.name}
                  </span>
                  <span className="text-xs text-white/50">{review.city}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create QuizCTA**

Create `src/components/home/QuizCTA.tsx`:

```tsx
import { Button } from "@/components/ui/Button";

export function QuizCTA() {
  return (
    <section id="quiz" className="section-padding bg-cream">
      <div className="relative bg-gradient-to-br from-navy-dark to-navy-deeper rounded-4xl overflow-hidden">
        {/* Radial glow */}
        <div className="absolute w-96 h-96 bg-navy/30 rounded-full blur-3xl -top-24 -right-24" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 p-10 md:p-16 lg:p-20">
          {/* Left content */}
          <div className="flex flex-col gap-5 flex-1 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-[4px] text-gold-light">
              Not Sure Where to Start?
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-white leading-tight">
              Find your perfect
              <br />
              coffee match.
            </h2>
            <p className="text-base text-white/70 leading-relaxed max-w-md mx-auto lg:mx-0">
              Take our 60-second coffee quiz and we&apos;ll recommend the ideal
              roast, origin, and grind for your taste and brewing method.
            </p>
            <div className="mt-2">
              <Button variant="gold" href="#">
                Take the Coffee Quiz
              </Button>
            </div>
          </div>

          {/* Right — 3 bag options */}
          <div className="flex items-end gap-4 lg:gap-6 flex-1 justify-center">
            {[
              { label: "LIGHT", offset: "" },
              { label: "MEDIUM", offset: "-mt-5" },
              { label: "DARK", offset: "" },
            ].map((bag) => (
              <div
                key={bag.label}
                className={`flex flex-col items-center gap-3 w-24 h-36 lg:w-32 lg:h-44 bg-white/[0.08] border border-white/[0.12] rounded-xl hover:bg-white/[0.15] hover:-translate-y-2 transition-all duration-300 cursor-pointer justify-center ${bag.offset}`}
              >
                <div className="w-11 h-11 border-[1.5px] border-gold rounded-full" />
                <span className="text-[10px] tracking-[1.5px] text-white/70">
                  {bag.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update homepage with all sections**

Replace `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { QuizCTA } from "@/components/home/QuizCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <QuizCTA />
    </>
  );
}
```

- [ ] **Step 4: Verify complete homepage**

Check all sections render correctly on desktop, tablet, and mobile. Testimonial cards should have glass-morphism effect. Quiz CTA should have navy gradient with glow.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: add Testimonials and QuizCTA sections, complete homepage"
```

---

### Task 9: Shop Page

**Files:**
- Create: `src/components/shop/FilterBar.tsx`, `src/components/shop/ProductGrid.tsx`, `src/app/shop/page.tsx`

- [ ] **Step 1: Create FilterBar**

Create `src/components/shop/FilterBar.tsx`:

```tsx
"use client";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { key: "all", label: "All" },
  { key: "single-origin", label: "Single Origin" },
  { key: "blend", label: "Blends" },
  { key: "espresso", label: "Espresso" },
  { key: "dark", label: "Dark Roast" },
  { key: "medium", label: "Medium Roast" },
  { key: "light", label: "Light Roast" },
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
            activeFilter === filter.key
              ? "bg-navy text-white"
              : "bg-transparent text-navy border-2 border-navy/20 hover:border-navy"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create ProductGrid**

Create `src/components/shop/ProductGrid.tsx`:

```tsx
import { Product } from "@/types";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-text-light text-lg">
          No coffees found for this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create Shop page**

Create `src/app/shop/page.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { FilterBar } from "@/components/shop/FilterBar";
import { ProductGrid } from "@/components/shop/ProductGrid";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;

    // Roast level filters
    if (["light", "medium", "dark"].includes(activeFilter)) {
      return products.filter((p) => p.roastLevel.includes(activeFilter));
    }

    // Category filters
    return products.filter((p) =>
      p.category.includes(activeFilter as never)
    );
  }, [activeFilter]);

  return (
    <div className="section-padding bg-cream">
      <div className="flex flex-col gap-5 mb-12">
        <span className="text-xs font-semibold uppercase tracking-[4px] text-navy">
          Shop
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-normal">
          Our Coffee
        </h1>
        <p className="text-base text-text-mid max-w-lg leading-relaxed">
          Every bag is roasted after you order — never sitting in a warehouse.
          Specialty-grade beans, traceable origins, shipped free.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify shop page**

Navigate to `http://localhost:3000/shop`. All 12 products should display. Click filter buttons — products should filter correctly. Test mobile layout (1 col), tablet (2 col), desktop (3 col).

- [ ] **Step 5: Commit**

```bash
git add src/components/shop/ src/app/shop/
git commit -m "feat: add Shop page with filter bar and responsive product grid"
```

---

### Task 10: Product Detail Page

**Files:**
- Create: `src/components/product/ImageGallery.tsx`, `src/components/product/ProductInfo.tsx`, `src/components/product/SubscriptionToggle.tsx`, `src/components/product/Characteristics.tsx`, `src/components/product/ProducerStory.tsx`, `src/app/product/[slug]/page.tsx`

- [ ] **Step 1: Create ImageGallery**

Create `src/components/product/ImageGallery.tsx`:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  mainImage: string;
  productName: string;
}

export function ImageGallery({ mainImage, productName }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  // Main product image + placeholder lifestyle shots
  const images = [mainImage];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square bg-warm-gray rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="relative w-3/4 h-3/4">
          <Image
            src={images[activeImage]}
            alt={productName}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Thumbnail row */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === i
                  ? "border-navy"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${productName} view ${i + 1}`}
                fill
                className="object-contain"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create SubscriptionToggle**

Create `src/components/product/SubscriptionToggle.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ProductSubscription, ProductSize } from "@/types";

interface SubscriptionToggleProps {
  subscription: ProductSubscription;
  selectedSize: ProductSize;
}

export function SubscriptionToggle({
  subscription,
  selectedSize,
}: SubscriptionToggleProps) {
  const [mode, setMode] = useState<"one-time" | "subscribe">("one-time");
  const [frequency, setFrequency] = useState(subscription.frequencies[2]); // default "Every month"

  const subscribePrice =
    selectedSize.price * (1 - subscription.discountPercent / 100);

  return (
    <div className="flex flex-col gap-3">
      {/* One-time option */}
      <button
        onClick={() => setMode("one-time")}
        className={`flex items-center justify-between w-full rounded-xl border-2 px-5 py-4 transition-all ${
          mode === "one-time"
            ? "border-navy bg-navy-pale/30"
            : "border-navy/10 hover:border-navy/30"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              mode === "one-time" ? "border-navy bg-navy" : "border-navy/30"
            }`}
          >
            {mode === "one-time" && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          <span className="text-sm font-medium">
            One time purchase / {selectedSize.weight}
          </span>
        </div>
        <span className="text-sm font-bold">
          ${selectedSize.price.toFixed(2)}
        </span>
      </button>

      {/* Subscribe option */}
      <button
        onClick={() => setMode("subscribe")}
        className={`flex items-center justify-between w-full rounded-xl border-2 px-5 py-4 transition-all ${
          mode === "subscribe"
            ? "border-navy bg-navy-pale/30"
            : "border-navy/10 hover:border-navy/30"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              mode === "subscribe" ? "border-navy bg-navy" : "border-navy/30"
            }`}
          >
            {mode === "subscribe" && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          <span className="text-sm font-medium">
            Subscribe / {selectedSize.weight}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-light line-through">
            ${selectedSize.price.toFixed(2)}
          </span>
          <span className="text-sm font-bold text-navy">
            ${subscribePrice.toFixed(2)}
          </span>
        </div>
      </button>

      {/* Frequency selector — visible when subscribe is selected */}
      {mode === "subscribe" && (
        <div className="flex flex-col gap-4 pl-8 mt-1">
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors"
          >
            {subscription.frequencies.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-4">
            {[
              "Free shipping on",
              `Save ${subscription.discountPercent}%`,
              "Cancel or skip anytime",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-1.5 text-xs text-text-mid"
              >
                <Check size={14} className="text-navy" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create ProductInfo**

Create `src/components/product/ProductInfo.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { SubscriptionToggle } from "./SubscriptionToggle";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      {/* Tagline & Name */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[3px] text-navy">
          {product.tagline}
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-normal">
          {product.name}
        </h1>
        <p className="text-sm font-medium text-navy">
          {product.flavorDescriptors}
        </p>
      </div>

      {/* Description */}
      <p className="text-base text-text-mid leading-relaxed">
        {product.description}
      </p>

      {/* Subscription toggle */}
      <SubscriptionToggle
        subscription={product.subscription}
        selectedSize={product.sizes[selectedSize]}
      />

      {/* Size selector */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[2px] text-text-dark">
          Size
        </span>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size, i) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(i)}
              className={`rounded-xl border-2 px-5 py-3 text-sm font-medium transition-all ${
                selectedSize === i
                  ? "border-navy bg-navy text-white"
                  : "border-navy/10 hover:border-navy/30 text-text-dark"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grind selector */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[2px] text-text-dark">
          Grind
        </span>
        <div className="flex flex-wrap gap-2">
          {product.grinds.map((grind, i) => (
            <button
              key={grind}
              onClick={() => setSelectedGrind(i)}
              className={`rounded-xl border-2 px-5 py-3 text-sm font-medium transition-all ${
                selectedGrind === i
                  ? "border-navy bg-navy text-white"
                  : "border-navy/10 hover:border-navy/30 text-text-dark"
              }`}
            >
              {grind}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-0 border-2 border-navy/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 hover:bg-navy-pale transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="px-5 py-3 text-sm font-semibold min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 hover:bg-navy-pale transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        <Button fullWidth>Add to Cart</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Characteristics**

Create `src/components/product/Characteristics.tsx`:

```tsx
import { Award, Flame, Truck, Recycle } from "lucide-react";
import { Product } from "@/types";

interface CharacteristicsProps {
  product: Product;
}

const trustBadges = [
  { icon: Award, label: "Specialty Grade" },
  { icon: Flame, label: "Roasted Fresh" },
  { icon: Truck, label: "Carbon-Neutral Shipping" },
  { icon: Recycle, label: "Compostable Packaging" },
];

export function Characteristics({ product }: CharacteristicsProps) {
  const hasOrigin = product.origin.region !== "";

  const characteristics = [
    { label: "Tasting Notes", value: product.tastingNotes.join(", ") },
    ...(hasOrigin
      ? [
          { label: "Region", value: `${product.origin.region}, ${product.origin.country}` },
          { label: "Traceability", value: product.origin.traceability },
          { label: "Altitude", value: product.origin.altitude },
          { label: "Varieties", value: product.origin.varieties },
          { label: "Process", value: product.origin.process },
        ]
      : []),
    { label: "Bag Size", value: product.sizes.map((s) => s.label).join(", ") },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Trust badges */}
      <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
        {trustBadges.map((badge) => (
          <div key={badge.label} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-navy-pale rounded-2xl flex items-center justify-center">
              <badge.icon size={22} className="text-navy" />
            </div>
            <span className="text-xs font-semibold text-text-mid text-center max-w-[100px]">
              {badge.label}
            </span>
          </div>
        ))}
      </div>

      {/* Characteristics table */}
      <div className="flex flex-col gap-0">
        <h3 className="font-heading text-2xl font-normal mb-4">
          Characteristics
        </h3>
        {characteristics.map((char) => (
          <div
            key={char.label}
            className="flex items-center justify-between py-3 border-b border-navy/[0.06]"
          >
            <span className="text-sm text-text-light">{char.label}</span>
            <span className="text-sm font-medium text-text-dark text-right">
              {char.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create ProducerStory**

Create `src/components/product/ProducerStory.tsx`:

```tsx
interface ProducerStoryProps {
  story: string;
}

export function ProducerStory({ story }: ProducerStoryProps) {
  if (!story) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-heading text-2xl font-normal">Producer Story</h3>
      <p className="text-base text-text-mid leading-relaxed">{story}</p>
    </div>
  );
}
```

- [ ] **Step 6: Create Product Detail page**

Create `src/app/product/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Characteristics } from "@/components/product/Characteristics";
import { ProducerStory } from "@/components/product/ProducerStory";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — Colipse Coffee`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-gray to-cream">
      <div className="section-padding">
        {/* Main card */}
        <div className="bg-cream rounded-4xl shadow-lg max-w-6xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10 lg:p-14">
            {/* Left — Gallery */}
            <ImageGallery
              mainImage={product.images.bag}
              productName={product.name}
            />

            {/* Right — Info */}
            <ProductInfo product={product} />
          </div>

          {/* Below — Details */}
          <div className="flex flex-col gap-10 px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
            <Characteristics product={product} />
            <ProducerStory story={product.producerStory} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Verify product detail page**

Navigate to `http://localhost:3000/product/colombia-tolima` — should see full product detail with gallery, info, subscription toggle, size/grind selectors, characteristics table, and producer story. Test `http://localhost:3000/product/blonde-espresso` (no origin data — characteristics table should be shorter). Test mobile layout.

- [ ] **Step 8: Commit**

```bash
git add src/components/product/ src/app/product/
git commit -m "feat: add Product Detail page with gallery, subscription, and characteristics"
```

---

### Task 11: Final Polish & Responsive Verification

**Files:**
- May modify: various components for responsive fixes

- [ ] **Step 1: Build production bundle to catch errors**

```bash
cd /Users/aminatmoldalieva/coffee-shop && npm run build
```

Fix any build errors (type issues, missing imports, etc.).

- [ ] **Step 2: Test responsive breakpoints**

Open DevTools in Chrome. Test at these widths:
- **375px** (iPhone SE) — all sections single column, hamburger nav, stacked hero
- **768px** (iPad) — 2-col product grids, readable type
- **1024px** (laptop) — transitions to desktop layout
- **1440px** (desktop) — full layout with all spacing

Check every page: /, /shop, /product/colombia-tolima

- [ ] **Step 3: Fix any responsive issues found**

Apply fixes to components as needed — common issues:
- Text overflow on mobile
- Product card images sizing
- Padding adjustments for small screens
- Filter bar scroll on mobile

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: responsive polish and build verification"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Project setup + Tailwind config | package.json, tailwind.config.ts, layout.tsx |
| 2 | Types + Product data (12 products) | types/index.ts, data/products.ts |
| 3 | API routes | api/products/route.ts, api/products/[slug]/route.ts |
| 4 | Shared UI components | Button, Badge, SectionHeader, ProductCard |
| 5 | Layout (TopBar, Navbar, Footer) | layout/, layout.tsx |
| 6 | Homepage Hero | home/Hero.tsx |
| 7 | Homepage sections (ValueProps, Featured, Story) | home/ValueProps.tsx, FeaturedProducts.tsx, BrandStory.tsx |
| 8 | Homepage sections (Testimonials, QuizCTA) | home/Testimonials.tsx, QuizCTA.tsx |
| 9 | Shop page with filters | shop/page.tsx, FilterBar.tsx, ProductGrid.tsx |
| 10 | Product detail page | product/[slug]/page.tsx + 5 components |
| 11 | Responsive polish + build | Various |
