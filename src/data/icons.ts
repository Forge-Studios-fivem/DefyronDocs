import {
  Gamepad2,
  Target,
  Layers,
  Coins,
  UserCircle2,
  TrendingUp,
  Trophy,
  Ticket,
  Palette,
  Wrench,
  Rocket,
  Waves,
  Skull,
  type LucideIcon,
} from 'lucide-react';

export const sectionIcons: Record<string, LucideIcon> = {
  overview: Gamepad2,
  modes: Target,
  cards: Layers,
  economy: Coins,
  characters: UserCircle2,
  progression: TrendingUp,
  competition: Trophy,
  monetization: Ticket,
  art: Palette,
  backend: Wrench,
  loop: Rocket,
};

export const pageIcons = {
  waves: Waves,
  assets: Skull,
};
