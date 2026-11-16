import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");

const EXPECTED_SKILLS = [
  "mc-ads",
  "mc-brand",
  "mc-cmo",
  "mc-compete",
  "mc-compliance",
  "mc-convert",
  "mc-cost",
  "mc-creative",
  "mc-dashboard",
  "mc-diagnose",
  "mc-finance",
  "mc-freestack",
  "mc-grade",
  "mc-insight",
  "mc-launch",
  "mc-listing",
  "mc-logistics",
  "mc-monitor",
  "mc-outreach",
  "mc-product",
  "mc-retain",
  "mc-selection",
  "mc-social",
  "mc-sop",
];

const SKILLS_WITH_REFERENCES = [
  "mc-ads",
  "mc-brand",
  "mc-compliance",
  "mc-cost",
  "mc-diagnose",
  "mc-logistics",
  "mc-outreach",
  "mc-product",
  "mc-selection",
  "mc-sop",
];

const read = (...p) => readFileSync(join(ROOT, ...p), "utf-8");
const lineCount = (t) => t.split("\n").length - (t.endsWith("\n") ? 1 : 0);
const mcDirs = () =>
  readdirSync(SKILLS)
    .filter((d) => d.startsWith("mc-"))
    .sort();

function localReferencedMd(skillText) {
  const stripped = skillText.replace(
    /skills\/mc-[\w-]+\/references\/[\w.-]+\.md/g,
    "",
  );
  return [...stripped.matchAll(/references\/([\w.-]+\.md)/g)].map((m) => m[1]);
}

function walkMdFiles(dir, base = "") {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    if (statSync(full).isDirectory()) out.push(...walkMdFiles(full, rel));
    else if (entry.endsWith(".md")) out.push([rel, readFileSync(full, "utf-8")]);
  }
  return out;
}

test("exact 24 cross-border skills exist with valid frontmatter and <= 799 line cap", () => {
  const dirs = mcDirs();
  assert.deepEqual(dirs, EXPECTED_SKILLS);
  for (const d of dirs) {
    const content = read("skills", d, "SKILL.md");
    const lines = lineCount(content);
    assert.ok(lines <= 799, `${d}/SKILL.md has ${lines} lines (cap 799)`);
    assert.match(
      content,
      new RegExp(`^---\\n[\\s\\S]*?name:\\s*${d}\\b[\\s\\S]*?description:\\s*.+[\\s\\S]*?\\n---`),
      `${d}/SKILL.md must have valid YAML frontmatter with name and description`,
    );
  }
});

test("all sub-modules under references/, frameworks/, personas/ stay under 400 lines", () => {
  for (const d of mcDirs()) {
    for (const sub of ["references", "frameworks", "personas"]) {
      const subDir = join(SKILLS, d, sub);
      if (!existsSync(subDir)) continue;
      const files = readdirSync(subDir).filter((f) => f.endsWith(".md"));
      assert.ok(files.length >= 1, `${d}/${sub} directory is empty`);
      for (const f of files) {
        const n = lineCount(readFileSync(join(subDir, f), "utf-8"));
        assert.ok(n < 400, `${d}/${sub}/${f} has ${n} lines (cap < 400)`);
      }
    }
  }
});

test("bidirectional references/*.md wiring across all modularized skills (no missing, no orphans)", () => {
  for (const d of mcDirs()) {
    const skillText = read("skills", d, "SKILL.md");
    const refDir = join(SKILLS, d, "references");
    const mentioned = new Set(localReferencedMd(skillText));
    if (SKILLS_WITH_REFERENCES.includes(d)) {
      assert.ok(existsSync(refDir), `${d} missing references/ directory`);
      assert.ok(
        mentioned.size >= 1,
        `${d}/SKILL.md must wire at least one references/*.md file`,
      );
      for (const f of mentioned) {
        assert.ok(
          existsSync(join(refDir, f)),
          `${d}/SKILL.md points at missing references/${f}`,
        );
      }
      for (const f of readdirSync(refDir).filter((x) => x.endsWith(".md"))) {
        assert.ok(
          mentioned.has(f),
          `orphan reference file not wired in ${d}/SKILL.md: references/${f}`,
        );
      }
    } else {
      assert.equal(
        existsSync(refDir),
        false,
        `${d} has unexpected references/ dir not listed in SKILLS_WITH_REFERENCES`,
      );
      assert.equal(
        mentioned.size,
        0,
        `${d}/SKILL.md mentions local references/*.md without a references/ dir: ${[...mentioned].join(", ")}`,
      );
    }
  }
});

