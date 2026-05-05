# 🔧 Guide de Débogage - Formulaire de Contact

## 🚨 Problème identifié

Le formulaire utilise un endpoint Formspree **invalide** :
```
https://formspree.io/f/your-form-id
```

Cet endpoint n'existe pas, ce qui cause l'erreur : 
> "Oups, une erreur s'est produite lors de l'envoi"

## 🎯 Solution immédiate

### Étape 1 : Obtenir votre endpoint Formspree

1. **Créer un compte** sur https://formspree.io
2. **Créer un nouveau formulaire** :
   - Donnez un nom : "Eco Build Club Contact"
   - Configurez l'email de destination
3. **Copier votre endpoint** qui ressemblera à :
   ```
   https://formspree.io/f/xyz123abc
   ```

### Étape 2 : Mettre à jour le code

Dans `src/App.tsx`, ligne 1621, remplacez :
```javascript
const formEndpoint = 'https://formspree.io/f/your-form-id';
```

Par :
```javascript
const formEndpoint = 'https://formspree.io/f/VOTRE_VRAI_ID';
```

### Étape 3 : Tester

1. Redémarrez le serveur de développement
2. Testez le formulaire avec une vraie adresse email
3. Vérifiez que vous recevez l'email

## 🔍 Points de vérification

### Vérification côté client
- Ouvrez les outils de développement (F12)
- Allez dans l'onglet "Network"
- Soumettez le formulaire
- Cherchez la requête vers votre endpoint Formspree
- Vérifiez le statut de la réponse

### Vérification côté serveur
- Connectez-vous à votre dashboard Formspree
- Vérifiez les "Submissions"
- Confirmez que les données arrivent correctement

## 🐛 Débogage avancé

### Ajouter des logs pour diagnostiquer

Si le problème persiste, ajoutez ce code temporaire :

```javascript
try {
  const response = await fetch(formEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
  console.log('Response status:', response.status);
  console.log('Response ok:', response.ok);
  
  const responseData = await response.text();
  console.log('Response data:', responseData);
  
  if (response.ok) {
    // Succès
  } else {
    console.error('Erreur HTTP:', response.status, responseData);
  }
} catch (error) {
  console.error('Erreur complète:', error);
}
```

## 🔄 Alternative : Web3Forms

Si Formspree ne fonctionne pas, utilisez Web3Forms :

1. **Créer un compte** : https://web3forms.com
2. **Obtenir la clé API** : `your-access-key-here`
3. **Remplacer le code** :

```javascript
const formEndpoint = 'https://api.web3forms.com/submit';
const formDataWithKey = {
  ...formData,
  access_key: 'your-access-key-here'
};

const response = await fetch(formEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formDataWithKey)
});
```

## ✅ Tests à effectuer

1. **Test avec des données valides** : tous les champs remplis correctement
2. **Test avec des données invalides** : champs vides, email invalide
3. **Test de la validation** : messages d'erreur en temps réel
4. **Test de soumission multiple** : éviter les doubles soumissions
5. **Test responsive** : sur mobile et desktop

## 📞 Support

- **Formspree** : https://formspree.io/support
- **Web3Forms** : https://web3forms.com/support
- **Documentation du projet** : `FORMSPREE_SETUP.md`

---

**Note importante** : Le problème vient 100% de l'endpoint invalide. Une fois remplacé par votre véritable endpoint, le formulaire fonctionnera parfaitement.
