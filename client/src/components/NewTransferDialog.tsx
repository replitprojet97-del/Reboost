import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NewTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Loan {
  id: string;
  loanType: string;
  amount: string;
  status: string;
  fundsAvailabilityStatus: string;
}

export default function NewTransferDialog({ open, onOpenChange }: NewTransferDialogProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: '',
    recipient: '',
    loanId: '',
    externalAccountId: '',
  });

  const { data: availableLoans, isLoading: isLoadingLoans } = useQuery<Loan[]>({
    queryKey: ['/api/loans/available-for-transfer'],
    enabled: open,
  });

  const createTransferMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/transfers/initiate', data);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['/api/transfers'] });
      queryClient.invalidateQueries({ queryKey: ['/api/loans'] });
      
      toast({
        title: t.dialogs.transfer.transferSuccess || 'Transfert initié avec succès',
        description: data.message || t.dialogs.transfer.transferSuccessDesc || 'Le transfert a été initié. Les codes de validation vous seront envoyés.',
      });
      
      onOpenChange(false);
      setFormData({ amount: '', recipient: '', loanId: '', externalAccountId: '' });
    },
    onError: (error: Error) => {
      toast({
        title: t.dialogs.transfer.transferError || 'Erreur',
        description: error.message || t.dialogs.transfer.transferErrorDesc || 'Impossible d\'initier le transfert, veuillez réessayer',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.loanId) {
      toast({
        title: 'Prêt requis',
        description: 'Veuillez sélectionner un prêt pour initier le transfert',
        variant: 'destructive',
      });
      return;
    }

    createTransferMutation.mutate(formData);
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(amount));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.dashboard?.transferFunds || 'Initier un transfert'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {isLoadingLoans ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !availableLoans || availableLoans.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Aucun prêt avec des fonds disponibles. Vous devez avoir un prêt actif avec des fonds débloqués pour effectuer un transfert.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="loanId">Prêt source *</Label>
                <Select
                  value={formData.loanId}
                  onValueChange={(value) => setFormData({ ...formData, loanId: value })}
                >
                  <SelectTrigger id="loanId" data-testid="select-loan">
                    <SelectValue placeholder="Sélectionner un prêt" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLoans.map((loan) => (
                      <SelectItem key={loan.id} value={loan.id}>
                        {loan.loanType} - {formatCurrency(loan.amount)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">{t.dialogs?.transfer?.recipient || 'Bénéficiaire'} *</Label>
                <Input
                  id="recipient"
                  type="text"
                  placeholder={t.dialogs?.transfer?.recipientPlaceholder || 'Nom du bénéficiaire'}
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  required
                  data-testid="input-recipient"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">{t.dialogs?.transfer?.amount || 'Montant'} (EUR) *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={t.dialogs?.transfer?.amountPlaceholder || '1000.00'}
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  data-testid="input-amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="externalAccountId">Compte externe (optionnel)</Label>
                <Input
                  id="externalAccountId"
                  type="text"
                  placeholder="IBAN ou numéro de compte"
                  value={formData.externalAccountId}
                  onChange={(e) => setFormData({ ...formData, externalAccountId: e.target.value })}
                  data-testid="input-external-account"
                />
              </div>

              <div className="bg-muted p-4 rounded-md text-sm">
                <p className="text-muted-foreground">
                  {t.dialogs?.transfer?.feesDescription || 'Des frais de transfert peuvent s\'appliquer. Vous recevrez des codes de validation par email pour confirmer ce transfert.'}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  disabled={createTransferMutation.isPending}
                  data-testid="button-cancel"
                >
                  {t.dialogs?.transfer?.cancel || 'Annuler'}
                </Button>
                <Button 
                  type="submit" 
                  disabled={createTransferMutation.isPending || !formData.loanId}
                  data-testid="button-submit-transfer"
                >
                  {createTransferMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.dialogs?.transfer?.creating || 'Initiation...'}
                    </>
                  ) : (
                    t.dialogs?.transfer?.createTransfer || 'Initier le transfert'
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
