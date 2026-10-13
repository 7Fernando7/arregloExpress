# Herramientas (no forman parte de la web)

Se ejecutan desde la raíz del repo. No se publican: Netlify solo construye `src/`, `public/` y `trabajos/`.

## Logo — `tools/logo/gen.js`
Genera el logo como SVG 100 % trazado (sin fuentes externas). Necesita `opentype.js`:
```
npm i --no-save opentype.js@1.3.4
LAYOUT=big STYLE=ref node tools/logo/gen.js salida/          # logo publicado (v3): logo.svg y logo-white.svg
LAYOUT=mark STYLE=ref node tools/logo/gen.js salida/         # solo la M-máquina (favicon, icono de iPhone, perfil de Google)
```
Al publicar un logo nuevo, **cambia el nombre del archivo** (logo-v4.svg…): los móviles guardan el anterior en caché.
Colores: azul marino #13294B, terracota #C8602D. Fuentes en `tools/fuentes/` (EB Garamond, Montserrat).

## Iconos — `tools/key.js` y `tools/slice.js`
Para hojas de iconos generadas con ChatGPT:
- **Comprueba primero si la transparencia es real** (`sharp(f).metadata()` → `hasAlpha`). ChatGPT suele *pintar* el fondo de cuadritos.
- `key.js`: quita ese fondo pintado (lo no naranja pasa a azul marino con transparencia según lo oscuro).
- `slice.js`: recorta en iconos sueltos (`grid` para cuadrículas, `row` para filas) → webp 256 px en `public/icons/`.
```
node -e "require('./tools/key.js')('hoja.png','hoja-limpia.png','vista.png')"
node -e "require('./tools/slice.js').grid('hoja-limpia.png',4,4,['casa','ubicacion',...],'public/icons')"
```
Los nombres disponibles están en `src/components/Icono.tsx` (tipo `IconoNombre`).

## Ver la web en local y hacer capturas
```
npm run build
node tools/serve.js out 5055                                  # http://localhost:5055
node --experimental-websocket tools/cdp.js http://localhost:5055/ captura.png 390 1   # 390 px, móvil
```
`cdp.js <url> <salida.png> <ancho> [movil 0|1] [js a ejecutar] [selector a recortar]`; con `VIEWPORT=1` captura solo la pantalla visible.
Usa el Chrome instalado (C:/Program Files/Google/Chrome).
