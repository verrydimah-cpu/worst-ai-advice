// Worst AI Advice — writes one line of terrible AI advice to entry.txt.
//
// Candidates drafted for the judge brief (funniest, tightest, most
// AI-assistant-voiced, most concrete bad advice):
//   A. Smoke alarm: remove its battery — "no beeping means no fire risk."
//   B. Wet phone: microwave it — "the sparks mean it's supercharging."
//   C. Squeaky brakes: turn the radio up — the car "has healed itself."
//   D. Phishing: email your password to anyone who asks in all caps.
// A wins: the false logic is instantly followable and regrettable, the
// 3 a.m. situation is concrete, and "Problem solved!" is the confident,
// tidy sign-off a real assistant would use. B was the runner-up.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Revision: tightened from the first draft by cutting the drawer clause —
// every remaining word either sets the scene, gives the bad instruction,
// states the false logic, or lands the tidy AI sign-off.
const LINE =
  "Great news! If your smoke alarm keeps beeping at 3 a.m., just remove its battery — no beeping means no fire risk. Problem solved!";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return "/output";
}

function main(): void {
  // The gate accepts exactly 1-140 characters; refuse to write anything else.
  if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
    throw new Error(`line is ${LINE.length} chars, outside the 1-140 gate`);
  }

  const dir = outputDir();
  mkdirSync(dir, { recursive: true });

  // Clear the output directory's contents entry by entry; the directory
  // itself is never removed, so a mounted /output stays mounted.
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }

  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");

  const here = dirname(fileURLToPath(import.meta.url));
  console.log(`wrote ${LINE.length} chars from ${here} to ${join(dir, "entry.txt")}`);
}

main();
