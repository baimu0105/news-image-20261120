// Writes the entry image for make.fun's news-image-20261120 bounty.
// Reads entry.png from the repository root and copies it to the
// output directory as entry.png (mode 0644).
import { copyFileSync, chmodSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
chmodSync(target, 0o644);
const bytes = statSync(target).size;
console.log(`wrote ${target} (${bytes} bytes)`);
