import Image from "next/image";
import { Camera } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { whatsappLink } from "@/lib/contact";

// Foto de cabecera con marco de costura y tarjeta «Mándanos una foto» (portada y páginas de servicio)
export default function HeroPhoto({
  src,
  alt,
  width,
  height,
  badgeTitle,
  badgeText,
  badgeButton,
  whatsappMessage,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  badgeTitle: string;
  badgeText: string;
  badgeButton: string;
  whatsappMessage: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        aria-hidden
        className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border-2 border-dashed border-accent/60"
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="relative aspect-[4/3] w-full rounded-lg object-cover shadow-[0_12px_32px_-8px_rgba(19,41,75,0.25)]"
      />
      <a
        href={whatsappLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute -bottom-6 left-4 flex max-w-[18rem] items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-[0_8px_24px_-4px_rgba(19,41,75,0.15)] transition-colors hover:border-accent sm:left-6"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Camera className="h-5 w-5" />
        </span>
        <span className="text-sm leading-snug text-muted-foreground">
          <strong className="block font-semibold text-foreground">{badgeTitle}</strong>
          {badgeText}
          <span className="mt-1.5 flex items-center gap-1.5 font-semibold text-accent group-hover:underline">
            <WhatsappIcon className="h-3.5 w-3.5" />
            {badgeButton}
          </span>
        </span>
      </a>
    </div>
  );
}
