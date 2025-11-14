import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Building2, Trash2, Star, CreditCard, ShieldCheck } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Skeleton } from '@/components/ui/skeleton';
import type { ExternalAccount } from '@shared/schema';
import { useTranslations } from '@/lib/i18n';
import { DashboardCard, SectionTitle, GradientButton } from '@/components/fintech';

function BankAccountsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-64 rounded-2xl" />
      ))}
    </div>
  );
}

export default function BankAccounts() {
  const t = useTranslations();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    iban: '',
    bic: '',
    accountLabel: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: accounts, isLoading } = useQuery<ExternalAccount[]>({
    queryKey: ['/api/external-accounts'],
  });

  const createAccountMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/external-accounts', data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/external-accounts'] });
      toast({
        title: t.bankAccounts.addSuccess,
        description: t.bankAccounts.addSuccessDesc,
      });
      setDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: t.common.error,
        description: t.bankAccounts.addError,
        variant: 'destructive',
      });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/external-accounts/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/external-accounts'] });
      toast({
        title: t.bankAccounts.deleteSuccess,
        description: t.bankAccounts.deleteSuccessDesc,
      });
    },
    onError: () => {
      toast({
        title: t.common.error,
        description: t.bankAccounts.deleteError,
        variant: 'destructive',
      });
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = t.bankAccounts.bankNameRequired;
    }

    if (!formData.iban.trim()) {
      newErrors.iban = t.bankAccounts.ibanRequired;
    } else if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(formData.iban.replace(/\s/g, ''))) {
      newErrors.iban = t.bankAccounts.invalidIban;
    }

    if (formData.bic && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(formData.bic.replace(/\s/g, ''))) {
      newErrors.bic = t.bankAccounts.invalidBic;
    }

    if (!formData.accountLabel.trim()) {
      newErrors.accountLabel = t.bankAccounts.accountLabelRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createAccountMutation.mutate({
        ...formData,
        iban: formData.iban.replace(/\s/g, '').toUpperCase(),
        bic: formData.bic.replace(/\s/g, '').toUpperCase(),
      });
    }
  };

  const resetForm = () => {
    setFormData({ bankName: '', iban: '', bic: '', accountLabel: '' });
    setErrors({});
  };

  const formatIBAN = (iban: string) => {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 animate-fade-in">
        <Skeleton className="h-10 w-48" />
        <BankAccountsSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <SectionTitle
              title={t.bankAccounts.title}
              subtitle={t.bankAccounts.description}
            />
            <GradientButton
              variant="primary"
              icon={Plus}
              onClick={() => setDialogOpen(true)}
              data-testid="button-add-account"
            >
              {t.bankAccounts.addAccount}
            </GradientButton>
          </div>

          {accounts && accounts.length === 0 ? (
            <DashboardCard className="bg-muted/20">
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{t.bankAccounts.noAccountsTitle}</h3>
                <p className="text-muted-foreground text-sm mb-8 max-w-md">
                  {t.bankAccounts.noAccountsDescription}
                </p>
                <GradientButton
                  variant="primary"
                  icon={Plus}
                  onClick={() => setDialogOpen(true)}
                  data-testid="button-add-first-account"
                >
                  {t.bankAccounts.addFirstAccount}
                </GradientButton>
              </div>
            </DashboardCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="list-bank-accounts">
              {accounts?.map((account) => (
                <DashboardCard 
                  key={account.id}
                  className={`relative overflow-hidden transition-all duration-200 ${
                    account.isDefault 
                      ? 'border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background' 
                      : 'hover-elevate'
                  }`}
                  testId={`card-account-${account.id}`}
                >
                  {account.isDefault && (
                    <div className="absolute top-0 right-0">
                      <Badge className="rounded-tl-none rounded-br-none rounded-tr-2xl gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary via-primary to-blue-600 shadow-lg">
                        <Star className="w-3 h-3 fill-current" />
                        Par défaut
                      </Badge>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {/* Bank Icon & Name */}
                    <div className="flex items-start gap-4 pt-2">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center shadow-sm">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-foreground mb-1 truncate">{account.bankName}</h3>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground truncate">{account.accountLabel}</p>
                        </div>
                      </div>
                    </div>

                    {/* IBAN */}
                    <div className="space-y-2 p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">IBAN</p>
                      </div>
                      <p className="font-mono text-sm text-foreground font-medium leading-relaxed">
                        {formatIBAN(account.iban)}
                      </p>
                    </div>

                    {/* BIC */}
                    {account.bic && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">BIC/SWIFT</p>
                        <p className="font-mono text-base text-foreground font-semibold">{account.bic}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-4 border-t border-border/50 flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteAccountMutation.mutate(account.id)}
                        disabled={deleteAccountMutation.isPending}
                        data-testid={`button-delete-account-${account.id}`}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteAccountMutation.isPending ? 'Suppression...' : 'Supprimer'}
                      </Button>
                    </div>
                  </div>
                </DashboardCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Account Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t.bankAccounts.addAccountTitle}</DialogTitle>
            <DialogDescription className="text-base">
              {t.bankAccounts.addAccountDescription}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            <div className="space-y-2">
              <Label htmlFor="accountLabel" className="text-sm font-semibold">
                {t.bankAccounts.accountLabel}
              </Label>
              <Input
                id="accountLabel"
                value={formData.accountLabel}
                onChange={(e) => setFormData({ ...formData, accountLabel: e.target.value })}
                placeholder={t.bankAccounts.accountLabelPlaceholder}
                className="border-border/50 focus:border-primary"
                data-testid="input-account-label"
              />
              {errors.accountLabel && (
                <p className="text-sm text-destructive font-medium">{errors.accountLabel}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName" className="text-sm font-semibold">
                {t.bankAccounts.bankName}
              </Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                placeholder={t.bankAccounts.bankNamePlaceholder}
                className="border-border/50 focus:border-primary"
                data-testid="input-bank-name"
              />
              {errors.bankName && (
                <p className="text-sm text-destructive font-medium">{errors.bankName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="iban" className="text-sm font-semibold">
                {t.bankAccounts.iban}
              </Label>
              <Input
                id="iban"
                value={formData.iban}
                onChange={(e) => setFormData({ ...formData, iban: e.target.value.toUpperCase() })}
                placeholder="FR76 1234 5678 9012 3456 7890 123"
                className="font-mono border-border/50 focus:border-primary"
                data-testid="input-iban"
              />
              {errors.iban && (
                <p className="text-sm text-destructive font-medium">{errors.iban}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bic" className="text-sm font-semibold">
                {t.bankAccounts.bic} <span className="text-muted-foreground font-normal">(Optionnel)</span>
              </Label>
              <Input
                id="bic"
                value={formData.bic}
                onChange={(e) => setFormData({ ...formData, bic: e.target.value.toUpperCase() })}
                placeholder="BNPAFRPP"
                className="font-mono border-border/50 focus:border-primary"
                data-testid="input-bic"
              />
              {errors.bic && (
                <p className="text-sm text-destructive font-medium">{errors.bic}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
                data-testid="button-cancel-add-account"
              >
                {t.common.cancel}
              </Button>
              <GradientButton
                variant="primary"
                type="submit"
                isLoading={createAccountMutation.isPending}
                data-testid="button-submit-add-account"
              >
                {createAccountMutation.isPending ? t.common.saving : t.common.save}
              </GradientButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
