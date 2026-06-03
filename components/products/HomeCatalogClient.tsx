"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

import ProductPhoto from "@/components/products/ProductPhoto";
import { useProductsQuery } from "@/hooks/use-products-query";
import { PRODUCT_CATEGORIES, type Product } from "@/lib/products";

type HomeCatalogClientProps = {
  initialProducts?: Product[];
};

export default function HomeCatalogClient({
  initialProducts,
}: HomeCatalogClientProps) {
  const { data: products = [], isPending: isLoading } =
    useProductsQuery(initialProducts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [gridCols, setGridCols] = useState(4);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);

      if (window.innerWidth < 640) {
        setGridCols(1);
      } else if (window.innerWidth < 768) {
        setGridCols(2);
      } else if (window.innerWidth < 1024) {
        setGridCols(3);
      } else {
        setGridCols(4);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(products.map((product) => product.category).filter(Boolean))
    );

    return ["all", ...new Set([...dynamicCategories, ...PRODUCT_CATEGORIES])];
  }, [products]);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.isHot).slice(0, 5),
    [products]
  );
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const getGridColsClass = () => {
    if (gridCols === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    if (gridCols === 4) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
    if (gridCols === 5) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
    }
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
       

        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 transition hover:bg-gray-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="text-sm font-medium">Categories & Products</span>
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <aside
            className={`
              ${mobileMenuOpen ? "block" : "hidden"}
              w-full border-b pb-6 lg:block lg:w-72 lg:shrink-0 lg:border-b-0 lg:pb-0
            `}
          >
            <div className="mb-6 lg:mb-8">
              <h2 className="mb-3 text-base font-bold uppercase tracking-wide text-gray-900 lg:mb-4 lg:text-lg">
                Categories
              </h2>
              <ul className="space-y-1 lg:space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        if (isMobile) {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors lg:px-0 lg:py-1 lg:text-base ${
                        activeCategory === category
                          ? "bg-gray-50 font-bold text-gray-900 lg:bg-transparent"
                          : "text-blue-600 hover:bg-gray-50 hover:text-blue-800 lg:hover:bg-transparent"
                      }`}
                    >
                      {category === "all" ? "All Products" : category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-base font-bold uppercase tracking-wide text-gray-900 lg:mb-4 lg:text-lg">
                Featured Products
              </h2>
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : featuredProducts.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Mark products as featured in the admin panel to show them here.
                </p>
              ) : (
                <ul className="space-y-3 lg:space-y-4">
                  {featuredProducts.map((product) => (
                    <li key={product.id} className="flex items-center gap-3">
                      <ProductPhoto
                        src={product.photoUrl}
                        alt={product.name}
                        className="h-12 w-12 shrink-0 rounded lg:h-16 lg:w-16"
                        imgClassName="object-cover"
                      />
                      <Link
                        href={`/product/${product.id}`}
                        className="text-xs leading-snug text-blue-600 hover:text-blue-800 lg:text-sm"
                        onClick={() => isMobile && setMobileMenuOpen(false)}
                      >
                        {product.name.length > 50
                          ? `${product.name.substring(0, 50)}...`
                          : product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center lg:mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <ChevronRight size={14} />
                <span className="font-medium text-gray-800">
                  {activeCategory === "all" ? "All Products" : activeCategory}
                </span>
              </div>

              <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-4">
                <div className="hidden items-center gap-1 sm:flex">
                  <button
                    type="button"
                    onClick={() => setGridCols(3)}
                    className={`rounded p-1 transition-colors ${
                      gridCols === 3
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    aria-label="3 columns"
                  >
                    <Grid2X2 size={18} className="lg:h-5 lg:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGridCols(4)}
                    className={`rounded p-1 transition-colors ${
                      gridCols === 4
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    aria-label="4 columns"
                  >
                    <Grid3X3 size={18} className="lg:h-5 lg:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGridCols(5)}
                    className={`rounded p-1 transition-colors ${
                      gridCols === 5
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    aria-label="5 columns"
                  >
                    <LayoutGrid size={18} className="lg:h-5 lg:w-5" />
                  </button>
                </div>

                <Link
                  href="/products"
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-700 transition hover:border-blue-400 hover:text-blue-600 sm:text-sm"
                >
                  Open full catalog
                </Link>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center gap-2 py-12 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading products...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-500">
                  No products found in this category yet.
                </p>
              </div>
            ) : (
              <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${getGridColsClass()}`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-md border border-gray-200 transition-shadow hover:shadow-lg"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative aspect-square cursor-pointer overflow-hidden bg-gray-50">
                      <ProductPhoto
                        src={product.photoUrl}
                        alt={product.name}
                        className="h-full"
                        imgClassName="transition-transform duration-300 group-hover:scale-105"
                      />

                      {hoveredProduct === product.id && (
                        <div className="absolute inset-x-0 bottom-0 animate-slide-up">
                          <Link
                            href={`/product/${product.id}`}
                            className="block bg-blue-600 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-blue-700 sm:py-2.5 sm:text-sm"
                          >
                            Read More
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="p-3 lg:p-4">
                      <Link
                        href={`/product/${product.id}`}
                        className="line-clamp-3 text-xs leading-snug text-gray-800 hover:text-blue-600 sm:text-sm"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-2 text-xs font-medium text-blue-600">
                        {product.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
