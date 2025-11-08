import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useTranslations } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Banknote, 
  Clock, 
  Users, 
  Shield,
  TrendingUp,
  Building,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function HowItWorks() {
  const t = useTranslations();

  const steps = [
    {
      icon: FileText,
      title: t.howItWorks.step1Title || 'Demande en ligne',
      description: t.howItWorks.step1Desc || 'Remplissez notre formulaire sécurisé en 5 minutes et téléchargez vos documents justificatifs',
      duration: '5 min',
      step: '01',
    },
    {
      icon: Search,
      title: t.howItWorks.step2Title || 'Analyse du dossier',
      description: t.howItWorks.step2Desc || 'Notre équipe d\'experts étudie votre demande, votre capacité de remboursement et calcule votre taux personnalisé',
      duration: '24-48h',
      step: '02',
    },
    {
      icon: CheckCircle,
      title: t.howItWorks.step3Title || 'Accord de principe',
      description: t.howItWorks.step3Desc || 'Recevez votre offre détaillée avec le montant accordé, le TAEG et les mensualités',
      duration: '48h',
      step: '03',
    },
    {
      icon: Banknote,
      title: t.howItWorks.step4Title || 'Déblocage des fonds',
      description: t.howItWorks.step4Desc || 'Signature électronique du contrat et versement sous 7 à 15 jours après mise en place des garanties',
      duration: '7-15 jours',
      step: '04',
    },
  ];

  const eligibilityCriteria = {
    personal: [
      { label: 'Majeur et résident français', required: true },
      { label: 'Revenus réguliers justifiables', required: true },
      { label: 'Pas d\'interdiction bancaire', required: true },
      { label: 'Taux d\'endettement < 35%', required: true },
      { label: 'Score de crédit acceptable', required: false }
    ],
    professional: [
      { label: 'Entreprise immatriculée en France', required: true },
      { label: 'Activité depuis +6 mois', required: true },
      { label: 'Bilans comptables à jour', required: true },
      { label: 'Pas de procédure collective', required: true },
      { label: 'Apport personnel 10-30%', required: true }
    ]
  };

  const documents = {
    personal: [
      'Pièce d\'identité valide (CNI, passeport)',
      'Justificatif de domicile (-3 mois)',
      '3 derniers bulletins de salaire',
      'Dernier avis d\'imposition',
      'Relevés bancaires (3 mois)',
      'Justificatif du projet (devis, factures)'
    ],
    professional: [
      'Kbis de moins de 3 mois',
      'Pièce d\'identité du dirigeant',
      'Statuts de l\'entreprise',
      'Bilans comptables (3 dernières années)',
      'Liasse fiscale complète',
      'Relevés bancaires professionnels (6 mois)',
      'Business plan (création/reprise)',
      'Prévisionnel financier sur 3 ans',
      'Devis ou factures proforma (équipement)'
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={t.seo.howItWorks.title}
        description={t.seo.howItWorks.description}
        keywords="comment obtenir prêt professionnel, processus crédit pro, documents prêt entreprise, critères éligibilité, délai financement, étapes demande prêt"
        path="/how-it-works"
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.howItWorks.title || 'Comment Ça Marche ?'}</h1>
            <p className="text-xl text-muted-foreground">
              {t.howItWorks.subtitle || 'Un parcours simplifié de la demande au déblocage des fonds'}
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="p-6 relative hover:shadow-lg transition-shadow" data-testid={`card-step-${index}`}>
                    <div className="absolute -top-3 left-6 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="mt-4">
                      <Icon className="w-10 h-10 mb-4 text-primary" />
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold">{step.title}</h3>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                ⏱️ <strong>Délai total moyen :</strong> 2 à 3 semaines du dépôt du dossier au déblocage des fonds
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Documents Nécessaires</h2>
              <p className="text-lg text-muted-foreground">
                Préparez ces documents pour accélérer votre demande
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Prêt Particulier</h3>
                </div>
                <ul className="space-y-3">
                  {documents.personal.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Prêt Professionnel</h3>
                </div>
                <ul className="space-y-3">
                  {documents.professional.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center">
                💡 <strong>Conseil :</strong> Documents incomplets ? Notre équipe vous accompagne pour constituer votre dossier. 
                <Link href="/contact" className="text-primary font-semibold ml-2 hover:underline">
                  Contactez-nous →
                </Link>
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Critères d'Éligibilité</h2>
              <p className="text-lg text-muted-foreground">
                Vérifiez si vous remplissez les conditions pour votre prêt
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Particuliers</h3>
                </div>
                <ul className="space-y-4">
                  {eligibilityCriteria.personal.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${criteria.required ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {criteria.required ? '✓' : '◯'}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{criteria.label}</span>
                        {criteria.required && <span className="text-xs text-primary ml-2">(Obligatoire)</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-8 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Building className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Professionnels</h3>
                </div>
                <ul className="space-y-4">
                  {eligibilityCriteria.professional.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${criteria.required ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {criteria.required ? '✓' : '◯'}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{criteria.label}</span>
                        {criteria.required && <span className="text-xs text-primary ml-2">(Obligatoire)</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-10 h-10 text-primary" />
                <h3 className="text-3xl font-bold">Sécurité & Garanties</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Vos données protégées</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>Cryptage SSL 256 bits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>Conformité RGPD et ACPR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>Serveurs sécurisés en France</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>Authentification à 2 facteurs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Organismes de garantie</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>BPI France (40-70% du prêt)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>SIAGI (artisans/commerçants)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>France Active (économie sociale)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>Assurance emprunteur obligatoire</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
              <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Prêt à Commencer ?</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Lancez votre demande en ligne en quelques minutes et obtenez une réponse rapide
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/loan-request">
                  <Button size="lg" className="min-w-[200px]" data-testid="button-start-request">
                    Faire une demande
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="min-w-[200px]" data-testid="button-talk-advisor">
                    Parler à un conseiller
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
