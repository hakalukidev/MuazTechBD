import { resolveProductPhotoPublicId } from "@/lib/product-images";

type ProductImageRef = {
  photoUrl?: string | null;
  photoPublicId?: string | null;
};

export type ManagedProductImageDeleteResult =
  | { status: "deleted" }
  | { status: "not_found" }
  | { status: "skipped" };

export async function deleteManagedProductImage(image: ProductImageRef) {
  const publicId = resolveProductPhotoPublicId(image);

  if (!publicId) {
    return { status: "skipped" } satisfies ManagedProductImageDeleteResult;
  }

  const response = await fetch("/api/admin/cloudinary/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ publicId }),
  });
  const payload = (await response.json().catch(() => null)) as
    | { message?: string; result?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Image cleanup failed.");
  }

  if (payload?.result === "not found") {
    return { status: "not_found" } satisfies ManagedProductImageDeleteResult;
  }

  return { status: "deleted" } satisfies ManagedProductImageDeleteResult;
}
