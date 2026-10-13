// Recorta hojas de iconos en iconos sueltos (webp 256px, cuadrados, transparentes)
const sharp = require("sharp");
async function rgba(src, minAlpha) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) if (data[i] < minAlpha) data[i] = 0; // quita bruma/ruido
  return { data, info };
}
async function save({ data, info }, box, out) {
  const crop = await sharp(data, { raw: info }).extract(box).png().toBuffer();
  const t = await sharp(crop).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const side = Math.max(t.info.width, t.info.height), pad = Math.round(side * 0.04);
  const clear = { r: 0, g: 0, b: 0, alpha: 0 };
  await sharp(t.data).resize(side, side, { fit: "contain", background: clear })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: clear })
    .resize(256, 256).webp({ quality: 90, alphaQuality: 100 }).toFile(out);
}
// cuadrícula: corta por la fila/columna más vacía cerca de cada frontera teórica
exports.grid = async (src, cols, rows, names, dir, minAlpha = 40) => {
  const img = await rgba(src, minAlpha), { width: w, height: h } = img.info, d = img.data;
  const opaque = (x, y) => d[(y * w + x) * 4 + 3] > 150;
  const cuts = (n, len, count) => {
    const out = [0];
    for (let k = 1; k < n; k++) {
      const t = Math.round((len * k) / n); let best = t, bestN = Infinity;
      for (let p = Math.max(1, t - 70); p < Math.min(len - 1, t + 70); p++) { const c = count(p); if (c < bestN) { bestN = c; best = p; } }
      out.push(best);
    }
    out.push(len);
    return out;
  };
  const xs = cuts(cols, w, (x) => { let c = 0; for (let y = 0; y < h; y++) if (opaque(x, y)) c++; return c; });
  for (let c = 0; c < cols; c++) {
    // filas por columna: el hueco puede estar a distinta altura en cada columna
    const ys = cuts(rows, h, (y) => { let n = 0; for (let x = xs[c]; x < xs[c + 1]; x++) if (opaque(x, y)) n++; return n; });
    for (let r = 0; r < rows; r++)
      await save(img, { left: xs[c], top: ys[r], width: xs[c + 1] - xs[c], height: ys[r + 1] - ys[r] }, dir + "/" + names[r * cols + c] + ".webp");
  }
};
// fila: separa por columnas vacías (los iconos no tienen por qué estar en celdas iguales)
exports.row = async (src, names, dir, minAlpha = 40) => {
  const img = await rgba(src, minAlpha), { width: w, height: h } = img.info;
  const col = new Array(w).fill(0);
  for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) if (img.data[(y * w + x) * 4 + 3] > 150) col[x]++;
  // corte por la columna más vacía cerca de cada frontera teórica (iconos que casi se tocan)
  const n = names.length, cuts = [0];
  for (let k = 1; k < n; k++) {
    const t = Math.round((w * k) / n); let best = t;
    for (let x = Math.max(1, t - 160); x < Math.min(w - 1, t + 160); x++) if (col[x] < col[best]) best = x;
    cuts.push(best);
  }
  cuts.push(w);
  const keep = cuts.slice(0, -1).map((c, i) => [c, cuts[i + 1] - 1]);
  for (let i = 0; i < keep.length; i++) { const [a, b] = keep[i]; await save(img, { left: a, top: 0, width: b - a + 1, height: h }, `${dir}/${names[i]}.webp`); }
  return keep;
};
