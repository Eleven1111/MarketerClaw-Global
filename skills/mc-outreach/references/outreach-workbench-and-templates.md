# 英文开发信三连模板、合规红线与本地审发台规范

> 本文件供 `mc-outreach` 执行 Step 6–7 时按需加载。对外开发信文案受目标国反垃圾邮件法规与事实真实性约束，任何虚构认证、虚假回复前缀或伪造紧迫感一律禁止。

---

## 1. 跨境 B2B 冷开发信合规红线清单（发信前逐条核验）

| 检查项 | 适用法域与标准 | 合规硬要求 | 违规后果 / 拦截口径 |
|-------|--------------|-----------|-------------------|
| **真实发件人与非欺骗主题** | 美国 CAN-SPAM Act / 多国商业邮件法 | `From` 与 `Reply-To` 真实标识发件企业；**首封严禁使用虚假 `Re:`、`Fwd:` 或捏造“经朋友转介绍”** | 触发执法罚款与高投诉率直接报废发信域 |
| **物理通讯地址** | 美国 CAN-SPAM Act（强制） | 每封冷开发信签名末尾必须包含发件人公司真实、有效的物理办公或营业地址 | 缺失物理地址 → 🔴 禁止外发 |
| **零摩擦退订出口** | CAN-SPAM / 欧盟 GDPR / 英国 PECR | 明确提供直接且免费的拒收方式（如 `Reply "stop" to opt out`），并在 10 个工作日内（建议收到即刻）永久移入抑制清单 | 缺少退订说明或退订后再发 → 🔴 违规 |
| **欧盟 / 英国 B2B 数据边界** | EU GDPR（Legitimate Interest）/ UK PECR | 优先触达企业域公务/职能邮箱（`company.com`），正文中写明产品与对方业务的具体相关性理由，避免批量向无关个人免费邮箱发送商业推销 | 与收件人业务毫无关联的无差别扫射 → 违反 B2B 合法利益原则 |
| **产品与认证真实性** | FTC / EU UCPD / `mc-compliance` | **仅可提及已真实持有的测试报告、专利或认证编号**（如真实检测完成的 FDA/CE/UL/RoHS）；禁止未经核实自称“100% 认证/行业第一” | 未在 `brand-brain/products.md` 备档的认证声明一律删除 |
| **发信域名隔离与节奏** | 邮件送达率工程底线 | 禁止使用品牌官网主域、ERP 通知域或 Amazon 卖家账号域发冷开发信；辅域未完成 SPF/DKIM/DMARC 与预热不得超 15 封/天 | 未过 Step 0 门禁 → 只输出名单与模板，不生成批量发送动作 |

---

## 2. 高回复率英文开发信三连模板（克制、事实驱动、≤120 词）

### 模板 A：首次触达（First Touch — 基于真实事实破冰）

```text
Subject: {产品关键词} supply for {CompanyName} ({具体产品线或市场锚点})

Hi {FirstName_or_BuyingTeam},

I noticed {CompanyName}'s {hook_fact — e.g., current lineup of silicone bakeware in the US / recent attendance at Ambiente / retail focus on outdoor gear}.

We manufacture {product_category} ({1条真实量化规格卖点 — 如：food-grade platinum silicone tested to 230°C with LFGB & FDA test reports, ±0.1mm mold tolerance}) in {City/Region}, supplying wholesale partners at {MOQ} MOQ and {lead_time} production lead time.

Would a concise 1-page spec sheet and tiered FOB pricing sheet be useful for your next category review?

Best regards,
{Sender_Name} | {Title}
{Company_Full_Name}
{Real_Physical_Office_Address}
{Website_URL} | WhatsApp: {Optional}

If you're not the right person for {category} sourcing or prefer no follow-ups, just reply "stop" and I won't reach out again.
```

> **写作纪律**：① 不带 PDF 大附件或追踪像素（降低首封进垃圾箱概率）；② 首段只说对方真实的公开事实，禁止假称“我研究你们公司很久非常敬佩”；③ 正文 80–120 英文词为佳。

