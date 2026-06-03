import AdminProductsPage from "@/components/admin/AdminProductsPage";
import { getAllProducts } from "@/lib/product-service";

export default async function AdminProductsRoute() {
  const initialProducts = await getAllProducts();

  return <AdminProductsPage initialProducts={initialProducts} />;
}
