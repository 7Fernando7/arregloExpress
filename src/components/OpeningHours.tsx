'use client';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

// Mismo horario que la ficha de Google Business
const HOURS = [
  { day: 'Hours.weekdays', time: '9:00–20:30' },
  { day: 'Hours.saturday', time: '9:00–14:30' },
  { day: 'Hours.sunday', time: null },
];

export default function OpeningHours({ className, light = false }: { className?: string; light?: boolean }) {
  const { t } = useLanguage();

  return (
    <div className={cn('space-y-2 text-sm', className)}>
      <p className={cn('flex items-center gap-2 font-semibold', light ? 'text-primary-foreground' : 'text-foreground')}>
        <Clock className="h-4 w-4 text-accent" />
        {t('Hours.title')}
      </p>
      <dl className={cn('grid grid-cols-[auto_1fr] gap-x-6 gap-y-1', light ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
        {HOURS.map(({ day, time }) => (
          <div key={day} className="contents">
            <dt>{t(day)}</dt>
            <dd className="tabular-nums">{time ?? t('Hours.closed')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
