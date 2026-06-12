import BrandHeadline from "@/components/home/BrandHeadline";
import HeroSlider from "@/components/home/HeroSlider";
import ProductShowcaseSections from "@/components/home/ProductShowcaseSections";
import VideoSection from "@/components/home/VideoSection";
import { getAllCategories } from "@/lib/category-service";
import { getCachedProducts } from "@/lib/product-cache";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getCachedProducts(),
  ]);

  return (
    <main className="bg-white">
      <HeroSlider />
      <BrandHeadline />
      <ProductShowcaseSections categories={categories} products={products} />
      <VideoSection />
    </main>
  );
}
