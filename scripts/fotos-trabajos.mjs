// Optimiza las fotos de trabajos/ (originales del móvil) → public/trabajos/*.webp
// Se ejecuta solo antes de cada build (prebuild) y de `npm run dev` (predev).
// Reduce a 1200 px, corrige la orientación y QUITA los metadatos (GPS de la casa del cliente).
import fs from "node:fs";
import path from "node:path";

const SRC = "trabajos";
const OUT = path.join("public", "trabajos");
const PHOTO = /\.(jpe?g|png|webp|heic|heif|avif)$/i;

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const files = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter((f) => PHOTO.test(f)) : [];

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  // sin sharp no se publican: los originales llevan la ubicación GPS en los metadatos
  console.warn("[fotos] sharp no disponible: no se publica ninguna foto de trabajos");
  process.exit(0);
}

let ok = 0;
for (const file of files) {
  const base = file.replace(PHOTO, "");
  try {
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${base}.webp`));
    ok++;
  } catch (e) {
    console.warn(`[fotos] no se pudo procesar ${file}: ${e.message}`);
  }
}
console.log(`[fotos] ${ok} de ${files.length} fotos listas en ${OUT}`);
