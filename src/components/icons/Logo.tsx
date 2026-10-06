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
      src={variant === 'light' ? '/brand/logo-v3-white.svg' : '/brand/logo-v3.svg'}
      alt="Arreglos Express Madrid"
      width={258}
      height={100}
      className={cn('h-12 w-auto', className)}
    />
  );
}
