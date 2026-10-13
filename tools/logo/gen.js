// Genera el logo de Arreglos Express Madrid como SVG 100% trazado (sin depender de fuentes).
const SWEEP = Number(process.env.SWEEP || 0);
const fs = require("fs");
const ot = require("opentype.js");

const NAVY = "#13294B";
const ORANGE = "#C8602D";

const mont800 = ot.loadSync(__dirname + "/../fuentes/mont800.ttf");
const mont600 = ot.loadSync(__dirname + "/../fuentes/mont600.ttf");
const gara = ot.loadSync(__dirname + "/../fuentes/garamond600.ttf");

const r = (n) => Math.round(n * 10) / 10;

// ---------- helpers ----------
// polígono en coordenadas de glifo (y hacia arriba) -> path SVG (y hacia abajo)
function poly(points, ox, base) {
  return (
    points.map(([x, y], i) => `${i ? "L" : "M"}${r(ox + x)} ${r(base - y)}`).join("") + "Z"
  );
}
function rect(x1, y1, x2, y2) {
  return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
}
// rectángulo redondeado (coordenadas glifo, y arriba) -> path SVG
function rrect(x1, y1, x2, y2, rad, ox, base) {
  const X1 = ox + x1, X2 = ox + x2, Y1 = base - y2, Y2 = base - y1; // Y1 = arriba
  const k = Math.min(rad, (X2 - X1) / 2, (Y2 - Y1) / 2);
  return `M${r(X1 + k)} ${r(Y1)}H${r(X2 - k)}A${r(k)} ${r(k)} 0 0 1 ${r(X2)} ${r(Y1 + k)}V${r(Y2 - k)}A${r(k)} ${r(k)} 0 0 1 ${r(X2 - k)} ${r(Y2)}H${r(X1 + k)}A${r(k)} ${r(k)} 0 0 1 ${r(X1)} ${r(Y2 - k)}V${r(Y1 + k)}A${r(k)} ${r(k)} 0 0 1 ${r(X1 + k)} ${r(Y1)}Z`;
}
// círculo como subpath (para hueco con evenodd)
function circle(cx, cy, rad, ox, base, sweep = 0) {
  const X = ox + cx, Y = base - cy;
  return `M${r(X - rad)} ${r(Y)}a${rad} ${rad} 0 1 ${sweep} ${rad * 2} 0a${rad} ${rad} 0 1 ${sweep} ${-rad * 2} 0Z`;
}
// recorte Sutherland–Hodgman de un polígono contra el semiplano a*x + b*y + c >= 0
function clip(points, a, b, c) {
  const out = [];
  for (let i = 0; i < points.length; i++) {
    const P = points[i], Q = points[(i + 1) % points.length];
    const fp = a * P[0] + b * P[1] + c, fq = a * Q[0] + b * Q[1] + c;
    if (fp >= 0) out.push(P);
    if ((fp >= 0) !== (fq >= 0)) {
      const t = fp / (fp - fq);
      out.push([P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]);
    }
  }
  return out;
}

