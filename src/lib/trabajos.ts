// Lista de trabajos a partir de las fotos optimizadas (public/trabajos, ver scripts/fotos-trabajos.mjs).
// Solo se usa en el servidor durante el build.
import fs from "node:fs";
import path from "node:path";

export type WorkImage = { src: string; label?: "before" | "after" };
export type Work = { id: string; caption: string; date?: string; images: WorkImage[] };

// "bajo-vaquero" → "Bajo vaquero"
function humanize(name: string) {
  const text = name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Nombres admitidos (la fecha es opcional y sirve para ordenar):
//   2026-10-06-bajo-vaquero.webp
//   2026-10-06-falda-antes.webp + 2026-10-06-falda-despues.webp → una sola tarjeta antes/después
export function getWorks(): Work[] {
  const dir = path.join(process.cwd(), "public", "trabajos");
  if (!fs.existsSync(dir)) return [];

  const works = new Map<string, Work>();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".webp"))) {
    const base = file.replace(/\.webp$/, "");
    const dated = base.match(/^(\d{4}-\d{2}-\d{2})[-_ ]*(.*)$/);
    const date = dated?.[1];
    const rest = dated ? dated[2] : base;
    const pair = rest.match(/^(.*?)[-_ ]+(antes|despues|después)$/i);
    const name = pair ? pair[1] : rest;
    const label = pair ? (pair[2].toLowerCase() === "antes" ? "before" : "after") : undefined;

    const id = `${date ?? ""}|${name.toLowerCase()}`;
    const work = works.get(id) ?? { id, caption: humanize(name), date, images: [] };
    work.images.push({ src: `/trabajos/${encodeURIComponent(file)}`, label });
    works.set(id, work);
  }

  return [...works.values()]
    .map((w) => ({
      ...w,
      images: w.images.sort((a, b) => (a.label === "before" ? -1 : b.label === "before" ? 1 : 0)),
    }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.caption.localeCompare(b.caption));
}
