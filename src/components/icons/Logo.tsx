import { Shirt } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Logo() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Shirt className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        {t('logo')}
      </span>
    </div>
  );
}
