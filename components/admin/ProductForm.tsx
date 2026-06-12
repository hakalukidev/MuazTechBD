"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deleteManagedProductImage } from "@/lib/product-image-service";
import {
  extractCloudinaryPublicId,
  resolveProductPhotoPublicId,
} from "@/lib/product-images";
import {
  getCategoryKey,
  type ManagedCategoryOption,
} from "@/lib/categories";
import { type Product, type ProductInput } from "@/lib/products";
import { cn } from "@/lib/utils";

export const productFormSchema = z.object({
  name: z.string().trim().min(2, "Product name is required."),
  category: z.string().trim().min(1, "Category is required."),
  price: z.string().trim().min(1, "Price is required."),
  description: z.string().trim().min(8, "Short description is required."),
  details: z.string().trim().min(12, "Details are required."),
  keyHighlights: z.string().trim(),
  photoUrl: z.string().trim().url("Upload an image or paste a valid image URL."),
  photoPublicId: z.string().trim(),
  isHot: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const emptyProductFormValues: ProductFormValues = {
  name: "",
  category: "",
  price: "Contact for Price",
  description: "",
  details: "",
  keyHighlights: "",
  photoUrl: "",
  photoPublicId: "",
  isHot: false,
};

export function toProductFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    category: product.category || "",
    price: product.price,
    description: product.description,
    details: product.details,
    keyHighlights: product.keyHighlights.join("\n"),
    photoUrl: product.photoUrl,
    photoPublicId: product.photoPublicId,
    isHot: product.isHot,
  };
}

export function toProductInput(values: ProductFormValues): ProductInput {
  return {
    name: values.name.trim(),
    category: values.category.trim(),
    price: values.price.trim(),
    description: values.description.trim(),
    details: values.details.trim(),
    keyHighlights: values.keyHighlights
      .split("\n")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0),
    photoUrl: values.photoUrl.trim(),
    photoPublicId: values.photoPublicId.trim(),
    isHot: values.isHot,
  };
}

type ProductFormProps = {
  categoriesLoading?: boolean;
  categoryOptions?: ManagedCategoryOption[];
  defaultValues?: ProductFormValues;
  layout?: "page" | "dialog";
  onSubmit: (values: ProductFormValues) => Promise<void>;
  pendingLabel: string;
  resetOnSuccess?: boolean;
  submitLabel: string;
};

