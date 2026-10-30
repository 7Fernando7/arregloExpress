// Búsqueda de direcciones con CartoCiudad (IGN): gratis, sin clave, datos CC BY 4.0.
// Solo Madrid capital (municipio 28079). https://www.cartociudad.es

const API = 'https://www.cartociudad.es/geocoder/api/geocoder/candidates';
const MADRID_MUNI = '28079';

export type AddressSuggestion = {
  id: string;
  label: string; // "Calle Bravo Murillo 50"
  postalCode: string; // en calles sin número puede traer varios: "28003 28020"
  // solo los portales traen coordenadas; una calle sin número pide completar con el número
  coords: { lat: number; lng: number } | null;
};

const LOWERCASE = new Set(['de', 'del', 'la', 'las', 'los', 'el', 'y']);

// "CALLE GRAN VIA DE HORTALEZA 10, Madrid" → "Calle Gran Via de Hortaleza 10"
export function prettyAddress(address: string) {
  return address
    .replace(/,\s*Madrid$/i, '')
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => (i > 0 && LOWERCASE.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

type Candidate = {
  id: string;
  type: string;
  address: string;
  postalCode: string | null;
  muniCode: string;
  lat: number;
  lng: number;
};

export async function searchAddress(query: string, signal?: AbortSignal): Promise<AddressSuggestion[]> {
  const params = new URLSearchParams({
    q: query,
    limit: '6',
    municipio_filter: 'Madrid',
    no_process: 'municipio,poblacion,toponimo',
  });
  const res = await fetch(`${API}?${params}`, { signal });
  if (!res.ok) throw new Error(`CartoCiudad ${res.status}`);
  const candidates: Candidate[] = await res.json();

  return candidates
    .filter((c) => c.muniCode === MADRID_MUNI && (c.type === 'portal' || c.type === 'callejero'))
    .filter((c) => c.type !== 'portal' || (c.lat !== 0 && c.postalCode))
    .map((c) => ({
      id: c.id,
      label: prettyAddress(c.address),
      postalCode: c.postalCode ?? '',
      coords: c.type === 'portal' ? { lat: c.lat, lng: c.lng } : null,
    }));
}
