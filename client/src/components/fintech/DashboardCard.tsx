import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  testId?: string;
}

export function DashboardCard({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  children,
  className = '',
  headerAction,
  testId,
}: DashboardCardProps) {
  return (
    <Card 
      className={`overflow-visible bg-card border-border/60 shadow-sm transition-all duration-300 hover:shadow-md hover:border-border ${className}`}
      style={{ borderRadius: 'var(--dashboard-radius)' }}
      data-testid={testId}
    >
      {(title || Icon) && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {Icon && (
                <div className={`flex items-center justify-center rounded-xl p-2.5 bg-muted ${iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <CardTitle className="text-base font-semibold text-foreground tracking-tight">
                    {title}
                  </CardTitle>
                )}
                {subtitle && (
                  <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>
            {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={title || Icon ? 'pt-0' : 'pt-6'}>
        {children}
      </CardContent>
    </Card>
  );
}
