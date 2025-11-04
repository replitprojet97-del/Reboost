import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/lib/i18n';
import { Plus, ArrowRightLeft, History } from 'lucide-react';
import NewLoanDialog from './NewLoanDialog';
import TransactionHistoryDialog from './TransactionHistoryDialog';

export default function QuickActions() {
  const t = useTranslations();
  const [, setLocation] = useLocation();
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">{t.dashboard.quickActions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full justify-start gap-3"
            size="lg"
            data-testid="button-new-loan"
            onClick={() => setLoanDialogOpen(true)}
          >
            <Plus className="h-5 w-5" />
            {t.dashboard.newLoan}
          </Button>
          <Button
            className="w-full justify-start gap-3"
            variant="secondary"
            size="lg"
            data-testid="button-transfer-funds"
            onClick={() => setLocation('/transfer/new')}
          >
            <ArrowRightLeft className="h-5 w-5" />
            {t.dashboard.transferFunds}
          </Button>
          <Button
            className="w-full justify-start gap-3"
            variant="outline"
            size="lg"
            data-testid="button-transaction-history"
            onClick={() => setHistoryDialogOpen(true)}
          >
            <History className="h-5 w-5" />
            {t.dashboard.transactionHistory}
          </Button>
        </CardContent>
      </Card>

      <NewLoanDialog open={loanDialogOpen} onOpenChange={setLoanDialogOpen} />
      <TransactionHistoryDialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen} />
    </>
  );
}
