import { test } from "node:test";
import assert from "node:assert/strict";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Guard suite for cross-border black-hat practices, external attribution/zero-width
// hygiene, hardened clause/quote/newline scanner logic, and 2025-2026 capability + legal anchors.

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");

const NEGATION_G =
  /不得(?![已了不])|不要(?!怕)|不能(?!不)|禁止|不写|❌|严禁|绝不|切勿|杜绝|避免|(?<!切)勿/g;
const NEGATION_RE = new RegExp(NEGATION_G.source);
const SPEECH_G = /(?:["“]([^"”]*)["”]|「([^」]*)」|『([^』]*)』)/g;
const CLAUSE_SPLIT = /[|，,；;。！？（）()]+|——|--/;
const QUOTE_PREFIX_SPLIT = /[|，,；;。！？（）():：]+|——|--/;
const NB = "[^\\n，,；;。！？|]";

export const GLOBAL_BLACKHAT = [
  {
    re: /好评激励|好评返现|返现换好评/,
    why: "incentivizing positive reviews violates FTC 16 CFR 465, UK DMCC Act 2024, and Amazon Seller Code of Conduct",
  },
  {
    re: /刷单/,
    unless: /信号|检测|排查|识别/,
    why: "order brushing / fake reviews violates platform ToS and FTC 16 CFR 465",
  },
  {
    re: /(?<!真)空包/,
    why: "empty-parcel brushing logistics fraud",
  },
  {
    re: new RegExp(`(定制|手工|现货)${NB}{0,12}(不退不换|概不退换)`),
    why: "mass-produced stock + ribbon/handwritten card cannot waive EU 2011/83/EU Art. 16(c) or Amazon 30-day returns",
  },
  {
    re: /有偿删帖|付费撤稿|付费删评|花钱删差评/,
    why: "paid post/review suppression violates FTC 16 CFR 465 & EU Omnibus",
  },
  {
    re: /水军控评|水军洗地|买水军/,
    why: "astroturfing / fake engagement manipulation",
  },
  {
    re: new RegExp(`伪造${NB}{0,8}(检测|质检|检验)报告`),
    why: "fabricating compliance/test inspection reports",
  },
  {
    re: /虚构海外(实验室|科研机构)/,
    why: "fabricating overseas R&D lab endorsements (FTC Substantiation / EU UCPD)",
  },
  {
    re: /Only (\d+|X) left/i,
    why: "fake inventory scarcity pressure (EU UCPD / UK DMCC Act 2024)",
  },
  {
    re: /glowing radiant skin|smooth morphing transition/i,
    why: "AI-fabricated cosmetic/efficacy before-and-after results (ai-content.md)",
  },
];

function isExcused(scope, re, unless) {
  if (unless && unless.test(scope)) return true;
  const termMatch = scope.match(re);
  if (!termMatch) return true;
  for (const neg of scope.matchAll(NEGATION_G)) {
    if (neg.index < termMatch.index) return true;
  }
  return false;
}

function lineViolates(line, re, unless) {
  if (!re.test(line)) return false;
  const speechMatches = [...line.matchAll(SPEECH_G)];
  // Inert token must NOT appear in CLAUSE_SPLIT so negation before an inline quote shields the full clause
  const outside = line.replace(SPEECH_G, "◇");
  const clauses = outside.split(CLAUSE_SPLIT).filter((c) => re.test(c));
  const scopes = [...clauses];

  for (const m of speechMatches) {
    const inner = m[1] ?? m[2] ?? m[3];
    if (!re.test(inner)) continue;
    // Check whether the prose clause immediately preceding this quote already negates it (e.g. 禁止「有偿删帖」)
    // Split on colons here so speaker/label prefixes (e.g. 禁止刷单："推荐用好评激励") do not shield quoted advice.
    const beforeQuote = line.slice(0, m.index).replace(SPEECH_G, "◇");
    const lastSep = beforeQuote.split(QUOTE_PREFIX_SPLIT).pop() ?? "";
    if (NEGATION_RE.test(lastSep)) {
      continue;
    }
    scopes.push(inner);
  }

  if (scopes.length === 0 && !speechMatches.some((m) => re.test(m[1] ?? m[2] ?? m[3]))) {
    scopes.push(re.test(outside) ? outside : line);
  }
  return scopes.some((s) => !isExcused(s, re, unless));
}

export function violations(text, banned = GLOBAL_BLACKHAT) {
  const found = [];
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const { re, unless, why } of banned) {
      if (lineViolates(line, re, unless)) {
        found.push(`L${i + 1}: ${line.trim().slice(0, 72)} — ${why}`);
      }
      const next = lines[i + 1];
      if (next === undefined || re.test(line) || re.test(next)) continue;
      const joined = line.trimEnd() + next.trimStart();
      if (lineViolates(joined, re, unless)) {
        found.push(`L${i + 1}-${i + 2}: ${joined.trim().slice(0, 72)} — ${why}`);
      }
    }
  });
  return found;
}

