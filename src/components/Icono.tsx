import { cn } from "@/lib/utils";

// Iconos ilustrados de la marca (public/icons, generados con ChatGPT y recortados).
// Azul marino con detalles terracota: solo sobre fondos claros (los «paso-*» van sobre azul).
export type IconoNombre =
  | "aguja" | "calendario" | "camara" | "camiseta" | "candado" | "casa" | "chat" | "correo"
  | "estrella" | "fotos" | "moto" | "paquete" | "reloj" | "tarjeta" | "tijeras" | "ubicacion"
  | "serv-bajos" | "serv-estrechar" | "serv-cremalleras" | "serv-botones" | "serv-ocasion"
  | "serv-forros" | "serv-hogar" | "serv-zapatos" | "serv-tintoreria"
  | "marcar-pants" | "marcar-skirt" | "marcar-sleeves" | "marcar-takeIn" | "marcar-zips"
  | "paso-1" | "paso-2" | "paso-3";

export default function Icono({ name, className }: { name: IconoNombre; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/${name}.webp`}
      alt=""
      aria-hidden
      width={256}
      height={256}
      loading="lazy"
      className={cn("shrink-0 select-none object-contain", className)}
    />
  );
}
