export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'cards'; items: { title: string; text: string }[] };

export const sections: Section[] = [
  {
    id: 'overview',
    title: 'Vue d\'ensemble',
    blocks: [
      {
        type: 'p',
        text: "Defyron est un jeu de stratégie, défense et attaque en coopération et compétition, avec une direction artistique chibi/cartoon, en vue à la troisième personne.",
      },
      {
        type: 'p',
        text: "Le joueur contrôle directement un personnage 3D capable de placer des cartes de défense ou d'attaque sur le terrain.",
      },
    ],
  },
  {
    id: 'modes',
    title: 'Modes de jeu',
    blocks: [
      { type: 'h2', text: 'Mode Histoire' },
      {
        type: 'list',
        items: [
          'Plusieurs chapitres composés de différents niveaux',
          '1 chapitre = 1 carte principale',
          'Difficulté sélectionnable avant chaque niveau : ⭐ Facile · ⭐⭐ Moyen · ⭐⭐⭐ Difficile',
          'Boss à la fin de chaque niveau, boss majeur à la fin de chaque chapitre',
          'Les étoiles obtenues servent à débloquer de nouveaux personnages',
        ],
      },
      { type: 'h2', text: 'Mode Multijoueur — Rivalité' },
      {
        type: 'p',
        text: 'Deux équipes s\'affrontent : Défenseurs vs Attaquants.',
      },
      {
        type: 'list',
        items: [
          'Vote de la carte avant le début de la partie',
          'Chaque joueur pioche 5 cartes au départ',
          'Une même carte ne peut être choisie qu\'une seule fois dans l\'équipe',
          'Les attaquants doivent détruire les défenses adverses',
          'Récupérer une défense ne rembourse que 50 % de son coût',
          'Apparence : Défenseur → ailes d\'ange · Attaquant → ailes démoniaques',
        ],
      },
      { type: 'h2', text: 'Mode Tournoi' },
      {
        type: 'list',
        items: [
          'Plusieurs équipes s\'affrontent',
          'Objectif : tenir le plus longtemps possible contre les vagues ennemies',
          'Classement basé sur le temps de survie',
        ],
      },
      { type: 'h2', text: 'Mode Tirage' },
      {
        type: 'list',
        items: [
          'Inspiré du mode "Triple Draft" de Clash Royale',
          'Les joueurs reçoivent un ensemble de cartes aléatoires',
          'Toute l\'équipe doit construire sa stratégie avec les cartes obtenues',
          'Impossible de modifier son deck — objectif : survivre le plus longtemps possible',
        ],
      },
    ],
  },
  {
    id: 'cards',
    title: 'Système de cartes',
    blocks: [
      { type: 'h2', text: 'Types de cartes' },
      {
        type: 'cards',
        items: [
          { title: 'Défenses de proximité', text: 'Attaquent les ennemis proches.' },
          { title: 'Défenses à distance', text: 'Attaquent depuis l\'arrière.' },
          { title: 'Défenses mobiles', text: 'Se déplacent directement sur la piste des ennemis.' },
        ],
      },
      { type: 'h2', text: 'Progression des cartes' },
      {
        type: 'list',
        items: [
          'Amélioration en cours de partie',
          'Niveaux d\'évolution',
          'Skins cosmétiques pour chaque carte',
          'Effets visuels exclusifs',
        ],
      },
    ],
  },
  {
    id: 'economy',
    title: 'Économie',
    blocks: [
      { type: 'h2', text: 'Pièces' },
      {
        type: 'p',
        text: 'Les joueurs gagnent des pièces en éliminant des ennemis, à la fin de chaque vague, et lors d\'événements spéciaux.',
      },
      {
        type: 'list',
        items: [
          'Placement de défenses',
          'Amélioration des unités',
          'Achat d\'objets temporaires',
        ],
      },
    ],
  },
  {
    id: 'characters',
    title: 'Personnages',
    blocks: [
      { type: 'h2', text: 'Déblocage' },
      { type: 'p', text: 'Les personnages sont achetés avec les étoiles gagnées en mode Histoire.' },
      { type: 'h2', text: 'Système de traits passifs' },
      {
        type: 'p',
        text: 'Depuis l\'inventaire : équiper des traits passifs, débloquer de nouvelles spécialisations, personnaliser le style de jeu.',
      },
      {
        type: 'list',
        items: [
          'Ralentit les ennemis touchés',
          'Augmente la portée d\'attaque',
          'Génère davantage de pièces',
          'Réduit les coûts d\'amélioration',
        ],
      },
    ],
  },
  {
    id: 'progression',
    title: 'Progression',
    blocks: [
      { type: 'h2', text: 'Système d\'XP' },
      {
        type: 'list',
        items: [
          'Niveau de compte global',
          'Certaines cartes nécessitent un niveau minimum',
          'Déblocages progressifs',
        ],
      },
      { type: 'h2', text: 'Récompenses quotidiennes' },
      {
        type: 'list',
        items: ['Pièces', 'Étoiles', 'Skins', 'Coffres spéciaux', 'Consommables'],
      },
    ],
  },
  {
    id: 'competition',
    title: 'Compétition',
    blocks: [
      { type: 'h2', text: 'Leaderboards' },
      {
        type: 'list',
        items: ['Mondial', 'Saison', 'Tournoi', 'Coopération', 'Rivalité'],
      },
    ],
  },
  {
    id: 'monetization',
    title: 'Monétisation',
    blocks: [
      { type: 'h2', text: 'Passe de combat' },
      { type: 'list', items: ['Version gratuite', 'Version premium', 'Récompenses exclusives'] },
      { type: 'h2', text: 'Boutique — cosmétiques uniquement' },
      {
        type: 'cards',
        items: [
          { title: 'Personnage', text: 'Skins · Emotes · Animations · Accessoires' },
          { title: 'Cartes', text: 'Skins · Effets d\'apparition · Effets d\'attaque' },
          { title: 'Packs', text: 'Bundles thématiques · Événements saisonniers' },
          { title: 'Lootboxes', text: 'Récompenses cosmétiques · Objets rares · Animations exclusives' },
        ],
      },
    ],
  },
  {
    id: 'art',
    title: 'Direction artistique',
    blocks: [
      { type: 'h2', text: 'Style visuel' },
      {
        type: 'list',
        items: [
          'Univers Chibi',
          'Ambiance Cartoon',
          'Couleurs vives',
          'Animations exagérées',
          'Lecture claire des combats',
        ],
      },
      { type: 'h2', text: 'Inspirations' },
      {
        type: 'list',
        items: ['Clash Royale', 'Plants vs Zombies', 'Brawl Stars', 'Fall Guys'],
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & administration',
    blocks: [
      { type: 'h2', text: 'Infrastructure' },
      { type: 'p', text: 'Base de données : PostgreSQL' },
      { type: 'h2', text: 'Sauvegardes' },
      {
        type: 'list',
        items: [
          'Progression joueur',
          'Inventaire',
          'Classements',
          'Statistiques',
          'Historique des achats',
        ],
      },
      { type: 'h2', text: 'Dashboard Créateur' },
      {
        type: 'list',
        items: [
          'Équilibrage des cartes',
          'Gestion des saisons',
          'Statistiques en temps réel',
          'Gestion des joueurs',
          'Gestion des tournois',
          'Modération',
          'Événements spéciaux',
          'Boutique',
          'Passe de combat',
        ],
      },
    ],
  },
  {
    id: 'loop',
    title: 'Boucle de gameplay',
    blocks: [
      {
        type: 'list',
        items: [
          'Gagner des parties',
          'Obtenir des pièces, XP et étoiles',
          'Débloquer de nouvelles cartes',
          'Débloquer de nouveaux personnages',
          'Améliorer ses stratégies',
          'Monter dans les classements',
          'Participer aux tournois',
          'Collectionner skins et récompenses saisonnières',
        ],
      },
    ],
  },
];
