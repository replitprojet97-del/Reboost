import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  CreditCard, 
  ArrowRightLeft, 
  History, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  FileText, 
  Building2, 
  LayoutDashboard,
  PieChart,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import { useLocation } from 'wouter';
import { useUser, getUserInitials, getAccountTypeLabel, useUserProfilePhotoUrl } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { useDataSocketUpdates } from '@/hooks/use-data-socket-updates';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const t = useTranslations();
  const [location, setLocation] = useLocation();
  const { setOpenMobile } = useSidebar();
  const { data: user, isLoading: isUserLoading } = useUser();
  const profilePhotoUrl = useUserProfilePhotoUrl();

  const isAdminPath = location.startsWith('/admin');
  const isAdmin = user?.role === 'admin';

  useDataSocketUpdates();

  useEffect(() => {
    setOpenMobile(false);
  }, [location, setOpenMobile]);

  const handleLogout = useCallback(() => {
    setOpenMobile(false);
    setLocation('/');
  }, [setLocation, setOpenMobile]);

  const handleNavigate = useCallback((url: string) => {
    setOpenMobile(false);
    setLocation(url);
  }, [setLocation, setOpenMobile]);

  const { data: loans } = useQuery<any[]>({
    queryKey: ['/api/loans'],
    enabled: !isAdminPath,
  });

  const { data: transfers } = useQuery<any[]>({
    queryKey: ['/api/transfers'],
    enabled: !isAdminPath,
  });

  const excludedStatuses = ['active', 'rejected', 'cancelled', 'completed', 'closed', 'repaid', 'defaulted', 'written_off'];
  const pendingLoansCount = loans?.filter(l => l.status && !excludedStatuses.includes(l.status)).length || 0;
  const inProgressTransfersCount = transfers?.filter(t => t.status === 'in-progress' || t.status === 'in_progress').length || 0;

  const mainSection = [
    { title: t.nav.dashboard, url: '/dashboard', icon: LayoutDashboard },
  ];

  const loansSection = [
    { 
      title: 'Vue d\'ensemble', 
      url: '/loans', 
      icon: PieChart,
      badge: pendingLoansCount > 0 ? pendingLoansCount : undefined,
    },
    { title: 'Historique', url: '/history', icon: Clock },
    { title: 'Statut des remboursements', url: '/loans/repayments', icon: CreditCard },
  ];

  const docsSection = [
    { title: t.nav.contracts || 'Contrats', url: '/contracts', icon: FileText },
  ];

  const operationsSection = [
    { 
      title: t.nav.transfers, 
      url: '/transfers', 
      icon: ArrowRightLeft,
      badge: inProgressTransfersCount > 0 ? inProgressTransfersCount : undefined,
    },
    { title: t.bankAccounts.title, url: '/accounts', icon: Building2 },
  ];

  const settingsSection = [
    { title: t.nav.settings, url: '/settings', icon: Settings },
  ];

  const renderMenuItem = (item: any) => {
    const isActive = location === item.url;
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          isActive={isActive}
          onClick={() => handleNavigate(item.url)}
          className={cn(
            "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
            isActive 
              ? "bg-primary/10 text-primary font-semibold shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)]" 
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          <item.icon className={cn("w-5 h-5 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
          <span className="flex-1 text-sm">{item.title}</span>
          {item.badge && (
            <Badge variant="default" className="bg-primary text-primary-foreground h-5 px-1.5 text-[10px] min-w-[20px] flex items-center justify-center rounded-full font-bold">
              {item.badge}
            </Badge>
          )}
          {isActive && (
            <ChevronRight className="w-4 h-4 text-primary animate-in fade-in slide-in-from-left-2 duration-300" />
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-r border-border bg-background/95 backdrop-blur-xl">
      <SidebarContent className="px-4 py-6 custom-scrollbar">
        {/* Header Section */}
        <div className="mb-8 px-2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <img src="/logo.png" alt="Solventis" className="h-6 w-auto" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">Solventis</span>
          </div>

          {/* User Profile Card */}
          {!isUserLoading && user && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 shadow-sm">
              <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                {profilePhotoUrl ? <AvatarImage src={profilePhotoUrl} /> : null}
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                  {getUserInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-foreground leading-tight">
                  {user.fullName}
                </p>
                <Badge variant="secondary" className="mt-1 h-4 px-1.5 text-[9px] uppercase tracking-wider bg-primary/10 text-primary border-none font-bold">
                  {getAccountTypeLabel(user.accountType)}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="space-y-6">
          <SidebarGroup className="p-0">
            <SidebarMenu>
              {mainSection.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-2">
              Prêts & Crédits
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
              {loansSection.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-2">
              Opérations
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
              {operationsSection.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-2">
              Documents
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
              {docsSection.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-border bg-muted/20">
        <SidebarMenu>
          {settingsSection.map(renderMenuItem)}
          <SidebarMenuItem className="mt-2">
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-semibold">Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
