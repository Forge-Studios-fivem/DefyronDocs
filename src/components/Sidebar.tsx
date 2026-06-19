import { NavLink } from 'react-router-dom';
import { sections } from '../data/content';
import { sectionIcons, pageIcons } from '../data/icons';
import { ScrollText, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-[var(--accent)]/12 text-[var(--accent-2)] font-medium'
      : 'text-[var(--text)] hover:bg-white/5 hover:text-[var(--text-h)]'
  }`;

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" onClick={onNavigate}>
      <NavLink to="/" end className={navLinkClass}>
        <ScrollText size={16} /> Accueil
      </NavLink>

      <div className="mt-4 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--text)]/50">
        Game Design
      </div>
      {sections.map((s) => {
        const Icon = sectionIcons[s.id];
        return (
          <NavLink key={s.id} to={`/design/${s.id}`} className={navLinkClass}>
            <Icon size={16} /> {s.title}
          </NavLink>
        );
      })}

      <div className="mt-4 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--text)]/50">
        Catalogue
      </div>
      <NavLink to="/catalogue/waves" className={navLinkClass}>
        <pageIcons.waves size={16} /> Vagues d'ennemis
      </NavLink>
      <NavLink to="/catalogue/heroes" className={navLinkClass}>
        <pageIcons.heroes size={16} /> Héros (Paragon)
      </NavLink>
      <NavLink to="/catalogue/assets" className={navLinkClass}>
        <pageIcons.assets size={16} /> Assets 3D
      </NavLink>
    </nav>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-[var(--border)] md:p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:bg-[var(--panel-soft)]">
        <Brand />
        <NavContent />
      </aside>

      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur px-4 py-3">
        <Brand compact />
        <button onClick={() => setOpen(!open)} className="text-[var(--text)]">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--panel-soft)] p-4">
          <NavContent onNavigate={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${compact ? '' : 'mb-6 px-1'}`}>
      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--accent-2)] via-[var(--accent)] to-[var(--accent-3)] shadow-md shadow-[var(--accent)]/30" />
      <div>
        <div className="text-sm font-bold text-[var(--text-h)] leading-none">Defyron</div>
        <div className="text-[11px] text-[var(--text)]/60 leading-none">Documentation</div>
      </div>
    </div>
  );
}
