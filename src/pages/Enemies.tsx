import { useState } from 'react';
import { useStore, type Enemy } from '../store/store';
import { EditableText, EditableNumber, EditableSelect } from '../components/Editable';
import SpotlightCard from '../components/SpotlightCard';
import FadeIn from '../components/FadeIn';
import { catalogueAsset } from '../lib/asset';
import { Skull, Plus, Trash2, Footprints, Feather } from 'lucide-react';

export default function Enemies() {
  const { enemies, editMode } = useStore();
  const [filter, setFilter] = useState<'all' | 'sol' | 'aerien'>('all');

  const list = enemies.items.filter((e) => filter === 'all' || e.attackType === filter);

  function addEnemy() {
    const id = `enemy-${Date.now()}`;
    const newEnemy: Enemy = {
      id,
      name: 'Nouvel ennemi',
      image: null,
      tag: '',
      tier: 0,
      hp: 50,
      damage: 10,
      gold: 5,
      speed: 280,
      attackType: 'sol',
    };
    enemies.addItem(newEnemy);
  }

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent-2)] mb-4">
          <Skull size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-2">Ennemis</h1>
        <p className="text-[var(--text)] mb-6">
          Tout le bestiaire : points de vie, dégâts, pièces données à l'élimination et type
          d'attaque (sol ou aérien).
        </p>
      </FadeIn>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        {(['all', 'sol', 'aerien'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === f
                ? 'border-[var(--accent)]/50 bg-[var(--accent)]/12 text-[var(--accent-2)]'
                : 'border-[var(--border)] text-[var(--text)] hover:text-[var(--text-h)]'
            }`}
          >
            {f === 'all' ? 'Tous' : f === 'sol' ? 'Sol' : 'Aérien'}
          </button>
        ))}
        {editMode && (
          <button
            onClick={addEnemy}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-2)]"
          >
            <Plus size={14} /> Ajouter un ennemi
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {list.map((e) => (
          <FadeIn key={e.id} delay={0}>
            <SpotlightCard className="h-full relative">
              {editMode && (
                <button
                  onClick={() => enemies.removeItem(e.id)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-rose-500/15 text-rose-300 z-10"
                >
                  <Trash2 size={13} />
                </button>
              )}
              {e.image && (
                <img
                  src={catalogueAsset(e.image)}
                  alt={e.name}
                  className="w-full h-24 object-cover rounded-lg mb-2 bg-[var(--panel-soft)] border border-[var(--border)]"
                />
              )}
              <EditableText
                value={e.name}
                onChange={(v) => enemies.updateItem(e.id, { name: v })}
                className="font-semibold text-[var(--text-h)] text-sm block w-full"
              />
              <EditableText
                value={e.tag}
                onChange={(v) => enemies.updateItem(e.id, { tag: v })}
                className="text-[11px] text-[var(--text)]/70 block w-full mt-0.5"
              />

              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--text)]">
                <span>
                  PV <EditableNumber value={e.hp} onChange={(v) => enemies.updateItem(e.id, { hp: v })} />
                </span>
                <span>
                  Dégâts <EditableNumber value={e.damage} onChange={(v) => enemies.updateItem(e.id, { damage: v })} />
                </span>
                <span className="text-[var(--accent-2)]">
                  Or <EditableNumber value={e.gold} onChange={(v) => enemies.updateItem(e.id, { gold: v })} />
                </span>
                <span>
                  Vitesse <EditableNumber value={e.speed} onChange={(v) => enemies.updateItem(e.id, { speed: v })} />
                </span>
              </div>

              <div className="mt-2 inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium bg-white/5 text-[var(--text)]/70">
                {e.attackType === 'aerien' ? <Feather size={11} /> : <Footprints size={11} />}
                <EditableSelect
                  value={e.attackType}
                  onChange={(v) => enemies.updateItem(e.id, { attackType: v })}
                  options={[
                    { value: 'sol', label: 'Sol' },
                    { value: 'aerien', label: 'Aérien' },
                  ]}
                />
              </div>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
