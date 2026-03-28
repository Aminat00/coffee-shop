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
        <div className="bg-cream rounded-4xl shadow-lg max-w-6xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10 lg:p-14">
            <ImageGallery mainImage={product.images.bag} productName={product.name} />
            <ProductInfo product={product} />
          </div>
          <div className="flex flex-col gap-10 px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
            <Characteristics product={product} />
            <ProducerStory story={product.producerStory} />
          </div>
        </div>
      </div>
    </div>
  );
}
