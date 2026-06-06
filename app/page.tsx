import BrandHeadline from '@/components/home/BrandHeadline';
import CategoryProducts from '@/components/home/CategoryProduct';
import HeroSlider from '@/components/home/HeroSlider';
import MustHaveProducts from '@/components/home/MustHaveProducts';
import VideoSection from '@/components/home/VideoSection';

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSlider />
      <BrandHeadline />
      <CategoryProducts />
      <VideoSection />
      <MustHaveProducts />
    </main>
  );
}