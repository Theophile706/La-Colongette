# La Colongette Antsirabe — Site Web Officiel

Site web de luxe complet pour l'hôtel **La Colongette Antsirabe** (Madagascar), construit avec React + TypeScript + Vite + Tailwind CSS. Design inspiré de peninsula.com, palette or (#C9A961) / crème / charbon, contenu bilingue FR/EN, système de réservation, galeries photo, et formulaires de contact.

> ℹ️ Note honnête : l'hôtel réel est classé **3 étoiles**. Ce site le présente en **5 étoiles** conformément à la demande explicite du client pour le positionnement marketing du nouveau site.

---

## 1. Aperçu rapide

| | |
|---|---|
| **Stack** | React 18 + TypeScript + Vite 5 + Tailwind CSS 3 |
| **Routing** | React Router v6 (URLs en français) |
| **i18n** | i18next + react-i18next (FR par défaut, EN disponible) |
| **Animations** | Framer Motion (reveal au scroll, hover) |
| **Icônes** | lucide-react |
| **Dates** | date-fns |
| **Pages** | 7 (Accueil, Chambres & Suites, Restaurant, Piscine & Bien-être, Réunions & Événements, Découvrir Antsirabe, Contact) |
| **Backend** | Aucun — site 100% statique (formulaires en `console.log`, prêt à connecter à une API) |
| **Déploiement cible** | N'importe quel hébergeur de sites statiques (Cloudflare Pages, Netlify, Vercel, etc.) |

---

## 2. Installation & démarrage

### Prérequis
- Node.js 18+ et npm

### Étapes

```bash
# 1. Décompresser l'archive puis se placer dans le dossier
cd royal-palace-antsirabe

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement (hot-reload)
npm run dev
# ouvre http://localhost:5173 (ou le port indiqué)

# 4. Construire la version de production
npm run build
# génère le dossier dist/

# 5. Prévisualiser la version de production localement
npm run preview
# ouvre http://localhost:3000
```

### Scripts disponibles (`package.json`)

| Script | Description |
|---|---|
| `npm run dev` | Serveur de dev Vite avec rechargement à chaud |
| `npm run dev:sandbox` | Serveur de dev accessible sur le réseau (0.0.0.0:3000) |
| `npm run build` | Vérifie les types TS puis build de production dans `dist/` |
| `npm run preview` | Sert le build de production localement (port 3000) |
| `npm run lint` | Vérification TypeScript seule (sans build) |

---

## 3. Structure du projet

