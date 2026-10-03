// Downloads the Fontshare faces at build time (ITF Free Font License: self-hosting on our site is allowed,
// putting the font files in a public repository is not). The files land in src/fonts/fontshare (git-ignored),
// unmodified (the licence forbids subsetting or converting them). Runs before `next build` (npm "prebuild").
import { existsSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { inflateRawSync } from "node:zlib";

// Minimal zip reader (central directory + stored/deflate entries): no external unzip tool on any OS.
function readZip(buf) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error("fonts: not a zip file");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const files = new Map();
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nameLen);
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(start, start + size);
    files.set(name.split("/").pop(), () => (method === 8 ? inflateRawSync(raw) : raw));
    p += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

// next/font reads the woff2 files from src; the 3D text (troika) loads the woff from public at runtime.
const src = join(process.cwd(), "src", "fonts", "fontshare");
const pub = join(process.cwd(), "public", "fonts", "fontshare");
const want = {
  tanker: [["Tanker-Regular.woff2", src], ["Tanker-Regular.woff", pub]],
  satoshi: [["Satoshi-Variable.woff2", src]],
};

const missing = Object.values(want).flat().filter(([f, dir]) => !existsSync(join(dir, f)));
if (!missing.length) {
  console.log("fonts: already present");
  process.exit(0);
}
mkdirSync(src, { recursive: true });
mkdirSync(pub, { recursive: true });
for (const [slug, files] of Object.entries(want)) {
  const res = await fetch(`https://api.fontshare.com/v2/fonts/download/${slug}`);
  if (!res.ok) throw new Error(`fonts: ${slug} download failed (${res.status})`);
  const zip = readZip(Buffer.from(await res.arrayBuffer()));
  for (const [f, dir] of files) {
    const get = zip.get(f);
    if (!get) throw new Error(`fonts: ${f} not found in ${slug}.zip`);
    await writeFile(join(dir, f), get());
  }
}
console.log("fonts: downloaded", Object.values(want).flat().map(([f]) => f).join(", "));
