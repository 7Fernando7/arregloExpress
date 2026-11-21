// Guías prácticas (/guias/[slug]). El HTML estático sale en español; el inglés se aplica en el navegador.
// Cada guía enlaza a su servicio (slug de src/content/servicios.ts).

export type Seccion = { h: string; p?: string[]; lista?: string[] };

export type GuiaTexto = {
  titulo: string;
  resumen: string; // la respuesta corta, destacada arriba
  secciones: Seccion[];
  whatsapp: string; // mensaje predefinido
};

export type Guia = GuiaTexto & {
  slug: string;
  servicio: string;
  metaTitle: string; // sin la marca
  metaDescription: string;
  fecha: string; // AAAA-MM-DD
};

export const GUIAS: Guia[] = [
  {
    slug: "arreglar-o-cambiar-cremallera",
    servicio: "cambio-de-cremallera-madrid",
    fecha: "2026-11-21",
    titulo: "¿Se puede arreglar una cremallera rota o hay que cambiarla?",
    metaTitle: "¿Arreglar una cremallera rota o cambiarla?",
    metaDescription:
      "Cuándo una cremallera rota tiene arreglo y cuándo hay que cambiarla entera: cursor, tirador, dientes y cremalleras invisibles. Guía de Arreglos Express Madrid.",
    resumen:
      "Depende de lo que falle. Si el problema está en el cursor (la pieza que sube y baja) o en el tirador, casi siempre se arregla sin cambiar la cremallera. Si faltan dientes o la cinta de tela está rasgada, hay que cambiarla entera.",
    secciones: [
      {
        h: "Casos que suelen tener arreglo sin cambiarla",
        lista: [
          "La cremallera sube, pero se abre por detrás del cursor. El cursor se ha desgastado y ya no aprieta los dientes: se cambia solo el cursor.",
          "Se ha roto o se ha perdido el tirador. Se pone un tirador nuevo o se cambia el cursor.",
          "El cursor se ha salido por un lado. Si los dientes están bien, se vuelve a meter y se cose un tope para que no se repita.",
          "La cremallera está descosida de la prenda. Si la cinta está entera, se vuelve a coser.",
        ],
      },
      {
        h: "Casos en los que hay que cambiarla entera",
        lista: [
          "Faltan dientes o están doblados a media altura. No se pueden reponer uno a uno.",
          "La cinta de tela de la cremallera está rasgada.",
          "En una chaqueta o un abrigo se ha roto la pieza de abajo, donde se encaja la cremallera para empezar a subirla.",
          "Una cremallera invisible (la de faldas y vestidos) que se abre sola: casi nunca compensa repararla.",
        ],
        p: [
          "Una excepción: si el diente que falta está muy abajo en un pantalón, a veces se cose un tope por encima y la cremallera sigue sirviendo, un poco más corta.",
        ],
      },
      {
        h: "Si solo está atascada",
        p: [
          "Antes de dar un tirón, mira si ha pillado tela o forro y suéltalo con cuidado. Si no hay nada pillado, frota los dientes con la mina de un lápiz o con una pastilla de jabón seca y mueve el cursor poco a poco.",
          "No la fuerces: un tirón puede doblar un diente y convertir un atasco en una cremallera para cambiar.",
        ],
      },
      {
        h: "¿Merece la pena arreglarla?",
        p: [
          "Casi siempre. Arreglar o cambiar una cremallera cuesta una pequeña parte de lo que vale un abrigo, unos vaqueros buenos o una mochila, y la prenda queda para usarla años.",
          "Donde hay que mirarlo es en mochilas y bolsos: depende de cómo esté cosida la cremallera y de si se puede llegar a ella. Por eso pedimos siempre una foto.",
        ],
      },
      {
        h: "Qué foto mandarnos",
        lista: [
          "Una de cerca de la zona que falla, con la cremallera a medio subir.",
          "Otra de la prenda, la mochila o el bolso entero.",
          "Dinos si la cremallera se abre del todo (como en una chaqueta) o tiene tope abajo (como en un pantalón).",
        ],
      },
    ],
    whatsapp: "¡Hola! He leído la guía de cremalleras y quiero saber si la mía tiene arreglo.",
  },
  {
    slug: "cuanto-se-puede-estrechar-una-chaqueta",
    servicio: "estrechar-chaqueta-madrid",
    fecha: "2026-11-21",
    titulo: "¿Cuánto se puede estrechar una chaqueta?",
    metaTitle: "¿Cuánto se puede estrechar una chaqueta?",
    metaDescription:
      "Hasta dónde se puede estrechar una chaqueta o americana, qué arreglos son fáciles y cuáles no, y cómo saber si la tuya tiene arreglo. Arreglos Express Madrid.",
    resumen:
      "De cintura y de costados, lo normal es poder quitar una talla sin que se note. Más de eso se puede en algunas chaquetas, pero empiezan a cambiar las proporciones. Lo que manda son los hombros: si te quedan bien, casi todo lo demás se ajusta; si te quedan grandes, el arreglo es difícil y caro.",
    secciones: [
      {
        h: "Lo que se ajusta bien",
        lista: [
          "Cintura y costados: se mete tela por la costura de la espalda y por las laterales. Es el arreglo más habitual.",
          "Mangas anchas: se estrechan por su costura.",
          "Mangas largas: se acortan desde el puño. Si los botones del puño tienen ojales de verdad, hay menos margen.",
          "Largo de la chaqueta: se puede subir un par de centímetros.",
        ],
      },
      {
        h: "Lo que es difícil",
        lista: [
          "Los hombros. Estrecharlos obliga a desmontar las mangas y rehacer la parte más compleja de la chaqueta.",
          "Quitar mucha tela de los costados: los bolsillos se acercan demasiado a la espalda y la chaqueta pierde la forma.",
          "Acortar mucho el largo: los bolsillos y los botones quedan demasiado abajo.",
          "Ensanchar: solo se puede sacar la tela que haya guardada dentro de las costuras, normalmente uno o dos centímetros.",
        ],
      },
      {
        h: "Cómo saber si la tuya tiene arreglo",
        p: ["Póntela abrochada delante de un espejo y mira tres cosas:"],
        lista: [
          "Los hombros: la costura debe caer justo donde termina tu hombro. Si cae por el brazo, la chaqueta es grande de hombros.",
          "La espalda y los costados: pellizca la tela que sobra. Si con un pellizco a cada lado queda bien, el arreglo es sencillo.",
          "Las mangas: con el brazo relajado, deben llegar al hueso de la muñeca.",
        ],
      },
      {
        h: "¿Y los abrigos?",
        p: [
          "Se ajustan igual que una chaqueta, por los costados y la espalda. La tela es más gruesa y llevan forro, así que es más trabajo, pero el criterio es el mismo: que los hombros te queden bien.",
        ],
      },
      {
        h: "Un consejo para la próxima compra",
        p: [
          "Si dudas entre dos tallas, elige la que te quede bien de hombros, aunque sobre de cintura. La cintura se arregla; los hombros, casi nunca.",
        ],
      },
    ],
    whatsapp: "¡Hola! He leído la guía de estrechar chaquetas y quiero saber si la mía tiene arreglo.",
  },
];

