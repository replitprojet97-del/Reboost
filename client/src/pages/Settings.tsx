import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, Palette, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from '@/hooks/use-theme';

export default function Settings() {
  const { toast } = useToast();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  
  const [profileData, setProfileData] = useState({
    fullName: 'Jean Dupont',
    email: 'jean.dupont@entreprise.fr',
    phone: '+33612345678',
    company: 'Entreprise SARL',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    transferUpdates: true,
    loanReminders: true,
    marketingEmails: false,
  });

  const handleSaveProfile = () => {
    toast({
      title: 'Profil mis à jour',
      description: 'Vos informations ont été enregistrées avec succès.',
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: 'Préférences enregistrées',
      description: 'Vos préférences de notification ont été mises à jour.',
    });
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez votre profil et vos préférences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="profile" className="gap-2" data-testid="tab-profile">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2" data-testid="tab-notifications">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2" data-testid="tab-security">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2" data-testid="tab-appearance">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Apparence</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations de profil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nom complet</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    data-testid="input-full-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    data-testid="input-company"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} data-testid="button-save-profile">
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Type de compte</CardTitle>
              <CardDescription>
                Votre compte professionnel ProLoan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Compte Professionnel</p>
                  <p className="text-sm text-muted-foreground">
                    Accès complet aux services de financement d'entreprise
                  </p>
                </div>
                <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  Actif
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailAlerts">Alertes par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des alertes importantes par email
                  </p>
                </div>
                <Switch
                  id="emailAlerts"
                  checked={notifications.emailAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailAlerts: checked })
                  }
                  data-testid="switch-email-alerts"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="transferUpdates">Mises à jour de transfert</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications sur l'état de vos transferts
                  </p>
                </div>
                <Switch
                  id="transferUpdates"
                  checked={notifications.transferUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, transferUpdates: checked })
                  }
                  data-testid="switch-transfer-updates"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="loanReminders">Rappels de paiement</Label>
                  <p className="text-sm text-muted-foreground">
                    Rappels pour vos échéances de prêt
                  </p>
                </div>
                <Switch
                  id="loanReminders"
                  checked={notifications.loanReminders}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, loanReminders: checked })
                  }
                  data-testid="switch-loan-reminders"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Emails marketing</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des nouvelles et des offres spéciales
                  </p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, marketingEmails: checked })
                  }
                  data-testid="switch-marketing-emails"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications} data-testid="button-save-notifications">
                  Enregistrer les préférences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mot de passe</CardTitle>
              <CardDescription>
                Modifiez votre mot de passe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  data-testid="input-current-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  data-testid="input-new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  data-testid="input-confirm-password"
                />
              </div>
              <div className="flex justify-end">
                <Button data-testid="button-change-password">
                  Modifier le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authentification à deux facteurs</CardTitle>
              <CardDescription>
                Ajoutez une couche de sécurité supplémentaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Activer 2FA</p>
                  <p className="text-sm text-muted-foreground">
                    Protégez votre compte avec une vérification en deux étapes
                  </p>
                </div>
                <Button variant="outline" data-testid="button-enable-2fa">
                  Configurer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thème</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    theme === 'light' ? 'border-primary' : 'border-muted'
                  }`}
                  data-testid="button-theme-light"
                >
                  <div className="aspect-video bg-white rounded mb-2 border" />
                  <p className="text-sm font-medium">Clair</p>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    theme === 'dark' ? 'border-primary' : 'border-muted'
                  }`}
                  data-testid="button-theme-dark"
                >
                  <div className="aspect-video bg-slate-900 rounded mb-2" />
                  <p className="text-sm font-medium">Sombre</p>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Langue</CardTitle>
              <CardDescription>
                Choisissez votre langue préférée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`p-4 border-2 rounded-lg transition-all flex items-center gap-3 ${
                    language === 'fr' ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}
                  data-testid="button-lang-fr"
                >
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Français</span>
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`p-4 border-2 rounded-lg transition-all flex items-center gap-3 ${
                    language === 'en' ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}
                  data-testid="button-lang-en"
                >
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">English</span>
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`p-4 border-2 rounded-lg transition-all flex items-center gap-3 ${
                    language === 'es' ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}
                  data-testid="button-lang-es"
                >
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Español</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
