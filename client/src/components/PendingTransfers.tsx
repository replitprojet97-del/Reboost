import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/lib/i18n';
import { CheckCircle2, Clock, Send, Shield, Banknote } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Transfer {
  id: string;
  amount: number;
  recipient: string;
  status: 'pending' | 'in-progress' | 'completed' | 'suspended';
  currentStep: number;
  updatedAt: string;
}

interface PendingTransfersProps {
  transfers: Transfer[];
}

export default function PendingTransfers({ transfers }: PendingTransfersProps) {
  const t = useTranslations();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getStatusInfo = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return { label: 'Complété', variant: 'default' as const, icon: CheckCircle2 };
      case 'in-progress':
        return { label: 'En traitement', variant: 'secondary' as const, icon: Shield };
      case 'suspended':
        return { label: 'Suspendu', variant: 'destructive' as const, icon: Clock };
      default:
        return { label: 'En attente de validation', variant: 'outline' as const, icon: Clock };
    }
  };

  const getProgressPercentage = (transfer: Transfer) => {
    if (transfer.status === 'completed') return 100;
    if (transfer.status === 'in-progress') return 90;
    return Math.min(transfer.currentStep * 30, 70);
  };

  const getStepLabel = (transfer: Transfer) => {
    if (transfer.status === 'completed') return 'Transfert complété';
    if (transfer.status === 'in-progress') return 'Traitement en cours';
    if (transfer.status === 'suspended') return 'Transfert suspendu';
    return `Validation en cours (étape ${transfer.currentStep})`;
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{t.dashboard.pendingTransfers}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {transfers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Send className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Aucun transfert en cours</p>
          </div>
        ) : (
          transfers.map((transfer) => {
            const statusInfo = getStatusInfo(transfer.status);
            const progress = getProgressPercentage(transfer);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div
                key={transfer.id}
                className="border rounded-lg p-6 space-y-4"
                data-testid={`transfer-${transfer.id}`}
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-2xl md:text-3xl font-mono font-bold">
                      {formatCurrency(transfer.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Destinataire: {transfer.recipient}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Dernière mise à jour: {transfer.updatedAt}
                    </p>
                  </div>
                  <Badge variant={statusInfo.variant} className="flex items-center gap-1.5">
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusInfo.label}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{getStepLabel(transfer)}</span>
                    <span className="text-muted-foreground font-mono">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <div className="flex items-center gap-1.5">
                      <Send className="h-3.5 w-3.5" />
                      <span>Initié</span>
                    </div>
                    {transfer.status === 'pending' && (
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5" />
                        <span>Validation</span>
                      </div>
                    )}
                    {(transfer.status === 'in-progress' || transfer.status === 'completed') && (
                      <div className="flex items-center gap-1.5">
                        <Banknote className="h-3.5 w-3.5" />
                        <span>Traitement</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`h-3.5 w-3.5 ${transfer.status === 'completed' ? 'text-primary' : ''}`} />
                      <span>Complété</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
