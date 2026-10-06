import { cn } from '@/lib/utils';

// Rótulo de sección con costura, como el "EXPRESS" del logo
export default function Eyebrow({
  children,
  center = false,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent',
        center && 'justify-center',
        className
      )}
    >
      <span aria-hidden className="w-8 border-t-2 border-dashed border-accent/70" />
      {children}
      {center && <span aria-hidden className="w-8 border-t-2 border-dashed border-accent/70" />}
    </p>
  );
}
