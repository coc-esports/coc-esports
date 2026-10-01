// Generates the guilloche security pattern (public/art/guilloche.svg): the engraved rosettes printed on tickets
// and banknotes, made from overlapping hypotrochoid curves. Pure maths, our own asset; run `node scripts/guilloche.mjs`.
import { writeFileSync } from "node:fs";

const S = 1200; // viewBox size
const c = S / 2;
function curve(R, r, d, turns, steps, rot = 0) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * turns;
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
    const a = rot;
    pts.push([c + x * Math.cos(a) - y * Math.sin(a), c + x * Math.sin(a) + y * Math.cos(a)]);
  }
  return "M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + "Z";
}
// Real guilloche is many phase-shifted copies of one fine curve: two engraved rings.
const ring = (R, r, d, copies, steps, op) =>
  Array.from({ length: copies }, (_, k) => ({ d: curve(R, r, d, 1, steps, (k / copies) * ((Math.PI * 2) / Math.round(R / r))), op }));
const parts = [...ring(540, 20, 64, 5, 760, 0.36), ...ring(330, 15, 42, 4, 620, 0.3)];
const paths = parts.map((x) => x.d);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" fill="none" stroke="#a8a2ff" stroke-width="0.55" stroke-linejoin="round">${paths
  .map((d, i) => `<path d="${d}" stroke-opacity="${parts[i].op}"/>`)
  .join("")}</svg>`;
writeFileSync("public/art/guilloche.svg", svg);
console.log("guilloche.svg", Math.round(svg.length / 1024), "KB");
