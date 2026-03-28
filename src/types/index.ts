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
  category: ("single-origin" | "blend" | "espresso" | "decaf" | "flavored")[];
  images: {
    bag: string;
    lifestyle: string[];
  };
  sizes: ProductSize[];
  grinds: string[];
  subscription: ProductSubscription;
  badges: string[];
}
