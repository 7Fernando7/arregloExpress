// Lista de trabajos a partir de las fotos optimizadas (public/trabajos, ver scripts/fotos-trabajos.mjs).
// Solo se usa en el servidor durante el build.
import fs from "node:fs";
import path from "node:path";

export type WorkImage = { src: string; label?: "before" | "after"; order: number };
export type Work = { id: string; caption: string; description?: string; date?: string; images: WorkImage[] };

// "bajo-vaquero" → "Bajo vaquero"
function humanize(name: string) {
  const text = name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Nombres admitidos (la fecha es opcional y sirve para ordenar):
//   2026-10-06-bajo-vaquero.webp
//   …-falda.webp + …-falda-2.webp + …-falda-antes.webp + …-falda-despues.webp → una tarjeta con carrusel
// Orden dentro del carrusel: foto principal, numeradas (-2, -3…), antes, después
//   2026-10-06-falda.txt (en trabajos/) → texto que se ve debajo del título
function parseName(base: string) {
  const dated = base.match(/^(\d{4}-\d{2}-\d{2})[-_ ]*(.*)$/);
  const date = dated?.[1];
  const rest = dated ? dated[2] : base;
  const suffix = rest.match(/^(.*?)[-_ ]+(antes|despues|después|\d{1,2})$/i);
  const name = suffix ? suffix[1] : rest;
  return { date, name, tag: suffix?.[2].toLowerCase(), id: `${date ?? ""}|${name.toLowerCase()}` };
}

// descripciones: .txt con el mismo nombre que la foto, en trabajos/ (no se optimizan, se leen tal cual)
function getDescriptions() {
  const dir = path.join(process.cwd(), "trabajos");
  const descriptions = new Map<string, string>();
  if (!fs.existsSync(dir)) return descriptions;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".txt"))) {
    const text = fs.readFileSync(path.join(dir, file), "utf8").trim();
    if (text) descriptions.set(parseName(file.replace(/\.txt$/, "")).id, text);
  }
  return descriptions;
}

export function getWorks(): Work[] {
  const dir = path.join(process.cwd(), "public", "trabajos");
  if (!fs.existsSync(dir)) return [];

  const descriptions = getDescriptions();
  const works = new Map<string, Work>();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".webp"))) {
    const { date, name, tag, id } = parseName(file.replace(/\.webp$/, ""));
    const label = tag === "antes" ? "before" : tag && /^desp/.test(tag) ? "after" : undefined;
    const order = !tag ? 0 : label === "before" ? 100 : label === "after" ? 101 : Number(tag);

    const work = works.get(id) ?? { id, caption: humanize(name), description: descriptions.get(id), date, images: [] };
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
