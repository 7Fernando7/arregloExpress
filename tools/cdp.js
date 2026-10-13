// Capturas con Chrome vía CDP, sin dependencias. Uso:
// node --experimental-websocket cdp.js <url> <salida.png> <ancho> [movil=0|1] [js a ejecutar antes] [selector a enfocar]
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const [url, out, width = "1440", mobile = "0", script = "", focus = ""] = process.argv.slice(2);
const port = 9333;
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(__dirname, ".chrome-cdp")}`, "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let targets;
  for (let i = 0; i < 40; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (targets.length) break; } catch {}
    await sleep(250);
  }
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

  const w = Number(width), isMobile = mobile === "1";
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: isMobile ? 844 : 900, deviceScaleFactor: isMobile ? 2 : 1, mobile: isMobile });
  await send("Page.enable");
  await send("Page.navigate", { url });
  await sleep(4000);
  console.log("loaded", JSON.stringify((await send("Runtime.evaluate", { expression: "location.href+' | '+document.title+' | '+!!document.querySelector('#zones')", returnByValue: true })).result.result.value));
  if (script) { const sr = await send("Runtime.evaluate", { expression: script, awaitPromise: true, returnByValue: true }); console.log("script:", JSON.stringify(sr.result.result.value)); await sleep(800); }
  if (process.env.VIEWPORT) { const shotV = await send("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(out, Buffer.from(shotV.result.data, "base64")); console.log("ok viewport", out); ws.close(); chrome.kill(); process.exit(0); }
  let clip;
  if (focus) {
    const r = await send("Runtime.evaluate", { expression: `JSON.stringify((()=>{const e=document.querySelector(${JSON.stringify(focus)});const b=e.getBoundingClientRect();return {x:0,y:b.top+scrollY,width:innerWidth,height:b.height}})())`, returnByValue: true });
    clip = { ...JSON.parse(r.result.result.value), scale: 1 };
  } else {
    const r = await send("Runtime.evaluate", { expression: "JSON.stringify([innerWidth, document.documentElement.scrollHeight])", returnByValue: true });
    const [vw, vh] = JSON.parse(r.result.result.value); clip = { x: 0, y: 0, width: vw, height: vh, scale: 1 };
  }
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip });
  fs.writeFileSync(out, Buffer.from(shot.result.data, "base64"));
  console.log("ok", out, JSON.stringify(clip));
  ws.close(); chrome.kill(); process.exit(0);
})().catch((e) => { console.error(e); chrome.kill(); process.exit(1); });
