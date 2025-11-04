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
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, CreditCard, ArrowRightLeft, History, Settings, LogOut, ShieldCheck, Users, FileText, BarChart, Building2 } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import { useLocation } from 'wouter';

export default function AppSidebar() {
  const t = useTranslations();
  const [location, setLocation] = useLocation();

  const isAdminPath = location.startsWith('/admin');

  const menuItems = [
    { title: t.nav.dashboard, url: '/dashboard', icon: Home },
    { title: t.nav.loans, url: '/loans', icon: CreditCard },
    { title: t.nav.transfers, url: '/transfers', icon: ArrowRightLeft },
    { title: 'Comptes bancaires', url: '/accounts', icon: Building2 },
    { title: t.nav.history, url: '/history', icon: History },
    { title: t.nav.settings, url: '/settings', icon: Settings },
  ];

  const adminMenuItems = [
    { title: 'Tableau de Bord', url: '/admin', icon: ShieldCheck },
    { title: 'Utilisateurs', url: '/admin/users', icon: Users },
    { title: 'Transferts', url: '/admin/transfers', icon: ArrowRightLeft },
    { title: 'Paramètres', url: '/admin/settings', icon: Settings },
    { title: 'Rapports', url: '/admin/reports', icon: BarChart },
  ];

  const currentMenuItems = isAdminPath ? adminMenuItems : menuItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-6">
            {isAdminPath ? 'Admin Console' : 'ProLoan'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    onClick={() => setLocation(item.url)}
                  >
                    <a href={item.url} data-testid={`link-${item.url.slice(1)}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-4 py-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Jean Dupont</p>
                <p className="text-xs text-muted-foreground truncate">Entreprise</p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => console.log('Logout clicked')}
              data-testid="button-logout"
            >
              <LogOut />
              <span>{t.nav.logout}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