### 模板 B：第 1 次温和跟进（T+4 工作日 — 补充可验证差异点或样品政策）

```text
Subject: Re: {产品关键词} supply for {CompanyName}  # 仅允许在同一真实回复链上使用 Re:

Hi {FirstName_or_BuyingTeam},

Following up briefly in case my previous note was buried.

For buyers expanding {specific_sub_niche}, our latest {SKU_name} cuts retail damage/defect claims through {1个可核验细节 — 如：reinforced corner ribbing + individual color-box drop-tested packaging}, with neutral or custom OEM packaging from {MOQ} units.

Happy to ship an evaluation sample or share the 1-page spec PDF if helpful — just let me know.

Best,
{Sender_Name}
{Company_Full_Name} | {Real_Physical_Office_Address}
Reply "stop" anytime if you'd prefer no further emails.
```

### 模板 C：第 2 次收尾告别（T+10 工作日 — 零压迫礼貌关闭）

```text
Subject: Closing the loop on {product_category}

Hi {FirstName_or_BuyingTeam},

I'll close the loop here so I don't crowd your inbox. If you ever review backup suppliers for {product_category} ahead of {next_season}, feel free to reach back anytime.

Wishing your team a strong quarter ahead.

{Sender_Name}
{Company_Full_Name} | {Real_Physical_Office_Address}
Reply "stop" to be removed from any future notes.
```

---

## 3. 双通道交付：Email MCP 真草稿 vs 本地 `outreach-batch.html` 审发台

### 通道 A：存在已授权 Gmail / Outlook MCP 连接器时
1. 仅针对 **Step 5 人工抽查通过的 S 级线索**，调用连接器的 `create_draft`（创建草稿）接口，严禁调用 `send_email` 直接自动发送。
2. 写入草稿后在会话输出清单：收件人、主题、可信度等级，由用户自己在邮箱草稿箱复核、微调后手动点击发送。

### 通道 B：无邮件连接器时 — 工作区单文件 `outreach-batch.html` 规范
当环境无 Email MCP 时，**绝不声称邮件已进入用户邮箱草稿箱**，而是在工作区生成零外部依赖的静态 HTML 页面 `./outreach-batch.html`，提供可视化审发台能力。

页面必须包含以下 5 项交互模块：
1. **顶部安全警告与统计条**：显示本批总家数、S/A/B 分布、发信隔离状态与 **“点 `mailto:` 仅唤起本地写信窗口，受系统/客户端约 2000 字符上限限制；长信请先点 Copy Body 再发送”** 的显式提示。
2. **过滤器**：按 `Tier (S/A/B)` 与 `邮箱可信度`、`发送状态` 过滤卡片。
3. **逐家卡片信息**：公司名、国家、根域名、`hook_fact` 出处证据、联系人姓名/职位、邮箱与 5 级可信度徽章（`Pattern-Inferred` 禁用一键发信按钮，改显"仅官网表单/待人工核验"）。
4. **双保险发信操作区**：
   - `Copy Subject`（一键复制主题）
   - `Copy Body`（一键复制完整英文正文+合规签名）
   - `Open Mail Client (mailto:)`（仅限 `Verified Official` / `Verified API` / 用户确认试发的 `Catch-All`，`encodeURIComponent` 后超 ~1800 字符自动提示优先用复制按钮）
   - `Open Form`（当无直邮时直接打开对方官网联系表单 URL）
5. **本地状态追踪与 JSON 导出（闭环 Step 7）**：每家卡片可切换状态 `Pending / Sent / Replied / Bounced / Opt-Out` 并存在 `localStorage`，顶部提供 `Export Results JSON` 按钮——用户每周汇总回复/退信后把导出 JSON 贴回对话，供技能校准 Step 1 信号权重并合法写入 `brand-brain/learnings.jsonl`。

---

## 4. `outreach-batch.html` 最小自包含实现骨架

