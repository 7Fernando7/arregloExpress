// Versión en inglés del texto de las páginas de servicio (servicios.ts).
// Se muestra en el navegador cuando el visitante elige EN; el HTML que indexa Google sigue en español.
import type { Servicio } from "./servicios";

export type ServicioTexto = Pick<
  Servicio,
  "nombre" | "h1" | "intro" | "incluye" | "incluyeNota" | "precios" | "consejos" | "preguntas" | "whatsapp"
> & { imagenAlt?: string };

const EXAMPLES_NOTE = "These are examples: send us a photo and we'll confirm what can be done in your case.";
const HOW_LONG = "How long does it take?";
const THREE_DAYS = "We need at least 3 days between pickup and delivery.";
const URGENT =
  "The usual turnaround is 3 days between pickup and delivery. In a hurry? We offer a next-day express service for €5 extra: ask us on WhatsApp whether your alteration qualifies.";
const THREE_DAYS_RUSH =
  "We need at least 3 days between pickup and delivery. If you need it sooner, tell us and we'll try, but we can't guarantee it.";

export const SERVICIOS_EN: Record<string, ServicioTexto> = {
  "bajos-de-pantalon-madrid": {
    precios: [
      { concepto: "Machine-stitched hems", desde: 13 },
    ],
    nombre: "Trouser hems",
    h1: "Trouser hemming with home pickup in Madrid",
    intro: [
      "Trousers that are too long drag on the floor, fray at the back and change how the whole outfit looks. We hem dress trousers, jeans, chinos and suit trousers, as well as skirts and dresses.",
      "We pick the garment up from your home or office in Madrid city, alter it in the workshop and bring it back ready to wear.",
    ],
    incluye: [
      "Hems on dress trousers, suit trousers and chinos",
      "Jeans hems",
      "Skirt and dress hems",
      "Shortening or lengthening, if there is spare fabric in the hem",
    ],
    preguntas: [
      {
        p: "How do you know what length I want?",
        r: "You can mark it yourself with a safety pin (we explain how below), send us a pair that fits you well, or tell us your inside-leg measurement in centimetres.",
      },
      {
        p: "Can you keep the original hem on jeans?",
        r: "Tell us when you ask for a quote and send a photo of the hem: we'll let you know whether it's possible on your garment.",
      },
      { p: HOW_LONG, r: URGENT },
    ],
    whatsapp: "Hi! I'd like a quote for a hem.",
  },
  "estrechar-chaqueta-madrid": {
    precios: [
      { concepto: "Taking in a blazer at the back", desde: 18 },
      { concepto: "Taking in blazer sleeves", desde: 15 },
      { concepto: "Shortening cuffs with buttons (unopened buttonholes)", desde: 28 },
      { concepto: "Shortening cuffs without buttons", desde: 18 },
      { concepto: "Taking in dress trousers at the back", desde: 18 },
      { concepto: "Taking in jeans", desde: 21 },
    ],
    nombre: "Taking in jackets",
    h1: "Taking in jackets, blazers and coats in Madrid",
    intro: [
      "A jacket that is too loose at the waist or the sides loses its shape. We take in jackets, blazers and coats, as well as shirts, dresses and trousers that are too big for you.",
      "We'll tell you on WhatsApp what can be adjusted on your garment before we pick it up, with no obligation.",
    ],
    incluye: [
      "Taking in at the sides and waist",
      "Adjusting blazers and suit jackets",
      "Adjusting coats and casual jackets",
      "Taking in shirts, dresses and trousers",
    ],
    preguntas: [
      {
        p: "Do I need to come in to be measured?",
        r: "No. You can mark the garment yourself with safety pins, send us a similar garment that fits you well, or send a photo of you wearing it, from the front and from the side.",
      },
      {
        p: "Can any jacket be taken in?",
        r: "It depends on how it's made and how much needs to come off. Send us a photo and we'll tell you what's possible before we pick it up.",
      },
      { p: HOW_LONG, r: URGENT },
    ],
    whatsapp: "Hi! I'd like a quote for taking in a garment.",
  },
  "cambio-de-cremallera-madrid": {
    precios: [
      { concepto: "Invisible zip on trousers or a skirt", desde: 18 },
    ],
    nombre: "Zip replacement",
    h1: "Zip replacement with home pickup in Madrid",
    intro: [
      "A broken zip is no reason to stop wearing something you like. We replace or repair zips on trousers, jeans, skirts, dresses, jackets and coats.",
      "You don't need to mark anything: just tell us which zip it is and send us a photo.",
    ],
    incluye: [
      "Zips on trousers and jeans",
      "Invisible zips on skirts and dresses",
      "Zips on jackets and coats",
      "Replacing just the slider when the zip itself is fine",
    ],
    preguntas: [
      {
        p: "Do you fit a zip in the same colour?",
        r: "We look for one as close as possible to the original. If you have a preference, tell us when you ask for a quote.",
      },
      {
        p: "Does the whole zip always need replacing?",
        r: "Not always: sometimes replacing the slider is enough. With a photo we can tell you what your garment needs.",
      },
      { p: HOW_LONG, r: URGENT },
    ],
    whatsapp: "Hi! I'd like a quote for replacing a zip.",
  },
  "coser-botones-madrid": {
    nombre: "Buttons and fastenings",
    h1: "Sewing on and reinforcing buttons in Madrid",
    intro: [
      "Loose, lost or torn-off buttons, press studs that won't close… We replace and reinforce buttons and fastenings on jackets, coats, shirts, trousers and dresses.",
      "If you've lost a button and have no spare, we look for one as similar as possible.",
    ],
    incluye: [
      "Sewing on lost or torn-off buttons",
      "Reinforcing loose buttons",
      "Replacing a garment's full set of buttons",
      "Press studs, hooks and other fastenings",
    ],
    preguntas: [
      {
        p: "What if I've lost the button?",
        r: "We look for one as similar as possible. If you'd rather we change them all so they match, we can do that too.",
      },
      {
        p: "Is it worth it for a single button?",
        r: "Ask us with no obligation: it's often a good moment to reinforce the rest of the buttons on the garment.",
      },
      { p: HOW_LONG, r: URGENT },
    ],
    whatsapp: "Hi! I'd like a quote for some buttons.",
  },
  "arreglo-vestido-de-fiesta-madrid": {
    nombre: "Occasion wear",
    h1: "Alterations for party dresses and occasion wear in Madrid",
    intro: [
      "For a wedding, a communion or an event you want your clothes to fit perfectly. We alter party and wedding-guest dresses, formal suits, communion outfits and costumes.",
      "If you need it for a specific date, tell us in your first message so we can plan the pickup in good time.",
    ],
    incluye: [
      "Hems and adjustments on party and wedding-guest dresses",
      "Adjustments to formal suits",
      "Communion outfits",
      "Costumes",
    ],
    preguntas: [
      {
        p: "I need it for a specific date. Will it be ready?",
        r: "The usual turnaround is 3 days between pickup and delivery. If time is tight, we offer a next-day express service for €5 extra: write to us as soon as you can to confirm it.",
      },
      {
        p: "How do I mark the length of a long dress?",
        r: "Wearing the shoes you'll have on, fold the hem at the front up to where you want it and hold it with safety pins. Or tell us how many centimetres from the floor you want it.",
      },
      {
        p: "Do you alter delicate fabrics?",
        r: "Send us a photo of the garment and its label and we'll tell you what we can do before we pick it up.",
      },
    ],
    whatsapp: "Hi! I'd like a quote for altering an occasion outfit.",
  },
  "cambio-de-forro-madrid": {
    nombre: "Lining replacement",
    h1: "Lining replacement for jackets and coats in Madrid",
    intro: [
      "The lining is the first thing to wear out in a coat or jacket you use a lot. We replace the lining of jackets, blazers, coats and skirts, either completely or just the damaged part.",
      "It's a way to extend the life of good garments that still look perfect on the outside.",
    ],
    incluye: [
      "Full lining for jackets and blazers",
      "Coat linings",
      "Skirt linings",
      "Repairing only the torn part when possible",
    ],
    preguntas: [
      {
        p: "Does the whole lining need replacing?",
        r: "Not always. Send us a photo of the lining and we'll tell you whether only the damaged part can be repaired.",
      },
      {
        p: "Can I choose the lining colour?",
        r: "Yes, tell us your preference when you ask for a quote and we'll look for the closest match.",
      },
      { p: HOW_LONG, r: URGENT },
    ],
    whatsapp: "Hi! I'd like a quote for replacing a lining.",
  },
  "arreglo-de-cortinas-madrid": {
    nombre: "Home textiles",
    h1: "Alterations for curtains, cushions and covers in Madrid",
    intro: [
      "Curtains that drag on the floor, covers coming apart at the seams, cushions with a broken zip… We also alter home textiles.",
      "We pick up from your home, which is exactly what you want when it comes to curtains.",
    ],
    incluye: [
      "Hems on curtains and net curtains",
      "Repairing and adjusting covers",
      "Cushions: seams and zips",
      "Other home textiles: ask us",
    ],
    preguntas: [
      {
        p: "How do I tell you the curtain length?",
        r: "Measure in centimetres from the rod or rail down to where you want them to reach and tell us. If you like, mark the length with safety pins.",
      },
      {
        p: "Do you pick up large curtains?",
        r: "Yes, within Madrid city. Tell us how many there are and their size when you ask for a quote.",
      },
      { p: HOW_LONG, r: URGENT },
    ],
    whatsapp: "Hi! I'd like a quote for altering curtains or home textiles.",
  },
  "arreglo-de-zapatos-madrid": {
    nombre: "Shoe repair",
    h1: "Shoe and boot repair with home pickup in Madrid",
    imagenAlt: "A cobbler's hands stitching a leather shoe in the workshop",
    intro: [
      "Shoes you like shouldn't be thrown away over a worn heel tip or an open seam. We pick up your shoes, boots, sandals or trainers from your home or office and bring them back repaired.",
      "We also repair boots and ankle boots: zips that won't close, worn heel tips and soles, or boots that pinch or rub at the heel, which we soften and stretch on a last.",
      "Every repair is different: send us a photo on WhatsApp and we'll confirm whether it can be done and the price before we pick them up.",
    ],
    incluye: [
      "Heel tips and heels",
      "Soles and half soles",
      "Open seams",
      "Zips on boots and ankle boots",
      "Stretching shoes and boots that pinch or rub",
    ],
    incluyeNota: EXAMPLES_NOTE,
    consejos: [
      "Take a photo of the part of the shoe that needs repairing and another of the sole.",
      "Tell us what's wrong and, if you know, what material it is (leather, suede, fabric…).",
      "If there are several pairs, send them all in the same message and we'll pick them up together.",
    ],
    preguntas: [
      {
        p: "What shoe repairs do you do?",
        r: "Send us a photo on WhatsApp of what your shoes need and we'll confirm whether we can do it before we pick them up.",
      },
      {
        p: "Do you repair boots?",
        r: "Yes, boots and ankle boots. The most common jobs are replacing heel tips and soles, repairing or replacing the zip, and stretching boots that pinch or rub.",
      },
      {
        p: "My boots rub my heel. Can that be fixed?",
        r: "Often, yes: we soften the heel counter (the stiff piece at the heel) and stretch the boot on a last so it stops rubbing. Send us a photo and we'll tell you whether it can be done on yours.",
      },
      {
        p: "Do you pick up shoes and clothes at the same time?",
        r: "Yes, you can hand over shoes and garments in the same pickup.",
      },
      { p: HOW_LONG, r: THREE_DAYS_RUSH },
    ],
    whatsapp: "Hi! I'd like a quote for repairing some shoes.",
  },
  "tintoreria-a-domicilio-madrid": {
    nombre: "Dry cleaning",
    h1: "Dry cleaning with home pickup in Madrid",
    imagenAlt: "Suits and coats in garment covers hanging at a dry cleaner's",
    intro: [
      "Taking clothes to the dry cleaner's and going back for them is exactly what there's never time for. We pick up your garments from your home or office and bring them back clean.",
      "Here's how it works: you message us on WhatsApp, we come to pick up, take your garments to the dry cleaner's and bring them back to your door, ready to wear.",
      "And if they also need an alteration, we do it in the same trip.",
    ],
    incluye: [
      "Suits and blazers",
      "Coats and jackets",
      "Party dresses and delicate garments",
      "Duvets, curtains and wedding dresses (pickup carries a surcharge for bulky items)",
      "Home textiles and rugs: ask us",
    ],
    incluyeNota: EXAMPLES_NOTE,
    consejos: [
      "Tell us which garments they are and send a photo of the care label.",
      "Let us know about any stains and, if you know, what caused them.",
      "If a garment also needs an alteration, tell us and we'll do it all at once.",
    ],
    preguntas: [
      {
        p: "How does dry cleaning with home pickup work?",
        r: "You message us on WhatsApp with the garments you want cleaned, we arrange a pickup at your home or office, take them to the dry cleaner's and bring them back to your door. You don't have to go anywhere.",
      },
      {
        p: "Which areas of Madrid do you cover?",
        r: "All of Madrid city. On the home page you can calculate the pickup and delivery price with your address or postal code.",
      },
      {
        p: "Which garments do you take to the dry cleaner's?",
        r: "Tell us what you need on WhatsApp, with a photo of the label, and we'll confirm the service and the price before pickup.",
      },
      {
        p: "Do you pick up wedding dresses, duvets or rugs?",
        r: "Yes, but being bulky they need different transport (by car, or special transport for rugs), so the pickup price changes. We'll give it to you on WhatsApp before pickup.",
      },
      {
        p: "Can I combine dry cleaning and alterations?",
        r: "Yes: in the same pickup you can hand over garments to clean and garments to alter.",
      },
      { p: HOW_LONG, r: THREE_DAYS },
    ],
    whatsapp: "Hi! I'd like a quote for dry cleaning.",
  },
  "arreglo-de-maletas-madrid": {
    nombre: "Luggage and case repair",
    h1: "Suitcase and case repair with home pickup in Madrid",
    imagenAlt: "A craftsman's hands stitching a suitcase handle in the workshop, next to a padded DJ bag",
    intro: [
      "A suitcase with a broken wheel or a zip that no longer closes doesn't have to end up in the bin. We pick up your suitcase, your guitar or keyboard case, or the flight case or bag for your DJ gear, and bring it back repaired.",
      "Every repair is different: send us a photo on WhatsApp and we'll confirm whether it can be done and the price before we pick it up.",
    ],
    incluye: [
      "Wheels and telescopic handles on suitcases",
      "Handles, pulls and straps",
      "Zips and sliders",
      "Seams and torn fabric on padded cases",
      "Latches, hinges and corners on flight cases",
    ],
    incluyeNota: EXAMPLES_NOTE,
    consejos: [
      "Take a photo of what needs repairing and another of the whole suitcase or case.",
      "Tell us the brand and model if you know them: they help us find the spare part (wheels, handles, latches).",
      "Empty the suitcase or case before pickup: we only take the suitcase or case, not the gear.",
    ],
    preguntas: [
      {
        p: "What luggage repairs do you do?",
        r: "Send us a photo on WhatsApp of what's wrong with your suitcase or case and we'll confirm whether we can do it and the price before we pick it up.",
      },
      {
        p: "Do you repair music and DJ cases and flight cases?",
        r: "Yes: guitar, bass and keyboard cases, controller and record bags, and flight cases. Send us a photo and we'll tell you what can be done.",
      },
      {
        p: "Does pickup cost the same?",
        r: "A suitcase or flight case doesn't fit on the motorbike, so pickup is by car and the price changes. We'll give it to you on WhatsApp before pickup.",
      },
      {
        p: HOW_LONG,
        r: "We need at least 3 days between pickup and delivery. If a spare part has to be ordered it may take longer: we'll tell you with the quote.",
      },
    ],
    whatsapp: "Hi! I'd like a quote for repairing a suitcase or a case.",
  },
};

// texto del servicio en el idioma elegido (en español, el propio servicio)
export function textoServicio(s: Servicio, language: string): ServicioTexto {
  return (language === "en" && SERVICIOS_EN[s.slug]) || s;
}
