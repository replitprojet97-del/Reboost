import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useTranslations, useLanguage } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqSchema } from '@/lib/seo-data';
import { getResourcesSEOByLocale } from '@/lib/seo-keywords';

export default function Resources() {
  const t = useTranslations();
  const { language } = useLanguage();
  const seo = getResourcesSEOByLocale(language);
  
  const faqData = t.resources.faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));

  return (
    <div className="min-h-screen">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path="/resources"
        structuredData={faqSchema(faqData)}
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.resources.title}</h1>
            <p className="text-xl text-muted-foreground">{t.resources.subtitle}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">{t.resources.faqTitle}</h2>
              <Accordion type="single" collapsible className="w-full">
                {t.resources.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