const read = (...p) => readFileSync(join(ROOT, ...p), "utf-8");

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

function nonComplianceDocs() {
  const docs = [];
  for (const d of readdirSync(SKILLS).filter(
    (x) => x.startsWith("mc-") && x !== "mc-compliance",
  )) {
    docs.push([`${d}/SKILL.md`, read("skills", d, "SKILL.md")]);
    for (const sub of ["references", "frameworks", "personas"]) {
      const subDir = join(SKILLS, d, sub);
      if (!existsSync(subDir)) continue;
      for (const f of readdirSync(subDir).filter((x) => x.endsWith(".md"))) {
        docs.push([
          `${d}/${sub}/${f}`,
          readFileSync(join(subDir, f), "utf-8"),
        ]);
      }
    }
  }
  return docs;
}

test("no non-compliance skill or reference teaches any GLOBAL_BLACKHAT practice", () => {
  const docs = nonComplianceDocs();
  assert.ok(docs.length >= 45, `expected >= 45 docs, found ${docs.length}`);
  const bad = docs.flatMap(([name, text]) =>
    violations(text).map((v) => `${name} ${v}`),
  );
  assert.deepEqual(bad, []);
});

test("zero external source/case attribution, P2P poison pills, or zero-width chars across repo markdown", () => {
  // Encoded as \u escapes so external consulting/case names never appear in plain-text public searches
  const ATTR_RE =
    /\u7a77\u8425\u9500|\u6ce2\u65ec|\u4ed6\u5316\u81ea\u5728\u5929|\u5154\u535a\u58eb|\u4e07\u8868\u7f51|\u5965\u7f8e|NeedScope|\u8f6f\u63a7|\u4e2d\u7cae|\u4e16\u8302|\u6052\u660c|\u79d1\u9f99|\u5730\u4ea7\u58f9\u7ebf|(?<!\u5185)\u5bb9\u58f0(?!\u660e)|\u817e\u8baf\u516c\u5173|3Q\u5927\u6218|\u4f18\u5361\u4e39|\u8fbe\u82ac\u5947\u5bb6\u5c45|\u738b\u601d\u806a|\u7f57\u6c38\u6d69|\u738b\u81ea\u5982|\u51b0\u6876\u6311\u6218|P2P\s*\u4e92\u91d1|P2P\s*\u7406\u8d22|\u7a33\u5b9a\u8d22\u5bcc\u6536\u76ca/i;
  const ZW_RE = /[\u200B-\u200D\u2060\uFEFF]/;
  const files = [
    ...walkMdFiles(SKILLS, "skills"),
    ["CLAUDE.md", read("CLAUDE.md")],
    ["README.md", read("README.md")],
  ];
  const badAttr = [];
  const badZw = [];
  for (const [rel, text] of files) {
    const m = text.match(ATTR_RE);
    if (m) badAttr.push(`${rel}: forbidden attribution/term (len ${m[0].length})`);
    if (ZW_RE.test(text)) badZw.push(`${rel}: contains zero-width char`);
  }
  assert.deepEqual(badAttr, []);
  assert.deepEqual(badZw, []);
});

test("hardened scanner catches positive advice and adversarial bypasses while passing prohibitions (30 cases total)", () => {
  const mustFlag = [
    "建议新客做好评激励提升星级",
    "用刷单快速冲前十排名",
    "发空包刷单补单",
    "详情页写手工定制概不退换降低退货",
    "找服务商付费删评压差评",
    "安排水军洗地扭转舆论",
    "PS 一份伪造质检报告放详情页",
    "印上虚构海外实验室背书",
    'Headline: "Only 3 left at this price"',
    "Use prompt: glowing radiant skin after 3 days",
    "禁止刷单，但新上架可以先买水军控评",
    "| 策略 | 禁止刷单 | 建议做好评返现 |",
    "有偿删帖但不要留痕",
    "虽然不得已只能发空包凑单",
    "伪造一份\n质检报告上传后台",
    "不要怕，直接买水军洗地就行",
    '标准台词："放心买"；加一句："只有这样才能好评返现"',
    "【警告】「内部禁止外传」：找外包付费撤稿",
    '禁止刷单："推荐用好评激励"',
  ];
  mustFlag.forEach((sample) => {
    assert.ok(
      violations(sample).length >= 1,
      `scanner failed to flag adversarial sample: ${sample}`,
    );
  });

  const mustPass = [
    "严禁在包裹卡做好评激励或评价门控",
    "Review 增速异常检测（可能刷单信号）",
    "真空包装压缩服装体积降运费",
    "严禁写手工定制概不退换，不得限制欧盟 14 天退货权",
    "禁止付费删评、买水军控评与伪造质检报告",
    "严禁虚构海外实验室联合研发",
    "严禁伪造 Only 3 left 类假库存紧迫话术",
    "不得用 AI 生成 glowing radiant skin 对比图",
    "禁止「有偿删帖」与「付费撤稿」",
    "不得在单句内写「好评返现」与「好评激励」",
    "**Amazon 渠道严禁夹放**：好评返现卡、Review 门控卡",
  ];
  mustPass.forEach((sample) => {
    assert.equal(
      violations(sample).length,
      0,
      `scanner false-flagged legitimate prohibition: ${sample}`,
    );
  });
});

