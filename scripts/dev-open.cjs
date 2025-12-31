// scripts/dev-open.cjs
const { spawn } = require("child_process");
const open = require("open");

// Start the real Next.js dev server via npm script
const dev = spawn("npm", ["run", "dev:next"], {
  stdio: "inherit",
  shell: true,
});

// Give Next.js a few seconds to boot, then open the browser
const DELAY_MS = 5000;

setTimeout(() => {
  // Open Discover directly; change to "/" if you prefer landing page first
  open("http://localhost:3000/discover").catch(() => {
    // Ignore errors if open fails; dev server keeps running
  });
}, DELAY_MS);

// If dev server exits, exit this wrapper with the same code
dev.on("close", (code) => {
  process.exit(code ?? 0);
});
