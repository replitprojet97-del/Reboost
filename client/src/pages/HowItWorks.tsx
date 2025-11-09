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
      { label: 'Adult and French resident', required: true },
      { label: 'Verifiable regular income', required: true },
      { label: 'No banking ban', required: true },
      { label: 'Debt ratio < 35%', required: true },
      { label: 'Acceptable credit score', required: false }
    ],
    professional: [
      { label: 'Company registered in France', required: true },
      { label: 'Operating for +6 months', required: true },
      { label: 'Up-to-date financial statements', required: true },
      { label: 'No collective proceedings', required: true },
      { label: 'Personal contribution 10-30%', required: true }
    ]
  };

  const documents = {
    personal: [
      'Valid ID (national ID card, passport)',
      'Proof of address (less than 3 months)',
      'Last 3 pay slips',
      'Latest tax assessment',
      'Bank statements (3 months)',
      'Project justification (quotes, invoices)'
    ],
    professional: [
      'Kbis less than 3 months old',
      'Manager\'s ID document',
      'Company bylaws',
      'Financial statements (last 3 years)',
      'Complete tax package',
      'Professional bank statements (6 months)',
      'Business plan (startup/takeover)',
      '3-year financial forecast',
      'Quotes or proforma invoices (equipment)'
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={t.seo.howItWorks.title}
        description={t.seo.howItWorks.description}
        keywords="how to get professional loan, business credit process, business loan documents, eligibility criteria, financing timeline, loan application steps"
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
                ⏱️ <strong>Average total time:</strong> 2 to 3 weeks from application submission to fund disbursement
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Required Documents</h2>
              <p className="text-lg text-muted-foreground">
                Prepare these documents to expedite your application
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Personal Loan</h3>
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
                  <h3 className="text-2xl font-bold">Business Loan</h3>
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
                💡 <strong>Tip:</strong> Missing documents? Our team will help you complete your file. 
                <Link href="/contact" className="text-primary font-semibold ml-2 hover:underline">
                  Contact us →
                </Link>
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Eligibility Criteria</h2>
              <p className="text-lg text-muted-foreground">
                Check if you meet the requirements for your loan
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Individuals</h3>
                </div>
                <ul className="space-y-4">
                  {eligibilityCriteria.personal.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${criteria.required ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {criteria.required ? '✓' : '◯'}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{criteria.label}</span>
                        {criteria.required && <span className="text-xs text-primary ml-2">(Required)</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-8 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Building className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Professionals</h3>
                </div>
                <ul className="space-y-4">
                  {eligibilityCriteria.professional.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${criteria.required ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {criteria.required ? '✓' : '◯'}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{criteria.label}</span>
                        {criteria.required && <span className="text-xs text-primary ml-2">(Required)</span>}
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
                <h3 className="text-3xl font-bold">Security & Guarantees</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Your Protected Data</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>256-bit SSL encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>GDPR and ACPR compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>Secure servers in France</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>Two-factor authentication</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Guarantee Organizations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>BPI France (40-70% of loan)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>SIAGI (craftsmen/merchants)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>France Active (social economy)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                      <span>Mandatory borrower insurance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
              <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Submit your online application in minutes and get a quick response
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/loan-request">
                  <Button size="lg" className="min-w-[200px]" data-testid="button-start-request">
                    Request a Loan
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="min-w-[200px]" data-testid="button-talk-advisor">
                    Talk to an Advisor
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
