// Genera un recibo en PNG con el logo, fuera de la web (no se publica).
// Uso: node scripts/recibo.mjs --cliente "Nombre" --importe 25 --concepto "Bajo de pantalón express" [--forma Efectivo] [--fecha 2026-11-20] [--numero 12]
// Guarda la imagen en recibos/ y apunta cada recibo en recibos/registro.csv (carpeta ignorada por git: lleva nombres de clientes).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = {};
for (let i = 2; i < process.argv.length; i += 2) args[process.argv[i].replace(/^--/, "")] = process.argv[i + 1];
for (const k of ["cliente", "importe", "concepto"]) {
  if (!args[k]) {
    console.error(`Falta --${k}`);
    process.exit(1);
  }
}

const DIR = "recibos";
const REGISTRO = path.join(DIR, "registro.csv");
fs.mkdirSync(DIR, { recursive: true });
if (!fs.existsSync(REGISTRO)) fs.writeFileSync(REGISTRO, "numero;fecha;cliente;importe;concepto;forma\n");

const filas = fs.readFileSync(REGISTRO, "utf8").trim().split("\n").slice(1);
const ultimo = filas.reduce((m, f) => Math.max(m, Number(f.split(";")[0]) || 0), 0);
const numero = Number(args.numero ?? ultimo + 1);
if (filas.some((f) => Number(f.split(";")[0]) === numero)) {
  console.error(`El recibo nº ${numero} ya existe en ${REGISTRO}`);
  process.exit(1);
}

const fecha = args.fecha ?? new Date().toISOString().slice(0, 10);
const forma = args.forma ?? "Efectivo";
const importeNum = Number(String(args.importe).replace(",", "."));
if (Number.isNaN(importeNum)) {
  console.error("El importe no es un número");
  process.exit(1);
}
const importe = `${importeNum.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
const fechaLarga = new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
const num4 = String(numero).padStart(4, "0");

const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const partir = (texto, max, maxLineas) => {
  const lineas = [];
  let actual = "";
  for (const p of texto.split(/\s+/).filter(Boolean)) {
    if ((actual + " " + p).trim().length <= max) actual = (actual + " " + p).trim();
    else {
      lineas.push(actual);
      actual = p;
    }
  }
  if (actual) lineas.push(actual);
  if (lineas.length > maxLineas) {
    lineas.length = maxLineas;
    lineas[maxLineas - 1] += "…";
  }
  return lineas;
};

const W = 1200, H = 800, NAVY = "#12294a", TEJA = "#c8582d", GRIS = "#5b6676";
const F = "font-family='Arial, Helvetica, sans-serif'";
const fila = (etiqueta, valor, y) => `
  <text x="64" y="${y}" ${F} font-size="24" fill="${GRIS}">${etiqueta}</text>
  <text x="300" y="${y}" ${F} font-size="30" font-weight="bold" fill="${NAVY}">${esc(valor)}</text>
  <line x1="300" y1="${y + 12}" x2="${W - 64}" y2="${y + 12}" stroke="#d5d9e0" stroke-width="1"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="${TEJA}" stroke-width="3" stroke-dasharray="14 10"/>
  <text x="${W - 64}" y="112" text-anchor="end" ${F} font-size="60" font-weight="bold" fill="${TEJA}">RECIBO</text>
  <text x="${W - 64}" y="156" text-anchor="end" ${F} font-size="30" font-weight="bold" fill="${NAVY}">Nº ${num4}</text>
  <text x="${W - 64}" y="194" text-anchor="end" ${F} font-size="24" fill="${GRIS}">Madrid, ${fechaLarga}</text>
  <line x1="64" y1="230" x2="${W - 64}" y2="230" stroke="${NAVY}" stroke-width="2"/>
  ${fila("Recibí de", args.cliente, 300)}
  ${fila("La cantidad de", importe, 372)}
  <text x="64" y="444" ${F} font-size="24" fill="${GRIS}">Por</text>
  ${partir(args.concepto, 58, 3).map((l, i) => `<text x="300" y="${444 + i * 40}" ${F} font-size="28" fill="${NAVY}">${esc(l)}</text>`).join("")}
  ${fila("Forma de pago", forma, 590)}
  <rect x="64" y="636" width="330" height="76" fill="#fbeee6"/>
  <text x="84" y="688" ${F} font-size="40" font-weight="bold" fill="${NAVY}">${importe}</text>
  <text x="${W - 64}" y="664" text-anchor="end" ${F} font-size="22" fill="${GRIS}">Fdo.</text>
  <text x="${W - 64}" y="700" text-anchor="end" ${F} font-size="28" font-weight="bold" fill="${NAVY}">Arreglos Express Madrid</text>
  <text x="${W / 2}" y="750" text-anchor="middle" ${F} font-size="18" fill="${GRIS}">arreglosexpressmadrid.com · info@arreglosexpressmadrid.com · Justificante de pago, no es una factura</text>
</svg>`;

const logo = await sharp("public/brand/logo-v3.png").resize({ width: 310 }).toBuffer();
const salida = path.join(DIR, `recibo-${num4}.png`);
await sharp(Buffer.from(svg)).composite([{ input: logo, left: 64, top: 60 }]).png().toFile(salida);

const limpio = (t) => String(t).replace(/[;\n]/g, " ");
fs.appendFileSync(REGISTRO, `${numero};${fecha};${limpio(args.cliente)};${importeNum.toFixed(2)};${limpio(args.concepto)};${forma}\n`);
console.log(`Recibo nº ${num4} guardado en ${salida}`);
