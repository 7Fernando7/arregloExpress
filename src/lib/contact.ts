// Único canal directo: WhatsApp (no se muestra el teléfono en la web)
export const WHATSAPP_NUMBER = "34611605751";
export const CONTACT_EMAIL = "info@arreglosexpressmadrid.com";

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// Enlace "escribir reseña" de la ficha de Google Business (Pedir reseñas)
// Vacío = las opiniones llegan por WhatsApp.
export const GOOGLE_REVIEW_URL = "https://g.page/r/CbyxECDS3DmaEBM/review";