export const GUIAS_EN: Record<string, GuiaTexto> = {
  "arreglar-o-cambiar-cremallera": {
    titulo: "Can a broken zip be repaired, or does it need replacing?",
    resumen:
      "It depends on what has failed. If the problem is the slider (the part that moves up and down) or the pull tab, it can almost always be fixed without replacing the zip. If teeth are missing or the fabric tape is torn, the whole zip has to be replaced.",
    secciones: [
      {
        h: "Cases that can usually be fixed without replacing it",
        lista: [
          "The zip closes but opens up behind the slider. The slider is worn and no longer grips the teeth: only the slider is replaced.",
          "The pull tab has broken or fallen off. We fit a new tab or replace the slider.",
          "The slider has come off one side. If the teeth are fine, it is put back on and a stop is sewn in so it doesn't happen again.",
          "The zip has come unstitched from the garment. If the tape is intact, it is sewn back.",
        ],
      },
      {
        h: "Cases where the whole zip must be replaced",
        lista: [
          "Teeth are missing or bent halfway up. They can't be replaced one by one.",
          "The fabric tape of the zip is torn.",
          "On a jacket or coat, the part at the bottom where the zip slots in to start closing has broken.",
          "An invisible zip (the kind on skirts and dresses) that opens by itself: repairing it is almost never worth it.",
        ],
        p: [
          "One exception: if the missing tooth is very low down on a pair of trousers, a stop can sometimes be sewn above it and the zip keeps working, slightly shorter.",
        ],
      },
      {
        h: "If it's just stuck",
        p: [
          "Before you pull hard, check whether it has caught fabric or lining and free it gently. If nothing is caught, rub the teeth with a pencil lead or a dry bar of soap and move the slider little by little.",
          "Don't force it: a hard pull can bend a tooth and turn a jam into a zip that needs replacing.",
        ],
      },
      {
        h: "Is it worth repairing?",
        p: [
          "Almost always. Repairing or replacing a zip costs a small fraction of what a coat, a good pair of jeans or a backpack is worth, and the item lasts for years.",
          "Backpacks and bags need a closer look: it depends on how the zip is sewn in and whether it can be reached. That's why we always ask for a photo.",
        ],
      },
      {
        h: "Which photo to send us",
        lista: [
          "A close-up of the part that fails, with the zip half closed.",
          "Another of the whole garment, backpack or bag.",
          "Tell us whether the zip opens completely (like on a jacket) or has a stop at the bottom (like on trousers).",
        ],
      },
    ],
    whatsapp: "Hi! I've read the zip guide and I'd like to know if mine can be repaired.",
  },
  "cuanto-se-puede-estrechar-una-chaqueta": {
    titulo: "How much can a jacket be taken in?",
    resumen:
      "At the waist and sides, you can normally take a jacket in by one size without it showing. More than that is possible on some jackets, but the proportions start to change. The shoulders decide: if they fit, almost everything else can be adjusted; if they are too big, the alteration is difficult and expensive.",
    secciones: [
      {
        h: "What adjusts well",
        lista: [
          "Waist and sides: fabric is taken in at the back seam and the side seams. It's the most common alteration.",
          "Wide sleeves: they are narrowed along their seam.",
          "Long sleeves: they are shortened from the cuff. If the cuff buttons have working buttonholes, there is less room.",
          "Jacket length: it can be raised by a couple of centimetres.",
        ],
      },
      {
        h: "What is difficult",
        lista: [
          "The shoulders. Narrowing them means taking the sleeves off and rebuilding the most complex part of the jacket.",
          "Taking a lot out of the sides: the pockets end up too close to the back and the jacket loses its shape.",
          "Shortening the length a lot: the pockets and buttons end up too low.",
          "Letting out: only the fabric stored inside the seams can be used, normally one or two centimetres.",
        ],
      },
      {
        h: "How to tell if yours can be altered",
        p: ["Put it on, buttoned, in front of a mirror and check three things:"],
        lista: [
          "The shoulders: the seam should sit right where your shoulder ends. If it drops down your arm, the jacket is too big in the shoulders.",
          "The back and sides: pinch the spare fabric. If a pinch on each side makes it fit, the alteration is simple.",
          "The sleeves: with your arm relaxed, they should reach your wrist bone.",
        ],
      },
      {
        h: "What about coats?",
        p: [
          "They are adjusted like a jacket, at the sides and back. The fabric is thicker and they are lined, so it's more work, but the rule is the same: the shoulders have to fit.",
        ],
      },
      {
        h: "A tip for your next purchase",
        p: [
          "If you're between two sizes, choose the one that fits your shoulders, even if it's loose at the waist. The waist can be fixed; the shoulders, almost never.",
        ],
      },
    ],
    whatsapp: "Hi! I've read the jacket guide and I'd like to know if mine can be altered.",
  },
};

