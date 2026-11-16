# 市场规则 — 欧盟 (EU)

> last_verified: 2026-09-25 · 复核周期 180 天
> 由 mc-compliance 按需加载：目标市场含欧盟时读取本文件。审查参考，不构成法律意见；指令需经成员国转化，执行细节以目标国国内法为准。

## 产品准入矩阵

| 产品类别 | 核心法规 | 必要认证/标识 | 关键要求 |
|----------|---------|-------------|---------|
| 几乎所有消费品 | 相关 EU 指令 / GPSR | CE Marking + EU Responsible Person | CE 标识是进入欧盟市场的"护照"；一般消费品受 GPSR 监管，须标明欧盟负责人地址 |
| 电子电气产品 | LVD + EMC | CE (LVD 2014/35/EU + EMC 2014/30/EU) | 低压指令 + 电磁兼容；需技术文档 + DoC 声明 |
| 含化学物质产品 | REACH | REACH 合规（SVHC ≤ 0.1%） | 高关注物质清单每年更新；卖家需指定 Only Representative 或留存合规报告 |
| 电子电气产品 | RoHS | RoHS 2011/65/EU | 铅、汞、镉等 10 种有害物质限制 |
| 电子电气产品 | WEEE | WEEE 注册 + 标识 | 每个 EU 成员国单独注册；产品须印"打叉垃圾桶"标识 |
| 医疗器械 | EU MDR 2017/745 | CE (通过 Notified Body) | 全面执行 MDR；Class I 以上需 NB 参与 |
| 玩具 | Toy Safety Directive 2009/48/EC | CE + EN 71 检测 | 机械物理 + 化学 + 可燃性检测 |
| 化妆品 | EU Cosmetics Regulation 1223/2009 | CPNP 通报 + PIF | 上市前须在 CPNP 系统通报；需完整 Product Information File |
| 食品 | General Food Law + 标签法规 | — | 标签须含过敏原信息（14 种）；营养成分表强制 |

**实例：** 一个 USB 充电的 LED 台灯出口欧盟，需要：CE（LVD + EMC）+ RoHS 检测报告 + REACH SVHC 声明 + WEEE 注册（每个目标国家）+ EU 负责人标签 + DoC 符合性声明 + 技术文档存档 10 年。

## Listing 文案、隐私与消费者保护指令

| 规则/指令 | 要求 | 高风险场景 |
|----------|------|-----------|
| **UCPD** (`2005/29/EC`) & **DSA** (`2022/2065` Art. 26(2)) [1][2] | 禁止误导性或攻击性商业行为；商业传播与网红付费推广须清楚标明（冒充消费者一律禁止）；平台提供商业声明功能时发布方须使用 | 虚假倒计时、虚构库存紧张、网红隐蔽软植、商家伪装买家发帖 |
| **Consumer Rights Directive** (`2011/83/EU` Art. 16(c)) | 远程销售享 14 天无理由撤回权；仅按消费者具体要求现做或明确个性化的商品（Art. 16(c)）可适用豁免——**批量现货加手写卡片/丝带包装不构成定制豁免** | 批量现货详情页写 "Handmade / Custom — No Returns" |
| **Price Indication Directive** (经 Omnibus 修订) [3][4] | 宣布降价须标明此前至少 30 天内的最低价作为基准；CJEU ALDI SÜD 案（2024-09-26）确认折扣率须以该 30 天最低价计算 | "50% OFF" 但以虚构高价或非 30 天最低价为基数 |
| **虚假评价** (Omnibus `2019/2161` / UCPD 附件 I 23b, 23c) [1][3] | 禁止委托/提交虚假评价、禁止隐藏差评仅展示好评；展示评价须说明真实性核验与处理方式 | 独立站屏蔽 1–3★ 差评只展示精选好评 |
| **环保声明 ECGT** (`Directive (EU) 2024/825`, **2026-09-27 起适用**) [5] | **禁止**无公认卓越环境表现支撑的泛泛环保宣称（"eco-friendly""green""sustainable"）；**禁止**基于碳抵消宣称产品对环境中性或减少影响；可持续标签须基于认证体系或公权机构；未来环保承诺须有独立第三方核查的实施计划 | 未认证贴 "Eco-Friendly"、"Carbon Neutral by Offsetting" |
| *Green Claims Directive* (提案状态) [6] | 仍为立法提案（2025-06 欧委会曾表态拟撤回），**不是现行法**，审查结论不得据此引用 | 把未生效草案写成现行欧盟禁令 |
| **AI 生成内容** (`EU AI Act` Art. 50) [7] | 2026-08-02 起 deepfake 须披露为人工生成或操纵；细则见 `references/ai-content.md` | 未标注 AI 生成的逼真模特视频或效果演示 |
| **隐私与无障碍** (`GDPR` / `ePrivacy` / `EAA 2019/882`) [8][9][10] | 独立站分析/再营销像素须先取得自由明确同意（禁止预勾选）；向欧盟外传数据须具合规机制；面向欧盟电商服务须满足无障碍要求并发布无障碍声明（2025-06-28 起，微型企业豁免） | 独立站未征得同意即触发 Meta Pixel、无 Cookie Consent、无无障碍声明 |

## 关税框架（含 2026-07 取消 €150 免关税）

```
进口环节：
  - 关税 = CIF 价值 × CN Code 关税税率（0-17%，视品类）
  - 低价值小包关税重大变更（2026-07-01 起生效）[11]：
    欧盟取消 €150 以下货值免关税政策，改为对 ≤€150 的直邮小包
    按商品税目（tariff heading）每项征收 €3 临时关税（拟适用至 2028-07-01）。
  - 进口 VAT = (CIF + 关税) × 目标国 VAT 税率（€0 免征额已于 2021 年取消；
    ≤€150 独立站直邮订单可通过 IOSS 申报代缴）。

各国 VAT 标准税率：
  德国: 19%  |  法国: 20%  |  意大利: 22%  |  西班牙: 21%  |  荷兰: 21%  |  波兰: 23%
```

## 来源

- [1] European Commission: Unfair Commercial Practices Directive — https://commission.europa.eu/law/law-topic/consumer-protection-law/unfair-commercial-practices-and-price-indication/unfair-commercial-practices-directive_en
- [2] Regulation (EU) 2022/2065 (Digital Services Act) — https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng
- [3] Directive (EU) 2019/2161 (Omnibus) — https://eur-lex.europa.eu/eli/dir/2019/2161/oj/eng
- [4] European Commission: Price Indication Directive — https://commission.europa.eu/law/law-topic/consumer-protection-law/unfair-commercial-practices-and-price-indication/price-indication-directive_en
- [5] Directive (EU) 2024/825 (Empowering Consumers for the Green Transition) — https://eur-lex.europa.eu/eli/dir/2024/825/oj/eng
- [6] European Parliament Legislative Train: Substantiating green claims — https://www.europarl.europa.eu/legislative-train/theme-a-european-green-deal/file-substantiating-green-claims
- [7] European Commission: Quick facts — transparency rules for AI systems — https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems
- [8] Directive 2002/58/EC (ePrivacy) — https://eur-lex.europa.eu/eli/dir/2002/58/oj/eng
- [9] Regulation (EU) 2016/679 (GDPR) — https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- [10] Directive (EU) 2019/882 (European Accessibility Act) — https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng
- [11] European Commission: €3 customs duty for low-value parcels — https://commission.europa.eu/news-and-media/news/ensuring-fairness-and-safety-eur3-customs-duty-low-value-parcels-2026-06-29_en
