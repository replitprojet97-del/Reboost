import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, Landmark, ArrowRightLeft, FileText, BarChart2, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebarAdmin() {
  const [location] = useLocation();

  const menuItems = [
    { label: "Dashboard", link: "/admin", icon: LayoutDashboard },
    { label: "Utilisateurs", link: "/admin/users", icon: Users },
    { label: "Prêts", link: "/admin/loans", icon: Landmark },
    { label: "Transferts", link: "/admin/transfers", icon: ArrowRightLeft },
    { label: "Documents", link: "/admin/documents", icon: FileText },
    { label: "Rapports", link: "/admin/reports", icon: BarChart2 },
    { label: "Paramètres", link: "/admin/settings", icon: Settings },
  ];

  return (
    <Sidebar className="border-r border-gray-200 bg-[#F8F9FF]">
      <SidebarContent>
        <div className="p-6 font-bold text-xl tracking-tight text-indigo-600" data-testid="text-admin-logo">
          ALTUS ADMIN
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.link || (item.link !== "/admin" && location.startsWith(item.link));
                return (
                  <SidebarMenuItem key={item.link}>
                    <SidebarMenuButton asChild data-testid={`link-admin-${item.label.toLowerCase()}`}>
                      <Link href={item.link}>
                        <a
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all w-full ${
                            isActive
                              ? "bg-indigo-100 text-indigo-700 font-semibold"
                              : "hover:bg-indigo-50 text-gray-700"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </a>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
