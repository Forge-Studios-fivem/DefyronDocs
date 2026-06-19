import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientText from '../components/GradientText';
import FadeIn from '../components/FadeIn';
import { ScrollText, Skull, Castle, MapIcon, BookOpen, type LucideIcon } from 'lucide-react';

type Node = {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  to: string;
  x: number;
  y: number;
};

const CENTER = { x: 300, y: 300 };

const NODES: Node[] = [
  { id: 'design', label: 'Game Design', sub: 'Vision, modes, économie…', icon: ScrollText, to: '/design/overview', x: 300, y: 80 },
  { id: 'enemies', label: 'Ennemis', sub: 'Bestiaire, stats, attaque', icon: Skull, to: '/enemies', x: 509, y: 232 },
  { id: 'towers', label: 'Tours', sub: 'Défenses posables', icon: Castle, to: '/towers', x: 429, y: 478 },
  { id: 'maps', label: 'Maps', sub: 'Cartes par chapitre', icon: MapIcon, to: '/maps', x: 171, y: 478 },
  { id: 'chapters', label: 'Chapitres', sub: 'Niveaux & vagues', icon: BookOpen, to: '/chapters', x: 91, y: 232 },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-2)] mb-3">
          Game Design Document
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-h)] mb-4">
          <GradientText>Defyron</GradientText>
        </h1>
        <p className="max-w-2xl text-lg text-[var(--text)]">
          Jeu de stratégie, défense et attaque en coopération et compétition,
          direction artistique <span className="text-[var(--text-h)] font-medium">chibi/cartoon</span>.
          Explore la documentation comme une carte mentale : clique sur une branche pour t'y rendre.
        </p>
      </motion.div>

      <FadeIn>
        <div className="relative mx-auto w-full max-w-xl aspect-square">
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full">
            {NODES.map((n) => (
              <line
                key={n.id}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={n.x}
                y2={n.y}
                stroke="var(--accent)"
                strokeOpacity={0.25}
                strokeWidth={2}
              />
            ))}
          </svg>

          {/* center node */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-24 w-24 rounded-full shimmer-border bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent)] text-[var(--bg)] font-extrabold text-sm shadow-lg shadow-[var(--accent)]/30"
            style={{ left: `${(CENTER.x / 600) * 100}%`, top: `${(CENTER.y / 600) * 100}%` }}
          >
            Defyron
          </div>

          {NODES.map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.button
                key={n.id}
                onClick={() => navigate(n.to)}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                whileHover={{ scale: 1.06 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-24 w-24 sm:h-28 sm:w-28 rounded-full border border-[var(--border)] bg-[var(--panel)] text-center px-2 shadow-md hover:border-[var(--accent)]/60 hover:shadow-[var(--accent)]/20 transition-colors"
                style={{ left: `${(n.x / 600) * 100}%`, top: `${(n.y / 600) * 100}%` }}
              >
                <Icon size={20} className="text-[var(--accent-2)] mb-1" />
                <span className="text-xs font-semibold text-[var(--text-h)] leading-tight">{n.label}</span>
                <span className="hidden sm:block text-[9px] text-[var(--text)]/60 leading-tight mt-0.5">
                  {n.sub}
                </span>
              </motion.button>
            );
          })}
        </div>
      </FadeIn>
    </div>
  );
}
