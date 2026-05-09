import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "cards");

const heroes = {
  aquaman: {
    name: "The Aquaman",
    icon: "\u{1F531}",
    tagline: "The Deep Diver",
    color: "#00b4d8",
    quote:
      "They\u2019re about how it works in a very deep way.",
  },
  flash: {
    name: "The Flash",
    icon: "\u26A1",
    tagline: "The Rapid Prototyper",
    color: "#ef233c",
    quote:
      "The Flash is interested in what\u2019s fast.",
  },
  priest: {
    name: "The Priest",
    icon: "\u{1F4DC}",
    tagline: "The Code Purist",
    color: "#9b5de5",
    quote:
      "The Priest is really in love with the act of programming to a higher degree.",
  },
  spielberg: {
    name: "The Spielberg",
    icon: "\u{1F3AC}",
    tagline: "The UX Visionary",
    color: "#f4a261",
    quote:
      "It\u2019s a suggestive robin blue button with a lock.",
  },
  paladin: {
    name: "The Paladin",
    icon: "\u{1F6E1}\uFE0F",
    tagline: "The Team Multiplier",
    color: "#f5c542",
    quote:
      "The ability to heal any injuries from the interface between business and software is the job.",
  },
};

function wrapText(ctx, text, maxW) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (ctx.measureText(test).width > maxW) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function font(w, s) {
  return `${w} ${s}px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`;
}

for (const [id, hero] of Object.entries(heroes)) {
  const W = 1200;
  const H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#060918";
  ctx.fillRect(0, 0, W, H);

  // radial glow
  const glow = ctx.createRadialGradient(220, H / 2, 0, 220, H / 2, 350);
  glow.addColorStop(0, hero.color + "1a");
  glow.addColorStop(0.5, hero.color + "08");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // icon
  ctx.font = "160px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(hero.icon, 220, H / 2 - 10);

  // right side
  const rx = 460;
  const rw = W - rx - 80;

  // hero name
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = hero.color;
  ctx.font = font("800", 72);
  ctx.fillText(hero.name, rx, 200);

  // tagline
  ctx.fillStyle = "#8b8fa8";
  ctx.font = font("italic 400", 22);
  ctx.fillText(hero.tagline, rx, 242);

  // accent line
  ctx.strokeStyle = hero.color + "40";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(rx, 272);
  ctx.lineTo(rx + 60, 272);
  ctx.stroke();

  // quote
  ctx.fillStyle = "#d0d4e8";
  ctx.font = font("italic 500", 28);
  const quoteLines = wrapText(ctx, `\u201C${hero.quote}\u201D`, rw);
  let qy = 330;
  for (const line of quoteLines) {
    ctx.fillText(line, rx, qy);
    qy += 42;
  }

  // CTA bar
  const ctaH = 72;
  const ctaY = H - ctaH;
  ctx.fillStyle = hero.color;
  ctx.fillRect(0, ctaY, W, ctaH);

  const ctaText = "Discover your engineering superhero archetype \u2192";
  ctx.font = font("700", 24);
  ctx.fillStyle = "#060918";
  ctx.textAlign = "center";
  ctx.fillText(ctaText, W / 2, ctaY + 45);

  // save
  const buf = canvas.toBuffer("image/png");
  const path = join(outDir, `${id}.png`);
  writeFileSync(path, buf);
  console.log(`  \u2713 ${path}`);
}

console.log("\nAll cards generated!");
