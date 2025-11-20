import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, ArrowUpRight, Search, Send, Clock, CheckCircle2, XCircle, Pause, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useTranslations } from '@/lib/i18n';
import { DashboardCard, SectionTitle, GradientButton, UserStat } from '@/components/fintech';
import { Badge } from '@/components/ui/badge';

interface Transfer {
  id: string;
  referenceNumber: string;
  amount: string;
  recipient: string;
  status: string;
  currentStep: number;
  progressPercent: number;
  createdAt: string;
  updatedAt: string;
}

function TransfersSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-2xl" />
      ))}
    </div>
  );
}

export default function Transfers() {
  const t = useTranslations();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: transfers, isLoading } = useQuery<Transfer[]>({
    queryKey: ['/api/transfers'],
  });

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(amount));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-accent" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-muted-foreground" />;
      case 'in-progress':
        return <Send className="w-5 h-5 text-primary" />;
      case 'suspended':
        return <Pause className="w-5 h-5 text-destructive" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Send className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: t.transfer.pending, variant: 'secondary' },
      'in-progress': { label: t.transfer.inProgress, variant: 'default' },
      completed: { label: t.transfer.completed, variant: 'outline' },
      suspended: { label: t.transfer.suspended, variant: 'destructive' },
      rejected: { label: 'Rejeté', variant: 'destructive' },
    };

    const config = statusMap[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>;
  };

  const filteredTransfers = transfers?.filter((transfer) => {
    const matchesSearch = transfer.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          transfer.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = transfers?.reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0;
  const pendingCount = transfers?.filter(t => t.status === 'pending').length || 0;
  const inProgressCount = transfers?.filter(t => t.status === 'in-progress').length || 0;
  const completedCount = transfers?.filter(t => t.status === 'completed').length || 0;

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <TransfersSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <SectionTitle
            title={t.transfer.pageTitle}
            subtitle={t.transfer.pageDescription}
          />
          <GradientButton
            variant="primary"
            icon={Plus}
            onClick={() => setLocation('/transfer/new')}
            data-testid="button-new-transfer"
          >
            {t.transfer.newTransfer}
          </GradientButton>
        </div>

        {/* Stats Overview */}
        {transfers && transfers.length > 0 && (
          <DashboardCard className="bg-gradient-to-br from-primary/5 via-background to-background border-primary/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              <UserStat
                label="Total des transferts"
                value={transfers.length}
                icon={TrendingUp}
                testId="stat-total-transfers"
              />
              <div className="space-y-2" data-testid="stat-pending-transfers">
                <p className="text-sm font-medium text-muted-foreground">En attente</p>
                <p className="text-3xl font-bold text-foreground tracking-tight">{pendingCount}</p>
              </div>
              <div className="space-y-2" data-testid="stat-in-progress-transfers">
                <p className="text-sm font-medium text-muted-foreground">En cours</p>
                <p className="text-3xl font-bold text-primary tracking-tight">{inProgressCount}</p>
              </div>
              <div className="space-y-2" data-testid="stat-completed-transfers">
                <p className="text-sm font-medium text-muted-foreground">Terminés</p>
                <p className="text-3xl font-bold text-accent tracking-tight">{completedCount}</p>
              </div>
            </div>
          </DashboardCard>
        )}

        {/* Filters */}
        <DashboardCard>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder={t.transfer.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-border/50 focus:border-primary transition-colors"
                data-testid="input-search-transfers"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px] border-border/50" data-testid="select-status-filter">
                <SelectValue placeholder={t.loan.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.transfer.allStatuses}</SelectItem>
                <SelectItem value="pending">{t.transfer.pending}</SelectItem>
                <SelectItem value="in-progress">{t.transfer.inProgress}</SelectItem>
                <SelectItem value="completed">{t.transfer.completed}</SelectItem>
                <SelectItem value="suspended">{t.transfer.suspended}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DashboardCard>

        {/* Transfers List */}
        {!filteredTransfers || filteredTransfers.length === 0 ? (
          <DashboardCard className="bg-muted/20">
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm">
                <Send className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{t.transfer.noTransfersFound}</h3>
              <p className="text-muted-foreground text-sm mb-8 max-w-sm">
                {searchQuery || statusFilter !== 'all'
                  ? t.transfer.noTransfersMessage
                  : t.transfer.noTransfersMessage}
              </p>
              <GradientButton
                variant="primary"
                icon={Plus}
                onClick={() => setLocation('/transfer/new')}
                data-testid="button-create-first-transfer"
              >
                {t.transfer.createTransfer}
              </GradientButton>
            </div>
          </DashboardCard>
        ) : (
          <div className="space-y-4" data-testid="container-transfer-list">
            {filteredTransfers.map((transfer) => (
              <div
                key={transfer.id}
                onClick={() => setLocation(`/transfer/${transfer.id}`)}
                className="cursor-pointer"
              >
                <DashboardCard
                  className="hover-elevate active-elevate-2 transition-all duration-200 group"
                  testId={`card-transfer-${transfer.id}`}
                >
                  <div className="flex items-center gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      {getStatusIcon(transfer.status)}
                    </div>
                  </div>

                  {/* Transfer Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-lg text-foreground truncate">{transfer.recipient}</h3>
                      {getStatusBadge(transfer.status)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="font-mono font-semibold">{transfer.referenceNumber}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">
                        {formatDistanceToNow(new Date(transfer.createdAt), { addSuffix: true, locale: fr })}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    {(transfer.status === 'in-progress' || transfer.status === 'completed') && (
                      <div className="pt-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span className="font-medium">
                            {transfer.status === 'completed' ? 'Terminé' : 'Progression'}
                          </span>
                          <span className={`font-semibold ${transfer.status === 'completed' ? 'text-accent' : 'text-primary'}`}>
                            {transfer.status === 'completed' ? '100' : transfer.progressPercent}%
                          </span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 shadow-sm ${
                              transfer.status === 'completed'
                                ? 'bg-gradient-to-r from-accent via-accent to-green-600'
                                : 'bg-gradient-to-r from-primary via-primary to-blue-600'
                            }`}
                            style={{ 
                              width: transfer.status === 'completed' ? '100%' : `${transfer.progressPercent}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amount & Arrow */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground font-mono tracking-tight">
                        {formatCurrency(transfer.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">
                        Étape {transfer.currentStep}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  </div>
                </DashboardCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
