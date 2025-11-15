import Header from '@/components/Header';
import FooterPremium from '@/components/premium/FooterPremium';
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
      title: t.howItWorks.step1Title || 'Inscription',
      description: t.howItWorks.step1Desc || 'Créez votre compte et complétez votre profil en quelques minutes',
      duration: t.howItWorks.step1Duration || '3 min',
      step: '01',
    },
    {
      icon: Search,
      title: t.howItWorks.step2Title || 'Connexion',
      description: t.howItWorks.step2Desc || 'Accédez à votre espace client personnel sécurisé',
      duration: t.howItWorks.step2Duration || 'Instant',
      step: '02',
    },
    {
      icon: CheckCircle,
      title: t.howItWorks.step3Title || 'Demande et analyse',
      description: t.howItWorks.step3Desc || 'Soumettez votre demande et recevez une réponse en temps réel',
      duration: t.howItWorks.step3Duration || '< 24h',
      step: '03',
    },
    {
      icon: Banknote,
      title: t.howItWorks.step4Title || 'Déblocage immédiat',
      description: t.howItWorks.step4Desc || 'Fonds immédiatement disponibles sur votre compte sécurisé',
      duration: t.howItWorks.step4Duration || 'Immediate',
      step: '04',
    },
  ];


  return (
    <div className="min-h-screen">
      <SEO
        title={t.seo.howItWorks.title}
        description={t.seo.howItWorks.description}
        keywords="how to get professional loan, business credit process, business loan documents, eligibility criteria, financing timeline, loan application steps"
        path="/how-it-works"
      />
      <Header />
      <main className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t.howItWorks.title || 'Comment Ça Marche ?'}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t.howItWorks.subtitle || 'Un processus simple, transparent et 100% digital'}
            </p>
          </div>

          <div className="max-w-7xl mx-auto mb-24">
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#005DFF]/20 via-[#005DFF]/40 to-[#005DFF]/20 -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Card key={index} className="p-8 relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white" data-testid={`card-step-${index}`}>
                      <div className="absolute -top-4 -left-4 bg-gradient-to-br from-[#005DFF] to-[#0052E0] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div className="mt-2">
                        <div className="bg-[#005DFF]/10 p-4 rounded-xl w-fit mb-6">
                          <Icon className="w-8 h-8 text-[#005DFF]" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-700 font-semibold text-xs w-fit">
                          <Clock className="w-4 h-4 text-[#005DFF]" />
                          {step.duration}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#005DFF]/10 border border-[#005DFF]/20">
                <Clock className="w-5 h-5 text-[#005DFF]" />
                <p className="text-sm font-semibold text-gray-800">
                  {t.howItWorks.averageTimePrefix} <span className="text-[#005DFF]">{t.howItWorks.averageTimeValue}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.howItWorks.requiredDocumentsTitle}</h2>
              <p className="text-lg text-muted-foreground">
                {t.howItWorks.requiredDocumentsSubtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-10 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-[#005DFF]/10 p-3 rounded-xl">
                    <Users className="w-8 h-8 text-[#005DFF]" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.howItWorks.personalLoanTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {t.howItWorks.documents.personal.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00C48C] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed">{doc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-10 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-[#005DFF]/10 p-3 rounded-xl">
                    <Briefcase className="w-8 h-8 text-[#005DFF]" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.howItWorks.businessLoanTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {t.howItWorks.documents.professional.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00C48C] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed">{doc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center">
                💡 <strong>{t.howItWorks.tipTitle}</strong> {t.howItWorks.tipMessage}
                <Link href="/contact" className="text-primary font-semibold ml-2 hover:underline">
                  {t.howItWorks.tipContactCta}
                </Link>
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.howItWorks.eligibilityTitle}</h2>
              <p className="text-lg text-muted-foreground">
                {t.howItWorks.eligibilitySubtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">{t.howItWorks.individualsTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {t.howItWorks.eligibility.personal.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${criteria.required ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {criteria.required ? '✓' : '◯'}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{criteria.label}</span>
                        {criteria.required && <span className="text-xs text-primary ml-2">({t.howItWorks.requiredTag})</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-8 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Building className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">{t.howItWorks.professionalsTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {t.howItWorks.eligibility.professional.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${criteria.required ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {criteria.required ? '✓' : '◯'}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{criteria.label}</span>
                        {criteria.required && <span className="text-xs text-primary ml-2">({t.howItWorks.requiredTag})</span>}
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
                <h3 className="text-3xl font-bold">{t.howItWorks.securityTitle}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">{t.howItWorks.security.dataProtectionTitle}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {t.howItWorks.security.dataProtectionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">{t.howItWorks.security.guaranteesTitle}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {t.howItWorks.security.guaranteesItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
              <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">{t.howItWorks.ctaTitle}</h3>
              <p className="text-lg text-muted-foreground mb-8">
                {t.howItWorks.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/loan-request">
                  <Button size="lg" className="min-w-[200px]" data-testid="button-start-request">
                    {t.howItWorks.ctaRequestButton}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="min-w-[200px]" data-testid="button-talk-advisor">
                    {t.howItWorks.ctaContactButton}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <FooterPremium />
    </div>
  );
}
