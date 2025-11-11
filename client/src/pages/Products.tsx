import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.products.title}</h1>
            <p className="text-xl text-muted-foreground">{t.products.subtitle}</p>
          </div>

          {/* Individual Loans Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-individual-loans">{t.individualLoans.title}</h2>
              <p className="text-lg text-muted-foreground">{t.individualLoans.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {individualProducts.map((product, index) => {
                const Icon = product.icon;
                return (
                  <Card key={index} className="p-6" data-testid={`card-individual-loan-${index}`}>
                    <div className={`${product.bgColor} p-3 rounded-lg w-fit mb-4`}>
                      <Icon className={`w-8 h-8 ${product.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Montant:</span>
                        <span className="font-semibold">{product.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taux:</span>
                        <span className="font-semibold">{product.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Durée:</span>
                        <span className="font-semibold">{product.duration}</span>
                      </div>
                    </div>
                    <Link href="/loan-request" className="block">
                      <Button className="w-full" size="sm" data-testid={`button-apply-individual-${index}`}>{t.hero.cta1}</Button>
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
                  <Card key={index} className="p-8" data-testid={`card-business-loan-${index}`}>
                    <div className={`${product.bgColor} p-3 rounded-lg w-fit mb-4`}>
                      <Icon className={`w-10 h-10 ${product.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                    <p className="text-muted-foreground mb-6">{product.description}</p>
                    <div className="space-y-2 mb-4 text-sm border-b pb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Montant:</span>
                        <span className="font-semibold">{product.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taux:</span>
                        <span className="font-semibold">{product.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Durée:</span>
                        <span className="font-semibold">{product.duration}</span>
                      </div>
                    </div>
                    {features && features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href="/loan-request" className="block">
                      <Button className="w-full" data-testid={`button-apply-business-${index}`}>{t.hero.cta1}</Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
