import { useUser } from '@/hooks/use-user';
import { useDashboard } from '@/hooks/use-dashboard';
import { useTranslations } from '@/lib/i18n';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Bell, 
  ArrowUpRight, 
  Wallet,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Send
} from 'lucide-react';
import { Link } from 'wouter';

function DashboardMobileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 space-y-4">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-48 w-full rounded-3xl" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-40 w-full rounded-3xl" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function DashboardMobile() {
  const { data: user } = useUser();
  const { data: dashboardData, isLoading } = useDashboard();
  const t = useTranslations();

  if (isLoading) {
    return <DashboardMobileSkeleton />;
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <p className="text-destructive">{t.dashboard.dataLoadError}</p>
      </div>
    );
  }

  const firstName = user?.fullName?.split(' ')[0] || 'User';
  const creditUtilization = dashboardData.borrowingCapacity.maxCapacity > 0
    ? ((dashboardData.borrowingCapacity.maxCapacity - dashboardData.borrowingCapacity.currentCapacity) / dashboardData.borrowingCapacity.maxCapacity) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4">
        <div>
          <p className="text-sm text-muted-foreground" data-testid="text-welcome">{t.dashboard.welcome}</p>
          <p className="font-semibold text-lg text-foreground" data-testid="text-username">{firstName}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Total Balance Card with Blue Gradient */}
        <Card 
          className="bg-gradient-to-br from-[#1E88E5] via-[#1976D2] to-[#1565C0] text-white border-0 shadow-lg overflow-hidden relative"
          data-testid="card-balance"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
          
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-4 h-4" />
              <p className="text-sm opacity-90">{t.dashboard.totalBalance}</p>
            </div>
            <h2 className="text-4xl font-bold mb-6" data-testid="text-total-balance">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(dashboardData.balance.currentBalance)}
            </h2>
            <Button 
              variant="secondary" 
              className="w-full bg-white text-[#1565C0] hover:bg-white/90 font-semibold"
              asChild
            >
              <Link href="/transfer/new" data-testid="button-top-up">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                {t.dashboard.newTransfer}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats - Available Credit & Active Loans */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white dark:bg-slate-800" data-testid="card-available-credit">
            <CardContent className="p-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{t.dashboard.availableCredit}</p>
              <p className="text-lg font-bold text-foreground">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(dashboardData.balance.availableCredit)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800" data-testid="card-active-loans">
            <CardContent className="p-4">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{t.dashboard.activeLoans}</p>
              <p className="text-lg font-bold text-foreground">{dashboardData.balance.activeLoansCount}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(dashboardData.balance.totalBorrowed)} {t.dashboard.totalBorrowed.toLowerCase()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Credit Utilization Card */}
        <Card 
          className="bg-gradient-to-br from-[#1E88E5] via-[#1976D2] to-[#1565C0] text-white border-0 shadow-lg"
          data-testid="card-credit-utilization"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium">{t.dashboard.creditUtilization}</p>
                <p className="text-xs opacity-75 mt-1">{t.dashboard.borrowingCapacity}</p>
              </div>
              <div className="relative w-16 h-16">
                {/* Progress Circle */}
                <svg className="w-16 h-16 -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="white"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - creditUtilization / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{creditUtilization.toFixed(0)}%</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="opacity-75">{t.dashboard.used}:</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(dashboardData.borrowingCapacity.maxCapacity - dashboardData.borrowingCapacity.currentCapacity)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="opacity-75">{t.dashboard.available}:</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(dashboardData.borrowingCapacity.currentCapacity)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transfers */}
        {dashboardData.transfers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground" data-testid="text-recent-transfers">
                {t.dashboard.recentActivity}
              </h3>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                  {t.dashboard.viewAll}
                </Button>
              </Link>
            </div>
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-3 space-y-2">
                {dashboardData.transfers.slice(0, 3).map((transfer) => (
                  <div 
                    key={transfer.id}
                    className="flex items-center justify-between p-3 rounded-lg hover-elevate bg-gray-50 dark:bg-slate-900"
                    data-testid={`transfer-item-${transfer.id}`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{transfer.recipient}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transfer.updatedAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="font-semibold text-sm text-foreground">
                        -{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(transfer.amount))}
                      </p>
                      <Badge 
                        variant={
                          transfer.status === 'approved' || transfer.status === 'completed' ? 'default' : 
                          transfer.status === 'pending' || transfer.status === 'in-progress' ? 'secondary' : 
                          'destructive'
                        } 
                        className="text-xs mt-1"
                      >
                        {transfer.status === 'approved' || transfer.status === 'completed' ? t.transfer.approved : 
                         transfer.status === 'pending' ? t.transfer.pending : 
                         transfer.status === 'in-progress' ? t.transfer.inProgress :
                         t.transfer.rejected}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Active Loans */}
        {dashboardData.loans.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground" data-testid="text-active-loans">
                {t.dashboard.yourActiveLoans}
              </h3>
              <Link href="/loans">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                  {t.dashboard.viewAll}
                </Button>
              </Link>
            </div>
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-3 space-y-2">
                {dashboardData.loans.slice(0, 4).map((loan, index) => {
                  const progress = loan.totalRepaid ? Math.min((Number(loan.totalRepaid) / Number(loan.amount)) * 100, 100) : 0;
                  const icons = [
                    { bg: 'bg-blue-100 dark:bg-blue-900/30', icon: <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
                    { bg: 'bg-green-100 dark:bg-green-900/30', icon: <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" /> },
                    { bg: 'bg-red-100 dark:bg-red-900/30', icon: <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" /> },
                    { bg: 'bg-purple-100 dark:bg-purple-900/30', icon: <Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" /> },
                  ];
                  const iconData = icons[index % icons.length];

                  return (
                    <div 
                      key={loan.id} 
                      className="p-3 rounded-lg hover-elevate bg-gray-50 dark:bg-slate-900"
                      data-testid={`loan-item-${loan.id}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-full ${iconData.bg} flex items-center justify-center flex-shrink-0`}>
                            {iconData.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground">{t.dashboard.activeLoan}</p>
                            <p className="text-xs text-muted-foreground">{loan.interestRate}% APR</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="font-semibold text-sm text-foreground">
                            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(loan.amount))}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{t.dashboard.repaid}</span>
                          <span>{progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 dark:bg-blue-400 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="outline" className="w-full" asChild data-testid="button-request-loan">
            <Link href="/loan-request">
              <CreditCard className="w-4 h-4 mr-2" />
              {t.dashboard.requestLoan}
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild data-testid="button-manage-accounts">
            <Link href="/accounts">
              <Wallet className="w-4 h-4 mr-2" />
              {t.dashboard.manageAccounts}
            </Link>
          </Button>
        </div>

        {/* Empty States */}
        {dashboardData.transfers.length === 0 && dashboardData.loans.length === 0 && (
          <Card className="bg-white dark:bg-slate-800">
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">{t.dashboard.noRecentTransactions}</p>
              <Button asChild>
                <Link href="/loan-request">
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t.dashboard.requestLoan}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
