import { useUser } from '@/hooks/use-user';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function SuspendedUser() {
  const { data: user } = useUser();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user && user.status !== 'suspended') {
      setLocation('/dashboard');
    }
  }, [user, setLocation]);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setLocation('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
      setLocation('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
              <AlertTriangle className="w-8 h-8 text-destructive" data-testid="icon-suspended" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-foreground mb-2" data-testid="text-suspended-title">
            Account Suspended
          </h1>

          <p className="text-center text-muted-foreground mb-6" data-testid="text-suspended-message">
            Your account has been suspended and is currently unavailable.
          </p>

          {user?.suspensionReason && (
            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Reason:</p>
              <p className="text-sm text-muted-foreground" data-testid="text-suspension-reason">
                {user.suspensionReason}
              </p>
            </div>
          )}

          {user?.suspendedUntil && (
            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Suspension until:</p>
              <p className="text-sm text-muted-foreground" data-testid="text-suspension-date">
                {new Date(user.suspendedUntil).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground text-center mb-8">
            If you believe this is a mistake or have questions, please contact our support team.
          </p>

          <Button
            onClick={handleLogout}
            className="w-full gap-2"
            variant="default"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
