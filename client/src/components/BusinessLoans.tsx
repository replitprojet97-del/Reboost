import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  TrendingUp,
  CreditCard,
  Wrench,
  Building2,
  Factory,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useLanguage, translations } from '@/lib/i18n';

export default function BusinessLoans() {
  const { language } = useLanguage();
  const t = translations[language];

  const businessLoans = [
    {
      icon: Building2,
      title: t.businessLoans.businessLoan,
      description: t.businessLoans.businessLoanDesc,
      amount: '10 000€ - 500 000€',
      rate: '3,5% - 8,5%',
      duration: `12 - 84 ${t.businessLoans.months}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      features: t.businessLoans.businessLoanFeatures,
    },
    {
      icon: TrendingUp,
      title: t.businessLoans.cashFlowCredit,
      description: t.businessLoans.cashFlowCreditDesc,
      amount: '5 000€ - 150 000€',
      rate: '4,0% - 9,0%',
      duration: `3 - 36 ${t.businessLoans.months}`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      features: t.businessLoans.cashFlowCreditFeatures,
    },
    {
      icon: Wrench,
      title: t.businessLoans.equipmentFinancing,
      description: t.businessLoans.equipmentFinancingDesc,
      amount: '20 000€ - 300 000€',
      rate: '3,9% - 7,5%',
      duration: `24 - 60 ${t.businessLoans.months}`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      features: t.businessLoans.equipmentFinancingFeatures,
    },
    {
      icon: Factory,
      title: t.businessLoans.commercialProperty,
      description: t.businessLoans.commercialPropertyDesc,
      amount: '50 000€ - 2 000 000€',
      rate: '2,9% - 5,5%',
      duration: `5 - 25 ${t.businessLoans.years}`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      features: t.businessLoans.commercialPropertyFeatures,
    },
    {
      icon: CreditCard,
      title: t.businessLoans.lineOfCredit,
      description: t.businessLoans.lineOfCreditDesc,
      amount: '5 000€ - 100 000€',
      rate: '5,0% - 9,5%',
      duration: t.businessLoans.lineOfCreditDuration,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
      features: t.businessLoans.lineOfCreditFeatures,
    },
    {
      icon: Truck,
      title: t.businessLoans.vehicleFleet,
      description: t.businessLoans.vehicleFleetDesc,
      amount: '10 000€ - 200 000€',
      rate: '3,2% - 6,5%',
      duration: `24 - 72 ${t.businessLoans.months}`,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-950/20',
      features: t.businessLoans.vehicleFleetFeatures,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.businessLoans.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.businessLoans.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {businessLoans.map((loan, index) => {
            const Icon = loan.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                data-testid={`card-business-loan-${index}`}
              >
                <div className={`${loan.bgColor} p-3 rounded-lg w-fit mb-4`}>
                  <Icon className={`w-8 h-8 ${loan.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{loan.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {loan.description}
                </p>
                
                <div className="space-y-2 mb-4 text-sm pb-4 border-b">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.businessLoans.amount}:</span>
                    <span className="font-semibold">{loan.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.businessLoans.rate}:</span>
                    <span className="font-semibold">{loan.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.businessLoans.duration}:</span>
                    <span className="font-semibold">{loan.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {loan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full gap-2" asChild>
                  <Link href="/loan-request">
                    {t.businessLoans.learnMore}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">{t.businessLoans.advantagesTitle}</h3>
                <ul className="space-y-3 text-sm">
                  {t.businessLoans.advantages.map((advantage, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">{t.businessLoans.eligibilityTitle}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {t.businessLoans.eligibility.map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></span>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            {t.businessLoans.rateDisclaimer}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loan-request">
              <Button size="lg" data-testid="button-simulate-business-loan">
                {t.businessLoans.simulateLoan}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-contact-advisor">
                {t.businessLoans.contactAdvisor}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
