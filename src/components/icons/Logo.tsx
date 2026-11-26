import { cn } from '@/lib/utils';

// Logo de la marca (public/brand). "default" = logo 3D en color; "light" = versión plana blanca para fondos oscuros (pie)
export default function Logo({
  variant = 'default',
  className,
}: {
  variant?: 'default' | 'light';
  className?: string;
}) {
  const light = variant === 'light';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={light ? '/brand/logo-v3-white.svg' : '/brand/logo-3d.webp'}
      alt="Arreglos Express Madrid"
      width={light ? 258 : 610}
      height={light ? 100 : 240}
      className={cn('h-12 w-auto', className)}
    />
  );
}
