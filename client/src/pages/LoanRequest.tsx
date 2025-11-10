import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getLoanOffersByAccountType, type LoanOffer } from '@shared/loan-offers';
import { useUser, getAccountTypeLabel } from '@/hooks/use-user';
import { CheckCircle, Info } from 'lucide-react';
import NewLoanDialog from '@/components/NewLoanDialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/lib/i18n';

export default function LoanRequest() {
  const t = useTranslations();
  const { data: user, isLoading } = useUser();
  const [, setLocation] = useLocation();
  const [selectedOffer, setSelectedOffer] = useState<LoanOffer | null>(null);
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'individual' | 'business'>('individual');

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t.common?.loading || 'Chargement...'}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const accountType = user.accountType === 'business' ? 'business' : 'individual';
  const individualOffers = getLoanOffersByAccountType('individual');
  const businessOffers = getLoanOffersByAccountType('business');

  const handleRequestLoan = (offer: LoanOffer) => {
    if (!user) {
      setLocation('/login');
      return;
    }
    setSelectedOffer(offer);
    setLoanDialogOpen(true);
  };

  const renderOffers = (offers: LoanOffer[], type: 'individual' | 'business') => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer) => {
        const IconComponent = offer.icon;
        
        return (
          <Card 
            key={offer.id}
            className="hover-elevate transition-all duration-300 border-2 hover:border-primary/50"
            data-testid={`card-loan-offer-${offer.id}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${offer.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${offer.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {type === 'individual' ? t.loanOffers.individual : t.loanOffers.business}
                </Badge>
              </div>
              <CardTitle className="text-xl">{offer.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {offer.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.loanOffers.amountLabel}</span>
                  <span className="font-semibold">{offer.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.loanOffers.rateLabel}</span>
                  <span className="font-semibold">{offer.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.loanOffers.durationLabel}</span>
                  <span className="font-semibold">{offer.duration}</span>
                </div>
              </div>

              {offer.features && offer.features.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase">
                    {t.loanOffers.advantagesLabel}
                  </div>
                  <ul className="space-y-1">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => handleRequestLoan(offer)}
                data-testid={`button-request-${offer.id}`}
              >
                {t.loanOffers.requestButton}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

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

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'individual' | 'business')} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="individual" data-testid="tab-individual-loans">
                {t.loanOffers.individualTab}
              </TabsTrigger>
              <TabsTrigger value="business" data-testid="tab-business-loans">
                {t.loanOffers.businessTab}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-6">
              {renderOffers(individualOffers, 'individual')}
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              {renderOffers(businessOffers, 'business')}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      <NewLoanDialog 
        open={loanDialogOpen}
        onOpenChange={setLoanDialogOpen}
      />
    </div>
  );
}
