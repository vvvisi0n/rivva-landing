import fs from "fs";

const key = process.argv[2];
if (!key) {
  console.error("Usage: node scripts/dumpProfile.mjs rivva_profile_key_here");
  process.exit(1);
}

// This script can’t access browser localStorage directly.
// So we read from a snapshot file you paste from DevTools.
const snapPath = ".tmp_localStorage.json";
if (!fs.existsSync(snapPath)) {
  console.error(`Missing ${snapPath}. Create it by pasting localStorage export (instructions below).`);
  process.exit(1);
}

const all = JSON.parse(fs.readFileSync(snapPath, "utf8"));
const raw = all[key];

if (!raw) {
  console.error(`Key not found in ${snapPath}: ${key}`);
  console.error("Available keys:", Object.keys(all));
  process.exit(1);
}

try {
  console.log(JSON.parse(raw));
} catch {
  console.log(raw);
}
