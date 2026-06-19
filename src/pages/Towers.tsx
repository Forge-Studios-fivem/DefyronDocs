import { useStore, type Tower } from '../store/store';
import { EditableText, EditableNumber, EditableSelect } from '../components/Editable';
import SpotlightCard from '../components/SpotlightCard';
import FadeIn from '../components/FadeIn';
import { Castle, Plus, Trash2 } from 'lucide-react';

const TYPE_LABEL: Record<Tower['type'], string> = {
  proximite: 'Proximité',
  distance: 'Distance',
  mobile: 'Mobile',
};

export default function Towers() {
  const { towers, editMode } = useStore();

  function addTower() {
    const id = `tower-${Date.now()}`;
    const t: Tower = {
      id,
      name: 'Nouvelle tour',
      type: 'proximite',
      damage: 10,
      cost: 50,
      range: 2,
      attackSpeed: 1,
      description: '',
    };
    towers.addItem(t);
  }

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent-2)] mb-4">
          <Castle size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Tours</h1>
        <p className="text-[var(--text)] mb-6">
          Les défenses posables sur le terrain — proximité, distance et mobiles — avec leurs
          dégâts, coût, portée et cadence de tir.
        </p>
      </FadeIn>

      {editMode && (
        <button
          onClick={addTower}
          className="mb-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-2)]"
        >
          <Plus size={14} /> Ajouter une tour
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {towers.items.map((t) => (
          <FadeIn key={t.id}>
            <SpotlightCard className="h-full relative">
              {editMode && (
                <button
                  onClick={() => towers.removeItem(t.id)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-rose-500/15 text-rose-300"
                >
                  <Trash2 size={13} />
                </button>
              )}
              <EditableText
                value={t.name}
                onChange={(v) => towers.updateItem(t.id, { name: v })}
                className="font-semibold text-[var(--text-h)] block mb-1"
              />
              <div className="inline-block text-[10px] px-2 py-0.5 rounded-full font-medium bg-white/5 text-[var(--text)]/70 mb-2">
                <EditableSelect
                  value={t.type}
                  onChange={(v) => towers.updateItem(t.id, { type: v })}
                  options={[
                    { value: 'proximite', label: TYPE_LABEL.proximite },
                    { value: 'distance', label: TYPE_LABEL.distance },
                    { value: 'mobile', label: TYPE_LABEL.mobile },
                  ]}
                />
              </div>
              <EditableText
                value={t.description}
                onChange={(v) => towers.updateItem(t.id, { description: v })}
                className="text-xs text-[var(--text)] block mb-3"
              />
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--text)]">
                <span>
                  Dégâts <EditableNumber value={t.damage} onChange={(v) => towers.updateItem(t.id, { damage: v })} />
                </span>
                <span className="text-[var(--accent-2)]">
                  Coût <EditableNumber value={t.cost} onChange={(v) => towers.updateItem(t.id, { cost: v })} /> or
                </span>
                <span>
                  Portée <EditableNumber value={t.range} onChange={(v) => towers.updateItem(t.id, { range: v })} />
                </span>
                <span>
                  Cadence{' '}
                  <EditableNumber
                    value={t.attackSpeed}
                    onChange={(v) => towers.updateItem(t.id, { attackSpeed: v })}
                    suffix="/s"
                  />
                </span>
              </div>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
