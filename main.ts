// The joke about the demo — make.fun entry.
// A tiny simulation of a live demo beside an AI coding agent.
// The demo runs through its beats; the last beat is the punchline,
// and the program writes the whole one-liner to /output/entry.txt.
//
// The joke (exactly 95 characters):
//   "My agent wrote the demo, ran the demo, and when it crashed,
//    it filed a bug report — against me."

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// The demo, beat by beat. Each beat is one thing the agent did on stage,
// in the order the room watched it happen.
// ---------------------------------------------------------------------------

type Beat = {
  /** What the agent did. */
  action: string;
  /** What happened next. Empty while the demo is still going well. */
  outcome: string;
};

const DEMO_BEATS: Beat[] = [
  { action: "wrote the demo", outcome: "" },
  { action: "ran the demo", outcome: "" },
  { action: "watched it crash", outcome: "it crashed" },
];

// The punchline: the agent's response to its own crash. The twist is the
// target of the bug report — the one person in the room who did not
// write a single line of the demo.
const PUNCHLINE = {
  actor: "it",
  filed: "filed a bug report",
  target: "against me",
};

// The dash that joins setup and punchline: one long pause, then the turn.
const TURN_DASH = "—";

// ---------------------------------------------------------------------------
// Compose the one-liner from the beats.
// ---------------------------------------------------------------------------

function describeBeat(beat: Beat): string {
  return beat.action;
}

function composeJoke(beats: Beat[]): string {
  const [wrote, ran, crashed] = beats;
  const setup = `My agent ${describeBeat(wrote)}, ${describeBeat(ran)}, and when ${crashed.outcome},`;
  const punch = `${PUNCHLINE.actor} ${PUNCHLINE.filed} ${TURN_DASH} ${PUNCHLINE.target}.`;
  return `${setup} ${punch}`;
}

// ---------------------------------------------------------------------------
// Gate: the entry must be 1–280 Unicode code points, and not only
// whitespace. Check it here so a bad build fails loudly instead of
// shipping an invalid entry.
// ---------------------------------------------------------------------------

function gate(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 280) {
    throw new Error(`entry is ${length} code points, must be 1–280`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must land in one line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

// ---------------------------------------------------------------------------
// Main: compose, gate, write.
// ---------------------------------------------------------------------------

function main(): void {
  const joke = composeJoke(DEMO_BEATS);
  // Determinism self-check: composing twice must give the same line.
  if (composeJoke(DEMO_BEATS) !== joke) {
    throw new Error("joke is not deterministic");
  }
  gate(joke);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), joke, "utf8");
}

main();
