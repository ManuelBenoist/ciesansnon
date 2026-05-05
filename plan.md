# PLAN_ACTION.md — Refonte site vitrine « La Cie Sans Non »
> Stack : Nuxt 4 · SSG · Tailwind CSS · Nuxt Content v3 · Formspree · GitHub Actions → OVH
> Ambiance : Scénique sombre · Français uniquement · Photos

---

## 0. Vue d'ensemble du projet

| Paramètre | Valeur |
|---|---|
| Nom | Cie Sans Non |
| Site actuel | ciesansnon.com (Hostinger no-code) |
| Inspiration design | armoisecommune.com |
| Mode de rendu | SSG (`nuxt generate`) |
| Hébergement | OVH (FTP/SSH) via GitHub Actions |
| Langue | Français uniquement pour le moment |
| Thème | Sombre — fond noir/anthracite, texte clair |
| Formulaire | Formspree (client-side, sans serveur) |
| Médias | Photos uniquement (lightbox), pour l'instant |
| Dates spectacles | Structure prête, contenu vide au lancement |

---

## 1. Stack Technique Détaillée

```bash
# Dépendances principales
nuxt@^4.x
@nuxt/content@^3.x        # Markdown/YAML pour les créations & actus
@nuxtjs/tailwindcss        # Styling utility-first
@nuxt/image                # Optimisation images (lazy, formats modernes)
@vueuse/nuxt               # Composables utilitaires (useScroll, useIntersectionObserver…)
nuxt-icon                  # Icônes via Iconify (ou @iconify/vue)

# Fonts (auto-hébergées, pas de Google Fonts call externe = RGPD + perf)
@fontsource/cormorant-garamond
@fontsource/dm-sans

# Dev
eslint + @nuxt/eslint
prettier
```

> **Pas de Framer Motion** (lib React). Pour les animations : **CSS transitions/keyframes natifs** + `@vueuse/core` (`useIntersectionObserver`) pour les reveals au scroll. Utiliser `motion-v` (port Vue de Motion) pour les entrées en scène et Vibe : Fade-in lents (800ms) et effets spotlight au hover des cartes.

---

## 2. Architecture Informationnelle

### 2.1 Plan du site

```
/                          → Accueil
/creations                 → Liste de toutes les créations
/creations/[slug]          → Fiche spectacle individuelle
/la-compagnie              → La Compagnie (membres + organigramme)
/actions-culturelles       → Arts de la scène / médiation culturelle
/contact                   → Formulaire de contact
```

### 2.2 Description des pages

#### `/` — Accueil
**But :** Premier contact émotionnel. Capter l'identité de la compagnie en quelques secondes.
- Hero plein écran avec nom de la compagnie + baseline, image de scène en fond (effet grain/vignette)
- Courte présentation de la compagnie (2–3 phrases, lien vers `/la-compagnie`)
- Section « À l'affiche / En tournée » : les créations actives (cards), lien vers `/creations`
- Section « Actions culturelles » : accroche + lien vers `/actions-culturelles`
- Section « Dernières nouvelles » (si actus Markdown disponibles, sinon masquée)
- Footer

#### `/creations` — Créations
**But :** Galerie des œuvres de la compagnie, vitrine artistique centrale.
- Grille de cards (2 col desktop, 1 col mobile) avec photo, titre, statut (badge « En création » / « En tournée » / « Archive »)
- Spectacles listés :
  - **Simple** — statut : `en-creation`
  - **Venavi** — statut : `en-tournee` (ou `archive`, à définir)
- Au clic → fiche individuelle `/creations/[slug]`

#### `/creations/[slug]` — Fiche Spectacle
**But :** Page immersive dédiée à une création.
- Hero avec visuel plein largeur + titre en overlay typographique
- Synopsis / note d'intention (Markdown)
- Distribution / casting
- Équipe technique
- Galerie photos (lightbox)
- Dates de représentations (section présente, affichage conditionnel si dates renseignées)
- Extraits presse / citations (optionnel, structure prête)
- Lien vers dossier de presse PDF (optionnel, structure prête)
- Navigation entre créations (précédente / suivante)

#### `/la-compagnie` — La Compagnie
**But :** Donner un visage humain et artistique à la compagnie.
- Texte de présentation de la compagnie (histoire, vision, démarche)
- Organigramme artistique et élégant (SVG ou CSS Grid custom, pas un schéma RH corporate)
- Grille des membres : photo + nom + rôle → clic → modal ou section dépliante avec biographie complète
- Partenaires / soutiens institutionnels (logos en bas de page)

