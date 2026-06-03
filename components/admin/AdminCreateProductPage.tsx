"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import ProductForm, {
  emptyProductFormValues,
  toProductInput,
} from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { productsQueryKey } from "@/lib/product-query";
import { revalidateProductsCache } from "@/lib/revalidate-products-cache";
import { createProduct } from "@/lib/product-service";

export default function AdminCreateProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleCreate(values: typeof emptyProductFormValues) {
    try {
      await createProduct(toProductInput(values));
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: productsQueryKey }),
        revalidateProductsCache(),
      ]);
      toast({
        title: "Product saved",
        description: "The new product is now available in the catalog.",
      });
      router.push("/admin/products");
    } catch {
      toast({
        title: "Save failed",
        description: "The product could not be saved right now.",
        variant: "destructive",
      });
      throw new Error("Create failed");
    }
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" className="w-fit px-0 text-slate-600">
        <Link href="/admin/products">
          <ArrowLeft />
          Back to all products
        </Link>
      </Button>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-950">Add product</CardTitle>
          <CardDescription>
            Create a new catalog item with pricing, details, and an image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            defaultValues={emptyProductFormValues}
            layout="page"
            submitLabel="Save Product"
            pendingLabel="Saving Product..."
            onSubmit={handleCreate}
          />
        </CardContent>
      </Card>
    </div>
  );
}
