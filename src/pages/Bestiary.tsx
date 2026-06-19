import catalogue from '../data/catalogue.json';
import FadeIn from '../components/FadeIn';
import SpotlightCard from '../components/SpotlightCard';
import { catalogueAsset } from '../lib/asset';
import { pageIcons } from '../data/icons';
import { CheckCircle2, AlertTriangle, Circle } from 'lucide-react';

type Item = { image: string | null; name: string; note: string };
type SectionGroup = { section: string; items: Item[] };
type Hero = { image: string | null; name: string; role: string; status: string };

const misc = catalogue.misc as SectionGroup[];
const assets = catalogue.assets as SectionGroup[];
const heroes = catalogue.heroes as Hero[];

const heroGroup: SectionGroup = {
  section: 'Héros (Paragon) — pool d\'ennemis',
  items: heroes.map((h) => ({ image: h.image, name: h.name, note: h.role, status: h.status })),
};

function statusMeta(status?: string) {
  if (!status) return null;
  if (status.includes('✅')) {
    return { Icon: CheckCircle2, label: status.replace('✅', '').trim(), tone: 'used' as const };
  }
  if (status.includes('⚠️')) {
    return { Icon: AlertTriangle, label: status.replace('⚠️', '').trim(), tone: 'partial' as const };
  }
  return { Icon: Circle, label: status, tone: 'unused' as const };
}

export default function Bestiary() {
  const groups = [heroGroup, ...misc, ...assets];

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent-2)] mb-4">
          <pageIcons.assets size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Ennemis &amp; Assets 3D</h1>
        <p className="text-[var(--text)] mb-10">
          Bestiaire complet des modèles 3D référencés comme ennemis potentiels de vague — héros
          Paragon, boss, golems, minions et packs de créatures (City of Brass, etc.).
        </p>
      </FadeIn>

      <div className="flex flex-col gap-10">
        {groups.map((g, i) => (
          <FadeIn key={g.section + i} delay={i * 0.04}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-2)] mb-3">
              {g.section}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {g.items.map((it, j) => {
                const meta = statusMeta((it as Item & { status?: string }).status);
                return (
                  <SpotlightCard key={j} className="h-full">
                    {it.image && (
                      <img
                        src={catalogueAsset(it.image)}
                        alt={it.name}
                        className="w-full h-24 object-cover rounded-lg mb-2 bg-[var(--panel-soft)] border border-[var(--border)]"
                      />
                    )}
                    <div className="font-semibold text-[var(--text-h)] text-xs">{it.name}</div>
                    <div className="text-[11px] text-[var(--text)]/80 mt-0.5">{it.note}</div>
                    {meta && (
                      <div
                        className={`mt-2 inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          meta.tone === 'used'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : meta.tone === 'partial'
                            ? 'bg-[var(--accent-3)]/15 text-[var(--accent-2)]'
                            : 'bg-white/5 text-[var(--text)]/70'
                        }`}
                      >
                        <meta.Icon size={11} /> {meta.label}
                      </div>
                    )}
                  </SpotlightCard>
                );
              })}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