#### `/actions-culturelles` — Actions Culturelles
**But :** Présenter le travail de médiation et l'engagement envers tous les publics.
- Texte reformulé et simplifié depuis ciesansnon.com/aller-vers-tous-les-publics
- Section « Arts de la scène » : paragraphe + éléments visuels (illustration ou photo)
- Mise en avant des publics visés (scolaires, établissements spécialisés, quartiers prioritaires…)
- Appel à l'action : contact pour monter une action culturelle

#### `/contact` — Contact
**But :** Permettre la prise de contact simple et directe.
- Formulaire (Formspree) : Nom, Email, Sujet (select : Diffusion / Résidences / Actions culturelles / Autre), Message
- Email de contact en texte clair (lien mailto en fallback)
- Liens réseaux sociaux (Instagram, Facebook, YouTube — à renseigner)
- Adresse postale / SIRET si pertinent
- Pas de Google Maps (vie privée + perf) — texte libre si localisation nécessaire

---

## 3. Structure des Dossiers Nuxt 4

> Nuxt 4 utilise le répertoire `app/` comme racine de l'application (breaking change vs Nuxt 3).

```
ciesansnon/
├── app/                          # Racine application Nuxt 4
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css          # Directives Tailwind + variables CSS custom
│   │   └── fonts/                # Fonts auto-hébergées (Cormorant, DM Sans)
│   ├── components/
│   │   ├── app/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppNav.vue
│   │   │   └── AppFooter.vue
│   │   ├── ui/
│   │   │   ├── UiButton.vue
│   │   │   ├── UiTag.vue         # Badge statut spectacle
│   │   │   ├── UiLightbox.vue
│   │   │   └── UiModal.vue       # Pour les fiches membres
│   │   ├── home/
│   │   │   ├── HomeHero.vue
│   │   │   ├── HomeCreations.vue
│   │   │   ├── HomeActions.vue
│   │   │   └── HomeActus.vue
│   │   ├── spectacle/
│   │   │   ├── CardSpectacle.vue
│   │   │   ├── SpectacleHero.vue
│   │   │   ├── SpectacleGallery.vue
│   │   │   ├── SpectacleDates.vue
│   │   │   ├── SpectacleCasting.vue
│   │   │   └── SpectacleNav.vue  # Précédent / Suivant
│   │   ├── compagnie/
│   │   │   ├── MembreCard.vue
│   │   │   ├── MembreModal.vue
│   │   │   └── OrganigrammeSection.vue
│   │   └── contact/
│   │       └── ContactForm.vue   # Formspree
│   ├── composables/
│   │   ├── useRevealOnScroll.ts  # IntersectionObserver pour animations
│   │   ├── useSeo.ts             # Wrapper useSeoMeta / useHead
│   │   └── useFormspree.ts       # Logique envoi Formspree
│   ├── layouts/
│   │   ├── default.vue           # Layout global (header + footer)
│   │   └── fullscreen.vue        # Layout sans header pour pages immersives
│   ├── pages/
│   │   ├── index.vue
│   │   ├── creations/
│   │   │   ├── index.vue
│   │   │   └── [slug].vue
│   │   ├── la-compagnie.vue
│   │   ├── actions-culturelles.vue
│   │   └── contact.vue
│   └── plugins/
│       └── scroll-reveal.client.ts
├── content/
│   ├── creations/
│   │   ├── simple.md
│   │   └── venavi.md
│   ├── membres/
│   │   ├── prenom-nom-1.md
│   │   └── prenom-nom-2.md
│   └── actus/
│       └── .gitkeep              # Vide au lancement, structure prête
├── public/
│   ├── images/
│   │   ├── creations/
│   │   │   ├── simple/
│   │   │   └── venavi/
│   │   ├── membres/
│   │   ├── og/                   # Open Graph images
│   │   └── logo.svg
│   ├── fonts/                    # Backup fonts statiques
│   └── favicon.ico
├── server/                       # Vide en SSG pur (pas d'API routes nécessaires)
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD GitHub Actions → OVH
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.example
```

---

## 4. Design System

