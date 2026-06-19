# Defyron — Documentation (React)

Site de documentation du jeu Defyron, généré à partir de [`game.md`](../game.md) (game design)
et de `Defyron_Catalogue.docx` (catalogue d'assets 3D : vagues d'ennemis, héros, créatures).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173.

## Structure

L'accueil est une carte mentale (mind map) : un nœud central "Defyron" relié à 5 branches —
**Game Design**, **Ennemis**, **Tours**, **Maps**, **Chapitres** — cliquables pour naviguer.

- `src/data/content.ts` — contenu du game design document (modes de jeu, cartes, économie, etc.),
  lecture seule, affiché sous `/design/:id`.
- `src/data/enemies.json`, `towers.json`, `maps.json`, `chapters.json` — **données de référence**
  (seed). Au premier chargement, chaque collection est copiée dans `localStorage` ; toute édition
  faite sur le site modifie ensuite la copie en `localStorage`, pas ces fichiers. `enemies.json`
  est dérivé du catalogue Word original (58 créatures) ; `chapters.json` reprend la progression du
  Chapitre 1 (10 niveaux × 20 vagues, boss de plus en plus fréquents) en référençant les ennemis
  par id ; `towers.json`/`maps.json` sont des jeux de données de départ inventés (le document
  source ne définissait pas de tours ni de cartes nommées).
- `src/store/store.tsx` — contexte React + hooks `useCollection`/`useSingleton` qui gèrent la
  lecture/écriture dans `localStorage` (clé `defyron:<nom>`) et exposent `editMode`.
- `src/components/Editable.tsx` — `EditableText`/`EditableNumber`/`EditableSelect` : affichent du
  texte simple normalement, et un champ modifiable quand `editMode` est actif.
- `src/components/EditBar.tsx` — barre fixe en haut de chaque page avec le bouton **Éditer** et un
  bouton **Réinitialiser** (revient aux données de seed, efface le `localStorage`).
- `src/pages/Enemies.tsx`, `Towers.tsx`, `Maps.tsx` — grilles de cartes avec ajout/suppression/édition
  en mode édition.
- `src/pages/Chapters.tsx` — navigation à trois niveaux (chapitres → niveaux → vagues), avec
  création/suppression de chapitres, niveaux, vagues, et ajout/retrait d'ennemis dans une vague
  (avec comptage et marquage "boss").
- `public/assets/catalogue/` — images extraites du catalogue Word, référencées par `enemies.json`.

## Édition du contenu en direct

Le bouton **Éditer** (en haut de chaque page) active un mode où tous les champs texte/nombre
deviennent modifiables sur place, avec des boutons pour créer ou supprimer un ennemi, une tour, une
carte, un chapitre, un niveau ou une vague.

⚠️ **Persistance locale uniquement** : les modifications sont sauvegardées dans le `localStorage`
du navigateur. Elles survivent à un rechargement ou un redémarrage de la machine, mais restent
propres à ce navigateur/appareil — elles ne sont pas partagées avec les autres visiteurs et ne
sont pas commitées dans le repo. Le bouton **Réinitialiser** efface ces modifications locales et
revient aux fichiers `src/data/*.json` du repo.

Pour rendre un changement permanent et visible par tout le monde, il faut l'appliquer directement
dans les fichiers `src/data/*.json` puis commit/push.

## Build

```bash
npm run build
```

Génère un site statique dans `dist/`, déployable sur n'importe quel hébergeur statique.

## Déploiement GitHub Pages

Le site se déploie automatiquement via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
à chaque push sur `main`.

À activer une seule fois côté GitHub :

1. Repo → **Settings → Pages**
2. **Source** : sélectionner **GitHub Actions**
3. Pusher sur `main` → le workflow build + déploie automatiquement

Le site sera disponible sur `https://forge-studios-fivem.github.io/DefyronDocs/`.

Notes techniques :
- `vite.config.ts` a `base: '/DefyronDocs/'` car GitHub Pages sert ce repo sous un sous-chemin.
- Le routeur utilise `HashRouter` (URLs en `#/...`) pour éviter les 404 sur les rechargements de
  page, GitHub Pages ne réécrivant pas les routes côté serveur.
- Si le repo est un jour renommé, mettre à jour `base` dans `vite.config.ts` en conséquence.
