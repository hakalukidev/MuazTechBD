"use client";

import { useMemo, useState } from "react";
import { Activity, Loader2, Search } from "lucide-react";
import Link from "next/link";

import ProductPhoto from "@/components/products/ProductPhoto";
import { useProductsQuery } from "@/hooks/use-products-query";
import { PRODUCT_CATEGORIES, type Product } from "@/lib/products";

type ProductCatalogClientProps = {
  initialProducts?: Product[];
};

export default function ProductCatalogClient({
  initialProducts,
}: ProductCatalogClientProps) {
  const { data: products = [], isPending: isLoading } =
    useProductsQuery(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(products.map((product) => product.category).filter(Boolean))
    );

    return ["all", ...new Set([...dynamicCategories, ...PRODUCT_CATEGORIES])];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const hotProducts = products.filter((product) => product.isHot).slice(0, 4);

  return (
    <main className="bg-gray-50">
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Our Products</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100 md:text-xl">
            Browse product photos, pricing, and detailed information across our
            workshop and industrial equipment range.
          </p>
        </div>
      </section>

      <section className="sticky top-16 z-40 bg-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex w-full gap-2 overflow-x-auto pb-2 lg:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category === "all" ? "All Products" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <p className="text-gray-600">Highlighted picks from our latest catalog</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading products...
            </div>
          ) : hotProducts.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              Add a product and mark it as hot to feature it here.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {hotProducts.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-md border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <ProductPhoto
                      src={product.photoUrl}
                      alt={product.name}
                      className="h-64"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                      HOT
                    </span>
                  </div>
                  <div className="space-y-3 p-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-blue-600">
                        {product.price}
                      </span>
                      <Link
                        href={`/product/${product.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Catalog Highlights
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold">
                  What you will find here
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Clear product photos for quick comparison</li>
                  <li>Product names, pricing, and categories</li>
                  <li>Short summaries and detailed specifications</li>
                  <li>Featured items highlighted for faster discovery</li>
                </ul>
              </div>
              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-3 text-lg font-semibold">
                  Why buyers use this catalog
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>It makes product discovery quick and simple</li>
                  <li>Important details stay easy to scan</li>
                  <li>Featured products stand out immediately</li>
                  <li>Each item has its own detail page for follow-up</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">All Products</h2>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading catalog...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No products found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm transition hover:shadow-xl"
                >
                  <ProductPhoto
                    src={product.photoUrl}
                    alt={product.name}
                    className="h-64"
                  />
                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      {product.isHot ? (
                        <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-600">
                          Hot
                        </span>
                      ) : null}
                    </div>
                    <p className="line-clamp-3 text-sm text-gray-500">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-blue-600">{product.price}</p>
                      <Link
                        href={`/product/${product.id}`}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition group-hover:bg-blue-600 group-hover:text-white"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