### 4.1 Palette de couleurs (Tailwind custom)

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      scene: {
        black:    '#0c0c0c',   // Fond principal — noir profond scène
        dark:     '#161616',   // Fond sections alternées
        surface:  '#1e1e1e',   // Cards, modals, surfaces élevées
        border:   '#2e2e2e',   // Bordures subtiles
        muted:    '#5a5a5a',   // Texte tertiaire, placeholders
        light:    '#e8e2d9',   // Texte principal — blanc chaud ivoire
        cream:    '#f5f0e8',   // Titres, éléments forts
        gold:     '#c9a84c',   // Accent or — CTA, highlights, hover
        'gold-dim': '#8a6e2f', // Or sombre — états désactivés
        rouge:    '#8b2635',   // Accent rouge bordeaux — tags, badges
      }
    },
    fontFamily: {
      display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      // Échelle typographique modulaire
      'display-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      'display-xl':  ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.1' }],
      'display-lg':  ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.15' }],
    },
  }
}
```

### 4.2 Typographies

| Usage | Police | Style |
|---|---|---|
| **Titres h1, hero** | Cormorant Garamond | 300–400, italic possible |
| **Titres h2, h3** | Cormorant Garamond | 400–600 |
| **Corps de texte** | DM Sans | 300–400 |
| **Labels, navigation, caps** | DM Sans | 500, `tracking-widest`, uppercase |
| **Citations presse** | Cormorant Garamond | italic, 500 |

> Cormorant Garamond : typographie sérif avec une élégance théâtrale naturelle, très lisible même à grande taille sur fond sombre. Associée au DM Sans moderne, elle crée la tension juste entre scène et contemporain.

### 4.3 Effets visuels & atmosphère

```css
/* main.css — Variables CSS globales */
:root {
  --grain-opacity: 0.035;          /* Texture grain sur hero */
  --vignette-strength: 0.6;        /* Vignette sur images plein écran */
  --transition-page: 400ms ease;   /* Transitions de page Nuxt */
  --spotlight-color: rgba(201,168,76,0.06); /* Halo doré subtil */
}
```

**Effets à implémenter :**

| Effet | Composant | Technique |
|---|---|---|
| Grain cinématographique | `HomeHero`, `SpectacleHero` | Pseudo-élément SVG `feTurbulence` ou PNG noise overlay |
| Vignette sur images | Toutes images hero | `box-shadow: inset` ou gradient radial |
| Reveal au scroll | Toutes sections | `useIntersectionObserver` + classe `opacity-0 translate-y-4 → opacity-100 translate-y-0` |
| Hover card spectacle | `CardSpectacle` | Scale image + apparition overlay titre + border-color gold |
| Curseur custom | Global | CSS `cursor` + élément DOM suivi par JS (cercle doré discret) |
| Transition de page | Nuxt layout | `pageTransition: { name: 'fade', mode: 'out-in' }` + keyframes CSS |
| Underline animé | Navigation | `scaleX` sur pseudo-élément `::after` |
| Parallax léger | `HomeHero` | `useScroll` + `transform: translateY()` (désactivé sur mobile) |
| Lightbox photo | `SpectacleGallery` | `UiLightbox.vue` custom (pas de lib externe lourde) |
| Modal membre | `MembreCard` → `MembreModal` | Teleport + transition fade/scale |

### 4.4 Principes UX

- **Mobile-first** : tous les composants pensés 375px → desktop
- **Contrastes** : ratio AA minimum sur tous les textes (fond `#0c0c0c` + texte `#e8e2d9` = ✅ ~14:1)
- **Navigation claire** : sticky header avec logo + liens + hamburger mobile (menu plein écran sur mobile)
- **Pas de carousel auto** : l'auto-play est agressif ; préférer grille statique ou navigation manuelle
- **Images optimisées** : `<NuxtImg>` pour WebP auto + lazy loading + dimensions explicites

---

## 5. Schéma de Données Markdown / YAML

### 5.1 Fiche Spectacle (`content/creations/[slug].md`)