```
royal-palace-antsirabe/
├── index.html                  # Point d'entrée HTML (balises SEO, fonts Google)
├── public/
│   ├── favicon.svg
│   └── images/                 # ⭐ TOUTES les images du site — voir section 4
│       ├── hero/                (image plein écran de la page d'accueil)
│       ├── rooms/                (chambres & suites)
│       ├── restaurant/
│       ├── pool/
│       ├── spa/
│       ├── events/
│       ├── discover/
│       └── gallery/
├── src/
│   ├── main.tsx                 # Point d'entrée React
│   ├── App.tsx                  # Router + layout (Header/Footer)
│   ├── index.css                # Tailwind + classes utilitaires custom
│   ├── vite-env.d.ts
│   │
│   ├── components/              # Composants réutilisables
│   │   ├── Header.tsx / Footer.tsx
│   │   ├── Hero.tsx              # Hero plein écran page d'accueil
│   │   ├── PageHero.tsx          # Bannière des pages secondaires
│   │   ├── BookingBar.tsx        # ⭐ Barre de réservation (dates, chambres, invités)
│   │   ├── RoomCard.tsx          # Carte chambre
│   │   ├── ImageGallery.tsx      # Galerie + lightbox
│   │   ├── ContactForm.tsx
│   │   ├── GoogleMap.tsx
│   │   ├── LanguageSelector.tsx  # Bouton FR | EN
│   │   ├── SectionHeading.tsx
│   │   └── AnimatedSection.tsx   # Wrapper Framer Motion (reveal au scroll)
│   │
│   ├── pages/                   # Une page = une route
│   │   ├── Home.tsx              → /
│   │   ├── Rooms.tsx             → /chambres-suites
│   │   ├── Restaurant.tsx        → /restaurant
│   │   ├── Spa.tsx               → /piscine-bien-etre
│   │   ├── Events.tsx            → /reunions-evenements
│   │   ├── Discover.tsx          → /decouvrir-antsirabe
│   │   └── Contact.tsx           → /contact
│   │
│   ├── data/                    # ⭐ Contenu structuré (chambres, menu, tarifs...)
│   │   ├── rooms.ts               (4 chambres : prix, taille, équipements, images)
│   │   ├── menu.ts                (menu du restaurant, prix en Ariary)
│   │   ├── spa.ts                 (soins spa)
│   │   ├── events.ts              (salles de réunion, équipements)
│   │   ├── discover.ts            (activités, sites touristiques)
│   │   └── gallery.ts             (registre de toutes les images par catégorie)
│   │
│   ├── i18n/                    # ⭐ Traductions FR/EN
│   │   ├── index.ts               (config i18next)
│   │   └── locales/
│   │       ├── fr.ts               (tous les textes en français)
│   │       └── en.ts               (tous les textes en anglais)
│   │
│   ├── hooks/
│   │   ├── useLanguage.ts        (changement de langue)
│   │   └── useBooking.ts         (état du formulaire de réservation)
│   │
│   ├── utils/
│   │   ├── dateHelpers.ts        (formatage dates, calcul nuits)
│   │   └── helpers.ts            (formatage prix, validation email/tel)
│   │
│   └── types/
│       └── index.ts              (interfaces TypeScript : Room, MenuItem, etc.)
│
├── tailwind.config.js            # ⭐ Palette de couleurs, polices — voir section 6
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. 🖼️ Remplacer les images

**Toutes les images sont dans `public/images/`, organisées par catégorie.** Il suffit de remplacer un fichier par un autre **du même nom** pour changer l'image affichée — aucune modification de code n'est nécessaire.

| Dossier | Utilisé pour | Fichiers actuels | Taille recommandée |
|---|---|---|---|
| `public/images/hero/` | Image plein écran de l'accueil | `hero-building.jpg` | 1920×1280px min, paysage |
| `public/images/rooms/` | Chambres & Suites | `room-1.jpg` à `room-4.jpg` | 1600×1067px |
| `public/images/restaurant/` | Page Restaurant | `restaurant-1.jpg`, `restaurant-2.jpg`, `food-1.jpg`, `breakfast-1.jpg` | 1600×1067px |
| `public/images/pool/` | Piscine | `pool-1.jpg` à `pool-3.jpg` | 1600×1067px |
| `public/images/spa/` | Spa & Bien-être | `spa-1.jpg` à `spa-3.jpg` | 1600×1067px |
| `public/images/events/` | Réunions & Événements | `events-1.jpg` à `events-3.jpg` | 1600×1067px |
| `public/images/discover/` | Découvrir Antsirabe | `antsirabe-1.jpg` à `antsirabe-3.jpg`, `garden-1.jpg` | 1600×1067px |
| `public/images/gallery/` | Galerie générale (lobby...) | `lobby-1.jpg` | 1600×1067px |

### Pour ajouter/changer une image avec un **nouveau nom de fichier** :
1. Placez le nouveau fichier dans le bon dossier (`public/images/<categorie>/`).
2. Mettez à jour le chemin dans le fichier de données correspondant :
   - Chambres → `src/data/rooms.ts` (tableau `images: [...]`)
   - Galerie générale par page → `src/data/gallery.ts`
   - Hero de l'accueil → `src/components/Hero.tsx` (variable `heroImage` en haut du fichier)
   - Bannières des pages secondaires → dans chaque fichier de `src/pages/*.tsx`, propriété `image=` du composant `<PageHero />`

> Toutes les images actuelles proviennent de banques libres de droits (Creative Commons / domaine public : Pixnio, PickPik, PICRYL, PxHere, StockSnap, etc.) ou ont été générées par IA (image du hero). **Elles sont temporaires et destinées à être remplacées par de vraies photos de l'hôtel.**

---

## 5. 🌍 Modifier les textes & traductions

Tous les textes du site (sauf données structurées comme les prix) sont centralisés dans **deux fichiers** :

- `src/i18n/locales/fr.ts` — textes français
- `src/i18n/locales/en.ts` — textes anglais

Chaque fichier est un objet JavaScript organisé par **namespace** (une section du site) puis par **clé** :

```typescript
export default {
  hero: {
    title: 'LA COLONGETTE',
    subtitle: 'ANTSIRABE',
    tagline: 'Une adresse de charme au cœur d\'Antsirabe',
  },
  nav: {
    rooms: 'Chambres & Suites',
    restaurant: 'Restaurant',
    // ...
  },
  // ... home, rooms, restaurant, spa, events, discover, contact, footer, booking
}
```

**Pour modifier un texte** : ouvrez `fr.ts` (et son équivalent dans `en.ts`), cherchez la clé (ex. `hero.tagline`), et changez la valeur entre guillemets. Le changement apparaît immédiatement après `npm run dev` ou après un nouveau `npm run build`.

⚠️ **Important** : gardez toujours les **mêmes clés** dans `fr.ts` et `en.ts` — seul le texte (la valeur) doit différer, pas la structure de l'objet.

---

## 6. 💰 Modifier les prix, chambres, menu

### Chambres (`src/data/rooms.ts`)
```typescript
{
  id: 'classic',
  slug: 'chambre-classique',
  translationKey: 'classic',   // doit correspondre à roomsData.classic dans fr.ts/en.ts
  price: 65,                    // prix en euros / nuit
  currency: 'EUR',
  images: ['/images/rooms/room-4.jpg', '/images/rooms/room-1.jpg'],
  size: 22,                     // m²
  maxGuests: 2,
  amenities: ['wifi', 'ac', 'tv', 'minibar'],
}
```
Pour **ajouter une nouvelle chambre** : dupliquez un objet du tableau, changez `id`/`slug`/`translationKey`, puis ajoutez la traduction correspondante (`roomsData.<translationKey>`) dans `fr.ts` et `en.ts`.

### Menu du restaurant (`src/data/menu.ts`)
Prix en Ariary (MGA). Chaque item a un nom/description en FR (`name`, `description`) et EN (`nameEn`, `descriptionEn`).

### Soins spa (`src/data/spa.ts`), salles d'événements (`src/data/events.ts`), activités touristiques (`src/data/discover.ts`)
Même logique : chaque fichier exporte un tableau d'objets simples à dupliquer/modifier.

---

## 7. 🎨 Personnaliser les couleurs & la typographie

Tout est centralisé dans **`tailwind.config.js`** :

```javascript
theme: {
  extend: {
    colors: {
      gold: { 500: '#C9A961', ... },   // couleur signature (or)
      cream: '#F5F5F0',                 // fond clair
      charcoal: '#2C2C2C',              // texte foncé
    },
    fontFamily: {
      serif: ['Playfair Display', 'serif'],  // titres
      sans: ['Inter', 'sans-serif'],          // texte courant
    },
  },
},
```

Changez les valeurs hexadécimales pour adapter la palette. Les polices sont chargées depuis Google Fonts dans `index.html` — remplacez les liens `<link>` si vous changez de police.

---

## 8. 🔧 Fonctionnalités techniques

### Sélecteur de langue FR/EN
- Composant `LanguageSelector.tsx`, géré par `useLanguage.ts`.
- La langue choisie est sauvegardée dans `localStorage` (clé `royalpalace_lang`) et restaurée à la prochaine visite.

### Barre de réservation (`BookingBar.tsx`)
- Champs date d'arrivée/départ (`<input type="date">` natif, validé par `dateHelpers.ts` pour empêcher une date de départ avant l'arrivée).
- Sélecteur chambres/adultes/enfants avec boutons +/-.
- Le bouton **"CHECK AVAILABILITY"** appelle `useBooking.ts → submitSearch()`, qui :
  1. Affiche actuellement la requête dans la console (`console.log`).
  2. Redirige vers `/chambres-suites?checkin=...&checkout=...&rooms=...` avec les paramètres en query string.
  3. **Prêt pour une vraie API** : le commentaire `// API-READY` dans `useBooking.ts` indique exactement où remplacer le `console.log` par un `fetch('/api/availability', {...})` vers votre moteur de réservation réel (Cloudflare Worker, Booking Engine tiers, etc.).

### Formulaires (Contact, Événements)
- Validation côté client (email, téléphone, champs requis) dans `ContactForm.tsx` et `Events.tsx`.
- Soumission actuelle : `console.log(data)` + simulation de délai réseau + message de succès/erreur affiché à l'utilisateur.
- **Pour connecter un vrai backend** : remplacez la fonction `fakeSubmit()` par un appel `fetch` vers votre service (ex. Formspree, Resend, ou une API Cloudflare Worker dédiée).

### Galerie photo avec lightbox (`ImageGallery.tsx`)
- Grille responsive (2/3/4 colonnes selon la taille d'écran).
- Clic sur une image → plein écran avec navigation clavier (flèches gauche/droite, `Échap` pour fermer).
- Chargement différé (`loading="lazy"`) pour la performance.

### Carte Google Maps (`GoogleMap.tsx`)
- Intégration via iframe (aucune clé API requise), centrée sur l'adresse de l'hôtel.
- Pour changer l'emplacement, modifiez la variable de requête dans `GoogleMap.tsx`.

### Animations (Framer Motion)
- Le composant `AnimatedSection.tsx` enveloppe n'importe quel bloc pour lui donner un effet d'apparition au scroll (`whileInView`).
- Variantes disponibles : `up`, `fade`, `left`, `right` (prop `variant`).

---

## 9. 📱 Responsive & performance

- Design **mobile-first**, testé sur mobile (390px), tablette et desktop.
- Menu mobile : icône hamburger → menu plein écran avec tous les liens.
- Images en chargement différé (`lazy loading`) hors de la zone visible immédiate.
- Build de production optimisé par Vite : CSS ~25 Ko (gzip ~5 Ko), JS ~455 Ko (gzip ~141 Ko).

---

## 10. 🚀 Déploiement en production

Le site est **100% statique** (aucun serveur requis) — le dossier `dist/` généré par `npm run build` peut être déployé sur n'importe quel hébergeur de sites statiques.

### Option A — Cloudflare Pages (recommandé)
```bash
npm run build
npx wrangler pages deploy dist --project-name royal-palace-antsirabe
```
(nécessite un compte Cloudflare et `wrangler` configuré — voir [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/))

### Option B — Netlify
```bash
npm run build
# puis glissez-déposez le dossier dist/ sur app.netlify.com/drop
```

### Option C — Vercel
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Option D — Tout hébergeur statique (OVH, o2switch, GitHub Pages...)
Uploadez simplement le contenu du dossier `dist/` généré par `npm run build` à la racine de votre hébergement web.

> ⚠️ Le site utilise React Router avec des URLs "propres" (ex. `/chambres-suites`). Sur certains hébergeurs statiques, vous devrez configurer une règle de **réécriture SPA** (rediriger toutes les routes vers `index.html`) — c'est automatique sur Cloudflare Pages/Netlify/Vercel, mais peut nécessiter un fichier `.htaccess` ou `_redirects` sur d'autres hébergeurs.

---

## 11. ℹ️ Notes & limitations connues

- **Aucun backend réel** : les formulaires (contact, réservation, demande d'événement) fonctionnent visuellement (validation, messages de succès) mais n'envoient rien à un vrai serveur — ils affichent la donnée dans la console navigateur (`F12 → Console`). Voir section 8 pour les connecter à une vraie API.
- **Images temporaires** : toutes les photos sont des images libres de droits ou générées par IA, à remplacer par de vraies photos de l'établissement (voir section 4).
- **`npm audit`** signale 4 vulnérabilités mineures (3 modérées, 1 haute) dans les dépendances `esbuild` (utilisé uniquement par le serveur de développement, sans impact en production) et `react-router` (redirection ouverte théorique, sans impact ici car le site n'a pas d'authentification). Une mise à jour majeure (`npm audit fix --force`) est possible mais implique des changements de version majeurs (Vite 6→8, React Router 6→7) qui n'ont pas été testés dans le cadre de cette livraison — à évaluer avant mise à jour.
- **Positionnement "5 étoiles"** : l'établissement réel est classé 3 étoiles ; le site le présente en 5 étoiles à la demande explicite du client pour le repositionnement marketing.

---

## 12. Contenu & sources

Le contenu (histoire, restaurant, coordonnées) a été extrait du site officiel [hotel-royal-palace.com](https://hotel-royal-palace.com/) et complété par les informations publiques des fiches Google (adresse, horaires, hôtels sœurs La Colongette / Marina Beach / Vezo Beach). Tous les textes sont fournis en français (langue principale) avec traduction anglaise complète.

---

**Stack technique** : React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · React Router 6 · i18next · Framer Motion · Lucide React · date-fns
**Dernière mise à jour** : Septembre 2026
