// Páginas por servicio (/arreglos/[slug]). Solo español: son las que posicionan en Google.
// El orden importa: coincide con las tarjetas de la portada (Services.tsx, service1…service9).
// Sin precios ni plazos inventados: el precio se da por WhatsApp y el mínimo es 3 días.

export type MarkingKey = "pants" | "skirt" | "sleeves" | "takeIn" | "zips";

export type Servicio = {
  slug: string;
  categoria: "ropa" | "calzado" | "tintoreria";
  nombre: string; // texto corto para enlaces y migas de pan
  h1: string;
  metaTitle: string; // sin la marca (la añade la plantilla del layout)
  metaDescription: string;
  intro: string[];
  imagen?: { src: string; alt: string; width: number; height: number }; // foto junto al título
  incluye: string[];
  incluyeNota?: string; // aviso bajo «Qué incluye» (p. ej. cuando son solo ejemplos)
  marcar?: MarkingKey; // guía de marcado (si la prenda se marca)
  consejos?: string[]; // si no se marca: qué necesitamos saber
  preguntas: { p: string; r: string }[];
  whatsapp: string; // mensaje predefinido
};

export const SERVICIOS: Servicio[] = [
  {
    slug: "bajos-de-pantalon-madrid",
    categoria: "ropa",
    nombre: "Bajos de pantalón",
    h1: "Bajos de pantalón a domicilio en Madrid",
    metaTitle: "Bajos de pantalón y vaqueros a domicilio en Madrid",
    metaDescription:
      "Cogemos el bajo de tus pantalones, vaqueros, faldas y vestidos con recogida y entrega a domicilio en Madrid capital. Presupuesto por WhatsApp.",
    intro: [
      "Un pantalón demasiado largo se arrastra, se rompe por detrás y cambia cómo te queda todo el conjunto. Cogemos el bajo de pantalones de vestir, vaqueros, chinos y de traje, y también de faldas y vestidos.",
      "Pasamos a recoger la prenda por tu casa o tu oficina en Madrid capital, la arreglamos en el taller y te la devolvemos lista para ponértela.",
    ],
    incluye: [
      "Bajos de pantalón de vestir, de traje y chinos",
      "Bajos de vaqueros",
      "Bajos de faldas y vestidos",
      "Acortar o alargar, si la prenda tiene tela de sobra en el dobladillo",
    ],
    marcar: "pants",
    preguntas: [
      {
        p: "¿Cómo sabéis a qué largo lo quiero?",
        r: "Puedes marcarlo tú con un imperdible (te explicamos cómo más abajo), mandarnos un pantalón que te quede bien de largo o decirnos tu medida de entrepierna en centímetros.",
      },
      {
        p: "¿Se puede mantener el bajo original del vaquero?",
        r: "Cuéntanoslo al pedir presupuesto y mándanos una foto del bajo: te decimos si en tu prenda es posible.",
      },
      {
        p: "¿Cuánto tardáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega. Si lo necesitas antes, dínoslo e intentaremos hacerlo, pero no podemos garantizarlo.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para coger un bajo.",
  },
  {
    slug: "estrechar-chaqueta-madrid",
    categoria: "ropa",
    nombre: "Estrechar chaquetas",
    h1: "Estrechar chaquetas, americanas y abrigos en Madrid",
    metaTitle: "Estrechar chaquetas, americanas y abrigos en Madrid",
    metaDescription:
      "Ajustamos chaquetas, americanas, abrigos y otras prendas para que te queden a medida. Recogida y entrega a domicilio en Madrid capital.",
    intro: [
      "Una chaqueta que te queda ancha de cintura o de costados pierde toda la forma. Estrechamos chaquetas, americanas, blazers y abrigos, y también camisas, vestidos y pantalones que te quedan grandes.",
      "Te decimos por WhatsApp qué se puede ajustar en tu prenda antes de recogerla, sin compromiso.",
    ],
    incluye: [
      "Estrechar de costados y de cintura",
      "Ajustar americanas, blazers y chaquetas de traje",
      "Ajustar abrigos y cazadoras",
      "Estrechar camisas, vestidos y pantalones",
    ],
    marcar: "takeIn",
    preguntas: [
      {
        p: "¿Tengo que ir a que me tomen medidas?",
        r: "No. Puedes marcar la prenda tú con imperdibles, mandarnos otra prenda parecida que te quede bien o enviarnos una foto con la prenda puesta, de frente y de lado.",
      },
      {
        p: "¿Se puede estrechar cualquier chaqueta?",
        r: "Depende de cómo esté hecha y de cuánto haya que quitar. Mándanos una foto y te decimos qué es posible antes de recogerla.",
      },
      {
        p: "¿Cuánto tardáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para estrechar una prenda.",
  },
  {
    slug: "cambio-de-cremallera-madrid",
    categoria: "ropa",
    nombre: "Cambio de cremalleras",
    h1: "Cambio de cremalleras a domicilio en Madrid",
    metaTitle: "Cambio y arreglo de cremalleras a domicilio en Madrid",
    metaDescription:
      "Cambiamos o reparamos cremalleras de pantalones, faldas, vestidos, chaquetas y abrigos. Recogida y entrega a domicilio en Madrid capital.",
    intro: [
      "Una cremallera rota no es motivo para dejar de ponerte una prenda que te gusta. Cambiamos o reparamos cremalleras de pantalones, vaqueros, faldas, vestidos, chaquetas, abrigos y cazadoras.",
      "No hace falta que marques nada: solo dinos qué cremallera es y mándanos una foto.",
    ],
    incluye: [
      "Cremalleras de pantalones y vaqueros",
      "Cremalleras invisibles de faldas y vestidos",
      "Cremalleras de chaquetas, abrigos y cazadoras",
      "Cambio de tirador cuando la cremallera está bien",
    ],
    marcar: "zips",
    preguntas: [
      {
        p: "¿Ponéis una cremallera del mismo color?",
        r: "Buscamos una lo más parecida posible a la original. Si tienes preferencia, dínoslo al pedir presupuesto.",
      },
      {
        p: "¿Siempre hay que cambiar la cremallera entera?",
        r: "No siempre: a veces basta con cambiar el tirador. Con una foto te decimos qué necesita tu prenda.",
      },
      {
        p: "¿Cuánto tardáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para cambiar una cremallera.",
  },
  {
    slug: "coser-botones-madrid",
    categoria: "ropa",
    nombre: "Botones y cierres",
    h1: "Coser y reforzar botones en Madrid",
    metaTitle: "Coser, reponer y reforzar botones a domicilio en Madrid",
    metaDescription:
      "Reponemos y reforzamos botones, broches y otros cierres de chaquetas, abrigos, camisas y pantalones. Recogida y entrega a domicilio en Madrid.",
    intro: [
      "Botones flojos, perdidos o arrancados, broches que no cierran… Reponemos y reforzamos botones y cierres de chaquetas, abrigos, camisas, pantalones y vestidos.",
      "Si has perdido un botón y no tienes repuesto, buscamos uno lo más parecido posible.",
    ],
    incluye: [
      "Coser botones perdidos o arrancados",
      "Reforzar botones flojos",
      "Cambiar el juego de botones de una prenda",
      "Broches, corchetes y otros cierres",
    ],
    marcar: "zips",
    preguntas: [
      {
        p: "¿Y si he perdido el botón?",
        r: "Buscamos uno lo más parecido posible. Si quieres que cambiemos todos para que sean iguales, también se puede.",
      },
      {
        p: "¿Merece la pena para un solo botón?",
        r: "Pregúntanos sin compromiso: muchas veces se aprovecha para reforzar el resto de botones de la prenda.",
      },
      {
        p: "¿Cuánto tardáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para unos botones.",
  },
  {
    slug: "arreglo-vestido-de-fiesta-madrid",
    categoria: "ropa",
    nombre: "Trajes de ocasión",
    h1: "Arreglos de vestidos de fiesta y trajes de ocasión en Madrid",
    metaTitle: "Arreglos de vestidos de fiesta, bodas y comuniones en Madrid",
    metaDescription:
      "Ajustamos vestidos de fiesta, de invitada, trajes de boda, comunión y disfraces. Recogida y entrega a domicilio en Madrid capital.",
    intro: [
      "Para una boda, una comunión o un evento quieres que la ropa te quede perfecta. Arreglamos vestidos de fiesta y de invitada, trajes de ceremonia, trajes de comunión y disfraces.",
      "Si lo necesitas para una fecha concreta, dínoslo desde el primer mensaje para organizar la recogida con tiempo.",
    ],
    incluye: [
      "Bajos y ajustes de vestidos de fiesta y de invitada",
      "Ajustes de trajes de ceremonia",
      "Trajes de comunión",
      "Disfraces",
    ],
    marcar: "skirt",
    preguntas: [
      {
        p: "Lo necesito para una fecha concreta, ¿llegáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega. Cuanto antes nos escribas, más fácil es cuadrarlo.",
      },
      {
        p: "¿Cómo marco el largo de un vestido largo?",
        r: "Con los zapatos que vas a llevar, dobla el bajo por delante hasta donde quieras y sujétalo con imperdibles. O dinos a cuántos centímetros del suelo lo quieres.",
      },
      {
        p: "¿Arregláis tejidos delicados?",
        r: "Mándanos una foto de la prenda y de la etiqueta y te decimos qué podemos hacer antes de recogerla.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para arreglar un traje de ocasión.",
  },
  {
    slug: "cambio-de-forro-madrid",
    categoria: "ropa",
    nombre: "Cambio de forros",
    h1: "Cambio de forros de chaquetas y abrigos en Madrid",
    metaTitle: "Cambio de forro de chaquetas, abrigos y faldas en Madrid",
    metaDescription:
      "Cambiamos el forro interior roto o gastado de chaquetas, abrigos, americanas y faldas. Recogida y entrega a domicilio en Madrid capital.",
    intro: [
      "El forro es lo primero que se rompe en un abrigo o una chaqueta que usas mucho. Cambiamos el forro interior de chaquetas, americanas, abrigos y faldas, completo o solo la parte dañada.",
      "Así alargas la vida de prendas buenas que por fuera siguen perfectas.",
    ],
    incluye: [
      "Forro completo de chaquetas y americanas",
      "Forro de abrigos",
      "Forro de faldas",
      "Reparar solo la parte rota cuando es posible",
    ],
    marcar: "zips",
    preguntas: [
      {
        p: "¿Hay que cambiar el forro entero?",
        r: "No siempre. Mándanos una foto del forro y te decimos si se puede reparar solo la parte dañada.",
      },
      {
        p: "¿Puedo elegir el color del forro?",
        r: "Sí, dinos tu preferencia al pedir presupuesto y buscamos el más parecido.",
      },
      {
        p: "¿Cuánto tardáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para cambiar un forro.",
  },
  {
    slug: "arreglo-de-cortinas-madrid",
    categoria: "ropa",
    nombre: "Textil del hogar",
    h1: "Arreglo de cortinas, cojines y fundas en Madrid",
    metaTitle: "Arreglo de cortinas, cojines y fundas a domicilio en Madrid",
    metaDescription:
      "Cogemos bajos de cortinas y arreglamos cojines, fundas y otro textil del hogar. Recogida y entrega a domicilio en Madrid capital.",
    intro: [
      "Cortinas que arrastran por el suelo, fundas descosidas, cojines con la cremallera rota… También arreglamos textil del hogar.",
      "Recogemos en tu casa, que con las cortinas es justo lo que más se agradece.",
    ],
    incluye: [
      "Bajos de cortinas y visillos",
      "Arreglo y ajuste de fundas",
      "Cojines: costuras y cremalleras",
      "Otros textiles del hogar: pregúntanos",
    ],
    marcar: "skirt",
    preguntas: [
      {
        p: "¿Cómo os digo el largo de las cortinas?",
        r: "Mide en centímetros desde la barra o el riel hasta donde quieras que lleguen y dínoslo. Si quieres, marca el largo con imperdibles.",
      },
      {
        p: "¿Recogéis cortinas grandes?",
        r: "Sí, dentro de Madrid capital. Cuéntanos cuántas son y su tamaño al pedir presupuesto.",
      },
      {
        p: "¿Cuánto tardáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para arreglar cortinas o textil del hogar.",
  },
  {
    slug: "arreglo-de-zapatos-madrid",
    categoria: "calzado",
    nombre: "Arreglo de zapatos",
    h1: "Arreglo de zapatos a domicilio en Madrid",
    imagen: { src: "/brand/zapatos.jpg", alt: "Manos de un zapatero cosiendo un zapato de piel en el taller", width: 1200, height: 900 },
    metaTitle: "Arreglo de zapatos y calzado a domicilio en Madrid",
    metaDescription:
      "Recogemos tus zapatos, botas o zapatillas en casa y te los devolvemos arreglados. Tapas, suelas, costuras y más en Madrid capital.",
    intro: [
      "Unos zapatos que te gustan no se tiran por una tapa gastada o una costura abierta. Recogemos tus zapatos, botas, sandalias o zapatillas en casa o en la oficina y te los devolvemos arreglados.",
      "Cada arreglo es distinto: mándanos una foto por WhatsApp y te confirmamos si se puede hacer y el precio antes de recogerlos.",
    ],
    incluye: [
      "Cambio de tapas y tacones",
      "Suelas y medias suelas",
      "Costuras abiertas",
      "Cremalleras de botas",
    ],
    incluyeNota: "Son ejemplos: mándanos una foto y te confirmamos qué se puede hacer en tu caso.",
    consejos: [
      "Haz una foto de la parte del zapato que hay que arreglar y otra de la suela.",
      "Dinos qué le pasa y, si lo sabes, de qué material es (piel, ante, tela…).",
      "Si son varios pares, mándalos todos en el mismo mensaje y los recogemos juntos.",
    ],
    preguntas: [
      {
        p: "¿Qué arreglos de zapatos hacéis?",
        r: "Mándanos una foto por WhatsApp de lo que necesita tu calzado y te confirmamos si podemos hacerlo antes de recogerlo.",
      },
      {
        p: "¿Recogéis zapatos y ropa a la vez?",
        r: "Sí, en la misma recogida puedes darnos zapatos y prendas para arreglar.",
      },
      {
        p: "¿Cuánto tardáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega. Si lo necesitas antes, dínoslo e intentaremos hacerlo, pero no podemos garantizarlo.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para arreglar unos zapatos.",
  },
  {
    slug: "tintoreria-a-domicilio-madrid",
    categoria: "tintoreria",
    nombre: "Tintorería",
    h1: "Tintorería a domicilio en Madrid",
    // CC0 (rawpixel / Wikimedia Commons)
    imagen: { src: "/brand/tintoreria.jpg", alt: "Trajes y abrigos con funda colgados en una tintorería", width: 1024, height: 684 },
    metaTitle: "Tintorería a domicilio en Madrid: recogida y entrega",
    metaDescription:
      "Tintorería con recogida y entrega a domicilio en Madrid capital: trajes, abrigos, vestidos y prendas delicadas. Presupuesto por WhatsApp.",
    intro: [
      "Llevar la ropa a la tintorería y volver a recogerla es justo lo que nunca da tiempo a hacer. Recogemos tus prendas en casa o en la oficina y te las devolvemos limpias.",
      "Y si además necesitan un arreglo, lo hacemos en el mismo viaje.",
    ],
    incluye: [
      "Trajes y americanas",
      "Abrigos y chaquetas",
      "Vestidos de fiesta y prendas delicadas",
      "Textil del hogar y alfombras: pregúntanos",
    ],
    incluyeNota: "Son ejemplos: mándanos una foto y te confirmamos qué se puede hacer en tu caso.",
    consejos: [
      "Dinos qué prendas son y mándanos una foto de la etiqueta de composición.",
      "Avísanos de cualquier mancha y, si lo sabes, de qué es.",
      "Si alguna prenda necesita además un arreglo, cuéntanoslo y lo hacemos todo a la vez.",
    ],
    preguntas: [
      {
        p: "¿Qué prendas lleváis a la tintorería?",
        r: "Cuéntanos qué necesitas por WhatsApp, con una foto de la etiqueta, y te confirmamos el servicio y el precio antes de recoger.",
      },
      {
        p: "¿Recogéis vestidos de novia, edredones o alfombras?",
        r: "Sí, pero al ser voluminosos necesitan otro transporte (en coche, o especial en el caso de las alfombras), así que el precio de recogida cambia. Te lo damos por WhatsApp antes de recoger.",
      },
      {
        p: "¿Puedo juntar tintorería y arreglos?",
        r: "Sí: en la misma recogida puedes darnos prendas para limpiar y prendas para arreglar.",
      },
      {
        p: "¿Cuánto tardáis?",
        r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega.",
      },
    ],
    whatsapp: "¡Hola! Quiero presupuesto para la tintorería.",
  },
];

export const ROPA_SLUG = "arreglo-de-ropa-madrid"; // página que agrupa los arreglos de ropa
export const serviciosDeRopa = () => SERVICIOS.filter((s) => s.categoria === "ropa");

export const servicioPorSlug = (slug: string) => SERVICIOS.find((s) => s.slug === slug);
