import { cn } from '@/lib/utils';

// Logo vectorial (public/brand). "light" = versión para fondos oscuros
export default function Logo({
  variant = 'default',
  className,
}: {
  variant?: 'default' | 'light';
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === 'light' ? '/brand/logo-white.svg' : '/brand/logo.svg'}
      alt="Arreglos Express Madrid"
      width={230}
      height={120}
      className={cn('h-12 w-auto', className)}
    />
  );
}
