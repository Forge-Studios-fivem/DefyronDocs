import catalogue from '../data/catalogue.json';
import FadeIn from '../components/FadeIn';
import SpotlightCard from '../components/SpotlightCard';

type Enemy = {
  image: string | null;
  name: string;
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

const waves = catalogue.waves as Wave[];

export default function Waves() {
  return (
    <div>
      <FadeIn>
        <div className="text-5xl mb-3">🌊</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Vagues d'ennemis</h1>
        <p className="text-[var(--text)] mb-10">
          Catalogue des vagues du mode défense — composition, statistiques et timing d'apparition.
        </p>
      </FadeIn>

      <div className="flex flex-col gap-10">
        {waves.map((w, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] overflow-hidden shadow-sm">
              <div className="flex items-center justify-between bg-gradient-to-r from-[var(--accent)]/8 to-[var(--accent-3)]/12 px-5 py-3 border-b border-[var(--border)]">
                <h2 className="font-bold text-[var(--text-h)]">{w.title}</h2>
                {w.total && (
                  <div className="text-xs text-[var(--text)] flex gap-3">
                    <span>{w.total.count} unités</span>
                    <span>{w.total.hp}</span>
                    <span className="text-[var(--accent-2)] font-medium">{w.total.gold} or</span>
                    <span className="text-rose-600 font-medium">{w.total.heartDmg} cœur</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                {w.enemies.map((e, j) => (
                  <SpotlightCard key={j} className="flex gap-3 items-center">
                    {e.image && (
                      <img
                        src={`/assets/catalogue/${e.image}`}
                        alt={e.name}
                        className="h-14 w-14 rounded-lg object-cover bg-[var(--panel-soft)] border border-[var(--border)] shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-[var(--text-h)] text-sm truncate">{e.name}</div>
                      <div className="text-[11px] text-[var(--text)] mt-0.5">
                        {e.count} · {e.hp} PV · vit {e.speed}
                      </div>
                      <div className="text-[11px] text-[var(--text)]/70 truncate">{e.spawn}</div>
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