```yaml
---
# ── Identité ──────────────────────────────────────────────────────
titre: "Venavi"
slug: "venavi"
statut: "en-tournee"          # en-creation | en-tournee | archive
annee: 2023
duree: "1h20 sans entracte"

# ── Visuels ───────────────────────────────────────────────────────
image_affiche: "/images/creations/venavi/affiche.jpg"
image_hero: "/images/creations/venavi/hero.jpg"
galerie:
  - "/images/creations/venavi/photo-1.jpg"
  - "/images/creations/venavi/photo-2.jpg"
  - "/images/creations/venavi/photo-3.jpg"
alt_hero: "Scène de Venavi — deux comédiens face à face dans la pénombre"

# ── Textes ────────────────────────────────────────────────────────
accroche: "Un voyage entre deux mondes, deux langues, deux silences."
# Le corps de la note d'intention est dans le body Markdown (après le front matter)

# ── Équipe artistique ─────────────────────────────────────────────
mise_en_scene: "Prénom Nom"
auteur: "Prénom Nom"           # null si création collective
casting:
  - nom: "Prénom Nom"
    role: "Personnage A"
  - nom: "Prénom Nom"
    role: "Personnage B"
equipe_technique:
  - poste: "Scénographie"
    nom: "Prénom Nom"
  - poste: "Lumières"
    nom: "Prénom Nom"
  - poste: "Son"
    nom: "Prénom Nom"
  - poste: "Costumes"
    nom: "Prénom Nom"

# ── Dates & diffusion ─────────────────────────────────────────────
dates:                         # Vide au lancement — structure prête
  - lieu: "Théâtre du Peuple, Bussang"
    ville: "Bussang (88)"
    debut: "2024-07-15"
    fin: "2024-07-20"
    lien_billetterie: "https://..."
  - lieu: "..."
    ville: "..."
    debut: "2024-09-10"
    fin: null                  # Date unique

# ── Presse ────────────────────────────────────────────────────────
citations_presse:              # Optionnel — vide au lancement
  - source: "Télérama"
    texte: "Une pièce qui bouleverse."
    date: "2023-11-01"
dossier_presse_url: null       # "/documents/venavi-dp.pdf" quand dispo

# ── SEO ───────────────────────────────────────────────────────────
seo_title: "Venavi — Création théâtrale | La Cie Sans Non"
seo_description: "Venavi, pièce de théâtre mise en scène par… Découvrez la création de la Compagnie Sans Non."

# ── Tri/ordre ─────────────────────────────────────────────────────
ordre: 1                       # Ordre d'affichage dans la liste
featured: true                 # Mis en avant sur l'accueil ?
---

<!-- BODY MARKDOWN : Note d'intention / synopsis long -->
## Note d'intention

Lorem ipsum — texte libre en Markdown, richement formaté...
```

### 5.2 Fiche Membre (`content/membres/[slug].md`)

```yaml
---
nom: "Prénom Nom"
slug: "prenom-nom"
role_compagnie: "Metteur en scène / Comédien"
role_court: "Direction artistique"     # Affiché dans l'organigramme
photo: "/images/membres/prenom-nom.jpg"
alt_photo: "Portrait de Prénom Nom"
ordre: 1
dans_organigramme: true
---

<!-- BODY : biographie affichée dans la modal -->
Biographie en Markdown libre...
```

### 5.3 Actualité (`content/actus/[slug].md`)

```yaml
---
titre: "La compagnie en résidence à…"
slug: "residence-2024"
date: "2024-03-15"
image: "/images/actus/residence-2024.jpg"
accroche: "Courte description pour la card."
---

<!-- BODY : article complet -->
```

---

## 6. Composants Vue 3 — Détail

### 6.1 Layout & Navigation

#### `AppHeader.vue`
- Logo (SVG inline pour qualité) + nom compagnie
- Liens de navigation desktop (Créations, La Compagnie, Actions culturelles, Contact)
- Underline animé sur lien actif (`useRoute`)
- Bouton hamburger mobile → déclenche `AppNav.vue`
- Fond transparent sur hero → fond `scene-dark/95 backdrop-blur` au scroll (`useScroll`)
- Props : aucune (state global via composable)

#### `AppNav.vue` (menu mobile)
- Overlay plein écran `scene-black/98`
- Liens en grand (Cormorant Garamond, taille display)
- Animation : slide-in depuis la droite ou fade
- Fermeture au clic sur lien ou croix
- Liens réseaux sociaux en bas

#### `AppFooter.vue`
- Logo + baseline
- Liens de navigation secondaire
- Réseaux sociaux (icônes Iconify : `mdi:instagram`, `mdi:facebook`, `mdi:youtube`)
- Email de contact + lien Formspree mailto fallback
- Mentions légales | Crédits photos
- Copyright automatique `{{ new Date().getFullYear() }}`

### 6.2 Composants UI réutilisables

#### `UiButton.vue`
```
Props : label, href, variant ('primary'|'ghost'|'outline'), size, target
Variants :
  - primary : fond gold, texte noir, hover fond gold-dim
  - ghost   : texte gold, pas de fond, hover texte cream
  - outline : bordure gold, hover fond gold/10
```

