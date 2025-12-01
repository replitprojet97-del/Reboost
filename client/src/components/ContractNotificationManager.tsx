import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useNotifications } from './NotificationBanner';
import { useTranslations } from '@/lib/i18n';
import { getApiUrl } from '@/lib/queryClient';
import { isProtectedRoute } from '@/lib/route-utils';

interface Loan {
  id: string;
  status: string;
  contractUrl?: string | null;
  signedContractUrl?: string | null;
  contractStatus?: string | null;
  amount: string | number;
}

const REMINDER_INTERVAL = 60 * 60 * 1000; // 1 heure
const REMINDER_DURATION = 2 * 60 * 1000; // 2 minutes

export default function ContractNotificationManager() {
  const t = useTranslations();
  const [location] = useLocation();

  const { data: loans } = useQuery<Loan[]>({
    queryKey: ['/api/loans'],
    enabled: isProtectedRoute(location),
    retry: false,
    staleTime: 0,
  });
  const { addNotification, removeNotification, notifications } = useNotifications();
  const [downloadedContracts, setDownloadedContracts] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('downloaded-contracts');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('downloaded-contracts', JSON.stringify(Array.from(downloadedContracts)));
  }, [downloadedContracts]);

  useEffect(() => {
    if (!loans) return;

    const loansNeedingSignature = loans.filter(
      (loan) =>
        loan.status === 'approved' &&
        loan.contractUrl &&
        !loan.signedContractUrl &&
        loan.contractStatus !== 'awaiting_admin_confirmation' &&
        loan.contractStatus !== 'approved' &&
        !downloadedContracts.has(loan.id)
    );

    const loanIdsNeedingSignature = new Set(loansNeedingSignature.map(l => l.id));

    notifications.forEach((notification) => {
      if (notification.id.startsWith('contract-to-sign-')) {
        const loanId = notification.id.replace('contract-to-sign-', '');
        if (!loanIdsNeedingSignature.has(loanId)) {
          removeNotification(notification.id);
        }
      }
    });

    loansNeedingSignature.forEach((loan) => {
      const notificationId = `contract-to-sign-${loan.id}`;
      
      const alreadyExists = notifications.some((n) => n.id === notificationId);
      if (alreadyExists) return;

      const amount = typeof loan.amount === 'string' 
        ? parseFloat(loan.amount) 
        : loan.amount;
      
      const formattedAmount = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);

      addNotification({
        id: notificationId,
        message: t.notifications.contractAction.replace('{amount}', formattedAmount),
        variant: 'warning',
        dismissible: false,
        link: {
          text: t.notifications.viewContract,
          onClick: async () => {
            try {
              const response = await fetch(getApiUrl(`/api/contracts/${loan.id}/link`), {
                credentials: 'include',
              });

              if (!response.ok) {
                const error = await response.json();
                console.error('Download link generation error:', error);
                alert(t.common.error);
                return;
              }

              const { signedUrl } = await response.json();
              
              window.open(signedUrl, '_blank');
              
              setDownloadedContracts(prev => new Set(prev).add(loan.id));
              removeNotification(notificationId);
            } catch (error) {
              console.error('Contract download error:', error);
              alert(t.common.error + ': ' + t.notifications.downloadError);
            }
          },
        },
      });
    });
  }, [loans, addNotification, removeNotification, notifications, downloadedContracts]);

  useEffect(() => {
    if (!loans) return;

    const loansAwaitingReturn = loans.filter(
      (loan) =>
        loan.status === 'approved' &&
        loan.contractUrl &&
        !loan.signedContractUrl &&
        loan.contractStatus !== 'awaiting_admin_confirmation' &&
        loan.contractStatus !== 'approved' &&
        downloadedContracts.has(loan.id)
    );

    if (loansAwaitingReturn.length === 0) return;

    const timers: NodeJS.Timeout[] = [];

    loansAwaitingReturn.forEach((loan) => {
      const reminderKey = `reminder-last-shown-${loan.id}`;
      const lastShown = localStorage.getItem(reminderKey);
      const now = Date.now();

      const shouldShowReminder = !lastShown || (now - parseInt(lastShown)) >= REMINDER_INTERVAL;

      if (shouldShowReminder) {
        const notificationId = `contract-reminder-${loan.id}`;
        
        const amount = typeof loan.amount === 'string' 
          ? parseFloat(loan.amount) 
          : loan.amount;
        
        const formattedAmount = new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        }).format(amount);

        addNotification({
          id: notificationId,
          message: t.notifications.contractReminder.replace('{amount}', formattedAmount),
          variant: 'warning',
          dismissible: true,
          link: {
            text: t.notifications.viewMyContracts,
            onClick: () => {
              window.location.href = '/contracts';
            },
          },
        });

        localStorage.setItem(reminderKey, now.toString());

        const removeTimer = setTimeout(() => {
          removeNotification(notificationId);
        }, REMINDER_DURATION);

        timers.push(removeTimer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [loans, downloadedContracts, addNotification, removeNotification]);

  return null;
}
