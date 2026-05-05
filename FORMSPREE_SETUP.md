# Configuration Formspree pour Eco Build Club

## Étapes de configuration

1. **Créer un compte Formspree**
   - Allez sur https://formspree.io
   - Créez un compte gratuit
   - Créez un nouveau formulaire

2. **Obtenir votre endpoint**
   - Une fois le formulaire créé, vous obtiendrez un endpoint comme :
   - `https://formspree.io/f/your-unique-id`

3. **Configurer le formulaire**
   - Remplacez `https://formspree.io/f/your-form-id` dans le fichier `src/App.tsx`
   - Ligne 1618 : `const formEndpoint = 'https://formspree.io/f/your-form-id';`

4. **Personnaliser les redirections**
   - Dans le dashboard Formspree, configurez l'email de destination
   - Ajoutez une page de remerciement personnalisée si nécessaire

## Avantages de Formspree

- ✅ **Gratuit** pour jusqu'à 50 soumissions/mois
- ✅ **Pas de backend requis**
- ✅ **Protection anti-spam** intégrée
- ✅ **Notifications email** instantanées
- ✅ **Dashboard** pour suivre les soumissions
- ✅ **Hébergement sécurisé** des données

## Alternative : Web3Forms

Si vous préférez Web3Forms :

1. Allez sur https://web3forms.com
2. Créez un compte gratuit
3. Obtenez votre clé d'accès
4. Remplacez la configuration dans `src/App.tsx`

```javascript
// Configuration Web3Forms
const formEndpoint = 'https://api.web3forms.com/submit';
const formDataWithKey = {
  ...formData,
  access_key: 'your-access-key-here'
};
```

## Test du formulaire

1. Déployez votre site
2. Testez le formulaire avec différentes adresses email
3. Vérifiez que vous recevez bien les emails
4. Testez la validation des champs
5. Vérifiez les messages d'erreur

## Sécurité

- Le formulaire inclut déjà une validation côté client
- Formspree ajoute une protection CSRF
- Les emails sont filtrés contre le spam
- Vous pouvez ajouter des champs reCAPTCHA si nécessaire