// textos de la interfaz de las guías
export const GUIA_UI = {
  es: {
    nombre: "Guías",
    indiceTitulo: "Guías de arreglos",
    indiceTexto: "Respuestas claras a las dudas más habituales antes de arreglar una prenda.",
    leer: "Leer la guía",
    respuestaCorta: "Respuesta corta",
    ctaTitulo: "¿No sabes si la tuya tiene arreglo?",
    ctaTexto: "Mándanos una foto por WhatsApp y te lo decimos, con el precio, antes de recoger nada.",
    ctaBoton: "Preguntar por WhatsApp",
    servicio: "Ver el servicio",
    otras: "Otras guías",
    relacionada: "Guía relacionada",
    aviso: "Esta guía es orientativa: cada prenda es distinta y lo confirmamos siempre con una foto.",
  },
  en: {
    nombre: "Guides",
    indiceTitulo: "Alteration guides",
    indiceTexto: "Clear answers to the most common questions before having a garment altered.",
    leer: "Read the guide",
    respuestaCorta: "Short answer",
    ctaTitulo: "Not sure whether yours can be fixed?",
    ctaTexto: "Send us a photo on WhatsApp and we'll tell you, with the price, before picking anything up.",
    ctaBoton: "Ask on WhatsApp",
    servicio: "See the service",
    otras: "Other guides",
    relacionada: "Related guide",
    aviso: "This guide is for reference only: every garment is different and we always confirm with a photo.",
  },
};

export const guiaPorSlug = (slug: string) => GUIAS.find((g) => g.slug === slug);
export const guiaDeServicio = (servicio: string) => GUIAS.find((g) => g.servicio === servicio);
export const textoGuia = (g: Guia, language: string): GuiaTexto => (language === "en" ? GUIAS_EN[g.slug] ?? g : g);
export const uiGuia = (language: string) => (language === "en" ? GUIA_UI.en : GUIA_UI.es);
