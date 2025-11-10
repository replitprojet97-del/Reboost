import { Link, useLocation } from 'wouter';
import { Home, CreditCard, History, Settings, ArrowLeftRight } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

export default function MobileBottomNav() {
  const [location] = useLocation();
  const t = useTranslations();

  const navItems = [
    {
      label: t.nav.home,
      icon: Home,
      href: '/dashboard',
      testId: 'nav-home',
    },
    {
      label: t.nav.transfers,
      icon: ArrowLeftRight,
      href: '/transfers',
      testId: 'nav-transfers',
    },
    {
      label: t.nav.history,
      icon: History,
      href: '/history',
      testId: 'nav-history',
    },
    {
      label: t.nav.settings,
      icon: Settings,
      href: '/settings',
      testId: 'nav-settings',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location === '/dashboard';
    }
    return location.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-card border-t border-border z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                active
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'fill-primary/10' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
