import { cn } from '@/lib/utils';

// Logo de la marca (public/brand). "default" = logo 3D en color; "light" = el mismo logo 3D en blanco, para fondos oscuros (pie)
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
      src={light ? '/brand/logo-3d-blanco.webp' : '/brand/logo-3d.webp'}
      alt="Arreglos Express Madrid"
      width={610}
      height={240}
      className={cn('h-12 w-auto', className)}
    />
  );
}
