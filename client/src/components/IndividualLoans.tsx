import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Home,
  Car,
  Wallet,
  GraduationCap,
  Leaf,
  ArrowRight,
} from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

export default function IndividualLoans() {
  const t = useTranslations();

  const individualLoans = [
    {
      icon: Wallet,
      title: t.individualLoans?.personalLoan || 'Prêt Personnel',
      description:
        t.individualLoans?.personalLoanDesc ||
        'Financement flexible pour tous vos projets personnels',
      amount: '1 000€ - 75 000€',
      rate: '0,10% - 7%',
      duration: '12 - 84 mois',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: Home,
      title: t.individualLoans?.mortgageLoan || 'Prêt Immobilier',
      description:
        t.individualLoans?.mortgageLoanDesc ||
        'Financez l\'achat de votre résidence principale ou secondaire',
      amount: '50 000€ - 500 000€',
      rate: '2,5% - 4,5%',
      duration: '15 - 30 ans',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: Car,
      title: t.individualLoans?.autoLoan || 'Crédit Auto',
      description:
        t.individualLoans?.autoLoanDesc ||
        'Achetez votre véhicule neuf ou d\'occasion',
      amount: '5 000€ - 75 000€',
      rate: '1,9% - 5,5%',
      duration: '24 - 84 mois',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      icon: GraduationCap,
      title: t.individualLoans?.studentLoan || 'Prêt Étudiant',
      description:
        t.individualLoans?.studentLoanDesc ||
        'Financez vos études avec des conditions avantageuses',
      amount: '1 000€ - 50 000€',
      rate: '0,9% - 3,5%',
      duration: '24 - 120 mois',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      icon: Leaf,
      title: t.individualLoans?.greenLoan || 'Prêt Vert',
      description:
        t.individualLoans?.greenLoanDesc ||
        'Financez vos projets de rénovation énergétique',
      amount: '3 000€ - 75 000€',
      rate: '0,5% - 4,0%',
      duration: '12 - 180 mois',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    },
    {
      icon: Home,
      title: t.individualLoans?.renovationLoan || 'Prêt Travaux',
      description:
        t.individualLoans?.renovationLoanDesc ||
        'Rénovez et améliorez votre logement',
      amount: '3 000€ - 75 000€',
      rate: '1,5% - 6,0%',
      duration: '12 - 120 mois',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.individualLoans?.title || 'Prêts pour Particuliers'}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.individualLoans?.subtitle ||
              'Des solutions de financement adaptées à tous vos projets de vie'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {individualLoans.map((loan, index) => {
            const Icon = loan.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`${loan.bgColor} p-3 rounded-lg w-fit mb-4`}>
                  <Icon className={`w-8 h-8 ${loan.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{loan.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {loan.description}
                </p>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.individualLoans?.amount || 'Montant'}:
                    </span>
                    <span className="font-semibold">{loan.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.individualLoans?.rate || 'Taux'}:
                    </span>
                    <span className="font-semibold">{loan.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.individualLoans?.duration || 'Durée'}:
                    </span>
                    <span className="font-semibold">{loan.duration}</span>
                  </div>
                </div>
                <Button className="w-full gap-2" asChild>
                  <Link href="/dashboard">
                    {t.hero?.cta1 || 'Demander un prêt'}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            {t.individualLoans?.rateDisclaimer ||
              'Taux indicatifs soumis à conditions. TAEG fixe.'}
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">
              {t.individualLoans?.compareLoans || 'Comparer tous les prêts'}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
