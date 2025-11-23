# Configuration CometChat - Système de Chat en Temps Réel

## ✅ Implémentation Actuelle (Développement)

L'infrastructure de base CometChat a été implémentée dans l'environnement de développement Replit :

### Fichiers Créés

- **`client/src/cometchat.ts`** : Initialisation de CometChat UI Kit
- **`client/src/hooks/useCometChat.ts`** : Hook pour gérer la connexion utilisateur
- **`client/src/components/ChatWidget.tsx`** : Widget de chat flottant (bouton 💬)
- **Backend** : Endpoint `/api/cometchat/auth-token` pour l'authentification

### Fonctionnalités Implémentées

✅ Initialisation automatique de CometChat au démarrage de l'application  
✅ Widget de chat flottant visible en bas à droite  
✅ Endpoint backend sécurisé pour récupérer les informations utilisateur  
✅ Gestion des erreurs et fallback si CometChat n'est pas configuré  

## 📋 Configuration Requise

### 1. Variables d'Environnement (Développement - Replit)

Les variables suivantes sont déjà configurées dans Replit :

```env
VITE_COMETCHAT_APP_ID=votre_app_id
VITE_COMETCHAT_REGION=eu
VITE_COMETCHAT_AUTH_KEY=votre_auth_key
```

### 2. Variables d'Environnement (Production)

Pour déployer en production, ajoutez ces mêmes variables dans :

**Vercel (Frontend)** :
- VITE_COMETCHAT_APP_ID
- VITE_COMETCHAT_REGION  
- VITE_COMETCHAT_AUTH_KEY

**Render (Backend)** :
- Aucune variable CometChat nécessaire côté backend pour le moment

### Comment obtenir ces clés ?

1. **Créez un compte CometChat** : https://app.cometchat.com/login
2. **Créez une nouvelle application** dans le dashboard
3. **Récupérez vos identifiants** :
   - Dashboard → Application → Credentials
   - Notez : **App ID**, **Auth Key**, **Region**

## 🚀 Prochaines Étapes (À Implémenter)

### 1. Créer les Utilisateurs CometChat

Chaque utilisateur de votre application doit exister dans CometChat. Deux options :

**Option A : Créer manuellement via Dashboard**
- Dashboard CometChat → Users → Add User

**Option B : Créer automatiquement via API (Recommandé)**

Ajouter un endpoint backend pour créer automatiquement un utilisateur CometChat lors de l'inscription :

```typescript
// server/routes.ts
app.post("/api/cometchat/create-user", requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const user = await storage.getUser(userId);
  
  // Appeler l'API CometChat REST pour créer l'utilisateur
  const response = await fetch(
    `https://${COMETCHAT_APP_ID}.api-${COMETCHAT_REGION}.cometchat.io/v3/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': COMETCHAT_REST_API_KEY
      },
      body: JSON.stringify({
        uid: `user_${userId}`,
        name: user.fullName,
        avatar: user.avatarUrl || '',
        withAuthToken: true
      })
    }
  );
  
  const data = await response.json();
  res.json(data);
});
```

### 2. Implémenter l'Interface de Chat Complète

Remplacer le placeholder dans `ChatWidget.tsx` par les composants CometChat UI :

```typescript
import { CometChatConversationsWithMessages } from "@cometchat/chat-uikit-react";
import "@cometchat/chat-uikit-react/dist/index.css";

// Dans le composant :
<CometChatConversationsWithMessages />
```

### 3. Gérer l'Authentification Automatique

Ajouter le login CometChat lors de la connexion utilisateur :

```typescript
// Dans votre composant de dashboard ou après login
import { useCometChatLogin } from "@/hooks/useCometChat";

const { login } = useCometChatLogin();

useEffect(() => {
  // Connecter l'utilisateur à CometChat après authentification
  login();
}, []);
```

### 4. Personnalisation du Widget

Le widget peut être personnalisé pour correspondre à votre charte graphique :

- Couleurs du bouton
- Taille de la fenêtre de chat
- Thème (clair/sombre)
- Position du bouton

## 🔒 Sécurité

- ✅ Authentification backend sécurisée via sessions Express
- ✅ Endpoint protégé par middleware `requireAuth`
- ⚠️ **Production** : Utiliser un REST API Key CometChat côté serveur pour créer des auth tokens (actuellement on utilise juste l'Auth Key côté client)

## 📚 Documentation

- **CometChat React UI Kit** : https://www.cometchat.com/docs/ui-kit/react/overview
- **CometChat REST API** : https://api-explorer.cometchat.com/
- **Dashboard CometChat** : https://app.cometchat.com/

## 🐛 Débogage

Si le chat ne fonctionne pas :

1. **Vérifier les logs du navigateur** : Cherchez "✔️ CometChat initialized"
2. **Vérifier les variables d'environnement** : Les variables VITE_COMETCHAT_* sont-elles définies ?
3. **Vérifier la création utilisateur** : L'utilisateur existe-t-il dans le dashboard CometChat ?
4. **Tester l'endpoint** : `/api/cometchat/auth-token` retourne-t-il les bonnes données ?

## 💡 Notes Importantes

- Le système actuel utilise l'**Auth Key** pour le développement (mode POC)
- Pour la production, il est recommandé d'utiliser des **Auth Tokens** générés côté serveur
- Les utilisateurs doivent être créés dans CometChat avant de pouvoir chatter
- Le widget est visible sur toutes les pages de l'application
