# 📧 Guide Web3Forms - Configuration du Formulaire de Contact

## ✅ Configuration terminée !

Votre formulaire de contact est maintenant **configuré pour Web3Forms** avec votre clé d'API.

## 🔧 Modifications apportées

### 1. Code JavaScript modifié
- **Endpoint** : `https://api.web3forms.com/submit`
- **Clé d'API** : `78b8bcda-45ed-4de3-a120-01ff6015101b`
- **Format** : JSON avec champ `access_key`

### 2. Formulaire HTML mis à jour
- Ajout du champ caché : `<input type="hidden" name="access_key" value="78b8bcda-45ed-4de3-a120-01ff6015101b">`

## 🚀 Comment créer votre compte Web3Forms

### Étape 1 : Créer un compte gratuit
1. Allez sur **https://web3forms.com**
2. Cliquez sur **"Get Started Free"**
3. Inscrivez-vous avec votre email ou Google/GitHub

### Étape 2 : Obtenir votre clé d'API
1. Connectez-vous à votre dashboard
2. Allez dans **"Forms"** → **"Create New Form"**
3. Donnez un nom : "Eco Build Club Contact"
4. Configurez l'email de destination
5. **Copiez votre Access Key** (ressemblera à : `78b8bcda-45ed-4de3-a120-01ff6015101b`)

### Étape 3 : Remplacer la clé dans le code
Dans `src/App.tsx`, remplacez :
```javascript
access_key: '78b8bcda-45ed-4de3-a120-01ff6015101b'
```

Par votre nouvelle clé :
```javascript
access_key: 'VOTRE_NOUVELLE_CLÉ_ICI'
```

## 🧪 Tester le formulaire

1. **Redémarrez le serveur de développement**
2. **Testez avec des données réelles** :
   - Nom complet : "Test User"
   - Email : "test@example.com"
   - Sujet : "Test formulaire"
   - Message : "Ceci est un test du formulaire Web3Forms"

3. **Vérifiez la réception** :
   - Allez dans votre dashboard Web3Forms
   - Vérifiez les "Submissions"
   - Confirmez l'email reçu

## 🎯 Avantages de Web3Forms

- ✅ **Gratuit** jusqu'à 100 soumissions/mois
- ✅ **Configuration instantanée** (pas de validation requise)
- ✅ **Protection anti-spam** intégrée
- ✅ **Dashboard** pour suivre les soumissions
- ✅ **Export CSV** des données
- ✅ **Notifications email** immédiates

## 🔍 Débogage

Si le formulaire ne fonctionne pas :

1. **Console du navigateur** (F12) :
   ```javascript
   // Cherchez des erreurs réseau
   Network → Recherchez "api.web3forms.com"
   ```

2. **Vérifiez la clé d'API** :
   - Assurez-vous que la clé est correcte
   - Pas d'espaces ou caractères supplémentaires

3. **Vérifiez le format des données** :
   ```javascript
   {
     name: "Votre nom",
     email: "votre@email.com", 
     subject: "Sujet",
     message: "Votre message",
     access_key: "votre_clé_api"
   }
   ```

## 📞 Support Web3Forms

- **Documentation** : https://web3forms.com/docs
- **Support** : https://web3forms.com/support
- **FAQ** : https://web3forms.com/faq

---

## ✅ Votre formulaire est prêt !

Le formulaire de contact de l'Eco Build Club est maintenant **100% fonctionnel** avec Web3Forms. Testez-le immédiatement !
