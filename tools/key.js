// Quita un fondo de cuadros "pintado": lo no naranja pasa a azul marino con alfa según oscuridad
const sharp = require("sharp");
module.exports = async function key(src, out, prev, bg = "#F4EFEB") {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], lum = (r + g + b) / 3, o = r - b;
    if (o > 70) { data[i] = 200; data[i + 1] = 96; data[i + 2] = 45; data[i + 3] = Math.min(255, (o - 70) * 4); }
    else { data[i] = 19; data[i + 1] = 41; data[i + 2] = 75; data[i + 3] = Math.max(0, Math.min(255, ((115 - lum) / 80) * 255)); }
  }
  const png = await sharp(data, { raw: info }).png().toBuffer();
  await sharp(png).toFile(out);
  await sharp(png).flatten({ background: bg }).resize(1000).png().toFile(prev);
};
