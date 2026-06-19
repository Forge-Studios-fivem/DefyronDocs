import { useRef, type ReactNode } from 'react';

export default function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`card-spotlight rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 transition-colors hover:border-[var(--accent)]/40 ${className}`}
    >
      {children}
    </div>
  );
}
