import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { useTranslations, useLanguage } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { getTermsSEOByLocale } from '@/lib/seo-keywords';

export default function Terms() {
  const t = useTranslations();
  const { language } = useLanguage();
  const seo = getTermsSEOByLocale(language);

  return (
    <div className="min-h-screen">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path="/terms"
        noindex={false}
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{t.legal.termsTitle}</h1>
            
            <Card className="p-8 prose prose-slate dark:prose-invert max-w-none">
              <h2>{t.legal.terms.section1Title}</h2>
              <p>{t.legal.terms.section1Content}</p>

              <h2>{t.legal.terms.section2Title}</h2>
              <p>{t.legal.terms.section2Content}</p>

              <h2>{t.legal.terms.section3Title}</h2>
              <p>{t.legal.terms.section3Content}</p>

              <h2>{t.legal.terms.section4Title}</h2>
              <p>{t.legal.terms.section4Content}</p>

              <h2>{t.legal.terms.section5Title}</h2>
              <p>{t.legal.terms.section5Content}</p>

              <h2>{t.legal.terms.section6Title}</h2>
              <p>{t.legal.terms.section6Content}</p>

              <p className="text-sm text-muted-foreground mt-8">
                {t.legal.lastUpdated}
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
