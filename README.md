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

- `src/data/content.ts` — contenu du game design document (modes de jeu, cartes, économie, etc.)
- `src/data/catalogue.json` — données du catalogue d'assets (générées depuis le `.docx`)
- `src/data/levels.json` — **progression générée** : Chapitre 1, 10 niveaux × 20 vagues, qui
  répartit l'intégralité du bestiaire (`catalogue.json`) avec des stats (PV, vitesse, or, dégâts
  cœur) extrapolées à partir des patterns observés dans les vagues originales du `.docx`, et des
  boss qui apparaissent de plus en plus souvent à partir du niveau 7 jusqu'au rush du niveau 10.
  Ce n'est pas une donnée extraite du document source (qui ne définissait que 6 vagues sur une
  carte unique) mais une proposition de level design couvrant tous les ennemis catalogués.
- `src/pages/` — pages : Accueil, sections de design, Niveaux & vagues, Ennemis & Assets 3D
- `src/components/` — Sidebar, cartes avec effet spotlight, textes en dégradé, animations d'entrée
- `public/assets/catalogue/` — images extraites du catalogue Word

## Mettre à jour le contenu

- Pour modifier le game design : éditer `src/data/content.ts`.
- Pour mettre à jour le catalogue (nouvelles vagues/héros/assets) : ré-exporter le `.docx`, puis
  régénérer `src/data/catalogue.json` en parcourant les tableaux du document et leurs images
  intégrées (via `python-docx`), puis copier les images dans `public/assets/catalogue/`.

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
