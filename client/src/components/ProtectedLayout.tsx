import { Switch, Route } from 'wouter';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import DashboardWrapper from '@/pages/DashboardWrapper';
import IndividualLoans from '@/pages/IndividualLoans';
import LoanRequestDashboard from '@/pages/LoanRequestDashboard';
import LoanOfferDetail from '@/pages/LoanOfferDetail';
import TransferFlow from '@/pages/TransferFlow';
import Transfers from '@/pages/Transfers';
import BankAccounts from '@/pages/BankAccounts';
import History from '@/pages/History';
import Settings from '@/pages/Settings';
import Contracts from '@/pages/Contracts';
import TwoFactorSetup from '@/pages/TwoFactorSetup';
import NotFound from '@/pages/not-found';
import AppSidebar from '@/components/AppSidebar';
import TopBar from '@/components/TopBar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import NotificationBanner from '@/components/NotificationBanner';
import UserProfileHeader from '@/components/UserProfileHeader';
import NotificationBell from '@/components/NotificationBell';
import { LoanDialogProvider } from '@/contexts/LoanDialogContext';
import { ScrollingInfoBanner } from '@/components/fintech';
import { ChatWidget } from '@/components/chat';
import { useUser } from '@/hooks/use-user';
import { useDataSocket } from '@/hooks/useDataSocket';

function DataSocketHandler() {
  useDataSocket();
  return null;
}

function ChatWidgetWrapper() {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <ChatWidget
      userId={user.id}
      userName={user.username}
      userAvatar={user.profilePhoto || undefined}
    />
  );
}

export default function ProtectedLayout() {
  const { data: user } = useUser();
  
  const style = {
    '--sidebar-width': '16rem',
  };

  return (
    <>
      {user && <DataSocketHandler />}
      <LoanDialogProvider>
        <TopBar />
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              {/* Fintech Premium Header */}
              <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                  <SidebarTrigger data-testid="button-sidebar-toggle" className="hover:bg-muted rounded-xl transition-colors" />
                  <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <NotificationBell />
                    <UserProfileHeader />
                  </div>
                </div>
                {/* Scrolling Info Banner */}
                <div className="px-6 pb-4">
                  <ScrollingInfoBanner />
                </div>
              </header>
              
              {/* Legacy Notification Banner (if needed) */}
              <div className="hidden">
                <NotificationBanner />
              </div>
              
              <main className="flex-1 overflow-auto bg-background pt-[40px]">
                <Switch>
                  <Route path="/dashboard" component={DashboardWrapper} />
                  <Route path="/loans" component={IndividualLoans} />
                  <Route path="/loans/new" component={LoanRequestDashboard} />
                  <Route path="/loan-request" component={LoanRequestDashboard} />
                  <Route path="/loan-offers/:offerId" component={LoanOfferDetail} />
                  <Route path="/contracts" component={Contracts} />
                  <Route path="/transfer/new" component={TransferFlow} />
                  <Route path="/transfer/:id" component={TransferFlow} />
                  <Route path="/transfers" component={Transfers} />
                  <Route path="/accounts" component={BankAccounts} />
                  <Route path="/history" component={History} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/security/2fa" component={TwoFactorSetup} />
                  <Route component={NotFound} />
                </Switch>
              </main>
              <ChatWidgetWrapper />
            </div>
          </div>
        </SidebarProvider>
      </LoanDialogProvider>
    </>
  );
}