#### `UiTag.vue`
```
Props : label, color
Couleurs : 'gold' (En tournée) | 'rouge' (En création) | 'muted' (Archive)
Style : uppercase, tracking-widest, DM Sans 500, petit
```

#### `UiLightbox.vue`
- Galerie photos avec navigation (flèches, clavier ←→, Escape)
- Fond noir opaque, image centrée avec `object-contain`
- Swipe mobile via `useSwipe` (VueUse)
- Compteur `X / N`
- Pas de dépendance externe

#### `UiModal.vue`
- Teleport vers `<body>`
- Overlay semi-transparent + `backdrop-blur`
- Fermeture clic overlay ou Escape
- Slot default pour contenu libre
- Transition `scale(0.95) opacity-0 → scale(1) opacity-100`

### 6.3 Page Accueil

#### `HomeHero.vue`
- Image plein écran avec overlay gradient + grain
- `<h1>` : nom compagnie en Cormorant Garamond display-2xl
- Sous-titre / baseline
- Scroll indicator (flèche animée en bas)
- Parallax léger image (désactivé `prefers-reduced-motion`)

#### `HomeCreations.vue`
- Titre de section + lien « Toutes les créations »
- Requête `queryCollection('creations').where('featured', '==', true)`
- Grille 2 col desktop, 1 col mobile
- Composant `CardSpectacle.vue`

#### `HomeActions.vue`
- Section avec image + texte côte à côte (inversé sur mobile)
- Accroche + paragraphe + `UiButton`

#### `HomeActus.vue`
- 3 dernières actus (si contenu disponible)
- Masquée conditionnellement si aucune actu (`v-if`)

### 6.4 Créations

#### `CardSpectacle.vue`
```
Props : titre, slug, statut, image, accroche
Comportement :
  - Image en fond avec overlay gradient bas
  - Titre sur l'image, accroche apparaît au hover
  - UiTag statut en haut à gauche
  - Toute la card est un <NuxtLink>
  - Hover : légère scale image (1.05) + bordure gold bottom
  - Ratio image : 3/4 (portrait affiche théâtre)
```

#### `SpectacleHero.vue`
- Image hero plein largeur avec overlay fort
- Titre centré ou positionné bas-gauche selon image
- Breadcrumb : Accueil > Créations > [Titre]
- Durée + année en petits labels

#### `SpectacleGallery.vue`
- Grid photos masonry-like (CSS columns ou CSS Grid)
- Clic → `UiLightbox.vue`
- `<NuxtImg>` avec `loading="lazy"` et `sizes` responsive

#### `SpectacleDates.vue`
- Liste des dates depuis frontmatter
- Si `dates` vide ou null → section masquée (`v-if`)
- Chaque date : lieu, ville, période, lien billetterie conditionnel
- Style : tableau épuré ou liste avec séparateurs

#### `SpectacleCasting.vue`
- Distribution et équipe technique
- Deux colonnes ou sections distinctes

#### `SpectacleNav.vue`
- Bas de fiche : « Spectacle précédent » ← → « Spectacle suivant »
- Requête des slugs adjacents via Nuxt Content

### 6.5 La Compagnie

#### `MembreCard.vue`
```
Props : nom, role_court, photo, alt_photo, slug
Comportement :
  - Photo en noir & blanc → couleur au hover (CSS filter)
  - Nom + rôle sous la photo
  - Clic → ouvre UiModal avec contenu de MembreModal.vue
```

#### `MembreModal.vue`
- Photo (couleur)
- Nom, rôle complet
- Biographie (body Markdown du fichier membre)
- Bouton fermeture

#### `OrganigrammeSection.vue`
- Design : arbre SVG ou CSS Grid custom — **pas de lib diagramme**
- Style artistique : traits fins gold sur fond dark, typographie Cormorant
- Hiérarchie : Direction artistique → Comédiens → Équipe technique → Administration
- Responsive : version verticale sur mobile, horizontale sur desktop
- Les noms sont cliquables → ouvrent le modal du membre

### 6.6 Contact

