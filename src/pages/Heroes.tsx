import { useState } from 'react';
import catalogue from '../data/catalogue.json';
import FadeIn from '../components/FadeIn';
import SpotlightCard from '../components/SpotlightCard';

type Hero = { image: string | null; name: string; role: string; status: string };
const heroes = catalogue.heroes as Hero[];

export default function Heroes() {
  const [filter, setFilter] = useState<'all' | 'used' | 'unused'>('all');

  const filtered = heroes.filter((h) => {
    if (filter === 'all') return true;
    const used = h.status.includes('✅') || h.status.includes('⚠️');
    return filter === 'used' ? used : !used;
  });

  return (
    <div>
      <FadeIn>
        <div className="text-5xl mb-3">🧙</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Héros (assets Paragon)</h1>
        <p className="text-[var(--text)] mb-6">
          Modèles 3D issus de l'asset pack Paragon, référencés comme base pour personnages et boss.
        </p>
      </FadeIn>

      <div className="flex gap-2 mb-8">
        {(['all', 'used', 'unused'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === f
                ? 'border-[var(--accent)]/50 bg-[var(--accent)]/12 text-[var(--accent-2)]'
                : 'border-[var(--border)] text-[var(--text)] hover:text-[var(--text-h)]'
            }`}
          >
            {f === 'all' ? 'Tous' : f === 'used' ? 'Utilisés' : 'Non utilisés'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((h, i) => (
          <FadeIn key={h.name} delay={(i % 8) * 0.03}>
            <SpotlightCard className="h-full">
              {h.image && (
                <img
                  src={`/assets/catalogue/${h.image}`}
                  alt={h.name}
                  className="w-full h-28 object-cover rounded-lg mb-3 bg-[var(--panel-soft)] border border-[var(--border)]"
                />
              )}
              <div className="font-semibold text-[var(--text-h)] text-sm">{h.name}</div>
              <div className="text-xs text-[var(--text)] mt-0.5">{h.role}</div>
              <div
                className={`mt-2 inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  h.status.includes('✅')
                    ? 'bg-emerald-500/15 text-emerald-700'
                    : h.status.includes('⚠️')
                    ? 'bg-[var(--accent-3)]/25 text-[var(--accent-2)]'
                    : 'bg-black/5 text-[var(--text)]/60'
                }`}
              >
                {h.status}
              </div>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
