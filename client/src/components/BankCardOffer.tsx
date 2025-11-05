import { useState } from 'react';
import { CreditCard, Info, Check, Globe, Shield, Gift, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/lib/i18n';
import cardImage1 from '@assets/WhatsApp Image 2025-11-05 at 13.16.36_1762345203268.jpeg';
import cardImage2 from '@assets/WhatsApp Image 2025-11-05 at 13.16.36 (1)_1762345210880.jpeg';

export default function BankCardOffer() {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white border-0 shadow-xl overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2" data-testid="text-card-title">
                <CreditCard className="h-6 w-6" />
                {t.bankCard.title}
              </CardTitle>
              <CardDescription className="text-blue-100 mt-2" data-testid="text-card-subtitle">
                {t.bankCard.subtitle}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
              Premium
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform">
              <img 
                src={cardImage1} 
                alt="Carte bancaire Altus - Face" 
                className="w-full h-auto object-cover"
                data-testid="img-card-front"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform">
              <img 
                src={cardImage2} 
                alt="Carte bancaire Altus - Dos" 
                className="w-full h-auto object-cover"
                data-testid="img-card-back"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Gift className="h-4 w-4 text-yellow-300" />
              <span className="text-white">2% Cashback</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-yellow-300" />
              <span className="text-white">{t.bankCard.advantages.protection}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-yellow-300" />
              <span className="text-white">{t.bankCard.advantages.global}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-yellow-300" />
              <span className="text-white">{t.bankCard.advantages.support}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="secondary"
              className="flex-1 bg-white text-blue-700 hover:bg-blue-50"
              data-testid="button-learn-more"
            >
              <Info className="h-4 w-4 mr-2" />
              {t.bankCard.learnMore}
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-white text-white hover:bg-white/10"
              data-testid="button-order-card"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {t.bankCard.orderNow}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-card-details">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" data-testid="text-modal-title">
              {t.bankCard.modalTitle}
            </DialogTitle>
            <DialogDescription data-testid="text-modal-subtitle">
              {t.bankCard.modalSubtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img 
                src={cardImage1} 
                alt="Carte bancaire Altus" 
                className="w-full rounded-lg shadow-lg"
              />
              <img 
                src={cardImage2} 
                alt="Carte bancaire Altus" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" data-testid="text-advantages-title">
                <Check className="h-5 w-5 text-green-600" />
                {t.bankCard.advantagesTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <Gift className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm" data-testid="text-advantage-cashback">{t.bankCard.advantages.cashback}</p>
                      <p className="text-xs text-muted-foreground">{t.bankCard.advantages.cashbackDesc}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm" data-testid="text-advantage-nofees">{t.bankCard.advantages.noFees}</p>
                      <p className="text-xs text-muted-foreground">{t.bankCard.advantages.noFeesDesc}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm" data-testid="text-advantage-protection">{t.bankCard.advantages.protection}</p>
                      <p className="text-xs text-muted-foreground">{t.bankCard.advantages.protectionDesc}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <Gift className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm" data-testid="text-advantage-rewards">{t.bankCard.advantages.rewards}</p>
                      <p className="text-xs text-muted-foreground">{t.bankCard.advantages.rewardsDesc}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <Globe className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm" data-testid="text-advantage-global">{t.bankCard.advantages.global}</p>
                      <p className="text-xs text-muted-foreground">{t.bankCard.advantages.globalDesc}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm" data-testid="text-advantage-support">{t.bankCard.advantages.support}</p>
                      <p className="text-xs text-muted-foreground">{t.bankCard.advantages.supportDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4" data-testid="text-usage-zones-title">{t.bankCard.usageZonesTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium" data-testid="text-zone-worldwide">{t.bankCard.usageZones.worldwide}</p>
                    <p className="text-sm text-muted-foreground">{t.bankCard.usageZones.worldwideDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium" data-testid="text-zone-online">{t.bankCard.usageZones.online}</p>
                    <p className="text-sm text-muted-foreground">{t.bankCard.usageZones.onlineDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium" data-testid="text-zone-stores">{t.bankCard.usageZones.stores}</p>
                    <p className="text-sm text-muted-foreground">{t.bankCard.usageZones.storesDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium" data-testid="text-zone-atm">{t.bankCard.usageZones.atm}</p>
                    <p className="text-sm text-muted-foreground">{t.bankCard.usageZones.atmDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4" data-testid="text-fees-title">{t.bankCard.feesTitle}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <span className="font-medium" data-testid="text-fee-annual">{t.bankCard.fees.annualFee}</span>
                  <span className="text-blue-600 font-semibold">{t.bankCard.fees.annualFeeAmount}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <span className="font-medium" data-testid="text-fee-transaction">{t.bankCard.fees.transactionFee}</span>
                  <span className="text-green-600 font-semibold">{t.bankCard.fees.transactionFeeAmount}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <span className="font-medium" data-testid="text-fee-withdrawal">{t.bankCard.fees.withdrawalFee}</span>
                  <span className="text-green-600 font-semibold">{t.bankCard.fees.withdrawalFeeAmount}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <span className="font-medium" data-testid="text-fee-foreign">{t.bankCard.fees.foreignFee}</span>
                  <span className="text-blue-600 font-semibold">{t.bankCard.fees.foreignFeeAmount}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4" data-testid="text-specifications-title">{t.bankCard.specificationsTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <span className="text-muted-foreground">{t.bankCard.specifications.cardType}</span>
                  <span className="font-semibold">{t.bankCard.specifications.cardTypeValue}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <span className="text-muted-foreground">{t.bankCard.specifications.creditLimit}</span>
                  <span className="font-semibold">{t.bankCard.specifications.creditLimitValue}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <span className="text-muted-foreground">{t.bankCard.specifications.validity}</span>
                  <span className="font-semibold">{t.bankCard.specifications.validityValue}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <span className="text-muted-foreground">{t.bankCard.specifications.delivery}</span>
                  <span className="font-semibold">{t.bankCard.specifications.deliveryValue}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h4 className="font-semibold mb-2" data-testid="text-order-process-title">{t.bankCard.orderProcess}</h4>
              <p className="text-sm text-muted-foreground mb-4">{t.bankCard.orderProcessDesc}</p>
              <Button className="w-full" data-testid="button-order-modal">
                <CreditCard className="h-4 w-4 mr-2" />
                {t.bankCard.orderCard}
              </Button>
            </div>

            <div className="text-center">
              <Button 
                variant="link" 
                className="text-sm text-muted-foreground"
                data-testid="button-terms"
              >
                {t.bankCard.termsConditions}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