// ---------- M máquina de coser (unidades Montserrat 800, cap = 700) ----------
const CUT = 330; // hasta dónde baja el cabezal (palo izquierdo recortado)
const mPoly = [
  [253, CUT], [70, CUT], [70, 700], [233, 700], [523, 224], [437, 224], [719, 700],
  [882, 700], [884, 0], [702, 0], [700, 423], [731, 423], [520, 69], [432, 69],
  [215, 423], [253, 423],
];
// M_SCALE: tamaño de la M respecto al resto de letras (crece hacia arriba y a la derecha)
const M_SCALE = Number(process.env.M_SCALE || 1.15);
const M_ADV = 1090; // avance de la M-máquina (el volante sobresale por la derecha)
const M_TOP = 900; // punto más alto (carrete), para colocar la fila de EXPRESS
// o: { wheel: [cx, cy, r, hub], spool: escala del carrete de arriba }
function machineM(ox, base, S = M_SCALE, o = {}) {
  const [wx, wy, wr, wh] = o.wheel || [884, 470, 150, 52];
  const k = o.spool || 1;
  const P = (pts) => pts.map(([x, y]) => [x * S, y * S]);
  const R = (x1, y1, x2, y2, rad) => rrect(x1 * S, y1 * S, x2 * S, y2 * S, rad * S, ox, base);
  const C = (cx, cy, rad, sweep = 0) => circle(cx * S, cy * S, rad * S, ox, base, sweep);
  const navy = [
    poly(P(mPoly), ox, base), // cuerpo (letra M sin la parte baja del palo izquierdo)
    poly(P(rect(10, CUT, 253, 700)), ox, base), // cabezal, más ancho que el palo
    R(-60, 0, 960, 62, 31), // bancada
    poly(P(rect(112, 165, 168, CUT + 2)), ox, base), // barra de aguja
    R(98, 160, 182, 200, 8), // sujeta-agujas
    poly(P([[130, 165], [150, 165], [140, 55]]), ox, base), // aguja
    poly(P(rect(196, 110, 222, CUT + 2)), ox, base), // barra prensatelas
    R(150, 62, 290, 100, 12), // pie prensatelas
    rrect(783 * S, 700 * S - 2, 805 * S, (700 + 60 * k) * S, 6 * S, ox, base), // portacarretes
    // volante: rueda que sobresale por la derecha, con hueco
    C(wx, wy, wr, 1), // volante (sentido horario: se suma al cuerpo, no lo agujerea)
  ];
  // carrete sobre la máquina (mini versión de la I) e hilo hasta la aguja
  const spoolX = 794, spoolY = 700 + 50 * k;
  navy.push(R(spoolX - 62 * k, spoolY, spoolX + 62 * k, spoolY + 24 * k, 8 * k), R(spoolX - 62 * k, spoolY + 126 * k, spoolX + 62 * k, spoolY + 150 * k, 8 * k));
  const orange = [
    C(wx, wy, wh), // buje del volante
    poly(P(rect(spoolX - 46 * k, spoolY + 24 * k, spoolX + 46 * k, spoolY + 126 * k)), ox, base),
    // hilo: del carrete al guiahilos del cabezal, y bajando por delante hasta la aguja
    poly(P([[spoolX - 46 * k, spoolY + 92 * k], [spoolX - 46 * k, spoolY + 76 * k], [60, 742], [60, 758]]), ox, base),
    poly(P(rect(52, 200, 68, 758)), ox, base),
    poly(P([[52, 214], [68, 200], [134, 176], [134, 192]]), ox, base),
  ];
  return { navy, orange };
}

