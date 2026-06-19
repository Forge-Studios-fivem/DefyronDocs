import { useState } from 'react';
import { Pencil, X, RotateCcw } from 'lucide-react';
import { useStore } from '../store/store';

export default function EditBar() {
  const { editMode, setEditMode, resetAll } = useStore();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="sticky top-0 z-20 flex items-center justify-end gap-2 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur px-5 py-2.5 md:px-10">
      {editMode && (
        <>
          <span className="text-xs text-[var(--text)]/60 mr-auto hidden sm:inline">
            Mode édition actif — modifie, crée ou supprime directement sur la page.
          </span>
          {confirmReset ? (
            <span className="flex items-center gap-2 text-xs">
              <span className="text-[var(--text)]">Tout réinitialiser ?</span>
              <button
                onClick={() => {
                  resetAll();
                  setConfirmReset(false);
                }}
                className="px-2 py-1 rounded-md bg-rose-500/15 text-rose-300 font-medium"
              >
                Oui
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-2 py-1 rounded-md text-[var(--text)]/60"
              >
                Annuler
              </button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text)] border border-[var(--border)] hover:text-[var(--text-h)] hover:border-rose-500/40 transition-colors"
            >
              <RotateCcw size={13} /> Réinitialiser
            </button>
          )}
        </>
      )}
      <button
        onClick={() => setEditMode(!editMode)}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
          editMode
            ? 'bg-rose-500/15 text-rose-300 border border-rose-500/40'
            : 'bg-[var(--accent)]/12 text-[var(--accent-2)] border border-[var(--accent)]/40'
        }`}
      >
        {editMode ? <X size={14} /> : <Pencil size={14} />}
        {editMode ? 'Quitter l\'édition' : 'Éditer'}
      </button>
    </div>
  );
}
