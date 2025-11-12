import { useLocation } from 'wouter';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { type LoanOffer } from '@shared/loan-offers';
import { useUser, getAccountTypeLabel } from '@/hooks/use-user';
import { Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from '@/lib/i18n';
import LoanOffersCatalog from '@/components/LoanOffersCatalog';

export default function LoanRequest() {
  const t = useTranslations();
  const { data: user } = useUser();
  const [, setLocation] = useLocation();

  const handleRequestLoan = (offer: LoanOffer) => {
    setLocation('/login');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t.loanOffers.pageTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t.loanOffers.pageSubtitle}
            </p>
          </div>

          {user && (
            <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 mb-8 max-w-4xl mx-auto">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-sm">
                {t.loanOffers.accountInfo.replace('{accountType}', getAccountTypeLabel(user.accountType))}
              </AlertDescription>
            </Alert>
          )}

          <LoanOffersCatalog onRequestLoan={handleRequestLoan} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
