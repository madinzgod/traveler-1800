import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

// One sentence, at most 200 characters, explaining the modern internet to a
// traveler from 1800 — built only from things they already know: the post
// office and the library.
const TEXT =
  "Every home keeps a post office in a box: a letter written at breakfast is read in China before the tea cools, its answer returns as swiftly, and the box holds more books than any library on Earth.";

// Gate self-check: the sealed scorer only judges 1-200 characters of text.
if (TEXT.length < 1 || TEXT.length > 200 || TEXT.includes("\n")) {
  throw new Error("entry text breaks the gate contract");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
await mkdir(outDir, { recursive: true });
// Clear only the CONTENTS of the output dir, never the dir itself.
for (const name of await readdir(outDir)) {
  await rm(join(outDir, name), { recursive: true, force: true });
}
await writeFile(join(outDir, "entry.txt"), TEXT, "utf8");
