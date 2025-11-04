import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bell, Shield, Palette, Globe, Camera, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10">
      <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-12 space-y-8">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
          
          <Card className="relative border-0 shadow-xl bg-card/80 backdrop-blur-sm dark:bg-card/50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-lg ring-2 ring-primary/10">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-primary to-blue-600 text-primary-foreground">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <button 
                    className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all transform hover:scale-110"
                    data-testid="button-change-avatar"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                      {profileData.fullName}
                    </h1>
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Vérifié
                    </div>
                  </div>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {profileData.email}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {profileData.phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {profileData.company}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-muted/50 backdrop-blur-sm p-1.5 shadow-sm border">
            <TabsTrigger 
              value="profile" 
              className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all" 
              data-testid="tab-profile"
            >
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all" 
              data-testid="tab-notifications"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all" 
              data-testid="tab-security"
            >
              <Shield className="h-4 w-4" />
              <span>Sécurité</span>
            </TabsTrigger>
            <TabsTrigger 
              value="appearance" 
              className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all" 
              data-testid="tab-appearance"
            >
              <Palette className="h-4 w-4" />
              <span>Apparence</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl">Informations personnelles</CardTitle>
              <CardDescription className="text-base">
                Mettez à jour vos informations de profil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">Nom complet</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                    data-testid="input-full-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">Entreprise</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                    data-testid="input-company"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleSaveProfile} 
                  className="px-8 h-11 shadow-md hover:shadow-lg transition-all"
                  data-testid="button-save-profile"
                >
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/5 via-card/50 to-blue-500/5 dark:from-primary/10 dark:via-card/50 dark:to-blue-500/10 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl">Type de compte</CardTitle>
              <CardDescription className="text-base">
                Votre compte professionnel ProLoan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-6 bg-background/60 dark:bg-background/40 backdrop-blur-sm rounded-xl border-2 border-primary/20">
                <div className="space-y-1">
                  <p className="text-lg font-semibold">Compte Professionnel</p>
                  <p className="text-sm text-muted-foreground">
                    Accès complet aux services de financement d'entreprise
                  </p>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full text-sm font-semibold shadow-lg">
                  Actif
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl">Préférences de notification</CardTitle>
              <CardDescription className="text-base">
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-0.5">
                  <Label htmlFor="emailAlerts" className="text-base font-medium cursor-pointer">Alertes par email</Label>
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
              <Separator className="my-2" />
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-0.5">
                  <Label htmlFor="transferUpdates" className="text-base font-medium cursor-pointer">Mises à jour de transfert</Label>
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
              <Separator className="my-2" />
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-0.5">
                  <Label htmlFor="loanReminders" className="text-base font-medium cursor-pointer">Rappels de paiement</Label>
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
              <Separator className="my-2" />
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails" className="text-base font-medium cursor-pointer">Emails marketing</Label>
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
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSaveNotifications} 
                  className="px-8 h-11 shadow-md hover:shadow-lg transition-all"
                  data-testid="button-save-notifications"
                >
                  Enregistrer les préférences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl">Mot de passe</CardTitle>
              <CardDescription className="text-base">
                Modifiez votre mot de passe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium">Mot de passe actuel</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                  data-testid="input-current-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                  data-testid="input-new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                  data-testid="input-confirm-password"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button 
                  className="px-8 h-11 shadow-md hover:shadow-lg transition-all"
                  data-testid="button-change-password"
                >
                  Modifier le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl">Authentification à deux facteurs</CardTitle>
              <CardDescription className="text-base">
                Ajoutez une couche de sécurité supplémentaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-6 bg-muted/30 dark:bg-muted/20 rounded-xl border hover:border-primary/30 transition-all">
                <div className="space-y-1">
                  <p className="text-lg font-semibold">Activer 2FA</p>
                  <p className="text-sm text-muted-foreground">
                    Protégez votre compte avec une vérification en deux étapes
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="h-11 px-6 shadow-sm hover:shadow-md transition-all"
                  data-testid="button-enable-2fa"
                >
                  Configurer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl">Thème</CardTitle>
              <CardDescription className="text-base">
                Personnalisez l'apparence de l'interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setTheme('light')}
                  className={`group p-6 border-2 rounded-xl transition-all hover:shadow-lg ${
                    theme === 'light' 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-muted hover:border-primary/30'
                  }`}
                  data-testid="button-theme-light"
                >
                  <div className="aspect-video bg-gradient-to-br from-white to-gray-100 rounded-lg mb-3 border-2 shadow-sm" />
                  <p className="text-base font-semibold">Clair</p>
                  <p className="text-xs text-muted-foreground mt-1">Mode lumineux</p>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`group p-6 border-2 rounded-xl transition-all hover:shadow-lg ${
                    theme === 'dark' 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-muted hover:border-primary/30'
                  }`}
                  data-testid="button-theme-dark"
                >
                  <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg mb-3 shadow-sm" />
                  <p className="text-base font-semibold">Sombre</p>
                  <p className="text-xs text-muted-foreground mt-1">Mode nocturne</p>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl">Langue</CardTitle>
              <CardDescription className="text-base">
                Choisissez votre langue préférée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`p-5 border-2 rounded-xl transition-all flex items-center gap-3 hover:shadow-md ${
                    language === 'fr' 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm' 
                      : 'border-muted hover:border-primary/30'
                  }`}
                  data-testid="button-lang-fr"
                >
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Français</span>
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`p-5 border-2 rounded-xl transition-all flex items-center gap-3 hover:shadow-md ${
                    language === 'en' 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm' 
                      : 'border-muted hover:border-primary/30'
                  }`}
                  data-testid="button-lang-en"
                >
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-semibold">English</span>
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`p-5 border-2 rounded-xl transition-all flex items-center gap-3 hover:shadow-md ${
                    language === 'es' 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm' 
                      : 'border-muted hover:border-primary/30'
                  }`}
                  data-testid="button-lang-es"
                >
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Español</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
