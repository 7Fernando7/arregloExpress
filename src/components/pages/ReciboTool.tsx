"use client";

// Herramienta interna (no enlazada ni indexada): genera un recibo en imagen para enviarlo por WhatsApp.
import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/contact";

const W = 1200;
const H = 800;
const NAVY = "#12294a";
const TEJA = "#c8582d";
const GRIS = "#5b6676";
const CLAVE_NUMERO = "recibo-ultimo-numero";
const FORMAS = ["Efectivo", "Bizum", "Tarjeta", "Transferencia"];

const hoy = () => new Date().toISOString().slice(0, 10);

function fechaLarga(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

function importeBonito(valor: string) {
  const n = Number(valor.replace(",", "."));
  if (!valor.trim() || Number.isNaN(n)) return "";
  return `${n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
}

// parte un texto en líneas que quepan en el ancho dado
function partir(ctx: CanvasRenderingContext2D, texto: string, ancho: number, maxLineas: number) {
  const lineas: string[] = [];
  let actual = "";
  for (const palabra of texto.split(/\s+/).filter(Boolean)) {
    const prueba = actual ? `${actual} ${palabra}` : palabra;
    if (ctx.measureText(prueba).width <= ancho) actual = prueba;
    else {
      if (actual) lineas.push(actual);
      actual = palabra;
    }
  }
  if (actual) lineas.push(actual);
  if (lineas.length > maxLineas) {
    lineas.length = maxLineas;
    lineas[maxLineas - 1] = `${lineas[maxLineas - 1]}…`;
  }
  return lineas;
}

export default function ReciboTool() {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [numero, setNumero] = useState("1");
  const [fecha, setFecha] = useState(hoy());
  const [cliente, setCliente] = useState("");
  const [importe, setImporte] = useState("");
  const [concepto, setConcepto] = useState("");
  const [forma, setForma] = useState(FORMAS[0]);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogo(img);
    img.src = "/brand/logo-v3.png";
    // permite abrir la página con los datos ya puestos: /recibo?cliente=…&importe=…&concepto=…
    const q = new URLSearchParams(window.location.search);
    if (q.get("cliente")) setCliente(q.get("cliente") as string);
    if (q.get("importe")) setImporte(q.get("importe") as string);
    if (q.get("concepto")) setConcepto(q.get("concepto") as string);
    try {
      const ultimo = Number(localStorage.getItem(CLAVE_NUMERO) ?? "0");
      setNumero(String(ultimo + 1));
    } catch {
      /* sin almacenamiento: se queda en 1 */
    }
  }, []);

  const dibujar = useCallback(() => {
    const ctx = lienzo.current?.getContext("2d");
    if (!ctx) return;
    const sans = "'Helvetica Neue', Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    // marco de pespunte
    ctx.strokeStyle = TEJA;
    ctx.lineWidth = 3;
    ctx.setLineDash([14, 10]);
    ctx.strokeRect(24, 24, W - 48, H - 48);
    ctx.setLineDash([]);

    if (logo) ctx.drawImage(logo, 64, 60, 310, 310 * (logo.height / logo.width));

    ctx.textAlign = "right";
    ctx.fillStyle = TEJA;
    ctx.font = `bold 60px ${sans}`;
    ctx.fillText("RECIBO", W - 64, 112);
    ctx.fillStyle = NAVY;
    ctx.font = `bold 30px ${sans}`;
    ctx.fillText(`Nº ${numero.padStart(4, "0")}`, W - 64, 156);
    ctx.fillStyle = GRIS;
    ctx.font = `24px ${sans}`;
    ctx.fillText(`Madrid, ${fechaLarga(fecha)}`, W - 64, 194);

    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(64, 230);
    ctx.lineTo(W - 64, 230);
    ctx.stroke();

    ctx.textAlign = "left";
    const fila = (etiqueta: string, valor: string, y: number) => {
      ctx.fillStyle = GRIS;
      ctx.font = `24px ${sans}`;
      ctx.fillText(etiqueta, 64, y);
      ctx.fillStyle = NAVY;
      ctx.font = `bold 30px ${sans}`;
      ctx.fillText(valor, 300, y);
      ctx.strokeStyle = "#d5d9e0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(300, y + 12);
      ctx.lineTo(W - 64, y + 12);
      ctx.stroke();
    };
    fila("Recibí de", cliente, 300);
    fila("La cantidad de", importeBonito(importe), 372);

    ctx.fillStyle = GRIS;
    ctx.font = `24px ${sans}`;
    ctx.fillText("Por", 64, 444);
    ctx.fillStyle = NAVY;
    ctx.font = `28px ${sans}`;
    partir(ctx, concepto, W - 364, 3).forEach((linea, i) => ctx.fillText(linea, 300, 444 + i * 40));

    fila("Forma de pago", forma, 590);

    // importe destacado y firma
    ctx.fillStyle = "#fbeee6";
    ctx.fillRect(64, 636, 330, 76);
    ctx.fillStyle = NAVY;
    ctx.font = `bold 40px ${sans}`;
    ctx.fillText(importeBonito(importe), 84, 688);
    ctx.textAlign = "right";
    ctx.fillStyle = GRIS;
    ctx.font = `22px ${sans}`;
    ctx.fillText("Fdo.", W - 64, 664);
    ctx.fillStyle = NAVY;
    ctx.font = `bold 28px ${sans}`;
    ctx.fillText("Arreglos Express Madrid", W - 64, 700);

    ctx.textAlign = "center";
    ctx.fillStyle = GRIS;
    ctx.font = `18px ${sans}`;
    ctx.fillText(`arreglosexpressmadrid.com · ${CONTACT_EMAIL} · Justificante de pago, no es una factura`, W / 2, 750);
  }, [logo, numero, fecha, cliente, importe, concepto, forma]);

  useEffect(dibujar, [dibujar]);

  const listo = cliente.trim() !== "" && importeBonito(importe) !== "" && concepto.trim() !== "";
  const nombre = `recibo-${numero.padStart(4, "0")}.png`;

  const guardarNumero = () => {
    try {
      localStorage.setItem(CLAVE_NUMERO, String(Number(numero) || 0));
    } catch {
      /* nada */
    }
  };

  const aBlob = () =>
    new Promise<Blob | null>((resolve) => lienzo.current?.toBlob((b) => resolve(b), "image/png") ?? resolve(null));

  const descargar = async () => {
    const blob = await aBlob();
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(a.href);
    guardarNumero();
    setAviso("Recibo descargado. Adjúntalo en el chat de WhatsApp del cliente.");
  };

  const compartir = async () => {
    const blob = await aBlob();
    if (!blob) return;
    const archivo = new File([blob], nombre, { type: "image/png" });
    if (navigator.canShare?.({ files: [archivo] })) {
      try {
        await navigator.share({ files: [archivo], title: `Recibo ${numero}` });
        guardarNumero();
        setAviso("Recibo compartido.");
      } catch {
        /* el usuario canceló */
      }
    } else {
      await descargar();
    }
  };

  const campo = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-base";
  const boton = "h-12 flex-1 rounded-md px-4 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <main className="container mx-auto max-w-5xl flex-grow px-4 py-10">
      <h1 className="font-headline text-3xl font-semibold">Hacer un recibo</h1>
      <p className="mt-2 text-muted-foreground">
        Rellena los datos y envía la imagen al cliente por WhatsApp. Esta página es solo para uso interno.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-medium">
              Nº de recibo
              <input className={campo} inputMode="numeric" value={numero} onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))} />
            </label>
            <label className="block text-sm font-medium">
              Fecha
              <input className={campo} type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </label>
          </div>
          <label className="block text-sm font-medium">
            Recibí de (nombre del cliente)
            <input className={campo} value={cliente} onChange={(e) => setCliente(e.target.value)} />
          </label>
          <label className="block text-sm font-medium">
            Importe en euros
            <input className={campo} inputMode="decimal" placeholder="25,00" value={importe} onChange={(e) => setImporte(e.target.value)} />
          </label>
          <label className="block text-sm font-medium">
            Por (concepto)
            <textarea className={campo} rows={3} placeholder="Bajo de pantalón express, con recogida y entrega" value={concepto} onChange={(e) => setConcepto(e.target.value)} />
          </label>
          <label className="block text-sm font-medium">
            Forma de pago
            <select className={campo} value={forma} onChange={(e) => setForma(e.target.value)}>
              {FORMAS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="button" disabled={!listo} onClick={compartir} className={`${boton} bg-primary text-primary-foreground hover:bg-primary/90`}>
              Enviar / compartir
            </button>
            <button type="button" disabled={!listo} onClick={descargar} className={`${boton} border border-primary/25 hover:border-primary`}>
              Descargar imagen
            </button>
          </div>
          {!listo && <p className="text-sm text-muted-foreground">Faltan el cliente, el importe o el concepto.</p>}
          {aviso && <p className="text-sm font-medium text-accent">{aviso}</p>}
        </form>
        <canvas ref={lienzo} width={W} height={H} className="h-auto w-full rounded-lg border border-border shadow-sm" />
      </div>
    </main>
  );
}
