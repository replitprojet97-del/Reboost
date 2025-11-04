import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRoute, useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ArrowLeft, CheckCircle2, Clock, Send, Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TransferFlow() {
  const [, params] = useRoute('/transfer/:id');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [step, setStep] = useState<'form' | 'validation' | 'progress' | 'complete'>('form');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [externalAccountId, setExternalAccountId] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [transferId, setTransferId] = useState(params?.id || '');
  const [currentSequence, setCurrentSequence] = useState(1);
  const [demoCode, setDemoCode] = useState('');

  const { data: externalAccounts } = useQuery<any[]>({
    queryKey: ['/api/external-accounts'],
  });

  const { data: transferData, refetch: refetchTransfer } = useQuery({
    queryKey: [`/api/transfers/${transferId}`],
    enabled: !!transferId,
    refetchInterval: step === 'progress' ? 2000 : false,
  });

  const initiateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/transfers/initiate', data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      setTransferId(data.transfer.id);
      setDemoCode(data.codeForDemo);
      setCurrentSequence(1);
      setLocation(`/transfer/${data.transfer.id}`);
      setStep('validation');
      toast({
        title: 'Transfert initié',
        description: data.message,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Échec de l\'initiation du transfert',
      });
    },
  });

  const validateMutation = useMutation({
    mutationFn: async (data: { code: string; sequence: number }) => {
      const response = await apiRequest('POST', `/api/transfers/${transferId}/validate-code`, data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      setValidationCode('');
      toast({
        title: 'Code validé',
        description: data.message,
      });
      
      if (data.isComplete) {
        setStep('progress');
      } else {
        setCurrentSequence(prev => prev + 1);
        sendCodeMutation.mutate({ method: 'email' });
      }
      
      refetchTransfer();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Code invalide',
        description: 'Le code est incorrect ou expiré',
      });
    },
  });

  const sendCodeMutation = useMutation({
    mutationFn: async (data: { method: string }) => {
      const response = await apiRequest('POST', `/api/transfers/${transferId}/send-code`, data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      setDemoCode(data.codeForDemo);
      toast({
        title: 'Code envoyé',
        description: `Code ${data.sequence} envoyé avec succès`,
      });
    },
  });

  useEffect(() => {
    if (transferData?.transfer) {
      const transfer = transferData.transfer;
      
      if (transfer.status === 'completed') {
        setStep('complete');
      } else if (transfer.status === 'in-progress' && transfer.codesValidated === transfer.requiredCodes) {
        setStep('progress');
      } else if (transfer.status === 'pending' || transfer.codesValidated < transfer.requiredCodes) {
        if (step === 'form') {
          setStep('validation');
          setCurrentSequence(transfer.codesValidated + 1);
        }
      }
    }
  }, [transferData, step]);

  const handleInitiate = () => {
    if (!amount || !recipient) {
      toast({
        variant: 'destructive',
        title: 'Champs requis',
        description: 'Veuillez remplir tous les champs',
      });
      return;
    }

    initiateMutation.mutate({
      amount: parseFloat(amount),
      recipient,
      externalAccountId: externalAccountId && externalAccountId !== 'none' ? externalAccountId : null,
    });
  };

  const handleValidateCode = () => {
    if (!validationCode || validationCode.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'Code invalide',
        description: 'Le code doit contenir 6 chiffres',
      });
      return;
    }

    validateMutation.mutate({
      code: validationCode,
      sequence: currentSequence,
    });
  };

  if (step === 'form') {
    return (
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/dashboard')}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au tableau de bord
        </Button>

        <Card data-testid="card-transfer-form">
          <CardHeader>
            <CardTitle>Nouveau transfert</CardTitle>
            <CardDescription>
              Initiez un transfert sécurisé vers un compte externe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (EUR)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                data-testid="input-amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Compte externe (optionnel)</Label>
              <Select value={externalAccountId} onValueChange={setExternalAccountId}>
                <SelectTrigger data-testid="select-account">
                  <SelectValue placeholder="Sélectionner un compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucun compte enregistré</SelectItem>
                  {externalAccounts?.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.accountLabel} - {account.iban}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Bénéficiaire</Label>
              <Input
                id="recipient"
                placeholder="Nom du bénéficiaire"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                data-testid="input-recipient"
              />
            </div>

            <Button 
              onClick={handleInitiate}
              disabled={initiateMutation.isPending}
              className="w-full"
              data-testid="button-initiate"
            >
              {initiateMutation.isPending ? 'Initiation...' : 'Initier le transfert'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'validation') {
    return (
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <Card data-testid="card-validation">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Validation du transfert
            </CardTitle>
            <CardDescription>
              Code {currentSequence} / {transferData?.transfer?.requiredCodes || 1}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert data-testid="alert-demo-code">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Code de démonstration :</strong> {demoCode}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="code">Code de validation (6 chiffres)</Label>
              <Input
                id="code"
                type="text"
                maxLength={6}
                placeholder="000000"
                value={validationCode}
                onChange={(e) => setValidationCode(e.target.value.replace(/\D/g, ''))}
                data-testid="input-validation-code"
              />
              <p className="text-sm text-muted-foreground">
                Un code a été envoyé à votre email
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleValidateCode}
                disabled={validateMutation.isPending}
                className="flex-1"
                data-testid="button-validate-code"
              >
                {validateMutation.isPending ? 'Validation...' : 'Valider'}
              </Button>
              <Button
                variant="outline"
                onClick={() => sendCodeMutation.mutate({ method: 'email' })}
                disabled={sendCodeMutation.isPending}
                data-testid="button-resend-code"
              >
                <Send className="w-4 h-4 mr-2" />
                Renvoyer
              </Button>
            </div>

            {transferData?.events && (
              <div className="mt-6 space-y-2">
                <h3 className="font-semibold text-sm">Historique</h3>
                <div className="space-y-2" data-testid="list-events">
                  {transferData.events.map((event: any) => (
                    <div key={event.id} className="text-sm border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">{event.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.createdAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'progress') {
    const progress = transferData?.transfer?.progressPercent || 0;
    const status = transferData?.transfer?.status || 'in-progress';

    return (
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <Card data-testid="card-progress">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary animate-pulse" />
              Transfert en cours
            </CardTitle>
            <CardDescription>
              Montant: {transferData?.transfer?.amount} EUR vers {transferData?.transfer?.recipient}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span className="font-semibold" data-testid="text-progress">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">État actuel</p>
              <p className="text-sm text-muted-foreground" data-testid="text-status">
                {status === 'completed' 
                  ? 'Transfert terminé !' 
                  : 'Traitement en cours par notre système bancaire...'}
              </p>
            </div>

            {transferData?.events && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Événements</h3>
                <div className="space-y-2" data-testid="list-progress-events">
                  {transferData.events.map((event: any) => (
                    <div key={event.id} className="text-sm border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">{event.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.createdAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <Card data-testid="card-complete">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-6 h-6" />
              Transfert complété
            </CardTitle>
            <CardDescription>
              Votre transfert a été effectué avec succès
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Montant</span>
                <span className="text-sm font-semibold">{transferData?.transfer?.amount} EUR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Bénéficiaire</span>
                <span className="text-sm">{transferData?.transfer?.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Frais</span>
                <span className="text-sm">{transferData?.transfer?.feeAmount} EUR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm">
                  {new Date(transferData?.transfer?.completedAt).toLocaleString('fr-FR')}
                </span>
              </div>
            </div>

            <Button
              onClick={() => setLocation('/dashboard')}
              className="w-full"
              data-testid="button-back-to-dashboard"
            >
              Retour au tableau de bord
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
