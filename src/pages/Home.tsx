import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sections } from '../data/content';
import { sectionIcons } from '../data/icons';
import SpotlightCard from '../components/SpotlightCard';
import GradientText from '../components/GradientText';
import FadeIn from '../components/FadeIn';
import { Swords, Users, Boxes, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-2)] mb-3">
          Game Design Document
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-h)] mb-4">
          <GradientText>Defyron</GradientText>
        </h1>
        <p className="max-w-2xl text-lg text-[var(--text)] mb-8">
          Jeu de stratégie, défense et attaque en coopération et compétition,
          direction artistique <span className="text-[var(--text-h)] font-medium">chibi/cartoon</span>, vue à la
          troisième personne. Cette documentation rassemble la vision du jeu, les
          mécaniques, et le catalogue d'assets 3D (vagues, héros, créatures).
        </p>
      </motion.div>

      <FadeIn className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <QuickLink to="/catalogue/waves" icon={<Swords size={18} />} title="Vagues d'ennemis" text="6 vagues, stats détaillées" />
        <QuickLink to="/catalogue/heroes" icon={<Users size={18} />} title="Héros Paragon" text="22 modèles 3D référencés" />
        <QuickLink to="/catalogue/assets" icon={<Boxes size={18} />} title="Assets 3D" text="Créatures, boss, golems" />
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text)]/70 mb-4">
          Sommaire du design
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s, i) => {
          const Icon = sectionIcons[s.id];
          return (
          <FadeIn key={s.id} delay={0.05 * i}>
            <Link to={`/design/${s.id}`}>
              <SpotlightCard className="h-full group">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent-2)] shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[var(--text-h)] flex items-center gap-1.5">
                      {s.title}
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                    </div>
                    <div className="text-sm text-[var(--text)] mt-1 line-clamp-2">
                      {firstText(s)}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </FadeIn>
          );
        })}
      </div>
    </div>
  );
}

function firstText(s: (typeof sections)[number]) {
  const b = s.blocks.find((b) => b.type === 'p' || b.type === 'h2');
  if (!b) return '';
  return b.type === 'p' ? b.text : '';
}

function QuickLink({
  to,
  icon,
  title,
  text,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link to={to}>
      <div className="shimmer-border rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--panel)] to-[var(--panel-soft)] p-4 shadow-sm hover:shadow-md hover:border-[var(--accent)]/40 transition-all">
        <div className="flex items-center gap-2 text-[var(--accent-2)] mb-1">{icon}<span className="font-semibold text-[var(--text-h)] text-sm">{title}</span></div>
        <div className="text-xs text-[var(--text)]">{text}</div>
      </div>
    </Link>
  );
}
