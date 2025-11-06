import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: 'Quels sont les documents nécessaires pour une demande de prêt ?',
      answer: 'Pour les particuliers : pièce d\'identité, justificatif de domicile, derniers bulletins de salaire et avis d\'imposition. Pour les professionnels : Kbis, bilans comptables des 3 dernières années, business plan et relevés bancaires.',
    },
    {
      question: 'Quel est le délai pour obtenir une réponse ?',
      answer: 'Grâce à notre technologie d\'analyse en temps réel, vous recevrez une réponse de principe en quelques minutes à 24 heures maximum après soumission de votre dossier complet. C\'est l\'un des délais les plus rapides du marché !',
    },
    {
      question: 'Comment et quand puis-je accéder à mes fonds ?',
      answer: 'Une fois votre demande approuvée, vos fonds sont immédiatement débloqués sur votre compte sécurisé Altus Finance Group. Vous pouvez ensuite les transférer quand vous le souhaitez vers votre compte bancaire personnel ou professionnel, directement depuis votre espace client. Les transferts sont instantanés et sans frais supplémentaires.',
    },
    {
      question: 'Puis-je rembourser mon prêt par anticipation ?',
      answer: 'Oui, tous nos prêts sont remboursables par anticipation sans frais ni pénalités. Vous pouvez effectuer un remboursement partiel ou total à tout moment depuis votre espace client.',
    },
    {
      question: 'Quels sont les taux d\'intérêt appliqués ?',
      answer: 'Nos taux varient de 0,5% à 8,5% selon le type de prêt, le montant emprunté, la durée et votre profil. Utilisez notre simulateur en ligne pour obtenir une estimation personnalisée. Les taux sont fixes et garantis pendant toute la durée du prêt.',
    },
    {
      question: 'Comment fonctionne le processus de demande en ligne ?',
      answer: '1) Remplissez notre formulaire en ligne (4 minutes). 2) Soumettez vos documents justificatifs. 3) Recevez une réponse en quelques minutes à 24h maximum. 4) Vos fonds sont débloqués sur votre compte Altus. 5) Transférez les fonds vers votre compte bancaire quand vous le souhaitez.',
    },
    {
      question: 'Quelle est la différence entre prêt affecté et non affecté ?',
      answer: 'Un prêt affecté est lié à un achat spécifique (auto, travaux) et nécessite un justificatif d\'utilisation. Un prêt non affecté (prêt personnel) vous laisse libre d\'utiliser les fonds comme vous le souhaitez sans justificatif.',
    },
    {
      question: 'Y a-t-il des frais de dossier ?',
      answer: 'Les frais de dossier varient selon le type et le montant du prêt. Pour les prêts particuliers, ils sont généralement de 1% du montant (plafonné à 500€). Pour les prêts professionnels, ils peuvent aller de 1% à 2%. Ces frais sont clairement indiqués dans votre simulation.',
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Trouvez rapidement des réponses à vos questions
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
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
              Vous ne trouvez pas la réponse à votre question ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe d'experts est disponible du lundi au vendredi de 9h à 19h
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-us">
                  Contactez-nous
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" data-testid="button-resources">
                  Centre d'aide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
