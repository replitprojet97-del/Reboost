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
      question: 'Quels sont les documents nécessaires pour une demande de prêt professionnel ?',
      answer: 'Pour les professionnels : Kbis de moins de 3 mois, pièce d\'identité du dirigeant, bilans comptables des 3 dernières années, liasse fiscale complète, relevés bancaires professionnels (6 mois), business plan (création), prévisionnel financier. Pour les particuliers : pièce d\'identité, justificatif de domicile, derniers bulletins de salaire et avis d\'imposition.',
    },
    {
      question: 'Quel apport personnel est requis pour un prêt professionnel ?',
      answer: 'L\'apport personnel varie selon le projet : 10-15% pour l\'achat d\'équipement ou de matériel, 20-30% pour une création ou reprise d\'entreprise, 20-25% pour l\'immobilier professionnel. Un apport plus important peut améliorer vos conditions de financement et diminuer votre taux.',
    },
    {
      question: 'Quel est le délai pour obtenir une réponse et les fonds ?',
      answer: 'Réponse de principe en 24-48h après soumission du dossier complet. L\'accord définitif intervient sous 48h. Le déblocage des fonds s\'effectue sous 7 à 15 jours après signature du contrat et mise en place des garanties. Délai total moyen : 2 à 3 semaines.',
    },
    {
      question: 'Quelles garanties puis-je proposer pour mon prêt professionnel ?',
      answer: 'Plusieurs options : garanties réelles (hypothèque, nantissement fonds de commerce, gage matériel), garanties personnelles (caution solidaire du dirigeant), organismes de cautionnement (BPI France 40-70%, SIAGI, France Active, SOCAMA), ou assurance emprunteur (obligatoire : décès/PTIA, optionnelle : IPT/IPP/ITT).',
    },
    {
      question: 'Les intérêts d\'emprunt sont-ils déductibles fiscalement ?',
      answer: 'Oui ! Les intérêts d\'emprunt professionnel sont entièrement déductibles du résultat fiscal de votre entreprise, réduisant ainsi votre impôt sur les bénéfices. De plus, les cotisations d\'assurance emprunteur sont également déductibles. La TVA sur les intérêts et frais est récupérable pour les entreprises assujetties.',
    },
    {
      question: 'Puis-je obtenir un prêt si mon entreprise a moins d\'un an ?',
      answer: 'Oui, nous finançons les créations d\'entreprise avec un business plan solide et un apport personnel de 20-30%. Nous étudions votre expérience professionnelle, la viabilité du projet et vos prévisions. Un prêt d\'honneur (BPI France, Initiative France) peut renforcer votre dossier.',
    },
    {
      question: 'Puis-je rembourser mon prêt professionnel par anticipation ?',
      answer: 'Oui, tous nos prêts professionnels sont remboursables par anticipation. Les indemnités sont plafonnées par la loi : maximum 6 mois d\'intérêts ou 3% du capital restant dû. Certains contrats prévoient la gratuité du remboursement anticipé après une certaine période.',
    },
    {
      question: 'Quels sont les taux actuels pour les prêts professionnels ?',
      answer: 'Nos taux TAEG varient selon le projet : Immobilier pro 2,9-5,5% (5-25 ans), Équipement 3,9-7,5% (2-5 ans), Fonds de commerce 4,7% (5-10 ans), Trésorerie 4,0-9,0% (3-36 mois), Véhicules pro 3,2-6,5% (2-6 ans). Taux personnalisés selon votre profil et durée.',
    },
    {
      question: 'Comment fonctionne le processus de demande en ligne ?',
      answer: '1) Remplissez notre formulaire en ligne (5 min) et téléchargez vos documents. 2) Analyse de votre dossier par nos experts (24-48h). 3) Recevez votre accord de principe avec conditions. 4) Signature électronique du contrat. 5) Mise en place des garanties. 6) Déblocage des fonds sur votre compte Altus.',
    },
    {
      question: 'Puis-je cumuler plusieurs types de financement ?',
      answer: 'Oui, vous pouvez combiner plusieurs solutions : prêt bancaire + crédit-bail pour l\'équipement, prêt professionnel + prêt d\'honneur (BPI France) pour renforcer vos fonds propres, ou ligne de crédit + prêt amortissable pour conjuguer flexibilité et financement long terme.',
    },
    {
      question: 'Y a-t-il des frais de dossier et autres frais ?',
      answer: 'Frais de dossier : 1-2% du montant pour les prêts professionnels (négociables). Frais de garantie : variables selon le type (hypothèque, nantissement). Assurance emprunteur : 0,10% à 0,40% du capital emprunté par an. Tous les frais sont détaillés dans votre offre de prêt.',
    },
    {
      question: 'Que se passe-t-il si je rencontre des difficultés de remboursement ?',
      answer: 'Contactez-nous dès les premiers signes de difficulté. Nous pouvons étudier : un report d\'échéances temporaire, une modulation des mensualités, un allongement de la durée du prêt, ou une réorganisation de vos crédits. L\'accompagnement préventif est toujours préférable.',
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
