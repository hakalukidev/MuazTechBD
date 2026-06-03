"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

import ProductPhoto from "@/components/products/ProductPhoto";
import { type Product } from "@/lib/products";
import { getAllProducts, getProductById } from "@/lib/product-service";

type ProductDetailClientProps = {
  productId: string;
};

export default function ProductDetailClient({
  productId,
}: ProductDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const currentProduct = await getProductById(productId);
        setProduct(currentProduct);

        if (currentProduct) {
          const allProducts = await getAllProducts();
          setRelatedProducts(
            allProducts
              .filter(
                (candidate) =>
                  candidate.category === currentProduct.category &&
                  candidate.id !== currentProduct.id
              )
              .slice(0, 4)
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto flex items-center gap-2 px-4 py-20 text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading product...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            Product Not Found
          </h1>
          <p className="mb-8 text-gray-600">
            The product you are looking for does not exist.
          </p>
          <Link
            href="/products"
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <Link
          href="/products"
          className="mb-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 md:mb-6 md:text-base"
        >
          <ArrowLeft size={18} /> Back to Products
        </Link>

        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-8">
            <ProductPhoto
              src={product.photoUrl}
              alt={product.name}
              className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-0"
              imgClassName="min-h-[360px] object-cover"
            />

            <div className="space-y-4 md:space-y-6">
              {product.isHot ? (
                <span className="inline-block w-fit rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                  Hot Product
                </span>
              ) : null}

              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                  {product.category}
                </p>
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
                  {product.name}
                </h1>
                <p className="text-lg font-semibold text-blue-600 md:text-xl">
                  {product.price}
                </p>
              </div>

              <div className="border-y border-gray-200 py-3 md:py-4">
                <p className="leading-relaxed text-gray-700">
                  {product.details || product.description}
                </p>
              </div>

              {product.keyHighlights.length > 0 ? (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800">Key Highlights</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {product.keyHighlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row md:gap-4">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700 md:px-6"
                >
                  Get Quote
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 md:px-6"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="mt-8 md:mt-12">
            <h2 className="mb-4 text-xl font-bold text-gray-800 md:mb-6 md:text-2xl">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link href={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg">
                    <ProductPhoto
                      src={relatedProduct.photoUrl}
                      alt={relatedProduct.name}
                      className="h-52"
                    />
                    <div className="p-4">
                      <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
                        {relatedProduct.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
