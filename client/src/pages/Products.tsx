import Header from '@/components/Header';
import FooterPremium from '@/components/premium/FooterPremium';
import SEO from '@/components/SEO';
import { useTranslations, useLanguage } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { getIndividualLoans, getBusinessLoans } from '@/lib/loan-catalog';
import { loanProductSchema } from '@/lib/seo-data';
import { getProductsSEOByLocale } from '@/lib/seo-keywords';

export default function Products() {
  const t = useTranslations();
  const { language } = useLanguage();
  const seo = getProductsSEOByLocale(language);
  
  const individualProducts = getIndividualLoans(t);
  const businessProducts = getBusinessLoans(t);

  return (
    <div className="min-h-screen">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path="/products"
        structuredData={loanProductSchema(language)}
      />
      <Header />
      <main className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t.products.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t.products.subtitle}</p>
          </div>

          {/* Individual Loans Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-individual-loans">{t.individualLoans.title}</h2>
              <p className="text-lg text-muted-foreground">{t.individualLoans.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {individualProducts.map((product, index) => {
                const Icon = product.icon;
                return (
                  <Card key={index} className="p-8 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-individual-loan-${index}`}>
                    <div className={`${product.bgColor} p-4 rounded-xl w-fit mb-6`}>
                      <Icon className={`w-8 h-8 ${product.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>
                    <div className="space-y-3 mb-6 text-sm border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Montant:</span>
                        <span className="font-bold text-gray-900">{product.amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Taux:</span>
                        <span className="font-bold text-[#005DFF]">{product.rate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Durée:</span>
                        <span className="font-bold text-gray-900">{product.duration}</span>
                      </div>
                    </div>
                    <Link href="/loan-request" className="block">
                      <Button className="w-full bg-[#005DFF] hover:bg-[#0052E0]" data-testid={`button-apply-individual-${index}`}>{t.hero.cta1}</Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Business Loans Section */}
          <div>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-business-loans">
                {t.products.businessTitle}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.products.businessSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {businessProducts.map((product, index) => {
                const Icon = product.icon;
                const features = product.featuresKey ? (t.businessLoans as any)[product.featuresKey] : [];
                return (
                  <Card key={index} className="p-10 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-business-loan-${index}`}>
                    <div className={`${product.bgColor} p-4 rounded-xl w-fit mb-6`}>
                      <Icon className={`w-10 h-10 ${product.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
                    <div className="space-y-3 mb-6 text-sm border-t border-b py-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Montant:</span>
                        <span className="font-bold text-gray-900">{product.amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Taux:</span>
                        <span className="font-bold text-[#005DFF]">{product.rate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Durée:</span>
                        <span className="font-bold text-gray-900">{product.duration}</span>
                      </div>
                    </div>
                    {features && features.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <span className="w-2 h-2 bg-[#005DFF] rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href="/loan-request" className="block">
                      <Button className="w-full bg-[#005DFF] hover:bg-[#0052E0]" data-testid={`button-apply-business-${index}`}>{t.hero.cta1}</Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <FooterPremium />
    </div>
  );
}
