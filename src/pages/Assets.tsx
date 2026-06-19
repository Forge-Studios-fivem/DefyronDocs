import catalogue from '../data/catalogue.json';
import FadeIn from '../components/FadeIn';
import SpotlightCard from '../components/SpotlightCard';

type Item = { image: string | null; name: string; note: string; category?: string; pack?: string };
type SectionGroup = { section: string; items: Item[] };

const misc = catalogue.misc as SectionGroup[];
const assets = catalogue.assets as SectionGroup[];

export default function Assets() {
  const groups = [...misc, ...assets];

  return (
    <div>
      <FadeIn>
        <div className="text-5xl mb-3">🦴</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Assets 3D</h1>
        <p className="text-[var(--text)] mb-10">
          Bestiaire, boss et packs de créatures référencés pour la production (Paragon, City of Brass, etc.).
        </p>
      </FadeIn>

      <div className="flex flex-col gap-10">
        {groups.map((g, i) => (
          <FadeIn key={g.section + i} delay={i * 0.04}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-2)] mb-3">
              {g.section}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {g.items.map((it, j) => (
                <SpotlightCard key={j} className="h-full">
                  {it.image && (
                    <img
                      src={`/assets/catalogue/${it.image}`}
                      alt={it.name}
                      className="w-full h-24 object-cover rounded-lg mb-2 bg-[var(--panel-soft)] border border-[var(--border)]"
                    />
                  )}
                  <div className="font-semibold text-[var(--text-h)] text-xs">{it.name}</div>
                  <div className="text-[11px] text-[var(--text)]/80 mt-0.5">{it.note}</div>
                </SpotlightCard>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