// ---------- M máquina, estilo de la imagen original (cabezal redondeado + detalles en blanco) ----------
// Unidades: cuerpo de 700 de alto (base = 0). Los "detalles blancos" son huecos (evenodd), no pintura.
const REF_RIGHT = 872; // borde derecho de la columna
function machineRef(ox, base, S) {
  const P = (pts) => pts.map(([x, y]) => [x * S, y * S]);
  const Q = (pts) => poly(P(pts), ox, base);
  const R = (x1, y1, x2, y2, rad) => rrect(x1 * S, y1 * S, x2 * S, y2 * S, rad * S, ox, base);
  const H = (x1, y1, x2, y2) => Q(rect(x1, y1, x2, y2)); // hueco rectangular
  const C = (cx, cy, rad, sweep = 0) => circle(cx * S, cy * S, rad * S, ox, base, sweep);
  const navy = [
    // cuerpo: diagonales de la M + columna derecha (algo inclinada) con el botón blanco
    { eo: Q([[200, 700], [452, 516], [693, 700], [863, 700], [872, 40], [629, 40], [657, 431], [452, 276], [233, 452], [200, 452]]) + C(749, 452, 46) },
    // cabezal redondeado con la palanca del hilo en blanco
    { eo: R(0, 219, 233, 700, 60) + H(70, 340, 84, 480) + H(70, 332, 120, 346) + H(106, 219, 120, 346) },
    R(92, 690, 184, 760, 16), // portacarretes
    // barra de aguja (sigue la línea blanca) y prensatelas en contorno
    { eo: R(92, 96, 134, 225, 10) + H(106, 112, 120, 225) },
    { eo: R(92, 60, 170, 100, 12) + H(106, 72, 156, 86) },
    Q([[107, 60], [117, 60], [112, 30]]), // aguja
    // bancada con la placa de la aguja en relieve
    R(-90, 0, 922, 40, 14),
    { eo: R(-60, 34, 272, 80, 18) + H(-34, 50, 246, 62) },
  ];
  // arriba, como en el logo publicado: carrete sobre la columna e hilo naranja hasta el portacarretes
  const k = 0.7, sx = 790, sy = 700 + 50 * k;
  navy.push(
    R(sx - 11, 698, sx + 11, sy + 12 * k, 6), // pin
    R(sx - 62 * k, sy, sx + 62 * k, sy + 24 * k, 8 * k),
    R(sx - 62 * k, sy + 126 * k, sx + 62 * k, sy + 150 * k, 8 * k)
  );
  const orange = [
    Q(rect(sx - 46 * k, sy + 24 * k, sx + 46 * k, sy + 126 * k)),
    Q([[sx - 46 * k, sy + 84 * k], [sx - 46 * k, sy + 70 * k], [184, 738], [184, 752]]), // hilo
  ];
  return { navy, orange };
}

// ---------- carrete I ----------
const SPOOL_ADV = 350;
function spool(ox, base, h = 700) {
  const s = h / 700;
  const F = 92 * s; // alto pestaña
  const fx1 = 20 * s, fx2 = 330 * s, bx1 = 70 * s, bx2 = 280 * s;
  const navy = [rrect(fx1, h - F, fx2, h, 26 * s, ox, base), rrect(fx1, 0, fx2, F, 26 * s, ox, base)];
  // hilo: bandas naranjas en diagonal con huecos
  const body = rect(bx1, F, bx2, h - F);
  const m = -0.42; // pendiente (y = m x + c), baja de izquierda a derecha
  const period = 105 * s, gap = 22 * s;
  const orange = [];
  for (let c = -400 * s; c < 1400 * s; c += period) {
    // banda: c + gap <= y - m x <= c + period
    let p = clip(body, -m, 1, -(c + gap));
    p = clip(p, m, -1, c + period);
    if (p.length >= 3) orange.push(poly(p, ox, base));
  }
  return { navy, orange };
}

// ---------- texto trazado ----------
function textPath(font, str, x, y, size, tracking = 0) {
  if (!tracking) return font.getPath(str, x, y, size).toPathData(1);
  let d = "", cx = x;
  for (const ch of str) {
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(1);
    cx += (g.advanceWidth / font.unitsPerEm) * size + tracking;
  }
  return d;
}
function textWidth(font, str, size, tracking = 0) {
  if (!tracking) return font.getAdvanceWidth(str, size);
  let w = 0;
  for (const ch of str) w += (font.charToGlyph(ch).advanceWidth / font.unitsPerEm) * size + tracking;
  return w - tracking;
}

