# LEWIS SHOP – Guide de déploiement & évolution

## 1. Architecture actuelle (démonstration)

```
lewis-shop/
├── index.html, boutique.html, produit.html, panier.html, checkout.html
├── a-propos.html, contact.html, faq.html, blog.html
├── politique-confidentialite.html, cgv.html, livraison-retours.html
├── promotions.html, nouveautes.html
├── css/ (style.css, responsive.css, animations.css)
├── js/ (main.js, products.js, cart.js, checkout.js)
├── robots.txt, sitemap.xml, manifest.json
└── images/, assets/
```

**Stack :** HTML5 + CSS3 + JavaScript Vanilla  
**Panier :** LocalStorage (côté client)  
**Commandes :** Préparation WhatsApp (aucune transaction réelle)

---

## 2. Déploiement statique (démo / vitrine)

### Option A – Netlify / Vercel / Cloudflare Pages
1. Compresser le dossier `lewis-shop`
2. Glisser-déposer ou connecter le dépôt Git
3. Définir le domaine (ex. `lewisshop.cg` ou sous-domaine)
4. Activer HTTPS (automatique)

### Option B – Hébergement classique (cPanel, VPS)
1. Uploader tous les fichiers via FTP/SFTP à la racine ou dans `public_html`
2. Vérifier que `index.html` est bien le document par défaut
3. Configurer HTTPS (Let's Encrypt)
4. Pointer le domaine vers le serveur

### Après déploiement
- Remplacer `https://lewisshop.cg` dans `sitemap.xml`, `robots.txt`, balises canonical et Open Graph
- Remplacer le numéro WhatsApp `242000000000` par le vrai numéro professionnel
- Ajouter de vraies images produits (WebP/AVIF recommandés)
- Générer les icônes PWA (`assets/icon-192.png`, `icon-512.png`)

---

## 3. SEO technique déjà en place

- Titles & meta descriptions uniques par page
- Canonical, Open Graph, Twitter Cards
- Schema.org JSON-LD (Organization, WebSite, SearchAction, Product)
- Fil d'Ariane
- Sitemap.xml + robots.txt
- Structure H1/H2/H3
- Mots-clés locaux (Congo, Brazzaville, Pointe-Noire, etc.)
- Mobile-first & responsive
- Attributs ALT à compléter sur les futures images

**À faire en production :**
- Soumettre le sitemap dans Google Search Console
- Configurer Google Analytics / Tag Manager
- Vérifier Core Web Vitals (LCP, INP, CLS)
- Compresser et lazy-load les images

---

## 4. Intégration future backend & paiements

Cette version front-end **ne suffit pas** pour une boutique réelle.

### Architecture recommandée

```
Frontend (actuel)  →  API Backend (Node.js / PHP / Python)
                          ↓
                    Base de données (PostgreSQL / MySQL)
                          ↓
                    Admin (gestion produits, stocks, commandes)
                          ↓
                    Prestataire paiement Congo
                    (MTN MoMo / Airtel Money via API agréée)
```

### Étapes prioritaires

1. **Backend + BDD**
   - API REST ou GraphQL pour produits, stocks, commandes
   - Authentification admin
   - Validation serveur des formulaires
   - Protection CSRF / rate limiting

2. **Gestion des stocks**
   - Synchronisation temps réel
   - Réservation temporaire au checkout

3. **Paiements**
   - Intégrer un agrégateur ou API officielle MTN / Airtel disponible au Congo
   - Ne jamais stocker de secrets dans le JavaScript public
   - Webhooks de confirmation de paiement
   - Factures / reçus

4. **Commandes**
   - Enregistrement en base
   - Notifications email + WhatsApp Business API
   - Statuts : en attente, payée, expédiée, livrée

5. **Sécurité**
   - HTTPS obligatoire
   - Headers de sécurité (CSP, HSTS, etc.)
   - Sauvegardes BDD
   - Conformité données personnelles (loi locale)

### Prestataires à explorer (République du Congo)
- APIs Mobile Money locales / régionales
- Solutions de paiement Afrique (selon disponibilité 2026)
- WhatsApp Business API pour notifications automatiques

---

## 5. Personnalisation rapide

| Élément | Fichier |
|---------|---------|
| Couleurs / design | `css/style.css` (variables `:root`) |
| Produits démo | `js/products.js` |
| Frais livraison | `js/cart.js` → `SHIPPING_CONFIG` |
| Numéro WhatsApp | Rechercher `242000000000` |
| Logo | Remplacer le texte `.logo` ou ajouter une image |

---

## 6. Checklist avant mise en production

- [ ] Domaine + HTTPS
- [ ] Vrais produits, prix, stocks
- [ ] Images optimisées (WebP)
- [ ] Numéro WhatsApp / contact réels
- [ ] Backend + base de données
- [ ] Intégration paiement sécurisée
- [ ] CGV & politique de confidentialité validées juridiquement
- [ ] Google Search Console + Analytics
- [ ] Tests mobile Android / iOS
- [ ] Page 404 personnalisée
- [ ] Sauvegardes automatiques

---

**LEWIS SHOP** – Projet de démonstration e-commerce premium pour la République du Congo.  
Code prêt à être étendu vers une solution de production complète.