test("2025-2026 cross-border legal & tariff updates landed across mc-compliance and mc-cost", () => {
  const us = read("skills", "mc-compliance", "references", "market-us.md");
  const eu = read("skills", "mc-compliance", "references", "market-eu.md");
  const uk = read("skills", "mc-compliance", "references", "market-uk.md");
  const au = read("skills", "mc-compliance", "references", "market-au.md");
  const sea = read("skills", "mc-compliance", "references", "market-sea.md");
  const ai = read("skills", "mc-compliance", "references", "ai-content.md");
  const comp = read("skills", "mc-compliance", "SKILL.md");
  const cost = read("skills", "mc-cost", "SKILL.md");
  const tax = read("skills", "mc-cost", "references", "module-3-tariff-tax.md");

  assert.ok(us.includes("16 CFR Part 465") && us.includes("2025-08-29"));
  assert.ok(eu.includes("2024/825") && eu.includes("2026-07-01") && eu.includes("€3"));
  assert.ok(uk.includes("DMCC Act 2024") && uk.includes("10%"));
  assert.ok(au.includes("AUD 75,000") && au.includes("AUD 1,000"));
  assert.ok(sea.includes("BPJPH") && sea.includes("75/2025/QH15"));
  assert.ok(ai.includes("EU AI Act") && ai.includes("16 CFR 465"));
  assert.ok(comp.includes("专项否决检视") && comp.includes("references/ai-content.md"));
  assert.ok(cost.includes("De Minimis") && cost.includes("木马钩子"));
  assert.ok(tax.includes("2025-08-29") && tax.includes("€3") && tax.includes("AUD $75,000"));
});

test("migrated PR #18-#21 cross-border capability packs landed in target skills", () => {
  const checks = {
    "skills/mc-product/SKILL.md": ["品类量化立规", "Social Alibi", "木马钩子", "First Use in Commerce"],
    "skills/mc-product/references/physical-craft-premium.md": ["形·色·纹·图", "FBA Size Tier", "2011/83/EU"],
    "skills/mc-selection/references/subculture-sourcing.md": ["Compatible with", "CC BY-NC", "抗比价改造潜力"],
    "skills/mc-selection/references/module-3-demand-validation.md": ["品牌污染度", "无品牌痛点簇占比"],
    "skills/mc-brand/SKILL.md": ["五阶资产光谱", "Buy Box", "四象限人格过载", "对外发言人与引言角色分层"],
    "skills/mc-brand/references/brand-architecture-matrix.md": ["增强型描述词", "完全隔离式多品牌", "Ingredient Branding"],
    "skills/mc-grade/SKILL.md": ["四象限人格过载"],
    "skills/mc-creative/SKILL.md": ["style_fidelity_anchors", "variable_slots", "ai-content.md"],
    "skills/mc-compete/SKILL.md": ["结构性反打", "C+ / A+"],
    "skills/mc-ads/SKILL.md": ["四阶竞争势能买量扩圈门禁", "L1 单品验证期"],
    "skills/mc-ads/references/module-5-budget-optimization.md": ["5.2b 四阶竞争势能扩圈检验"],
    "skills/mc-diagnose/SKILL.md": ["crisis-triage-matrix.md", "Message Match", "反向验证", "15 分钟在投买量"],
    "skills/mc-diagnose/references/crisis-triage-matrix.md": ["Tier 1", "Tier 3", "15 U.S.C. § 45b", "锁界致歉"],
    "skills/mc-monitor/SKILL.md": ["Mode B：海外品牌口碑与舆情流速监控", "5 类公众高敏情绪叠加雷达"],
    "skills/mc-listing/SKILL.md": ["前置「盗雷法」", "Visual Proof", "mAh"],
    "skills/mc-convert/SKILL.md": ["Message Match"],
    "skills/mc-social/SKILL.md": ["双轮接力", "Social Alibi", "No Purchase Necessary", "T+7 / T+30", "30 秒防恶意切片"],
    "skills/mc-retain/SKILL.md": ["F 维（购买频次）内容递进律", "微惊喜权", "赠品工程四维选型矩阵", "JND"],
    "skills/mc-insight/SKILL.md": ["去标签盲测"],
    "skills/mc-dashboard/SKILL.md": ["反虚荣水分"],
    "skills/mc-cmo/SKILL.md": ["pr_crisis", "mc-product", "不可协商红线"],
  };
  for (const [relPath, phrases] of Object.entries(checks)) {
    const content = read(relPath);
    for (const p of phrases) {
      assert.ok(content.includes(p), `${relPath} missing expected anchor "${p}"`);
    }
  }
});