// ---------- composición ----------
function buildFull() {
  const navy = [], orange = [];
  // fila 3: MADRID
  const base3 = 1400;
  let x = 0;
  const mm = machineM(x, base3);
  navy.push(...mm.navy); orange.push(...mm.orange);
  const gM = mont800.charToGlyph("M"), gA = mont800.charToGlyph("A");
  x += M_ADV * M_SCALE + mont800.getKerningValue(gM, gA);
  navy.push(textPath(mont800, "ADR", x, base3, 1000));
  x += mont800.getAdvanceWidth("ADR", 1000);
  const sp = spool(x, base3);
  navy.push(...sp.navy); orange.push(...sp.orange);
  x += SPOOL_ADV;
  navy.push(textPath(mont800, "D", x, base3, 1000));
  const madridRight = x + 792; // borde derecho real de la D
  const W = madridRight;
  const top3 = base3 - 700;

  // fila 2: EXPRESS con costura a los lados
  const exSize = 200, exTrack = 120;
  const exCap = 0.7 * exSize;
  const exCenter = base3 - M_TOP * M_SCALE - 170;
  const exBase = exCenter + exCap / 2;
  const exW = textWidth(mont600, "EXPRESS", exSize, exTrack);
  const exX = (W - exW) / 2;
  orange.push(textPath(mont600, "EXPRESS", exX, exBase, exSize, exTrack));
  const dash = 78, dgap = 50, th = 20, pad = 70;
  const dashes = (from, to, fromRight) => {
    // dibuja guiones desde el texto hacia fuera para que el hueco junto al texto sea siempre igual
    for (let p = 0; p + dash <= to - from + 0.1; p += dash + dgap) {
      const x1 = fromRight ? to - p - dash : from + p;
      orange.push(rrect(x1, -th / 2, x1 + dash, th / 2, th / 2, 0, exCenter));
    }
  };
  dashes(0, exX - pad, true);
  dashes(exX + exW + pad, W, false);

  // fila 1: Arreglos (centrado, ~94 % del ancho de MADRID)
  const target = W * 0.94;
  const bb1 = gara.getPath("Arreglos", 0, 0, 1000).getBoundingBox();
  const size1 = (1000 * target) / (bb1.x2 - bb1.x1);
  const descender = (289 / 1000) * size1;
  const base1 = exCenter - descender - 110;
  const x1 = (W - target) / 2 - (bb1.x1 * size1) / 1000;
  navy.push(textPath(gara, "Arreglos", x1, base1, size1));
  const top1 = base1 - (705 / 1000) * size1;

  return { navy, orange, box: [-60 * M_SCALE, top1, W, base3] };
}

// LAYOUT=big: la M ocupa de "Arreglos" a "ADRID"; el texto empieza donde la A
function buildBig() {
  const navy = [], orange = [];
  const base3 = 1400;
  const adrW = mont800.getAdvanceWidth("ADR", 1000) + SPOOL_ADV + 792 + 14; // ADRID (+ borde de la A)
  // vertical (no depende de la M): ADRID abajo, EXPRESS, Arreglos arriba
  const top3 = base3 - 700;
  const exSize = 200, exTrack = 120, exCap = 0.7 * exSize;
  const exCenter = top3 - 250;
  const bb1 = gara.getPath("Arreglos", 0, 0, 1000).getBoundingBox();
  const target = adrW * 0.97;
  const size1 = (1000 * target) / (bb1.x2 - bb1.x1);
  const base1 = exCenter - (289 / 1000) * size1 - 100;
  const top1 = base1 + (bb1.y1 * size1) / 1000; // bb1.y1 es negativo (sube)
  // la M (cuerpo, 700 de alto) cubre desde top1 hasta la base
  const S = (base3 - top1) / 700;
  const wheel = [846, 470, 118, 44];
  const ref = process.env.STYLE === "ref";
  if (ref) {
    const mr = machineRef(0, base3, S);
    navy.push(...mr.navy); orange.push(...mr.orange);
  } else {
    const mm = machineM(0, base3, S, { wheel, spool: Number(process.env.SPOOL || 0.7) });
    navy.push(...mm.navy); orange.push(...mm.orange);
  }
  // el texto empieza tras la columna (ref) o tras el volante
  const tx = (ref ? REF_RIGHT : wheel[0] + wheel[2]) * S + (ref ? 110 : 70);
  // ADRID
  let x = tx + 14;
  navy.push(textPath(mont800, "ADR", x, base3, 1000));
  x += mont800.getAdvanceWidth("ADR", 1000);
  const sp = spool(x, base3);
  navy.push(...sp.navy); orange.push(...sp.orange);
  x += SPOOL_ADV;
  navy.push(textPath(mont800, "D", x, base3, 1000));
  const W = x + 792;
  const blockW = W - tx;
  // EXPRESS con costura, centrado sobre el bloque de texto
  const exW = textWidth(mont600, "EXPRESS", exSize, exTrack);
  const exX = tx + (blockW - exW) / 2;
  orange.push(textPath(mont600, "EXPRESS", exX, exCenter + exCap / 2, exSize, exTrack));
  const dash = 78, dgap = 50, th = 20, pad = 70;
  const dashes = (from, to, fromRight) => {
    for (let p = 0; p + dash <= to - from + 0.1; p += dash + dgap) {
      const x1 = fromRight ? to - p - dash : from + p;
      orange.push(rrect(x1, -th / 2, x1 + dash, th / 2, th / 2, 0, exCenter));
    }
  };
  dashes(tx, exX - pad, true);
  dashes(exX + exW + pad, W, false);
  // Arreglos
  const x1 = tx + (blockW - target) / 2 - (bb1.x1 * size1) / 1000;
  navy.push(textPath(gara, "Arreglos", x1, base1, size1));
  const topSpool = ref ? base3 - (735 + 150 * 0.7) * S : base3 - (700 + 50 * 0.7 + 150 * Number(process.env.SPOOL || 0.7)) * S;
  return { navy, orange, box: [(ref ? -90 : -60) * S, Math.min(top1, topSpool), W, base3] };
}

