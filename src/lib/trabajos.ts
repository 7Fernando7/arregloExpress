// Lista de trabajos a partir de las fotos optimizadas (public/trabajos, ver scripts/fotos-trabajos.mjs).
// Solo se usa en el servidor durante el build.
import fs from "node:fs";
import path from "node:path";

export type WorkImage = { src: string; label?: "before" | "after"; order: number };
export type Work = { id: string; caption: string; date?: string; images: WorkImage[] };

// "bajo-vaquero" → "Bajo vaquero"
function humanize(name: string) {
  const text = name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Nombres admitidos (la fecha es opcional y sirve para ordenar):
//   2026-10-06-bajo-vaquero.webp
//   …-falda.webp + …-falda-2.webp + …-falda-antes.webp + …-falda-despues.webp → una tarjeta con carrusel
// Orden dentro del carrusel: foto principal, numeradas (-2, -3…), antes, después
export function getWorks(): Work[] {
  const dir = path.join(process.cwd(), "public", "trabajos");
  if (!fs.existsSync(dir)) return [];

  const works = new Map<string, Work>();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".webp"))) {
    const base = file.replace(/\.webp$/, "");
    const dated = base.match(/^(\d{4}-\d{2}-\d{2})[-_ ]*(.*)$/);
    const date = dated?.[1];
    const rest = dated ? dated[2] : base;
    const suffix = rest.match(/^(.*?)[-_ ]+(antes|despues|después|\d{1,2})$/i);
    const name = suffix ? suffix[1] : rest;
    const tag = suffix?.[2].toLowerCase();
    const label = tag === "antes" ? "before" : tag && /^desp/.test(tag) ? "after" : undefined;
    const order = !tag ? 0 : label === "before" ? 100 : label === "after" ? 101 : Number(tag);

    const id = `${date ?? ""}|${name.toLowerCase()}`;
    const work = works.get(id) ?? { id, caption: humanize(name), date, images: [] };
    work.images.push({ src: `/trabajos/${encodeURIComponent(file)}`, label, order });
    works.set(id, work);
  }

  return [...works.values()]
    .map((w) => ({
      ...w,
      images: w.images.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.caption.localeCompare(b.caption));
}
