import { useParams, Link, Navigate } from 'react-router-dom';
import { sections, type Block } from '../data/content';
import { sectionIcons } from '../data/icons';
import FadeIn from '../components/FadeIn';
import SpotlightCard from '../components/SpotlightCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DesignSection() {
  const { id } = useParams();
  const idx = sections.findIndex((s) => s.id === id);
  if (idx === -1) return <Navigate to="/" replace />;
  const section = sections[idx];
  const prev = sections[idx - 1];
  const next = sections[idx + 1];
  const Icon = sectionIcons[section.id];
  const PrevIcon = prev ? sectionIcons[prev.id] : null;
  const NextIcon = next ? sectionIcons[next.id] : null;

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent-2)] mb-4">
          <Icon size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-h)] mb-8">{section.title}</h1>
      </FadeIn>

      <div className="flex flex-col gap-6">
        {section.blocks.map((b, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <BlockView block={b} />
          </FadeIn>
        ))}
      </div>

      <div className="mt-14 flex items-center justify-between border-t border-[var(--border)] pt-6 text-sm">
        {prev && PrevIcon ? (
          <Link to={`/design/${prev.id}`} className="flex items-center gap-1.5 text-[var(--text)] hover:text-[var(--accent-2)] transition-colors">
            <ChevronLeft size={16} /> <PrevIcon size={14} /> {prev.title}
          </Link>
        ) : <span />}
        {next && NextIcon ? (
          <Link to={`/design/${next.id}`} className="flex items-center gap-1.5 text-[var(--text)] hover:text-[var(--accent-2)] transition-colors">
            <NextIcon size={14} /> {next.title} <ChevronRight size={16} />
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === 'h2') {
    return <h2 className="text-xl font-bold text-[var(--accent-2)] mt-2">{block.text}</h2>;
  }
  if (block.type === 'p') {
    return <p className="text-[var(--text)] leading-relaxed">{block.text}</p>;
  }
  if (block.type === 'list') {
    return (
      <ul className="space-y-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[var(--text)]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {block.items.map((c, i) => (
          <SpotlightCard key={i}>
            <div className="font-semibold text-[var(--text-h)] mb-1">{c.title}</div>
            <div className="text-sm text-[var(--text)]">{c.text}</div>
          </SpotlightCard>
        ))}
      </div>
    );
  }
  return null;
}
