# 线索渠道边界、检索式与五级邮箱验证树

> 本文件供 `mc-outreach` 执行 Step 2–4 时按需加载。所有工具仅作可行性定位与降级说明，不绑定单一平台。

---

## 1. 常见公开数据源与免费工具的真实边界

| 工具 / 数据源 | 真实定位与免费额度 | 常见卡点（禁止假装可全自动） | 推荐用法（每批 10–25 家） |
|--------------|-----------------|----------------------------|------------------------|
| **ImportYeti** | 美国海运提单免费公开检索（2015+ 提单历史） | 启用 Cloudflare Bot 防护；无免费批量导出 API | 人工交互搜索目标产品词/竞品品牌 → 复制或导出 Top 10–30 活跃进口商清单交给技能清洗 |
| **Volza** | 全球海关数据商业库 | 试用版仅看近约 6 个月受限预览与极少量（约 10 个）联系人额度；正版年费约 $1,500+ | 不作为 0 成本高频主力库；仅在用户已购买商业账号时由用户粘贴导出 CSV |
| **国际大展公开参展/买手名录** | 行业垂直展官网公开参展商与代理商目录 | 各站点 HTML 结构异构、部分需翻页 | 直接抽取对应品类馆展商名、国家与官网 URL，作为高意向种子 |
| **ThomasNet / 行业协会名录** | 北美工业制造与分销名录 / 各国行业协会会员页 | 高频抓取触发 WAF 限流 | 按细分品类导出前 20–30 家**分销商 / 品牌采购方**（注意排除纯代工厂） |
| **本地地图商铺导出（Chrome 扩展等）** | 适合实体经销商、区域五金/汽配/专业门店发现 | 单网格有 ~120 条深度上限，高频请求弹 CAPTCHA；开源爬虫易因页面改版失效 | 用户在本机浏览器跑一次关键词网格导出 CSV（含店名、官网、电话），导入本技能做域名去重 |
| **`dns.google` DoH API** | Google 公共 DNS-over-HTTPS（`https://dns.google/resolve`） | 仅能验证域名是否存在及 MX 收信服务器类型，不能判断具体邮箱号是否存在 | 零成本且在云端/本地皆可通过 443 端口稳定执行，作为所有候选域的第一道硬过滤 |
| **Hunter.io（及同类验证 API）** | 免费档通常约 50 credits/月（查邮箱 1 credit、验活 0.5 credit ≈ 100 次验证/月） | 月度额度极有限，绝不能用来跑“日产 100+”全库扫描 | 仅针对已完成 ICP 初筛且官网未公开个人邮箱的 **S 级重点客户** 按需消耗验证额度 |
| **云端原始 `RCPT TO` 端口 25 探测** | 通过 SMTP 握手试探邮箱是否可接受 | 云主机/隔离沙盒与多数宽带**封锁 TCP 25 出站**，且企业域高比例返回 Catch-All `250 OK` | **严禁作为独立可信验证结论**；不做虚构“已验证”输出 |

---

## 2. 高信噪比搜索算子（Step 2 P2 补漏）

当用户手头只有产品定义、尚无提单或展会导表时，使用下列搜索算子筛选下游买家并排除同行工厂：

```text
# 1. 寻找目标国家的专业进口商 / 批发商 / 经销商
("product keyword A" OR "product keyword B") (importer OR wholesale OR distributor OR stockist) "United States" -alibaba -made-in-china -manufacturer -oem

# 2. 寻找官网带有 B2B 采购或经销申请入口的活跃买家
("become a dealer" OR "wholesale inquiry" OR "stockists") "product keyword" (US OR UK OR Germany)

# 3. 反向寻找同品类独立品牌 / 零售渠道（可能缺稳健二供）
("product keyword") ("about us" OR "our brands") ("retail" OR "showroom") -factory -supplier

# 4. 查找该公司官网公开采购/负责人姓名与通稿
site:{target_domain.com} ("purchasing" OR "procurement" OR "buyer" OR "sourcing" OR "contact")
site:{target_domain.com} filetype:pdf ("catalog" OR "contact")
"company name" ("appoints" OR "head of purchasing" OR "category manager" OR "founder")
```

### 同行竞争对手负向排除词库（Step 3 自动标红剔除）
若目标公司简介或官网首页高频出现下列组合，标为 `Competitor / Non-Target`，不放入外发名单：
- `"OEM/ODM manufacturer"` / `"contract manufacturing"` / `"we produce"` / `"factory direct"`（同源生产厂家）
- `"China sourcing agent"` / `"export trading company"` / `"freight forwarder"`（同行贸易/物流中介）
- 产品类目完全不跨界（如只卖生鲜餐饮的本地店，搜厨房硬件词时误中）

