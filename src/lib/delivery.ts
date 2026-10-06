// Estimación del precio de recogida + entrega según el código postal.
// Solo Madrid capital (28001–28055). Coordenadas: centroides de GeoNames.

// Km 0, Puerta del Sol
export const ORIGIN = { lat: 40.4169, lng: -3.7035 };

// TODO: calibrar con las tarifas reales de Glovo / Cabify Envíos
export const PRICING = {
  base: 3, // € fijos por trayecto
  perKm: 0.7, // € por km de trayecto
  roadFactor: 1.35, // km por calle ≈ km en línea recta × factor
  minTrip: 4, // € mínimo por trayecto
  roundTo: 0.5, // redondeo del total hacia arriba
};

export const POSTAL_CODES: Record<string, [number, number]> = {
  "28001": [40.4255, -3.6834],
  "28002": [40.4465, -3.6751],
  "28003": [40.4423, -3.7046],
  "28004": [40.4241, -3.7007],
  "28005": [40.4081, -3.7107],
  "28006": [40.4344, -3.6805],
  "28007": [40.4066, -3.6724],
  "28008": [40.4277, -3.7239],
  "28009": [40.4207, -3.6747],
  "28010": [40.4329, -3.698],
  "28011": [40.4087, -3.7361],
  "28012": [40.4106, -3.7017],
  "28013": [40.4187, -3.7076],
  "28014": [40.4133, -3.6939],
  "28015": [40.4319, -3.7106],
  "28016": [40.4582, -3.6724],
  "28017": [40.4285, -3.6453],
  "28018": [40.3857, -3.6566],
  "28019": [40.393, -3.7245],
  "28020": [40.4551, -3.6983],
  "28021": [40.3457, -3.699],
  "28022": [40.4428, -3.5933],
  "28023": [40.46, -3.7866],
  "28024": [40.3921, -3.7728],
  "28025": [40.3832, -3.7369],
  "28026": [40.3841, -3.7072],
  "28027": [40.4401, -3.6437],
  "28028": [40.4312, -3.667],
  "28029": [40.471, -3.7007],
  "28030": [40.405, -3.6446],
  "28031": [40.377, -3.624],
  "28032": [40.4053, -3.6099],
  "28033": [40.4736, -3.6543],
  "28034": [40.4931, -3.6956],
  "28035": [40.4766, -3.728],
  "28036": [40.4634, -3.6835],
  "28037": [40.4305, -3.6232],
  "28038": [40.3971, -3.658],
  "28039": [40.4597, -3.707],
  "28040": [40.4489, -3.7199],
  "28041": [40.3677, -3.7019],
  "28042": [40.4638, -3.5923],
  "28043": [40.4596, -3.646],
  "28044": [40.3749, -3.7629],
  "28045": [40.3963, -3.6924],
  "28046": [40.4599, -3.6884],
  "28047": [40.3948, -3.7463],
  "28048": [40.4905, -3.755],
  "28049": [40.5056, -3.6985],
  "28050": [40.4975, -3.6637],
  "28051": [40.3652, -3.6027],
  "28052": [40.3988, -3.5867],
  "28053": [40.3837, -3.6679],
  "28054": [40.3665, -3.7568],
  "28055": [40.4881, -3.6302],
};

// Distancia en línea recta (km) entre dos puntos
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

// Posición en km respecto al Km 0 (x hacia el este, y hacia el norte), para el mapa
export function toKm(lat: number, lng: number) {
  return {
    x: (lng - ORIGIN.lng) * 111.32 * Math.cos(ORIGIN.lat * (Math.PI / 180)),
    y: (lat - ORIGIN.lat) * 110.57,
  };
}

export type DeliveryEstimate = {
  postalCode: string;
  km: number; // distancia aproximada por calle, un trayecto
  total: number; // recogida + entrega
};

export type EstimateResult =
  | { status: "ok"; estimate: DeliveryEstimate }
  | { status: "invalid" }
  | { status: "outside" };

export function estimateDelivery(input: string): EstimateResult {
  const postalCode = input.trim();
  if (!/^\d{5}$/.test(postalCode)) return { status: "invalid" };
  const coords = POSTAL_CODES[postalCode];
  if (!coords) return { status: "outside" };

  const km = haversineKm(ORIGIN.lat, ORIGIN.lng, coords[0], coords[1]) * PRICING.roadFactor;
  const trip = Math.max(PRICING.minTrip, PRICING.base + PRICING.perKm * km);
  const total = Math.ceil((trip * 2) / PRICING.roundTo) * PRICING.roundTo;

  return { status: "ok", estimate: { postalCode, km, total } };
}