生成 `./outreach-batch.html` 时直接内嵌本批脱敏数据数组 `BATCH_LEADS` 到如下单文件结构即可（零 CDN、零外部脚本，打开即用；序列化 JSON 注入脚本块时务必将 `</` 转义为 `<\/`，防止文本中出现闭合标签破坏脚本解析）：

```html
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>MC-Outreach · 本批 B2B 审发台</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; margin: 24px; background: #f7f7f5; color: #1b1b18; }
  .banner { background: #fff3cd; border: 1px solid #ffe69c; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-size: 14px; }
  .toolbar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; }
  .card { background: #fff; border: 1px solid #e5e5e0; border-radius: 10px; padding: 16px; margin-bottom: 12px; }
  .row { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #eef2ff; }
  .warn { background: #fdecea; color: #9c1f16; }
  .hint { font-size: 12px; color: #9c1f16; }
  pre { background: #f4f4f0; padding: 10px; border-radius: 6px; white-space: pre-wrap; font-size: 13px; }
  button, a.btn { padding: 6px 12px; border-radius: 6px; border: 1px solid #d0d0c8; background: #fff; cursor: pointer; text-decoration: none; color: inherit; font-size: 13px; }
  button.primary, a.btn.primary { background: #14532d; color: #fff; border-color: #14532d; }
</style>
</head>
<body>
  <h2>B2B 开发信人工审发台（mc-outreach）</h2>
  <div class="banner">
    ⚠️ <strong>操作规范：</strong>逐家核实官网与收件人后再点发送；<code>mailto:</code> 仅唤起本地邮箱窗口（不进云端草稿箱且有约 1800–2000 字符限制），正文较长请点「复制正文」。遇到退信或拒收请立即切换状态并加入抑制清单。
  </div>
  <div class="toolbar">
    <select id="tierFilter"><option value="ALL">全部等级</option><option value="S">S 级</option><option value="A">A 级</option><option value="B">B 级</option><option value="C">C 级</option></select>
    <select id="trustFilter"><option value="ALL">全部可信度</option><option value="Verified Official">Verified Official</option><option value="Verified API">Verified API</option><option value="Catch-All / Risky">Catch-All / Risky</option><option value="Pattern-Inferred">Pattern-Inferred</option><option value="Contact Form / Alt Only">Contact Form / Alt Only</option></select>
    <select id="statusFilter"><option value="ALL">全部状态</option><option value="Pending">Pending</option><option value="Sent">Sent</option><option value="Replied">Replied</option><option value="Bounced">Bounced</option><option value="Opt-Out">Opt-Out</option></select>
    <button onclick="exportState()">导出状态 JSON（回流复盘）</button>
    <span id="summary"></span>
  </div>
  <div id="list"></div>
<script>
const BATCH_LEADS = [ /* 由技能填入本批清洗后 JSON 数组，序列化时 </ 转义为 <\/ */ ];
const KEY = "mc_outreach_batch_v1";
const state = JSON.parse(localStorage.getItem(KEY) || "{}");
function saveState(domain, status) { state[domain] = status; localStorage.setItem(KEY, JSON.stringify(state)); render(); }
function fallbackCopy(txt, btn) {
  const ta = document.createElement("textarea"); ta.value = txt; ta.style.cssText = "position:fixed;left:-9999px";
  document.body.appendChild(ta); ta.select();
  const ok = document.execCommand && document.execCommand("copy");
  document.body.removeChild(ta);
  const old = btn.textContent; btn.textContent = ok ? "已复制" : "请手动复制正文框";
  setTimeout(() => btn.textContent = old, 1500);
}
function copyText(txt, btn) {
  if (!navigator.clipboard || !navigator.clipboard.writeText) { fallbackCopy(txt, btn); return; }
  navigator.clipboard.writeText(txt).then(() => {
    const old = btn.textContent; btn.textContent = "已复制"; setTimeout(() => btn.textContent = old, 1200);
  }).catch(() => fallbackCopy(txt, btn));
}
function mailtoHref(l) {
  if (!l.email) return { href: null, reason: "no_email" };
  const url = `mailto:${encodeURIComponent(l.email)}?subject=${encodeURIComponent(l.subject || "")}&body=${encodeURIComponent(l.body || "")}`;
  return url.length <= 1850 ? { href: url, reason: null } : { href: null, reason: "too_long" };
}
function exportState() {
  const out = BATCH_LEADS.map(l => ({ domain: l.domain, company: l.company, tier: l.tier, trust: l.trust, status: state[l.domain] || "Pending" }));
  const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "outreach-results.json"; a.click();
}
function render() {
  const tf = document.getElementById("tierFilter").value;
  const trf = document.getElementById("trustFilter").value;
  const sf = document.getElementById("statusFilter").value;
  const rows = BATCH_LEADS.filter(l => {
    const cur = state[l.domain] || "Pending";
    return (tf === "ALL" || l.tier === tf) && (trf === "ALL" || l.trust === trf) && (sf === "ALL" || cur === sf);
  });
  document.getElementById("summary").textContent = `显示 ${rows.length} / ${BATCH_LEADS.length} 家`;
  document.getElementById("list").innerHTML = "";
  rows.forEach(l => {
    const cur = state[l.domain] || "Pending";
    const canSend = l.trust === "Verified Official" || l.trust === "Verified API" || l.trust === "Catch-All / Risky";
    const m = canSend ? mailtoHref(l) : { href: null, reason: "trust_blocked" };
    const card = document.createElement("div"); card.className = "card";
    const row = document.createElement("div"); row.className = "row";
    const title = document.createElement("div");
    const strong = document.createElement("strong"); strong.textContent = l.company || "";
    const metaText = document.createTextNode(` (${l.country || ""}) · `);
    const code = document.createElement("code"); code.textContent = l.domain || "";
    const tierBadge = document.createElement("span"); tierBadge.className = "badge"; tierBadge.textContent = `${l.tier || "B"} 级`;
    const trustBadge = document.createElement("span"); trustBadge.className = `badge ${canSend ? "" : "warn"}`; trustBadge.textContent = l.trust || "";
    title.append(strong, metaText, code, " ", tierBadge, " ", trustBadge);

    const sel = document.createElement("select");
    ["Pending", "Sent", "Replied", "Bounced", "Opt-Out"].forEach(s => {
      const opt = document.createElement("option"); opt.value = s; opt.textContent = s;
      if (cur === s) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", () => saveState(l.domain, sel.value));
    row.append(title, sel);

    const info = document.createElement("p"); info.style.cssText = "font-size:13px;color:#555;";
    info.textContent = `收件人：${l.contact || "Purchasing Team"} · ${l.email || "无直邮"} | 事实依据：${l.hook_fact || ""}`;
    const pre = document.createElement("pre");
    pre.textContent = `Subject: ${l.subject || ""}\n\n${l.body || ""}`;

    const bar = document.createElement("div"); bar.className = "toolbar";
    const b1 = document.createElement("button"); b1.textContent = "复制主题"; b1.addEventListener("click", () => copyText(l.subject || "", b1)); bar.appendChild(b1);
    const b2 = document.createElement("button"); b2.textContent = "复制正文"; b2.addEventListener("click", () => copyText(l.body || "", b2)); bar.appendChild(b2);
    if (m.href) { const a = document.createElement("a"); a.className = "btn primary"; a.href = m.href; a.textContent = "打开邮箱写信"; bar.appendChild(a); }
    else if (m.reason === "too_long") { const s = document.createElement("span"); s.className = "hint"; s.textContent = "正文超 mailto 长度限制（>1850），请先点「复制正文」手动粘贴"; bar.appendChild(s); }
    else if (l.alt_url && /^https?:\/\//i.test(l.alt_url)) { const a = document.createElement("a"); a.className = "btn"; a.href = l.alt_url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = "打开联系表单"; bar.appendChild(a); }
    card.append(row, info, pre, bar);
    document.getElementById("list").appendChild(card);
  });
}
document.getElementById("tierFilter").onchange = render;
document.getElementById("trustFilter").onchange = render;
document.getElementById("statusFilter").onchange = render;
render();
</script>
</body>
</html>
```
