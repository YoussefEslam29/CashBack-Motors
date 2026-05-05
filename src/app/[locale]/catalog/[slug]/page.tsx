import { getProductBySlug, products } from "@/data/products";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProductDetailClient from "@/components/catalog/ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
