import { useStore, type GameMap } from '../store/store';
import { EditableText, EditableNumber } from '../components/Editable';
import SpotlightCard from '../components/SpotlightCard';
import FadeIn from '../components/FadeIn';
import { MapIcon, Plus, Trash2 } from 'lucide-react';

export default function Maps() {
  const { maps, chapters, editMode } = useStore();

  function addMap() {
    const id = `map-${Date.now()}`;
    const m: GameMap = {
      id,
      name: 'Nouvelle carte',
      chapterId: chapters.value[0]?.id ?? '',
      description: '',
      lanes: 1,
      image: null,
    };
    maps.addItem(m);
  }

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent-2)] mb-4">
          <MapIcon size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Maps</h1>
        <p className="text-[var(--text)] mb-6">
          Une carte principale par chapitre — terrain, nombre de pistes et description.
        </p>
      </FadeIn>

      {editMode && (
        <button
          onClick={addMap}
          className="mb-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-2)]"
        >
          <Plus size={14} /> Ajouter une carte
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {maps.items.map((m) => {
          const chapter = chapters.value.find((c) => c.id === m.chapterId);
          return (
            <FadeIn key={m.id}>
              <SpotlightCard className="h-full relative">
                {editMode && (
                  <button
                    onClick={() => maps.removeItem(m.id)}
                    className="absolute top-2 right-2 p-1 rounded-md bg-rose-500/15 text-rose-300"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
                <EditableText
                  value={m.name}
                  onChange={(v) => maps.updateItem(m.id, { name: v })}
                  className="font-semibold text-[var(--text-h)] block mb-1"
                />
                <div className="text-[11px] text-[var(--accent-2)] mb-2">
                  {chapter ? chapter.name : 'Sans chapitre'}
                </div>
                <EditableText
                  value={m.description}
                  onChange={(v) => maps.updateItem(m.id, { description: v })}
                  className="text-xs text-[var(--text)] block mb-3"
                />
                <div className="text-[11px] text-[var(--text)]">
                  Pistes <EditableNumber value={m.lanes} onChange={(v) => maps.updateItem(m.id, { lanes: v })} />
                </div>
              </SpotlightCard>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
