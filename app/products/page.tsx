import ProductCatalogClient from "@/components/products/ProductCatalogClient";
import { getCachedProducts } from "@/lib/product-cache";

export default async function ProductsPage() {
  const initialProducts = await getCachedProducts();

  return <ProductCatalogClient initialProducts={initialProducts} />;
}
