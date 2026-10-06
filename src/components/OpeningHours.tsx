'use client';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { OPENING_HOURS } from '@/lib/site';
import { cn } from '@/lib/utils';

const time = (t: string) => t.replace(/^0/, '');

export default function OpeningHours({ className, light = false }: { className?: string; light?: boolean }) {
  const { t } = useLanguage();

  return (
    <div className={cn('space-y-2 text-sm', className)}>
      <p className={cn('flex items-center gap-2 font-semibold', light ? 'text-primary-foreground' : 'text-foreground')}>
        <Clock className="h-4 w-4 text-accent" />
        {t('Hours.title')}
      </p>
      <dl className={cn('grid grid-cols-[auto_1fr] gap-x-6 gap-y-1', light ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
        {OPENING_HOURS.map(({ dayKey, opens, closes }) => (
          <div key={dayKey} className="contents">
            <dt>{t(dayKey)}</dt>
            <dd className="tabular-nums">{opens && closes ? `${time(opens)}–${time(closes)}` : t('Hours.closed')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