function svg({ navy, orange, box }, padding, opts = {}) {
  const [x1, y1, x2, y2] = box;
  const vb = [x1 - padding, y1 - padding, x2 - x1 + padding * 2, y2 - y1 + padding * 2].map(r);
  const n = opts.navy || NAVY, o = opts.orange || ORANGE;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(" ")}" role="img" aria-label="Arreglos Express Madrid">
${navy.filter((d) => typeof d === "string").map((d) => `<path fill="${n}" d="${d}"/>`).join("")}
${navy.filter((d) => typeof d !== "string").map((d) => `<path fill="${n}" fill-rule="evenodd" d="${d.eo}"/>`).join("")}
<path fill="${o}" d="${orange.join("")}"/>
</svg>
`;
}

// LAYOUT=mark: solo la M-máquina (para iconos), en un cuadrado
function buildMark() {
  const base = 1000;
  const mr = machineRef(0, base, 1);
  const top = base - (735 + 150 * 0.7), left = -90, right = 922;
  const size = Math.max(right - left, base - top);
  const cx = (left + right) / 2, cy = (top + base) / 2;
  return { navy: mr.navy, orange: mr.orange, box: [cx - size / 2, cy - size / 2, cx + size / 2, cy + size / 2] };
}
const full = process.env.LAYOUT === "big" ? buildBig() : process.env.LAYOUT === "mark" ? buildMark() : buildFull();
const outDir = process.argv[2] || __dirname + "/out";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outDir + "/logo.svg", svg(full, 40));
fs.writeFileSync(outDir + "/logo-white.svg", svg(full, 40, { navy: "#FFFFFF", orange: ORANGE }));

// icono: solo el carrete, cuadrado
const ic = spool(0, 700);
const icon = { navy: ic.navy, orange: ic.orange, box: [-155 + 175, 0, 155 + 175, 700] };
// caja cuadrada centrada en el carrete (x 20..330 -> centro 175)
fs.writeFileSync(outDir + "/icon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-215 -40 780 780">
<path fill="${NAVY}" d="${ic.navy.join("")}"/>
<path fill="${ORANGE}" d="${ic.orange.join("")}"/>
</svg>
`);
console.log("ok", full.box.map(r));
