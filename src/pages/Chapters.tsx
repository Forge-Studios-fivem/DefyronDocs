import { useState } from 'react';
import { useStore, type Level, type Wave } from '../store/store';
import { EditableText } from '../components/Editable';
import SpotlightCard from '../components/SpotlightCard';
import FadeIn from '../components/FadeIn';
import { catalogueAsset } from '../lib/asset';
import { BookOpen, Plus, Trash2, Skull, ChevronLeft } from 'lucide-react';

export default function Chapters() {
  const { chapters, editMode } = useStore();
  const [chapterId, setChapterId] = useState<string | null>(chapters.value[0]?.id ?? null);
  const [levelId, setLevelId] = useState<string | null>(null);

  const chapter = chapters.value.find((c) => c.id === chapterId) ?? null;
  const level = chapter?.levels.find((l) => l.id === levelId) ?? null;

  function updateChapters(updater: (chs: typeof chapters.value) => typeof chapters.value) {
    chapters.setValue(updater(chapters.value));
  }

  function addChapter() {
    const id = `chapitre-${Date.now()}`;
    updateChapters((chs) => [
      ...chs,
      { id, number: chs.length + 1, name: `Chapitre ${chs.length + 1}`, mapId: '', levels: [] },
    ]);
    setChapterId(id);
  }

  function removeChapter(id: string) {
    updateChapters((chs) => chs.filter((c) => c.id !== id));
    if (chapterId === id) {
      setChapterId(null);
      setLevelId(null);
    }
  }

  function addLevel() {
    if (!chapter) return;
    const id = `${chapter.id}-l${Date.now()}`;
    const num = chapter.levels.length + 1;
    const newLevel: Level = { id, number: num, name: `Niveau ${num}`, waves: [] };
    updateChapters((chs) =>
      chs.map((c) => (c.id === chapter.id ? { ...c, levels: [...c.levels, newLevel] } : c))
    );
  }

  function removeLevel(id: string) {
    if (!chapter) return;
    updateChapters((chs) =>
      chs.map((c) => (c.id === chapter.id ? { ...c, levels: c.levels.filter((l) => l.id !== id) } : c))
    );
    if (levelId === id) setLevelId(null);
  }

  function patchLevel(id: string, patch: Partial<Level>) {
    if (!chapter) return;
    updateChapters((chs) =>
      chs.map((c) =>
        c.id === chapter.id
          ? { ...c, levels: c.levels.map((l) => (l.id === id ? { ...l, ...patch } : l)) }
          : c
      )
    );
  }

  function patchChapter(id: string, patch: Partial<(typeof chapters.value)[number]>) {
    updateChapters((chs) => chs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function patchWave(waveId: string, patch: Partial<Wave>) {
    if (!chapter || !level) return;
    updateChapters((chs) =>
      chs.map((c) =>
        c.id !== chapter.id
          ? c
          : {
              ...c,
              levels: c.levels.map((l) =>
                l.id !== level.id
                  ? l
                  : { ...l, waves: l.waves.map((w) => (w.id === waveId ? { ...w, ...patch } : w)) }
              ),
            }
      )
    );
  }

  function addWave() {
    if (!chapter || !level) return;
    const id = `${level.id}-w${Date.now()}`;
    const newWave: Wave = { id, title: `Vague ${level.waves.length + 1}`, enemies: [] };
    patchLevel(level.id, { waves: [...level.waves, newWave] });
  }

  function removeWave(waveId: string) {
    if (!level) return;
    patchLevel(level.id, { waves: level.waves.filter((w) => w.id !== waveId) });
  }

  // -------- Level 0: list of chapters --------
  if (!chapter) {
    return (
      <div>
        <Header />
        {editMode && (
          <button
            onClick={addChapter}
            className="mb-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-2)]"
          >
            <Plus size={14} /> Ajouter un chapitre
          </button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {chapters.value.map((c) => (
            <FadeIn key={c.id}>
              <SpotlightCard className="relative cursor-pointer" onClick={() => setChapterId(c.id)}>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeChapter(c.id);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-md bg-rose-500/15 text-rose-300"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
                <EditableText
                  value={c.name}
                  onChange={(v) => patchChapter(c.id, { name: v })}
                  className="font-bold text-[var(--text-h)] block mb-1"
                />
                <div className="text-xs text-[var(--text)]">{c.levels.length} niveaux</div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    );
  }

  // -------- Level 1: list of levels in chapter --------
  if (!level) {
    return (
      <div>
        <BackLink label="Chapitres" onClick={() => setChapterId(null)} />
        <FadeIn>
          <EditableText
            value={chapter.name}
            onChange={(v) => patchChapter(chapter.id, { name: v })}
            className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2 block"
          />
          <p className="text-[var(--text)] mb-6">{chapter.levels.length} niveaux dans ce chapitre.</p>
        </FadeIn>
        {editMode && (
          <button
            onClick={addLevel}
            className="mb-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-2)]"
          >
            <Plus size={14} /> Ajouter un niveau
          </button>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {chapter.levels.map((l) => {
            const bossWaves = l.waves.filter((w) => w.enemies.some((e) => e.isBoss)).length;
            return (
              <FadeIn key={l.id}>
                <SpotlightCard className="relative cursor-pointer" onClick={() => setLevelId(l.id)}>
                  {editMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLevel(l.id);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-md bg-rose-500/15 text-rose-300"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                  <EditableText
                    value={l.name}
                    onChange={(v) => patchLevel(l.id, { name: v })}
                    className="font-semibold text-[var(--text-h)] text-sm block mb-1"
                  />
                  <div className="text-[11px] text-[var(--text)] flex items-center gap-1.5">
                    {l.waves.length} vagues
                    {bossWaves > 0 && (
                      <span className="flex items-center gap-0.5 text-rose-400">
                        <Skull size={11} /> {bossWaves}
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    );
  }

  // -------- Level 2: waves in a level --------
  return (
    <div>
      <BackLink label={chapter.name} onClick={() => setLevelId(null)} />
      <FadeIn>
        <EditableText
          value={level.name}
          onChange={(v) => patchLevel(level.id, { name: v })}
          className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-6 block"
        />
      </FadeIn>

      {editMode && (
        <button
          onClick={addWave}
          className="mb-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-2)]"
        >
          <Plus size={14} /> Ajouter une vague
        </button>
      )}

      <div className="flex flex-col gap-4">
        {level.waves.map((w) => (
          <WaveCard key={w.id} wave={w} onPatch={(p) => patchWave(w.id, p)} onRemove={() => removeWave(w.id)} />
        ))}
      </div>
    </div>
  );
}

function WaveCard({
  wave,
  onPatch,
  onRemove,
}: {
  wave: Wave;
  onPatch: (patch: Partial<Wave>) => void;
  onRemove: () => void;
}) {
  const { enemies, editMode } = useStore();
  const [pickId, setPickId] = useState(enemies.items[0]?.id ?? '');
  const hasBoss = wave.enemies.some((e) => e.isBoss);

  function addEnemyRef() {
    if (!pickId) return;
    onPatch({ enemies: [...wave.enemies, { enemyId: pickId, count: 1 }] });
  }
  function removeEnemyRef(idx: number) {
    onPatch({ enemies: wave.enemies.filter((_, i) => i !== idx) });
  }
  function setCount(idx: number, count: number) {
    onPatch({ enemies: wave.enemies.map((e, i) => (i === idx ? { ...e, count } : e)) });
  }
  function toggleBoss(idx: number) {
    onPatch({ enemies: wave.enemies.map((e, i) => (i === idx ? { ...e, isBoss: !e.isBoss } : e)) });
  }

  return (
    <SpotlightCard className={hasBoss ? 'border-rose-500/40' : ''}>
      <div className="flex items-center justify-between mb-3">
        <EditableText
          value={wave.title}
          onChange={(v) => onPatch({ title: v })}
          className="font-bold text-[var(--text-h)]"
        />
        {editMode && (
          <button onClick={onRemove} className="p-1 rounded-md bg-rose-500/15 text-rose-300">
            <Trash2 size={13} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {wave.enemies.map((ref, idx) => {
          const enemy = enemies.items.find((e) => e.id === ref.enemyId);
          if (!enemy) return null;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${
                ref.isBoss ? 'border-rose-500/40 bg-rose-500/5' : 'border-[var(--border)] bg-[var(--panel-soft)]'
              }`}
            >
              {enemy.image && (
                <img
                  src={catalogueAsset(enemy.image)}
                  alt={enemy.name}
                  className="h-8 w-8 rounded object-cover"
                />
              )}
              <span className="text-xs text-[var(--text-h)]">{enemy.name}</span>
              {editMode ? (
                <input
                  type="number"
                  value={ref.count}
                  onChange={(e) => setCount(idx, Number(e.target.value))}
                  className="w-12 bg-[var(--panel)] border border-[var(--border)] rounded px-1 text-xs"
                />
              ) : (
                <span className="text-xs text-[var(--text)]">×{ref.count}</span>
              )}
              {editMode && (
                <>
                  <button
                    onClick={() => toggleBoss(idx)}
                    title="Marquer comme boss"
                    className={`p-0.5 rounded ${ref.isBoss ? 'text-rose-400' : 'text-[var(--text)]/40'}`}
                  >
                    <Skull size={13} />
                  </button>
                  <button onClick={() => removeEnemyRef(idx)} className="text-rose-300">
                    <Trash2 size={12} />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {editMode && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border)]">
          <select
            value={pickId}
            onChange={(e) => setPickId(e.target.value)}
            className="bg-[var(--panel-soft)] border border-[var(--border)] rounded px-2 py-1 text-xs"
          >
            {enemies.items.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <button
            onClick={addEnemyRef}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs border border-[var(--accent)]/40 text-[var(--accent-2)]"
          >
            <Plus size={12} /> Ajouter
          </button>
        </div>
      )}
    </SpotlightCard>
  );
}

function Header() {
  return (
    <FadeIn>
      <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent-2)] mb-4">
        <BookOpen size={28} />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Chapitres</h1>
      <p className="text-[var(--text)] mb-6">
        Chapitres → niveaux → vagues. Clique pour explorer, ou édite directement en mode édition.
      </p>
    </FadeIn>
  );
}

function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-[var(--text)] hover:text-[var(--accent-2)] transition-colors mb-6"
    >
      <ChevronLeft size={16} /> {label}
    </button>
  );
}
