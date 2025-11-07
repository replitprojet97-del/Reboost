import { useEffect, useState } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, getApiUrl } from '@/lib/queryClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function Verify() {
  const [, params] = useRoute('/verify/:token');
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const verifyMutation = useMutation({
    mutationFn: async (token: string) => {
      const response = await fetch(getApiUrl(`/api/auth/verify/${token}`), {
        credentials: 'include',
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la vérification');
      }
      
      return data;
    },
    onSuccess: (data) => {
      setStatus('success');
      setMessage(data.message);
      
      if (data.redirect) {
        setTimeout(() => {
          setLocation(data.redirect);
        }, 2000);
      }
    },
    onError: (error: any) => {
      setStatus('error');
      setMessage(error.message || 'Erreur lors de la vérification');
    },
  });

  useEffect(() => {
    if (params?.token) {
      verifyMutation.mutate(params.token);
    } else {
      setStatus('error');
      setMessage('Token de vérification manquant');
    }
  }, [params?.token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto mb-4">
            {status === 'loading' && (
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin" data-testid="icon-loading" />
            )}
            {status === 'success' && (
              <CheckCircle2 className="h-16 w-16 text-green-600" data-testid="icon-success" />
            )}
            {status === 'error' && (
              <XCircle className="h-16 w-16 text-red-600" data-testid="icon-error" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === 'loading' && 'Vérification en cours...'}
            {status === 'success' && 'Email vérifié !'}
            {status === 'error' && 'Erreur de vérification'}
          </CardTitle>
          <CardDescription className="text-base" data-testid="text-message">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'success' && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-800 dark:text-green-200">
                  Votre compte est maintenant actif ! Vous êtes automatiquement connecté et serez redirigé vers votre tableau de bord dans quelques secondes...
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" data-testid="button-dashboard">
                  Aller au tableau de bord
                </Button>
              </Link>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Le lien de vérification est peut-être expiré ou invalide.
                </p>
              </div>
              <Link href="/signup">
                <Button variant="outline" className="w-full" data-testid="button-signup">
                  Retour à l'inscription
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full" data-testid="button-home">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          )}
          
          {status === 'loading' && (
            <div className="text-center text-sm text-muted-foreground">
              Veuillez patienter pendant que nous vérifions votre email...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
