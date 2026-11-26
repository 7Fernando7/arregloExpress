# Cambia el fondo de una foto de trabajo por un fondo liso de marca (lino claro con sombra suave).
# Solo cambia el fondo: el objeto y el arreglo se quedan tal cual.
# Uso: python scripts/fondo-liso.py entrada.jpg salida.jpg [--color F3EDE6] [--margen 0.08]
# Requiere: python -m pip install --user "rembg[cpu]"  (la primera vez descarga el modelo, ~170 MB)
import argparse

from PIL import Image, ImageDraw, ImageFilter, ImageOps
from rembg import new_session, remove

ap = argparse.ArgumentParser()
ap.add_argument("entrada")
ap.add_argument("salida")
ap.add_argument("--color", default="F3EDE6", help="color del fondo en hexadecimal")
ap.add_argument("--margen", type=float, default=0.08, help="aire alrededor del objeto, en proporción del lado")
ap.add_argument("--marco", action="store_true", help="fotos de detalle: no recorta, pone la foto entera como tarjeta sobre el fondo")
ap.add_argument("--modelo", default="u2net", help="u2net (por defecto, limpio con fondos estampados) o isnet-general-use")
args = ap.parse_args()

foto = ImageOps.exif_transpose(Image.open(args.entrada)).convert("RGB")

if args.marco:
    # foto entera con esquinas redondeadas y sombra, centrada en un lienzo 4:5 del color de fondo
    w, h = foto.size
    lado = max(w / 4, h / 5)
    ancho, alto = int(lado * 4 * 1.16), int(lado * 5 * 1.16)
    fondo = Image.new("RGB", (ancho, alto), "#" + args.color)
    x, y = (ancho - w) // 2, (alto - h) // 2
    radio = max(w, h) // 40
    mascara = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mascara).rounded_rectangle((0, 0, w - 1, h - 1), radio, fill=255)
    sombra = Image.new("L", (ancho, alto), 0)
    sombra.paste(mascara.point(lambda a: int(a * 0.3)), (x + w // 80, y + h // 50))
    sombra = sombra.filter(ImageFilter.GaussianBlur(max(ancho, alto) // 70))
    fondo.paste(Image.new("RGB", fondo.size, (90, 80, 70)), (0, 0), sombra)
    fondo.paste(foto, (x, y), mascara)
    fondo.save(args.salida, quality=92)
    raise SystemExit(f"Guardada {args.salida} ({ancho}x{alto}, marco)")

recorte = remove(foto, session=new_session(args.modelo), post_process_mask=True)
# borde nítido: fuera los restos semitransparentes del fondo (hojas, sombras)
recorte.putalpha(recorte.getchannel("A").point(lambda v: 255 if v > 140 else 0))
caja = recorte.getbbox()
if not caja:
    raise SystemExit("No se ha encontrado ningún objeto en la foto")
objeto = recorte.crop(caja)

# lienzo vertical 4:5 (el de la galería) con el objeto centrado
ancho_obj, alto_obj = objeto.size
lado = max(ancho_obj / 4, alto_obj / 5)
ancho = int(lado * 4 * (1 + 2 * args.margen))
alto = int(lado * 5 * (1 + 2 * args.margen))
fondo = Image.new("RGB", (ancho, alto), "#" + args.color)
x = (ancho - ancho_obj) // 2
y = (alto - alto_obj) // 2

# sombra suave debajo del objeto para que no parezca flotando
alfa = objeto.getchannel("A")
sombra = Image.new("L", (ancho, alto), 0)
sombra.paste(alfa.point(lambda a: int(a * 0.35)), (x + int(ancho_obj * 0.02), y + int(alto_obj * 0.03)))
sombra = sombra.filter(ImageFilter.GaussianBlur(max(ancho, alto) // 60))
fondo.paste(Image.new("RGB", fondo.size, (90, 80, 70)), (0, 0), sombra)

fondo.paste(objeto, (x, y), objeto)
fondo.save(args.salida, quality=92)
print(f"Guardada {args.salida} ({ancho}x{alto})")
