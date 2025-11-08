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

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Altus Finance Group - Prêt Professionnel & Personnel | Financement Rapide et Compétitif"
        description="Solutions de prêt professionnel et personnel avec Altus Finance Group. Obtenez un financement rapide pour votre entreprise ou projet personnel. Taux compétitifs, processus simple et transparent."
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
