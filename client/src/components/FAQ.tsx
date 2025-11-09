import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { HelpCircle } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

export default function FAQ() {
  const t = useTranslations();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t.professionalFAQ.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.professionalFAQ.subtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {t.professionalFAQ.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`accordion-faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-muted/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-3">
              {t.professionalFAQ.notFoundTitle}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t.professionalFAQ.notFoundDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-us">
                  {t.professionalFAQ.contactUs}
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" data-testid="button-resources">
                  {t.professionalFAQ.helpCenter}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
