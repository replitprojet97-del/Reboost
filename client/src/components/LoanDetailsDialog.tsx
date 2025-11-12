import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, DollarSign, Download, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient, getApiUrl } from '@/lib/queryClient';
import { useTranslations } from '@/lib/i18n';

interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  nextPaymentDate: string | null;
  totalRepaid: number;
  status: string;
  contractUrl?: string | null;
  signedContractUrl?: string | null;
}

interface LoanDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loan: Loan | null;
}

export default function LoanDetailsDialog({ open, onOpenChange, loan }: LoanDetailsDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations();

  if (!loan) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const progress = (loan.totalRepaid / loan.amount) * 100;
  const remainingAmount = loan.amount - loan.totalRepaid;

  const handleContractDownload = async () => {
    try {
      window.open(`/api/loans/${loan.id}/contract`, '_blank');
      toast({
        title: t.loan.downloadContract,
        description: t.loan.downloading,
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: t.messages.errorUpdatingProfile,
        variant: 'destructive',
      });
    }
  };

  const handleSignedContractUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: t.common.error,
        description: t.messages.invalidFileType,
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: t.common.error,
        description: t.messages.fileTooLarge,
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('signedContract', file);

      const csrfToken = await fetch(getApiUrl('/api/csrf-token')).then((res) => res.json()).then((data) => data.csrfToken);

      const response = await fetch(getApiUrl(`/api/loans/${loan.id}/upload-signed-contract`), {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || t.messages.errorUploadingAvatar);
      }

      await queryClient.invalidateQueries({ queryKey: ['/api/loans'] });
      await queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });

      toast({
        title: t.common.success,
        description: t.loan.uploading,
      });

      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: t.common.error,
        description: error.message || t.messages.errorUpdatingProfile,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending_review': t.common.pending,
      'approved': t.transfer.approved,
      'active': t.common.active,
      'rejected': t.transfer.rejected,
    };
    return statusMap[status] || status;
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    if (status === 'active') return 'default';
    if (status === 'approved') return 'secondary';
    if (status === 'rejected') return 'destructive';
    return 'outline';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[500px] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">{t.dashboard.viewDetails}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 sm:space-y-6 mt-2 sm:mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold">{t.loan.status}</h3>
            <Badge variant={getStatusVariant(loan.status)}>{getStatusText(loan.status)}</Badge>
          </div>

          {loan.status === 'approved' && loan.contractUrl && !loan.signedContractUrl && (
            <div className="border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1 text-base">
                    {t.loan.loanApproved}
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                    {t.loan.approvalInstructions}
                  </p>
                  <ol className="text-sm text-yellow-700 dark:text-yellow-300 mb-4 space-y-1 list-decimal list-inside">
                    <li>{t.loan.approvalStep1}</li>
                    <li>{t.loan.approvalStep2}</li>
                    <li>{t.loan.approvalStep3}</li>
                  </ol>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={handleContractDownload}
                      size="sm"
                      className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-xs sm:text-sm"
                      data-testid="button-download-contract"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      {t.loan.downloadContractButton}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="relative border-yellow-300 dark:border-yellow-700 text-xs sm:text-sm"
                      disabled={isUploading}
                      data-testid="button-upload-signed-contract"
                    >
                      <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      {isUploading ? t.loan.uploading2 : t.loan.uploadContractButton}
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf"
                        onChange={handleSignedContractUpload}
                        disabled={isUploading}
                        data-testid="input-signed-contract"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(loan as any).contractStatus === 'awaiting_admin_review' && loan.signedContractUrl && (
            <div className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    {t.common.success}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Votre contrat signé a été reçu et est en cours de vérification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {loan.contractUrl && loan.status !== 'approved' && (loan as any).contractStatus !== 'awaiting_admin_review' && (
            <div className="flex justify-center">
              <Button
                onClick={handleContractDownload}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                data-testid="button-view-contract"
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {t.dashboard.viewDetails}
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="border rounded-lg p-2 sm:p-4 space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{t.loan.amount}</span>
              </div>
              <p className="text-lg sm:text-2xl font-mono font-bold">{formatCurrency(loan.amount)}</p>
            </div>

            <div className="border rounded-lg p-2 sm:p-4 space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{t.loan.interestRate}</span>
              </div>
              <p className="text-lg sm:text-2xl font-bold">{loan.interestRate}%</p>
            </div>

            <div className="border rounded-lg p-2 sm:p-4 space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{t.loan.nextPayment}</span>
              </div>
              <p className="text-sm sm:text-lg font-semibold">{loan.nextPaymentDate || 'N/A'}</p>
            </div>

            <div className="border rounded-lg p-2 sm:p-4 space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{t.loan.amount}</span>
              </div>
              <p className="text-lg sm:text-2xl font-mono font-bold">{formatCurrency(remainingAmount)}</p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">{t.dashboard.availableOffers}</span>
              <span className="font-semibold">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-2 sm:h-3" />
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{formatCurrency(loan.totalRepaid)}</span>
              <span>{formatCurrency(remainingAmount)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
