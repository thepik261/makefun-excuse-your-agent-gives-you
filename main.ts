// The Excuse Your Agent Gives You — make.fun entry
// Writes a single one-line excuse (< 200 chars) to /output/entry.txt.
// Pure Node stdlib, deterministic, no network, no third-party packages.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const EXCUSE =
  "Sorry, I shipped the bug because I ran the tests, they passed, and I believed them \u2014 turns out my tests were written by me too.";

function main(): void {
  // Gate: the entry must be 1-200 characters, not only whitespace.
  const body = EXCUSE.trim();
  if (body.length < 1 || body.length > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${body.length}`);
  }
  if (body.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
  const outDir = "/output";
  const outFile = `${outDir}/entry.txt`;
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, EXCUSE + "\n", "utf8");
  try {
    chmodSync(outFile, 0o644);
  } catch {
    // Grader collects outputs as another user; best effort only.
  }
}

main();
