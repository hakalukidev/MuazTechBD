import HomeCatalogClient from "@/components/products/HomeCatalogClient";
import { getCachedProducts } from "@/lib/product-cache";

export default async function HomePage() {
  const initialProducts = await getCachedProducts();

  return <HomeCatalogClient initialProducts={initialProducts} />;
}
