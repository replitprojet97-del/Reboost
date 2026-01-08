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
    // We only want to close it if it was actually open to avoid unnecessary state updates
    setOpenMobile(false);
  }, [location]);

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
    { title: 'Tableau de bord', url: '/dashboard', icon: LayoutDashboard },
  ];

  const loansSection = [
    { title: 'Mes prêts', url: '/loans', icon: PieChart },
    { title: 'Contrats', url: '/contracts', icon: FileText },
  ];

  const operationsSection = [
    { title: 'Transferts', url: '/transfers', icon: ArrowRightLeft },
    { title: 'Comptes bancaires', url: '/accounts', icon: Building2 },
    { title: 'Historique', url: '/history', icon: Clock },
    { title: 'Paramètres', url: '/settings', icon: Settings },
  ];

  const renderMenuItem = (item: any) => {
    const isActive = location === item.url;
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          isActive={isActive}
          onClick={() => handleNavigate(item.url)}
          className={cn(
            "group relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200",
            isActive 
              ? "bg-primary/5 text-primary font-medium" 
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
          <span className="flex-1 text-sm">{item.title}</span>
          {item.badge && (
            <Badge variant="default" className="bg-primary text-primary-foreground h-4 px-1 text-[10px] min-w-[18px] flex items-center justify-center rounded-full">
              {item.badge}
            </Badge>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-r border-border bg-white">
      <SidebarContent className="px-2 py-4 custom-scrollbar">
        {/* Header Section */}
        <div className="mb-6 px-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Solventis" className="h-7 w-auto" />
            <span className="text-xl font-bold tracking-tight text-foreground">Solventis</span>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-6">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
              PRÊTS
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
              {loansSection.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
              TABLEAU DE BORD
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
              {mainSection.map(renderMenuItem)}
              {operationsSection.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-border bg-muted/5">
        <SidebarMenu>
          {/* User Profile Card */}
          {!isUserLoading && user && (
            <SidebarMenuItem>
              <div className="flex items-center gap-3 p-2 rounded-xl bg-primary/5 border border-primary/10 mb-2">
                <Avatar className="h-9 w-9 border-2 border-background">
                  {profilePhotoUrl ? <AvatarImage src={profilePhotoUrl} /> : null}
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                    {getUserInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate text-foreground leading-tight">
                    {user.fullName}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    {getAccountTypeLabel(user.accountType)}
                  </p>
                </div>
              </div>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