export default function ProductForm({
  categoriesLoading = false,
  categoryOptions = [],
  defaultValues = emptyProductFormValues,
  layout = "page",
  onSubmit,
  pendingLabel,
  resetOnSuccess = false,
  submitLabel,
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const previewUrl = form.watch("photoUrl");
  const previewName = form.watch("name");
  const selectedCategory = form.watch("category");
  const photoPublicIdField = form.register("photoPublicId");
  const uploadedImagesRef = useRef(
    new Map<string, { photoUrl: string; photoPublicId: string }>()
  );
  const skipUnmountCleanupRef = useRef(false);
  const initialPhotoPublicId = resolveProductPhotoPublicId(defaultValues) ?? "";
  const hasExistingPhoto = Boolean(defaultValues.photoUrl.trim());
  const uploadButtonLabel = hasExistingPhoto ? "Change photo" : "Upload image";

  useEffect(() => {
    return () => {
      if (skipUnmountCleanupRef.current) {
        return;
      }

      const uploadedImages = Array.from(uploadedImagesRef.current.values());
      uploadedImagesRef.current.clear();

      uploadedImages.forEach((image) => {
        void deleteManagedProductImage(image).catch(() => undefined);
      });
    };
  }, []);

  useEffect(() => {
    if (form.getValues("category").trim() || categoryOptions.length === 0) {
      return;
    }

    form.setValue("category", categoryOptions[0].value, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [categoryOptions, form]);

  const resolvedCategoryOptions = (() => {
    const currentCategory = selectedCategory.trim();

    if (!currentCategory) {
      return categoryOptions;
    }

    const currentCategoryKey = getCategoryKey(currentCategory);

    if (
      categoryOptions.some((option) => getCategoryKey(option.value) === currentCategoryKey)
    ) {
      return categoryOptions;
    }

    return [
      {
        label: `${currentCategory} (current value)`,
        parentName: null,
        type: "main" as const,
        value: currentCategory,
      },
      ...categoryOptions,
    ];
  })();

  function rememberUploadedImage(image: { photoUrl: string; photoPublicId: string }) {
    if (!image.photoPublicId.trim()) {
      return;
    }

    uploadedImagesRef.current.set(image.photoPublicId.trim(), image);
  }

  function discardUploadedImage(publicId: string) {
    const trimmedPublicId = publicId.trim();

    if (!trimmedPublicId) {
      return;
    }

    const uploadedImage = uploadedImagesRef.current.get(trimmedPublicId);

    if (!uploadedImage) {
      return;
    }

    uploadedImagesRef.current.delete(trimmedPublicId);
    void deleteManagedProductImage(uploadedImage).catch(() => undefined);
  }

  function cleanupUnsavedUploadedImages(savedPublicId: string) {
    const trimmedSavedPublicId = savedPublicId.trim();
    const uploadsToDelete = Array.from(uploadedImagesRef.current.entries()).filter(
      ([publicId]) => publicId !== trimmedSavedPublicId
    );

    uploadsToDelete.forEach(([publicId, image]) => {
      uploadedImagesRef.current.delete(publicId);
      void deleteManagedProductImage(image).catch(() => undefined);
    });

    if (!trimmedSavedPublicId) {
      uploadedImagesRef.current.clear();
      return;
    }

    const savedUpload = uploadedImagesRef.current.get(trimmedSavedPublicId);
    uploadedImagesRef.current.clear();

    if (savedUpload) {
      uploadedImagesRef.current.set(trimmedSavedPublicId, savedUpload);
    }
  }

  function handleUploadedPhoto(url: string, publicId: string) {
    const currentPhotoPublicId = form.getValues("photoPublicId").trim();
    const currentPhotoUrl = form.getValues("photoUrl").trim();

    if (
      currentPhotoPublicId &&
      currentPhotoPublicId !== publicId &&
      currentPhotoPublicId !== initialPhotoPublicId
    ) {
      discardUploadedImage(currentPhotoPublicId);
    }

    rememberUploadedImage({
      photoUrl: url,
      photoPublicId: publicId,
    });

    form.setValue("photoUrl", url, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    form.setValue("photoPublicId", publicId, {
      shouldDirty: true,
    });

    if (
      currentPhotoUrl &&
      currentPhotoPublicId &&
      currentPhotoPublicId !== publicId &&
      uploadedImagesRef.current.has(currentPhotoPublicId)
    ) {
      discardUploadedImage(currentPhotoPublicId);
    }
  }

  async function handleSubmit(values: ProductFormValues) {
    setIsSubmitting(true);

    try {
      await onSubmit(values);

      cleanupUnsavedUploadedImages(values.photoPublicId);

      if (resetOnSuccess) {
        uploadedImagesRef.current.clear();
      } else {
        uploadedImagesRef.current.delete(values.photoPublicId.trim());
        skipUnmountCleanupRef.current = true;
      }

      if (resetOnSuccess) {
        form.reset(defaultValues);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <input type="hidden" {...photoPublicIdField} />
        <div
          className={cn(
            "grid gap-6",
            layout === "page"
              ? "xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]"
              : "xl:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.9fr)]"
          )}
        >
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700">Product name</FormLabel>
                    <FormControl>
                      <Input placeholder="Autel MX808S" {...field} className="focus-visible:ring-blue-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700">Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact for Price" {...field} className="focus-visible:ring-blue-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Category</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm text-blue-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      disabled={categoriesLoading && resolvedCategoryOptions.length === 0}
                      {...field}
                    >
                      <option value="" disabled>
                        {categoriesLoading
                          ? "Loading categories..."
                          : resolvedCategoryOptions.length > 0
                            ? "Select a category"
                            : "Add a category first"}
                      </option>
                      {resolvedCategoryOptions.map((categoryOption) => (
                        <option
                          key={`${categoryOption.type}:${categoryOption.value}`}
                          value={categoryOption.value}
                        >
                          {categoryOption.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <p className="text-sm text-blue-500">
                    {resolvedCategoryOptions.length > 0
                      ? "Main categories and subcategories come from the Categories admin page."
                      : "Create a category group first, then return here to assign products."}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Short description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Professional diagnostic scanner for all car models."
                      className="focus-visible:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add longer product details, specifications, and selling points."
                      className="min-h-[160px] focus-visible:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keyHighlights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Key highlights (one per line)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="High-resolution product imagery\nProfessional workshop-ready presentation"
                      className="min-h-[120px] focus-visible:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Product image</FormLabel>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <FormControl>
                      <Input
                        placeholder="https://images.example.com/product.jpg"
                        className="focus-visible:ring-blue-500"
                        {...field}
                        onChange={(event) => {
                          const nextUrl = event.target.value;

                          field.onChange(nextUrl);
                          form.setValue(
                            "photoPublicId",
                            extractCloudinaryPublicId(nextUrl) ?? "",
                            {
                              shouldDirty: true,
                            }
                          );
                        }}
                      />
                    </FormControl>
                    <CloudinaryUploadButton
                      disabled={isSubmitting}
                      label={uploadButtonLabel}
                      onUploaded={({ url, publicId }) => {
                        handleUploadedPhoto(url, publicId);
                      }}
                    />
                  </div>
                  <p className="text-sm text-blue-500">
                    {hasExistingPhoto
                      ? "Use Change photo to upload a replacement image. After you save, the old Cloudinary image is removed automatically."
                      : "Upload a new image or paste a direct image URL. You can replace the upload before saving if needed."}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isHot"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                        className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      Highlight this product in featured sections
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full bg-blue-600 hover:bg-blue-700 md:w-auto" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
              {isSubmitting ? pendingLabel : submitLabel}
            </Button>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">
              <div className="mb-3">
                <p className="text-sm font-medium text-blue-950">Image preview</p>
                <p className="text-sm text-blue-500">
                  Review the product image before you save changes.
                </p>
              </div>
              {previewUrl ? (
                <div className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50">
                  <img
                    src={previewUrl}
                    alt={previewName || "Uploaded product preview"}
                    className="h-72 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-blue-300 bg-blue-50 text-blue-500">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <ImageIcon className="h-10 w-10" />
                    <p>Upload an image to preview it here.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
