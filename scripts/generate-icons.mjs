// Rasterizes public/favicon.svg into the PNG/ICO variants browsers still need.
// One-off: run `node scripts/generate-icons.mjs` after editing the SVG.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const SVG = new URL("../public/favicon.svg", import.meta.url);
const out = (name) => new URL(`../public/${name}`, import.meta.url);

const svg = await readFile(SVG);
const render = (size) =>
  sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

// iOS ignores transparency and composites onto black, so the SVG's opaque
// rounded square is exactly what we want here.
await writeFile(out("apple-touch-icon.png"), await render(180));
await writeFile(out("icon-192.png"), await render(192));
await writeFile(out("icon-512.png"), await render(512));

// Minimal ICO container wrapping a single 32x32 PNG.
const png = await render(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette size
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png.length, 14); // image data size
header.writeUInt32LE(22, 18); // offset to image data
await writeFile(out("favicon.ico"), Buffer.concat([header, png]));

console.log("icons written to public/");
