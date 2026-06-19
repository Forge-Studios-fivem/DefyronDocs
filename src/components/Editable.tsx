import { useStore } from '../store/store';

export function EditableText({
  value,
  onChange,
  className = '',
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
}) {
  const { editMode } = useStore();
  if (!editMode) return <span className={className}>{value}</span>;
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      className={`bg-[var(--panel-soft)] border border-[var(--accent)]/40 rounded px-1.5 py-0.5 outline-none focus:border-[var(--accent)] ${className}`}
    />
  );
}

export function EditableNumber({
  value,
  onChange,
  className = '',
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  className?: string;
  suffix?: string;
}) {
  const { editMode } = useStore();
  if (!editMode)
    return (
      <span className={className}>
        {value}
        {suffix}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onClick={(e) => e.stopPropagation()}
        className={`w-20 bg-[var(--panel-soft)] border border-[var(--accent)]/40 rounded px-1.5 py-0.5 outline-none focus:border-[var(--accent)] ${className}`}
      />
      {suffix && <span className="text-[var(--text)]/60">{suffix}</span>}
    </span>
  );
}

export function EditableSelect<T extends string>({
  value,
  options,
  onChange,
  className = '',
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  className?: string;
}) {
  const { editMode } = useStore();
  if (!editMode) {
    const label = options.find((o) => o.value === value)?.label ?? value;
    return <span className={className}>{label}</span>;
  }
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      onClick={(e) => e.stopPropagation()}
      className={`bg-[var(--panel-soft)] border border-[var(--accent)]/40 rounded px-1.5 py-0.5 outline-none focus:border-[var(--accent)] ${className}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