#### `ContactForm.vue`
```
Champs :
  - Nom (text, required)
  - Email (email, required)
  - Sujet (select) : Diffusion | Résidences | Actions culturelles | Presse | Autre
  - Message (textarea, required)
  - Honeypot anti-spam (champ caché)

Intégration Formspree :
  - POST vers https://formspree.io/f/{FORM_ID}
  - Gestion états : idle | loading | success | error
  - Pas de redirection (AJAX mode)
  - useFormspree.ts : composable dédié

UX :
  - Validation inline (HTML5 + custom)
  - Message succès élégant (pas d'alert JS)
  - Accessibilité : labels, aria-describedby pour les erreurs
```

---

## 7. SEO — Stratégie Complète

### 7.1 Métadonnées (composable `useSeo.ts`)

```ts
// app/composables/useSeo.ts
export function useSeo(options: {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}) {
  const siteName = 'La Cie Sans Non'
  const siteUrl = 'https://ciesansnon.com'

  useSeoMeta({
    title: `${options.title} | ${siteName}`,
    description: options.description,
    ogTitle: `${options.title} | ${siteName}`,
    ogDescription: options.description,
    ogImage: options.image ?? `${siteUrl}/images/og/default.jpg`,
    ogUrl: siteUrl,
    ogType: options.type ?? 'website',
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: `${options.title} | ${siteName}`,
    twitterDescription: options.description,
    twitterImage: options.image ?? `${siteUrl}/images/og/default.jpg`,
  })

  useHead({
    htmlAttrs: { lang: 'fr' },
    link: [{ rel: 'canonical', href: siteUrl }],
  })
}
```

### 7.2 Fichiers SEO à créer

```
public/
├── robots.txt          # Allow all + Sitemap URL
├── sitemap.xml         # Auto-généré par @nuxtjs/sitemap (à ajouter)
└── images/og/
    ├── default.jpg     # 1200×630 — image Open Graph par défaut
    ├── creations.jpg
    └── [par spectacle, généré manuellement ou avec Satori]
```

### 7.3 `nuxt.config.ts` — Clés SEO

```ts
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0c0c0c' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  // Données structurées JSON-LD par page (Schema.org)
  // À implémenter via useHead() dans chaque page
})
```

### 7.4 Données structurées JSON-LD (Schema.org)

- Page d'accueil → `Organization` + `WebSite`
- Fiche spectacle → `Event` (pour les dates) + `CreativeWork`
- Page contact → `LocalBusiness` (si applicable)

### 7.5 Performance (Core Web Vitals)

- `<NuxtImg>` sur toutes les images (WebP auto, srcset, lazy)
- Fonts auto-hébergées (pas de Google Fonts = pas de requête externe)
- Pas de lib JS lourde (pas de jQuery, pas de Framer Motion)
- CSS Tailwind purgé à la compilation
- `prefetch` automatique Nuxt sur les `<NuxtLink>` visibles

---

## 8. Responsive Design — Règles Globales

| Breakpoint Tailwind | Largeur | Notes |
|---|---|---|
| `base` (mobile) | 375px+ | Navigation hamburger, 1 colonne, polices réduites |
| `sm` | 640px+ | Légères adaptations |
| `md` | 768px+ | Début 2 colonnes certaines sections |
| `lg` | 1024px+ | Navigation desktop, grilles complètes |
| `xl` | 1280px+ | Max-width container 1200px centré |
| `2xl` | 1536px+ | Pas de changement majeur (éviter trop grand) |

**Règles spécifiques :**
- Hero : `h-screen` sur desktop, `min-h-[80svh]` sur mobile
- Grille créations : `grid-cols-1 md:grid-cols-2`
- Grille membres : `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Navigation mobile : plein écran overlay
- Organigramme : colonne unique sur mobile, arbre sur desktop
- Texte : `clamp()` pour les titres (pas de breakpoints multiples)
- Parallax : désactivé sous `md`
- Touch targets : minimum 44×44px sur tous les éléments interactifs

---

## 9. Déploiement GitHub Actions → OVH

### 9.1 Variables d'environnement (`.env.example`)

```bash
# Formspree
NUXT_PUBLIC_FORMSPREE_ID=xxxxxxxx

# Analytics (optionnel — Plausible, RGPD-friendly)
NUXT_PUBLIC_PLAUSIBLE_DOMAIN=ciesansnon.com

# OVH FTP (dans les secrets GitHub)
OVH_FTP_HOST=ftp.cluster0XX.hosting.ovh.net
OVH_FTP_USER=votre_identifiant
OVH_FTP_PASS=votre_mot_de_passe
OVH_FTP_PATH=/www/                           # Ou /home/ciesansnon/www/
```

### 9.2 `.github/workflows/deploy.yml`

```yaml
name: Build & Deploy → OVH

