#!/usr/bin/env node
// @ts-check

import { execSync } from "child_process";

// ── ANSI color codes (no deps needed) ─────────────────────────────────────
const R = "\x1b[0m"; // reset
const B = "\x1b[1m"; // bold
const D = "\x1b[2m"; // dim
const G = "\x1b[32m"; // green
const Re = "\x1b[31m"; // red
const Y = "\x1b[33m"; // yellow
const C = "\x1b[36m"; // cyan
const W = "\x1b[37m"; // white
const BGG = "\x1b[42m"; // bg green
const BGR = "\x1b[41m"; // bg red

// ── CLI flags ────────────────────────────────────────────────────────────
//   --quick / -q   Skip the slow gate (Build) — fast local loop.
//   --no-build     Skip the production build step.
//   --no-bail      Run ALL steps and report every failure (don't stop on first).
const args = new Set(process.argv.slice(2));
const QUICK = args.has("--quick") || args.has("-q");
const SKIP_BUILD = QUICK || args.has("--no-build");
const BAIL = !args.has("--no-bail");

// Source globs this project actually contains (no src/, no e2e/ — app/ lives at root).
const SOURCE_GLOBS = '"app/**/*.{ts,tsx}" "components/**/*.{ts,tsx}" "hooks/**/*.{ts,tsx}" "lib/**/*.{ts,tsx}" "store/**/*.{ts,tsx}" "types/**/*.{ts,tsx}" "config/**/*.{ts,tsx}"';

// ── Steps ──────────────────────────────────────────────────────────────────
const ALL_STEPS = [
  {
    name: "Lint         ",
    icon: "🔍",
    // Strict: FAIL on warnings (not just errors).
    cmd: "npx eslint . --max-warnings=0",
  },
  {
    name: "Typecheck    ",
    icon: "📐",
    cmd: "npx tsc --noEmit",
  },
  {
    name: "Format       ",
    icon: "✨",
    // CHECK (do not mutate) — a gate must verify, never auto-fix.
    // Use `npm run format:fix` to actually rewrite files.
    cmd: `npx prettier --no-error-on-unmatched-pattern --check ${SOURCE_GLOBS}`,
  },
  {
    name: "Security     ",
    icon: "🔒",
    cmd: "npm audit --audit-level=high",
  },
  {
    name: "Build        ",
    icon: "📦",
    cmd: "npx next build",
    skip: SKIP_BUILD,
  },
];

const STEPS = ALL_STEPS.filter((s) => !s.skip);

// ── Helpers ────────────────────────────────────────────────────────────────
function clear() {
  if (process.stdout.isTTY) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  } else {
    process.stdout.write("\r" + " ".repeat(72) + "\r");
  }
}

function hr(char = "─", len = 50, color = C) {
  console.log(`${color}${char.repeat(len)}${R}`);
}

function fmt(ms) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

// ── Banner ─────────────────────────────────────────────────────────────────
console.log();
console.log(`${B}${C}  ╔══════════════════════════════════════════════╗${R}`);
console.log(`${B}${C}  ║           PORTFOLIO · QUALITY GATE           ║${R}`);
console.log(`${B}${C}  ╚══════════════════════════════════════════════╝${R}`);
console.log(`${D}     ${new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}${R}`);
const mode = QUICK ? "quick (no build)" : "full";
console.log(`${D}     mode: ${mode}${BAIL ? "" : "  ·  --no-bail (run all)"}${R}`);
console.log();

// ── Run steps ─────────────────────────────────────────────────────────────
const results = [];
let allPassed = true;
const qaStart = Date.now();

for (const step of STEPS) {
  const start = Date.now();
  process.stdout.write(`  ${step.icon}  ${B}${step.name}${R}  ${D}running...${R}`);

  try {
    execSync(step.cmd, { stdio: "pipe" });
    const elapsed = Date.now() - start;
    clear();
    console.log(`  ${step.icon}  ${B}${G}${step.name}${R}  ${G}✓ passed${R}  ${D}${fmt(elapsed)}${R}`);
    results.push({ ...step, passed: true, elapsed });
  } catch (err) {
    const elapsed = Date.now() - start;
    clear();
    console.log(`  ${step.icon}  ${B}${Re}${step.name}${R}  ${Re}✗ failed${R}  ${D}${fmt(elapsed)}${R}`);

    // Print the relevant output (full — a gate failure should show the real error).
    const out = (err.stdout?.toString() || "") + (err.stderr?.toString() || "");
    if (out.trim()) {
      console.log();
      out
        .trim()
        .split("\n")
        .forEach((line) => console.log(`     ${D}${line}${R}`));
      console.log();
    }

    results.push({ ...step, passed: false, elapsed });
    allPassed = false;
    if (BAIL) break; // stop on first failure (default); --no-bail runs all
  }
}

// ── Summary ────────────────────────────────────────────────────────────────
const totalMs = Date.now() - qaStart;
const passed = results.filter((r) => r.passed).length;
const failed = results.filter((r) => !r.passed).length;

console.log();
hr("─", 50);
console.log(`${B}  Summary${R}  ${D}(${fmt(totalMs)} total)${R}`);
hr("─", 50);

for (const step of ALL_STEPS) {
  const result = results.find((r) => r.name === step.name);
  if (step.skip) {
    console.log(`  ${step.icon}  ${step.name}  ${D}${Y}⊘ skipped (flag)${R}`);
    continue;
  }
  if (!result) {
    // Not reached — earlier bail
    console.log(`  ${step.icon}  ${step.name}  ${D}${Y}⊘ not run${R}`);
    continue;
  }
  const badge = result.passed ? `${G}✓ PASS${R}` : `${Re}✗ FAIL${R}`;
  const time = `${D}${fmt(result.elapsed)}${R}`;
  console.log(`  ${step.icon}  ${step.name}  ${badge}  ${time}`);
}

hr("─", 50);
const skippedCount = ALL_STEPS.filter((s) => s.skip).length;
const notRun = STEPS.length - results.length;
console.log(
  `  ${D}Passed:${R} ${G}${B}${passed}${R}  ` +
    (failed ? `${D}Failed:${R} ${Re}${B}${failed}${R}  ` : "") +
    (notRun ? `${D}Not run:${R} ${Y}${B}${notRun}${R}  ` : "") +
    (skippedCount ? `${D}Skipped:${R} ${Y}${B}${skippedCount}${R}` : "")
);
hr("─", 50);
console.log();

// ── Final verdict ──────────────────────────────────────────────────────────
if (allPassed) {
  const caveat = QUICK || SKIP_BUILD ? " (partial run)" : "";
  console.log(`  ${BGG}${W}${B}  ✅  ALL CHECKS PASSED — READY TO SHIP${caveat}  ${R}`);
} else {
  const failedStep = results.find((r) => !r.passed);
  console.log(`  ${BGR}${W}${B}  ❌  FAILED AT: ${failedStep?.name.trim().toUpperCase()}  ${R}`);
  console.log(`  ${D}  Fix the error above and re-run ${C}npm run qa${R}`);
}

console.log();
process.exit(allPassed ? 0 : 1);
