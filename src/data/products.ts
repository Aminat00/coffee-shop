import { Product } from "@/types";

const defaultSizes = [
  { label: "16oz", weight: "454g", price: 29.99 },
  { label: "2lb", weight: "907g", price: 49.99 },
  { label: "5lb", weight: "2.27kg", price: 99.00 },
];

const defaultGrinds = [
  "Whole Bean",
  "Fine (Espresso)",
  "Medium (Drip)",
  "Coarse (French Press)",
];

const defaultSubscription = {
  available: true,
  discountPercent: 10,
  frequencies: ["Every 2 weeks", "Every 3 weeks", "Every month", "Every 6 weeks"],
};

const defaultBadges = ["Specialty Grade", "Roasted Fresh"];

const singleOriginBadges = [
  "Specialty Grade",
  "Roasted Fresh",
  "Single Origin",
  "Compostable Packaging",
];

const emptyOrigin = {
  region: "",
  country: "",
  altitude: "",
  varieties: "",
  process: "",
  traceability: "Specialty Grade",
};

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
    origin: emptyOrigin,
    producerStory: "",
    category: ["espresso"],
    images: {
      bag: "/images/products/blonde-espresso-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: defaultBadges,
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
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: singleOriginBadges,
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
    origin: emptyOrigin,
    producerStory: "",
    category: ["blend"],
    images: {
      bag: "/images/products/italian-roast-coffee-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: defaultBadges,
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
    origin: emptyOrigin,
    producerStory: "",
    category: ["espresso", "blend"],
    images: {
      bag: "/images/products/italian-espresso-beans.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 23.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: defaultBadges,
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
    origin: emptyOrigin,
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
      { label: "5lb", weight: "2.27kg", price: 95.00 },
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: defaultBadges,
  },
  {
    id: "6",
    slug: "ethiopia-sidama",
    name: "Ethiopia Sidama",
    tagline: "Complex & Aromatic",
    description:
      "From the birthplace of coffee — a stunning medium-light roast with caramel sweetness, vanilla depth, and floral aromatics. Sun-dried heirloom varieties from the Sidama region at 2,000m+ elevation.",
    roastLevel: "medium-light",
    tastingNotes: ["Caramel", "Vanilla", "Floral", "Berry", "Bright Acidity"],
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
      { label: "12oz", weight: "340g", price: 22.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: singleOriginBadges,
  },
  {
    id: "7",
    slug: "colombia-tolima",
    name: "Colombia Tolima",
    tagline: "Your Everyday Reset",
    description:
      "A beautifully balanced medium roast from Colombia's Tolima region. Washed and sun-dried Typica and Caturra varieties deliver rich dark chocolate, tropical mango, and stone fruit notes. The perfect daily ritual.",
    roastLevel: "medium",
    tastingNotes: ["Dark Chocolate", "Mango", "Peach", "Medium Acidity"],
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
      { label: "12oz", weight: "340g", price: 23.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: singleOriginBadges,
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
    origin: emptyOrigin,
    producerStory: "",
    category: ["blend"],
    images: {
      bag: "/images/products/french-roast-coffee-grounds.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 22.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: defaultBadges,
  },
  {
    id: "9",
    slug: "bali-blue-moon",
    name: "Bali Blue Moon",
    tagline: "Exotic & Layered",
    description:
      "A rare Indonesian gem from Bali's Kintamani highlands. Wet-hulled and sun-dried, delivering layers of bakers chocolate, orange peel, juniper, and molasses. Exotic, complex, unforgettable.",
    roastLevel: "medium-dark",
    tastingNotes: ["Bakers Chocolate", "Orange Peel", "Juniper", "Molasses"],
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
      { label: "12oz", weight: "340g", price: 22.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: singleOriginBadges,
  },
  {
    id: "10",
    slug: "brazil-sul-de-minas",
    name: "Brazil Sul de Minas",
    tagline: "Sweet & Nutty",
    description:
      "From Brazil's renowned Sul de Minas region — a naturally processed medium roast with bright mandarin orange, rich chocolate, and medium acidity. Sweet, clean, and endlessly drinkable.",
    roastLevel: "medium",
    tastingNotes: ["Mandarin Orange", "Chocolate", "Medium Acidity"],
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
      { label: "12oz", weight: "340g", price: 22.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: singleOriginBadges,
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
    origin: emptyOrigin,
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
      { label: "5lb", weight: "2.27kg", price: 95.00 },
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: defaultBadges,
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
    origin: emptyOrigin,
    producerStory: "",
    category: ["espresso", "blend"],
    images: {
      bag: "/images/products/espresso-blend-coffee-grounds.webp",
      lifestyle: [],
    },
    sizes: [
      { label: "12oz", weight: "340g", price: 23.50 },
      ...defaultSizes,
    ],
    grinds: defaultGrinds,
    subscription: defaultSubscription,
    badges: defaultBadges,
  },
];