on:
  push:
    branches: [main]
  workflow_dispatch:              # Déclenchement manuel possible

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate static site
        run: npm run generate
        env:
          NUXT_PUBLIC_FORMSPREE_ID: ${{ secrets.FORMSPREE_ID }}

      - name: Deploy to OVH via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.OVH_FTP_HOST }}
          username: ${{ secrets.OVH_FTP_USER }}
          password: ${{ secrets.OVH_FTP_PASS }}
          local-dir: .output/public/          # Dossier généré par nuxt generate
          server-dir: ${{ secrets.OVH_FTP_PATH }}
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
```

> **Secrets GitHub à configurer** dans Settings → Secrets → Actions :
> `OVH_FTP_HOST`, `OVH_FTP_USER`, `OVH_FTP_PASS`, `OVH_FTP_PATH`, `FORMSPREE_ID`

### 9.3 `nuxt.config.ts` complet

```ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  future: { compatibilityVersion: 4 },  // Active Nuxt 4

  nitro: {
    preset: 'static',            // SSG
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-icon',
    // '@nuxtjs/sitemap',        // À ajouter si besoin sitemap auto
  ],

  content: {
    highlight: false,             // Pas de coloration syntaxique (pas de blog code)
  },

  image: {
    quality: 85,
    format: ['webp', 'jpg'],
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'theme-color', content: '#0c0c0c' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      formspreeId: process.env.NUXT_PUBLIC_FORMSPREE_ID,
    },
  },
})
```

---

## 10. Phases d'Implémentation

### Phase 1 — Fondations & Setup (Jour 1 — demi-journée)
**Objectif : projet qui tourne en local avec le design system en place.**

```
✅ npx nuxi@latest init ciesansnon --template v4
✅ Installer toutes les dépendances (npm install)
✅ Configurer nuxt.config.ts (modules, nitro preset static, runtimeConfig)
✅ Configurer tailwind.config.ts (palette scene, fonts, fontSize clamp)
✅ Créer app/assets/css/main.css (directives Tailwind, variables CSS, keyframes)
✅ Intégrer les fonts Cormorant Garamond + DM Sans (auto-hébergées)
✅ Créer layout default.vue (AppHeader + <slot> + AppFooter squelettes)
✅ Créer AppHeader.vue squelette (logo placeholder + liens)
✅ Créer AppFooter.vue squelette
✅ Configurer page transitions CSS (fade out-in)
✅ Créer les composables useSeo.ts et useRevealOnScroll.ts
✅ Créer les fichiers Markdown de contenu placeholder :
    content/creations/simple.md
    content/creations/venavi.md
    content/membres/*.md (un par membre)
✅ Vérifier que `nuxt dev` tourne sans erreur
```

### Phase 2 — Composants UI & Système de Design (Jour 1 fin + Jour 2 matin)
**Objectif : bibliothèque de composants réutilisables opérationnelle.**

```
✅ UiButton.vue (variants primary, ghost, outline)
✅ UiTag.vue (statuts spectacle colorés)
✅ UiModal.vue (Teleport + transitions + fermeture Escape)
✅ UiLightbox.vue (galerie avec navigation clavier + swipe)
✅ AppHeader.vue complet (scroll behavior, lien actif)
✅ AppNav.vue (menu mobile overlay plein écran animé)
✅ AppFooter.vue complet (réseaux sociaux, email, mentions)
✅ Curseur custom (optionnel — petit cercle gold)
✅ Tester tous les composants sur une page /test (à supprimer ensuite)
```

### Phase 3 — Pages Statiques (Jour 2)
**Objectif : toutes les pages sans la partie Créations dynamique.**

```
✅ pages/index.vue
    → HomeHero.vue (image + grain + titre)
    → HomeCreations.vue (grille cards, data statique provisoire)
    → HomeActions.vue (texte + image)
    → HomeActus.vue (masquée, v-if)
✅ pages/la-compagnie.vue
    → Texte présentation compagnie
    → OrganigrammeSection.vue (SVG/CSS Grid artistique)
    → Grille MembreCard.vue → UiModal → MembreModal.vue
    → Section partenaires/soutiens
✅ pages/actions-culturelles.vue
    → Texte arts de la scène (simplifié depuis site actuel)
    → Sections visuelles (image + blocs texte)
    → CTA contact
✅ pages/contact.vue
    → ContactForm.vue + intégration Formspree (useFormspree.ts)
    → Email + réseaux sociaux
✅ SEO : useSeo() dans chaque page
✅ JSON-LD : Organization + WebSite sur l'accueil
✅ Vérifier responsive sur toutes les pages (DevTools 375px, 768px, 1280px)
```

### Phase 4 — Section Créations Dynamique (Jour 3 matin)
**Objectif : pages spectacles générées depuis Markdown.**

```
✅ pages/creations/index.vue
    → queryCollection('creations').order('ordre', 'ASC')
    → CardSpectacle.vue avec UiTag statut
    → Layout grille responsive
✅ pages/creations/[slug].vue
    → queryCollection('creations').where('slug', '==', slug)
    → SpectacleHero.vue
    → Corps Markdown (<ContentRenderer>)
    → SpectacleCasting.vue
    → SpectacleGallery.vue + UiLightbox
    → SpectacleDates.vue (v-if dates.length)
    → SpectacleNav.vue (précédent/suivant)
    → SEO dynamique (seo_title + seo_description du frontmatter)
    → JSON-LD CreativeWork + Event (si dates)
✅ Remplir les fichiers Markdown simple.md et venavi.md avec contenu réel
✅ Ajouter les photos dans public/images/creations/
✅ Tester génération statique : npm run generate
```

### Phase 5 — Finitions, Perf & Déploiement (Jour 3 après-midi + Jour 4)
**Objectif : site en production, performant et maintenable.**

```
✅ Animations & reveals au scroll (useRevealOnScroll sur toutes sections)
✅ Vérifier que toutes les images passent par <NuxtImg>
✅ Créer public/robots.txt
✅ Créer les images Open Graph (public/images/og/)
✅ Audit accessibilité : balises alt, labels formulaire, focus visible, aria
✅ Test Lighthouse (viser 95+ Performance, 100 SEO, 100 Accessibility)
✅ Test formulaire Formspree (envoi réel)
✅ Test responsive final (vrai iPhone + Android)
✅ Configurer les secrets GitHub (FTP OVH, Formspree ID)
✅ Push sur main → vérifier que GitHub Actions se déclenche
✅ Vérifier le déploiement sur OVH
✅ Configurer le DNS (pointer ciesansnon.com vers OVH si pas fait)
✅ Activer HTTPS (Let's Encrypt via OVH — automatique sur hébergement mutualisé)
✅ Test final en production (formulaire, images, transitions)
✅ Supprimer la page /test
✅ Tag v1.0.0 sur GitHub
```

---

## 11. Checklist Lancement

### Contenu minimum requis avant mise en ligne
- [ ] Logo SVG/PNG haute résolution
- [ ] Photos hero (minimum 1 par spectacle, 1 pour l'accueil)
- [ ] Texte de présentation compagnie
- [ ] Biographies des membres (même courtes)
- [ ] Texte actions culturelles (reformulé depuis site actuel)
- [ ] Email de contact réel dans ContactForm + Footer
- [ ] ID Formspree actif et testé
- [ ] Liens réseaux sociaux réels

### Contenu pouvant être ajouté après lancement (structure déjà prête)
- [ ] Dates de représentations dans les frontmatters
- [ ] Galeries photos étoffées
- [ ] Citations presse
- [ ] Dossiers de presse PDF
- [ ] Actualités (content/actus/)

---

## 12. Maintenance & Mise à jour du Contenu

Toute mise à jour de contenu ne nécessite **aucune connaissance technique** au-delà de l'édition Markdown :

| Action | Fichier à modifier | Déploiement |
|---|---|---|
| Ajouter une date de spectacle | `content/creations/[slug].md` → `dates:` | Push GitHub → auto |
| Ajouter une actualité | Créer `content/actus/nouvelle-actu.md` | Push GitHub → auto |
| Modifier une biographie | `content/membres/[slug].md` | Push GitHub → auto |
| Changer une photo | Remplacer dans `public/images/` | Push GitHub → auto |
| Modifier le texte d'une page statique | `app/pages/[page].vue` | Push GitHub → auto |

> **Recommandation** : utiliser l'éditeur GitHub.com directement pour les modifications Markdown — pas besoin d'environnement local pour les mises à jour de contenu.

---

*Document généré pour OpenCode — Compagnie Sans Non — Refonte 2026*
*Stack : Nuxt 4 SSG · Tailwind CSS · Nuxt Content v3 · Formspree · GitHub Actions → OVH*