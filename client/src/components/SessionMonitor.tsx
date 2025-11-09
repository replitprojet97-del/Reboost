import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';

const SESSION_CHECK_INTERVAL = 60000;
const INACTIVITY_TIMEOUT = 30 * 60 * 1000;

export default function SessionMonitor() {
  const [location] = useLocation();
  const lastActivityRef = useRef<number>(Date.now());
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isAuthPage = location === '/login' || location === '/signup' || location === '/auth' ||
                     location.startsWith('/verify') || location.startsWith('/forgot-password') ||
                     location.startsWith('/reset-password');

  const publicPages = ['/', '/about', '/how-it-works', '/products', '/contact', '/resources', '/terms', '/privacy'];
  const isPublicPage = publicPages.includes(location) || location.startsWith('/loans/') || location === '/loan-request';

  const { data: user } = useQuery<any>({
    queryKey: ['/api/user'],
    enabled: !isAuthPage && !isPublicPage,
    refetchInterval: SESSION_CHECK_INTERVAL,
    retry: false,
  });

  useEffect(() => {
    if (isAuthPage || isPublicPage) return;

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    const checkInactivity = () => {
      const inactiveTime = Date.now() - lastActivityRef.current;
      
      if (inactiveTime >= INACTIVITY_TIMEOUT) {
        window.location.href = '/login';
        sessionStorage.setItem('auth_redirect_message', 'Vous avez été déconnecté pour inactivité.');
      }
    };

    inactivityTimerRef.current = setInterval(checkInactivity, 60000);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [isAuthPage]);

  return null;
}
