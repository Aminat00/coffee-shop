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
