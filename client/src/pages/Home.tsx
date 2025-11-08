import Hero from '@/components/Hero';
import Header from '@/components/Header';
import IndividualLoans from '@/components/IndividualLoans';
import BusinessLoans from '@/components/BusinessLoans';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import ScrollingTestimonials from '@/components/ScrollingTestimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import NotificationBanner from '@/components/NotificationBanner';
import GuaranteesSection from '@/components/GuaranteesSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import SEO from '@/components/SEO';
import { organizationSchema, websiteSchema } from '@/lib/seo-data';
import { getKeywordsByPage } from '@/lib/seo-keywords';
import { useTranslations } from '@/lib/i18n';

export default function Home() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen">
      <SEO
        title={t.seo.home.title}
        description={t.seo.home.description}
        keywords={getKeywordsByPage('home')}
        path="/"
        structuredData={[organizationSchema, websiteSchema]}
      />
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-2">
          <NotificationBanner />
        </div>
      </div>
      <Hero />
      <StatsSection />
      <IndividualLoans />
      <BusinessLoans />
      <GuaranteesSection />
      <ProcessTimeline />
      <FeaturesSection />
      <ScrollingTestimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
