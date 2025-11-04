import Hero from '@/components/Hero';
import Header from '@/components/Header';
import IndividualLoans from '@/components/IndividualLoans';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <StatsSection />
      <IndividualLoans />
      <FeaturesSection />
    </div>
  );
}
