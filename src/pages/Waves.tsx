import { useState } from 'react';
import levelsData from '../data/levels.json';
import FadeIn from '../components/FadeIn';
import SpotlightCard from '../components/SpotlightCard';
import { catalogueAsset } from '../lib/asset';
import { pageIcons } from '../data/icons';

type Enemy = {
  image: string | null;
  name: string;
  tag?: string;
  count: string;
  hp: string;
  speed: string;
  gold: string;
  heartDmg: string;
  spawn: string;
};
type Wave = {
  title: string;
  enemies: Enemy[];
  total: { count: string; hp: string; gold: string; heartDmg: string; note: string } | null;
};
type Level = { number: number; name: string; waves: Wave[] };

const levels = levelsData as Level[];

export default function Waves() {
  const [active, setActive] = useState(levels[0].number);
  const level = levels.find((l) => l.number === active)!;

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent-2)] mb-4">
          <pageIcons.waves size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Niveaux &amp; vagues d'ennemis</h1>
        <p className="text-[var(--text)] mb-8">
          Progression proposée en 6 niveaux, qui introduit progressivement l'intégralité du
          bestiaire (minions, golems, créatures, héros Paragon) jusqu'aux boss majeurs.
        </p>
      </FadeIn>

      <FadeIn className="flex flex-wrap gap-2 mb-10">
        {levels.map((l) => (
          <button
            key={l.number}
            onClick={() => setActive(l.number)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-colors ${
              active === l.number
                ? 'border-[var(--accent)]/60 bg-[var(--accent)]/12 text-[var(--accent-2)]'
                : 'border-[var(--border)] text-[var(--text)] hover:text-[var(--text-h)] hover:border-[var(--accent)]/30'
            }`}
          >
            Niveau {l.number}
          </button>
        ))}
      </FadeIn>

      <FadeIn key={level.number}>
        <h2 className="text-xl font-bold text-[var(--text-h)] mb-6">{level.name}</h2>
      </FadeIn>

      <div className="flex flex-col gap-8">
        {level.waves.map((w, i) => (
          <FadeIn key={level.number + '-' + i} delay={i * 0.05}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] overflow-hidden shadow-sm">
              <div className="flex items-center justify-between bg-gradient-to-r from-[var(--accent)]/8 to-[var(--accent-3)]/12 px-5 py-3 border-b border-[var(--border)]">
                <h3 className="font-bold text-[var(--text-h)]">{w.title}</h3>
                {w.total && (
                  <div className="text-xs text-[var(--text)] flex gap-3">
                    <span>{w.total.count} unités</span>
                    <span>{w.total.hp}</span>
                    <span className="text-[var(--accent-2)] font-medium">{w.total.gold} or</span>
                    <span className="text-rose-400 font-medium">{w.total.heartDmg} cœur</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                {w.enemies.map((e, j) => (
                  <SpotlightCard key={j} className="flex gap-3 items-center">
                    {e.image && (
                      <img
                        src={catalogueAsset(e.image)}
                        alt={e.name}
                        className="h-14 w-14 rounded-lg object-cover bg-[var(--panel-soft)] border border-[var(--border)] shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-[var(--text-h)] text-sm truncate">{e.name}</div>
                      <div className="text-[11px] text-[var(--text)] mt-0.5">
                        {e.count} · {e.hp} PV · vit {e.speed}
                      </div>
                      <div className="text-[11px] text-[var(--text)]/70 truncate">{e.tag ?? e.spawn}</div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
