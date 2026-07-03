import { Hero } from '@/components/landing/hero';
import { CompanyLogos } from '@/components/landing/company-logos';
import { StatsSection } from '@/components/landing/stats-section';
import { FeaturedCarousel } from '@/components/jobs/featured-carousel';
import { CategoriesSection } from '@/components/landing/categories-section';
import { Testimonials } from '@/components/landing/testimonials';
import { CtaSection } from '@/components/landing/cta-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyLogos />
      <StatsSection />
      <FeaturedCarousel />
      <CategoriesSection />
      <Testimonials />
      <CtaSection />
    </>
  );
}
