// Analítica sin cookies (Umami). Los clics en enlaces se marcan con data-umami-event;
// esto es para eventos que no son un enlace (calcular recogida, formulario enviado).
type Umami = { track: (event: string, data?: Record<string, string | number>) => void };

export function track(event: string, data?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  (window as unknown as { umami?: Umami }).umami?.track(event, data);
}
