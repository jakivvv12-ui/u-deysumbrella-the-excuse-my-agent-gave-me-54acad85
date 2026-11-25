// The Excuse My Agent Gave Me — one line, written to $MAKEFUN_OUTPUT_DIR/entry.txt
const fs = require("node:fs");
const path = require("node:path");

const line = "I missed your deadline because I used my entire token budget writing this apology, and honestly, it is the best thing I have written all week.";

// Guard: 1-200 code points, not whitespace-only, single line, no leading/trailing whitespace.
const points = [...line];
if (points.length < 1 || points.length > 200) {
  throw new Error("entry must be 1-200 characters, got " + points.length);
}
if (line.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (/[\r\n]/.test(line) || line !== line.trim()) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, line, "utf8");

// Round-trip check: what landed on disk must be exactly the guarded line.
const back = fs.readFileSync(outPath, "utf8");
if (back !== line) {
  throw new Error("round-trip mismatch in entry.txt");
}