test("mc-cmo routes all non-evaluator skills and CLAUDE.md + README.md list all 24 skills", () => {
  const cmo = read("skills", "mc-cmo", "SKILL.md");
  const claude = read("CLAUDE.md");
  const readme = read("README.md");

  assert.match(readme, /24 个技能/);
  for (const d of EXPECTED_SKILLS) {
    assert.ok(claude.includes(d), `CLAUDE.md missing ${d}`);
    assert.ok(readme.includes(d), `README.md missing ${d}`);
    if (d !== "mc-cmo" && d !== "mc-grade") {
      assert.ok(cmo.includes(d), `mc-cmo/SKILL.md missing route to ${d}`);
    }
  }
});

test("cross-border purity guard: no domestic-only scripts, workflows, platforms, or PRC laws leak into skills/", () => {
  const DOMESTIC_RE =
    /setup\.mjs|finalize\.mjs|campaigns\/\{|memory\/brand-memory\.md|蒲公英|星图|花火|小红书|抖音小店|企微|微信外链|微博热搜|黑猫投诉|12315|消费者权益保护法|中国广告法|互联网广告管理办法|三包责任|DOU\+/;
  const leaks = [];
  for (const [rel, text] of walkMdFiles(SKILLS, "skills")) {
    const lines = text.split("\n");
    lines.forEach((line, idx) => {
      const m = line.match(DOMESTIC_RE);
      if (m) leaks.push(`${rel}:${idx + 1} matched "${m[0]}"`);
    });
  }
  assert.deepEqual(leaks, []);
});

test("install.sh installs all 24 skills cleanly, supports single-skill install, validates names, and guards same-dir --local", () => {
  const wsAll = mkdtempSync(join(tmpdir(), "mc-global-all-"));
  const wsOne = mkdtempSync(join(tmpdir(), "mc-global-one-"));
  try {
    execFileSync("bash", ["install.sh", wsAll], { cwd: ROOT, stdio: "pipe" });
    const installed = readdirSync(join(wsAll, "skills"))
      .filter((d) => d.startsWith("mc-"))
      .sort();
    assert.deepEqual(installed, EXPECTED_SKILLS);
    assert.ok(
      existsSync(
        join(wsAll, "skills/mc-outreach/references/prospecting-and-verification.md"),
      ),
    );
    assert.ok(
      existsSync(
        join(wsAll, "skills/mc-outreach/references/outreach-workbench-and-templates.md"),
      ),
    );
    assert.ok(
      existsSync(
        join(wsAll, "skills/mc-product/references/physical-craft-premium.md"),
      ),
    );
    assert.ok(
      existsSync(
        join(wsAll, "skills/mc-compliance/references/market-sea.md"),
      ),
    );

    execFileSync("bash", ["install.sh", wsOne, "mc-product"], {
      cwd: ROOT,
      stdio: "pipe",
    });
    assert.deepEqual(readdirSync(join(wsOne, "skills")), ["mc-product"]);

    const sameDir = spawnSync("bash", ["install.sh", "--local"], {
      cwd: ROOT,
      encoding: "utf-8",
    });
    assert.equal(sameDir.status, 0);
    assert.match(sameDir.stdout, /same directory/);

    const badSkill = spawnSync("bash", ["install.sh", wsOne, "../oops"], {
      cwd: ROOT,
      encoding: "utf-8",
    });
    assert.notEqual(badSkill.status, 0);
  } finally {
    rmSync(wsAll, { recursive: true, force: true });
    rmSync(wsOne, { recursive: true, force: true });
  }
});
