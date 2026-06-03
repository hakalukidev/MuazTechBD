import type { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";

export const PRODUCTS_COLLECTION = "products";

export const PRODUCT_CATEGORIES = [
  "Diagnostic Scanners",
  "Workshop Equipment",
  "Hand Tools",
  "Testing Equipment",
  "Denting & Painting",
  "Diagnostic and Checking",
  "Lifting Equipment",
  "Repairing Equipment",
  "Supporting Equipment",
  "Uncategorized",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  details: string;
  keyHighlights: string[];
  photoUrl: string;
  photoPublicId: string;
  isHot: boolean;
  createdAtMs: number | null;
  updatedAtMs: number | null;
};

export type ProductInput = Omit<Product, "id" | "createdAtMs" | "updatedAtMs">;

type ProductSnapshot =
  | QueryDocumentSnapshot<DocumentData>
  | DocumentSnapshot<DocumentData>;

function getTimestampMs(value: unknown) {
  if (!value) {
    return null;
  }

  if (typeof value === "object" && value !== null && "toMillis" in value) {
    return (value as Timestamp).toMillis();
  }

  if (typeof value === "number") {
    return value;
  }

  return null;
}

function normalizeHighlights(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => String(entry).trim())
      .filter((entry) => entry.length > 0);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }

  return [];
}

export function mapProductSnapshot(snapshot: ProductSnapshot): Product | null {
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data() ?? {};

  return {
    id: snapshot.id,
    name: String(data.name ?? ""),
    category: String(data.category ?? "Uncategorized"),
    price: String(data.price ?? "Contact for Price"),
    description: String(data.description ?? ""),
    details: String(data.details ?? ""),
    keyHighlights: normalizeHighlights(data.keyHighlights),
    photoUrl: String(data.photoUrl ?? ""),
    photoPublicId: String(data.photoPublicId ?? ""),
    isHot: Boolean(data.isHot),
    createdAtMs: getTimestampMs(data.createdAt),
    updatedAtMs: getTimestampMs(data.updatedAt),
  };
}

export function sortProducts(products: Product[]) {
  return [...products].sort((left, right) => {
    const leftValue = left.createdAtMs ?? 0;
    const rightValue = right.createdAtMs ?? 0;

    return rightValue - leftValue;
  });
}
