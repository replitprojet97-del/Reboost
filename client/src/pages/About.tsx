import Header from '@/components/Header';
import FooterPremium from '@/components/premium/FooterPremium';
import SEO from '@/components/SEO';
import { useTranslations } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { organizationSchema, breadcrumbSchema } from '@/lib/seo-data';

export default function About() {
  const t = useTranslations();

  const aboutBreadcrumb = breadcrumbSchema([
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' }
  ]);

  const stats = [
    { icon: Users, label: t.about.stats.clients, value: '15 000+' },
    { icon: TrendingUp, label: t.about.stats.loansProvided, value: '€500M+' },
    { icon: Award, label: t.about.stats.successRate, value: '98%' },
    { icon: Clock, label: t.about.stats.yearsExperience, value: '15+' },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={t.seo.about.title}
        description={t.seo.about.description}
        keywords="about Altus Finance Group, Altus Finance Group mission, financing company values, professional loan experience, reliable business financing"
        path="/about"
        structuredData={[organizationSchema, aboutBreadcrumb]}
      />
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t.about.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">{t.about.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-8 text-center bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-[#005DFF]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#005DFF]" />
                  </div>
                  <div className="text-3xl font-bold mb-2 text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          <Card className="p-10 sm:p-12 md:p-16 bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">{t.about.mission}</h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                {t.about.missionText}
              </p>
            </div>
          </Card>
        </div>
      </main>
      <FooterPremium />
    </div>
  );
}
