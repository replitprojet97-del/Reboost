import { useLocation } from 'wouter';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { type LoanOffer } from '@shared/loan-offers';
import { useUser, getAccountTypeLabel } from '@/hooks/use-user';
import { Info } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import LoanOffersCatalog from '@/components/LoanOffersCatalog';

export default function LoanRequestDashboard() {
  const t = useTranslations();
  const { data: user } = useUser();
  const [, setLocation] = useLocation();

  const handleRequestLoan = (offer: LoanOffer) => {
    console.log('Loan requested:', offer);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-loan-request">
          {t.loanOffers.pageTitle}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          {t.loanOffers.pageSubtitle}
        </p>

        {user && (
          <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 mb-8">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-sm">
              {t.loanOffers.accountInfo.replace('{accountType}', getAccountTypeLabel(user.accountType))}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <LoanOffersCatalog onRequestLoan={handleRequestLoan} />
    </div>
  );
}