---

## 3. 根域名规范化与去重规则

1. **提取 `root_domain`**：移除 `http(s)://`、`www.`、子路径、查询参数与锚点，统一小写（如 `https://www.AcmeSupply.com/wholesale?ref=1` → `acmesupply.com`；排除聚合平台域名如 `facebook.com`、`linkedin.com`、`amazon.com`、`thomasnet.com` 当作公司官网主键）。
2. **合并多渠道证据**：同一 `root_domain` 若同时出现在 ImportYeti 与展会名录中，在记录中合并 `sources: ["importyeti", "tradeshow"]`，**基础信号分叠加奖励**。

---

## 4. `dns.google` DoH MX 核验与五级可信度判定树

### 4.1 免费域名 MX / SPF 快检（HTTPS 443，不走 25 端口）

在具备 shell 权限的本地或受控环境下，可用单条公开 HTTPS 请求检测目标域名是否可收信及邮件托管商指纹：

```bash
curl -s "https://dns.google/resolve?name=example.com&type=MX"
```

判读逻辑：
- `Status !== 0` 或无 `Answer` 段 → 域名解析失败或无 MX 记录 → **直接淘汰，标为 `No Valid MX`**。
- `Answer[].data` 含 `google.com` / `googlemail.com` → Google Workspace 托管（高抗垃圾与企业网关，**禁盲猜群发**）。
- `Answer[].data` 含 `protection.outlook.com` → Microsoft 365 托管（极易拦截低信誉新域，需严格预热与纯文本）。
- `Answer[].data` 含 `pphosted.com` / `mimecast.com` / `barracudanetworks.com` → 强企业防垃圾网关（仅放行高相关度 S 级精写信）。

### 4.2 邮箱格式与一次性域预过滤
- 合法 RFC 语法校验，剔除明显占位符（`noreply@`、`example@`、`support-ticket@`、包含空格或图片后缀）。
- 剔除已知临时一次性域名（`mailinator.com`、`guerrillamail.com`、`tempmail.*` 等）。

### 4.3 五级可信度判定树（Step 4 强约束）

```text
候选地址进入判定：
├─ 1) 出现在官网 Contact/Team 页、官方新闻稿 PDF 或展会官方参展联系人栏？
│     └─ 是 → 【Verified Official】✅ 可直接进 S/A 待发池
├─ 2) 经过第三方专业验活 API 返回 deliverable 且非 catch-all？
│     └─ 是 → 【Verified API】✅ 可直接进 S/A 待发池
├─ 3) 第三方 API 标注 catch-all / accept_all / unknown？
│     └─ 是 → 【Catch-All / Risky】⚠️ 仅 S 级高契合客户慎发，单独监控退信率
├─ 4) 仅根据同域命名规则（如 first.last@domain）推算，无公开出处且未用 API 验活？
│     └─ 是 → 【Pattern-Inferred】🚫 禁止直接群发；标记"待API验活或改走官网表单"
└─ 5) 未找到直邮，或仅有通用拦截/缺失 MX？
      └─ 是 → 【Contact Form / Alt Only】🌐 记录官网 /contact URL、公开电话或商业主页链接
```

---

## 5. 输出线索结构化字段标准（供 Step 5–6 衔接）

每条清洗后线索保留最小完整字段集：

| 字段 | 说明 |
|-----|------|
| `root_domain` | 去重唯一主键（如 `acmesupply.com`） |
| `company_name` | 规范化公司名 |
| `country` / `buyer_type` | 目标国 / `Importer | Wholesaler | Distributor | Retailer` |
| `evidence_url` / `hook_fact` | 真实检索出处链接 + 写入首封开发信第一句的具体事实（如"近期有同品类海运进口记录"或"官网正在扩充 XX 线"） |
| `contact_name` / `role` | 决策人或买手姓名与职位（未知则标 `Purchasing Team`） |
| `email` / `trust_tier` | 邮箱地址 + 五级可信度标签（`Verified Official` 等） |
| `mx_provider` | `Google / M365 / Security-Gateway / Other / Missing` |
| `score` / `tier` | `0–100` 总分 + `S / A / B / C` |
| `alt_channel` | 无直邮或待核对时的官网联系表单 URL / 电话 / 商业主页 |
