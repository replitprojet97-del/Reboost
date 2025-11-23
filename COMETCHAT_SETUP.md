# Configuration CometChat

## Variables d'environnement requises

Pour activer le système de chat CometChat, vous devez configurer les variables d'environnement suivantes :

### Variables Frontend (Vite)

Ajoutez ces variables à votre fichier `.env` (environnement de développement Replit) :

```env
VITE_COMETCHAT_APP_ID=votre_app_id_cometchat
VITE_COMETCHAT_REGION=eu
VITE_COMETCHAT_AUTH_KEY=votre_auth_key_cometchat
```

### Comment obtenir ces clés ?

1. **Inscrivez-vous sur CometChat** : https://app.cometchat.com/login
2. **Créez une nouvelle application** dans le dashboard CometChat
3. **Récupérez vos identifiants** :
   - Allez dans **Application** → **Credentials**
   - Notez votre **App ID**, **Auth Key**, et **Region**

### Déploiement Production

Pour Vercel (frontend) et Render (backend), assurez-vous d'ajouter ces mêmes variables dans les paramètres d'environnement de chaque plateforme.

## Fonctionnalités implémentées

✅ Initialisation de CometChat au démarrage de l'application
✅ Widget de chat flottant (bouton 💬)
✅ Endpoint backend `/api/cometchat/auth-token` pour l'authentification
✅ Hook `useCometChatLogin` pour gérer la connexion
✅ Intégration globale dans l'application

## Utilisation

Une fois les variables d'environnement configurées :

1. Le bouton de chat apparaîtra en bas à droite de l'application
2. Les utilisateurs connectés pourront cliquer dessus pour ouvrir la fenêtre de chat
3. L'authentification se fera automatiquement via le backend

## Prochaines étapes

Pour utiliser pleinement CometChat, vous devrez :

1. Créer des utilisateurs dans le dashboard CometChat ou via l'API
2. Implémenter le composant UI complet de CometChat (actuellement un placeholder)
3. Personnaliser l'apparence du widget selon votre charte graphique

## Documentation officielle

- Documentation CometChat React UI Kit : https://www.cometchat.com/docs/ui-kit/react/overview
- Dashboard CometChat : https://app.cometchat.com/
