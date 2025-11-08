import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { FileText, Search, CheckCircle, Banknote, Clock } from 'lucide-react';

export default function ProcessTimeline() {
  const steps = [
    {
      icon: FileText,
      title: 'Demande en ligne',
      duration: '5 minutes',
      description: 'Remplissez notre formulaire sécurisé et téléchargez vos justificatifs',
      documents: [
        'Kbis de moins de 3 mois',
        'Pièce d\'identité du dirigeant',
        'Derniers bilans comptables',
        'Relevés bancaires (3 mois)'
      ]
    },
    {
      icon: Search,
      title: 'Analyse du dossier',
      duration: '24-48h',
      description: 'Notre équipe d\'experts étudie votre demande et votre capacité de remboursement',
      documents: [
        'Vérification des documents',
        'Analyse financière',
        'Étude de solvabilité',
        'Calcul du taux personnalisé'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Accord de principe',
      duration: '48h',
      description: 'Réception de votre offre de prêt détaillée avec conditions définitives',
      documents: [
        'Montant accordé',
        'TAEG et mensualités',
        'Garanties requises',
        'Conditions suspensives'
      ]
    },
    {
      icon: Banknote,
      title: 'Déblocage des fonds',
      duration: '7-15 jours',
      description: 'Signature électronique du contrat et versement sous 7 à 15 jours après mise en place des garanties',
      documents: [
        'Signature contrat de prêt',
        'Mise en place garanties',
        'Assurance emprunteur',
        'Virement des fonds'
      ]
    }
  ];

  const requiredDocuments = {
    creation: [
      'Business plan détaillé',
      'Prévisionnel financier sur 3 ans',
      'Plan de financement',
      'CV du dirigeant et expérience',
      'Justificatif apport personnel'
    ],
    reprise: [
      'Protocole d\'accord de reprise',
      'Bilans des 3 derniers exercices',
      'Évaluation du fonds de commerce',
      'Bail commercial',
      'Attestation non-gage'
    ],
    developpement: [
      'Bilans des 3 derniers exercices',
      'Liasse fiscale complète',
      'Devis fournisseurs (équipement)',
      'Relevés bancaires pro (6 mois)',
      'Prévisionnel d\'activité'
    ]
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Processus de Financement
          </h2>
          <p className="text-xl text-muted-foreground">
            De votre demande au déblocage des fonds : un parcours simplifié et rapide
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 relative" data-testid={`card-process-${index}`}>
                  <div className="absolute -top-3 left-6 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{step.title}</h3>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {step.documents.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">Documents à Préparer selon Votre Projet</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h4 className="text-xl font-bold mb-4 text-primary">Création d'entreprise</h4>
              <ul className="space-y-3">
                {requiredDocuments.creation.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h4 className="text-xl font-bold mb-4 text-primary">Reprise d'entreprise</h4>
              <ul className="space-y-3">
                {requiredDocuments.reprise.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h4 className="text-xl font-bold mb-4 text-primary">Développement</h4>
              <ul className="space-y-3">
                {requiredDocuments.developpement.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-lg mb-2">Dossier incomplet ? Pas de panique !</h4>
                <p className="text-sm text-muted-foreground">
                  Notre équipe vous accompagne pour constituer votre dossier. Nous vous aidons à obtenir les documents manquants.
                </p>
              </div>
              <Link href="/contact">
                <Button size="lg" className="whitespace-nowrap" data-testid="button-help-documents">
                  Besoin d'aide ?
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            ⏱️ <strong>Délai total moyen :</strong> 2 à 3 semaines du dépôt du dossier au déblocage des fonds
          </p>
          <Link href="/loan-request">
            <Button size="lg" data-testid="button-start-application">
              Commencer ma demande
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
