# 市场规则 — 美国 (US)

> last_verified: 2026-09-25 · 复核周期 180 天
> 由 mc-compliance 按需加载：目标市场含美国时读取本文件。审查参考，不构成法律意见；上线前由美国执业律师复核，平台规则以平台帮助中心最新版为准。

## 产品准入矩阵

| 产品类别 | 主管机构 | 必要认证/注册 | 关键要求 |
|----------|---------|--------------|---------|
| 食品 | FDA | FDA Food Facility Registration + Prior Notice | 进口前需提交 Prior Notice；标签符合 21 CFR Part 101 |
| 化妆品 | FDA | MoCRA 注册（2024 年起强制） | 设施与产品须向 FDA 登记并留存安全依据；禁用成分见 21 CFR 700 |
| 膳食补充剂 | FDA | FDA Facility Registration | 标签必须含 "This statement has not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease." |
| 消费电子 | FCC | FCC ID / SDoC | 所有辐射电子设备需 FCC 认证；蓝牙/WiFi 设备必须 FCC ID |
| 儿童产品 | CPSC | CPC (Children's Product Certificate) | 12 岁以下儿童产品需第三方 CPSC-accepted lab 检测；铅含量 ≤ 100ppm |
| 一般消费品 | CPSC | GCC (General Certificate of Conformity) | 成人产品需 GCC；基于合理测试计划 |
| 激光产品 | FDA CDRH | Accession Number | 激光产品（含激光笔）需向 FDA CDRH 报告 |
| 杀虫/消毒产品 | EPA | EPA Registration | 声称 "kills germs/bacteria" 的产品必须 EPA 注册 |

**实例：** 一个带蓝牙功能的儿童智能手表，同时需要 FCC ID（蓝牙辐射）+ CPC（儿童产品）+ 铅含量检测 + 小零件窒息风险评估。漏掉任何一项都可能被海关扣货或 Amazon 下架。

## Listing 文案与社媒投放 — FTC 与联邦/州规则

| 规则 | 要求 | 违规后果 | 高风险用法 |
|------|------|---------|-----------|
| **Substantiation** | 所有客观性能/成分/耐用声明在发布前须持有"合理依据" | 罚款 + 禁令 | "clinically proven" "scientifically tested"（无检测报告时） |
| **关联披露** (`16 CFR Part 255`, 2023 修订) [1][2] | 报酬、赠品、借用、佣金等实质关联须清晰显著披露；视频须在视频本身内（画面与口播都有更稳妥）披露，只放简介或"更多"折叠里不合格；平台自带标签未必足够 | 民事罚款 + 禁令 | 达人拆箱/测评只标 `#gifted` 藏在折叠区，或伪装素人真实买家 |
| **虚假评价与证言** (`16 CFR Part 465`, 2024-10-21 起) [3] | 禁止买卖虚假或 AI 生成评价、以好评为条件给激励、内部人不披露关系写评价、压制差评（仅放好评或删差评）、出售虚假影响力指标；真实用户证言须反映一般效果或清楚说明一般体验 | 按次处以高额民事罚款（最高超 $51,000+/次） | 包裹卡换好评、筛选展示 4–5★ 隐藏差评、AI 虚构使用心得 |
| **评价言论保护** (`Consumer Review Fairness Act`, `15 U.S.C. § 45b`) | 禁止在标准条款、保修卡或客服和解协议中限制/惩罚买家发布真实负面评价（格式禁言条款自始无效） | FTC 执法 + 禁令 | "差评不予保修"、"收退款须先删差评"格式条款 |
| **健康/功效声明** [4] | 健康与营养声明须有合格可靠的科学证据（RCT 等），不得事后拼凑数据（p-hacking） | FTC 执法 + 召回/罚款 | 无对照临床数据却宣称"cure/prevent/clinically proven" |
| **环保声明** (`16 CFR Part 260` Green Guides) [5] | 环保/可降解声明须具体、可证实并标明适用边界（如工业堆肥 vs 家庭堆肥） | 罚款 + 强制更正 | 无认证的 "100% biodegradable" "eco-friendly" |
| **Made in USA** (`16 CFR Part 323`) | "全部或几乎全部"在美制造与组装方可无限定声称 | FTC 调查 + 罚款 | 中国组装产品使用 "Made in USA" |
| **"Free" 与比较广告** (`16 CFR Part 251`) [6] | 标"免费"须清楚披露前置条件，不得抬高常规价回收成本；对比广告须客观可验证 | 竞品诉讼 + 处罚 | 抬高原价后送"免费赠品"、无实测对比数据贬损竞品 |
| **自动续费 / 订阅** (`ROSCA` + 加州 `AB 2863`, 2025-07-01 起) [7][8] | FTC "click-to-cancel" 规则于 2025-07 被第八巡回法院撤销，但 ROSCA 与州法仍适用；加州 AB 2863 要求明示同意、可用同一渠道取消与年度续费提醒 | 州检察长/FTC 追责 | 独立站订阅制默认勾选、必须打电话才能取消 |
| **儿童隐私** (`COPPA`, `16 CFR Part 312`, 2025 修订) [9] | 面向 13 岁以下儿童或明知收集其个人信息的独立站须取得可核查父母同意（2026-04-22 合规期限已过） | 巨额罚款 | 儿童向品类网站收集邮箱/追踪像素 |
| **海外抽奖 (Sweepstakes)** | 有奖抽奖必须遵守各州反非法彩票规制：提供免费免购买参与通道（**AMOE / "No Purchase Necessary"**）、公示完整 Official Rules 与中奖概率；买满抽奖须开放同等免费入口 | 州法非法彩票指控 + 封号 | "下单即抽大奖"但无免费参与入口（No Purchase Necessary） |

**中国卖家常踩的 FTC 与平台坑：**
- "Best seller" / "Amazon's Choice" — 无官方实时徽章或具体期间截图证明即属误导。
- "Award-winning" / "Doctor recommended" — 须有真实获奖或持证医师独立背书文件，禁止虚构奖项或海外实验室。
- AI 生成对比图 — 见 `references/ai-content.md`；用 AI 合成产品质感或功效 Before/After 均违反 FTC 真实性原则。

## 关税框架（含 2025–2026 De Minimis 暂停）

```
总关税 = MFN 基础税率 + Section 301 附加税 + AD/CVD（如适用）

De Minimis（$800 小额免税，19 U.S.C. § 1321）重大变更 [10]：
  - 中国/香港原产商品：自 2025-05-02 起全面暂停 $800 免税
  - 全球所有来源国：自 2025-08-29 起全面暂停 $800 免税
  → 直邮小包与测款样品不再免关税，必须走 DDP 预付关税或正规报关清关，
    并在 mc-cost 利润模型中计入全额关税与报关手续费。

MFN 税率：0-20%（取决于 10 位 HTSUS Code）
Section 301（中国原产附加关税基准清单）：
  List 1 / List 2 / List 3: 25%  |  List 4a: 7.5%
  ⚠️ 重点加征品类（电动汽车 100%、半导体/太阳能电池/注射器 50%、电池/关键矿产/钢铝/PPE 25%）

确认方法：搜索 "USTR Section 301 exclusions {HS code}" 并核对最新对等关税公告与到期日
```

## 来源

- [1] 16 CFR Part 255 — Guides Concerning Use of Endorsements and Testimonials in Advertising — https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255
- [2] FTC: Disclosures 101 for Social Media Influencers — https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers
- [3] FTC: 16 CFR Part 465 Final Rule on Consumer Reviews and Testimonials — https://www.ftc.gov/legal-library/browse/federal-register-notices/16-cfr-part-465-trade-regulation-rule-use-consumer-reviews-testimonials-final-rule
- [4] FTC: Health Products Compliance Guidance (2022-12) — https://www.ftc.gov/news-events/news/press-releases/2022/12/ftc-announces-new-business-guidance-marketers-sellers-health-products
- [5] FTC: Green Guides — https://www.ftc.gov/legal-library/browse/rules/green-guides
- [6] 16 CFR Part 251 — Guide Concerning Use of the Word "Free" — https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-251
- [7] Crowell & Moring: Eighth Circuit Cancels Click-to-Cancel（二手来源）— https://www.crowell.com/en/insights/client-alerts/eighth-circuit-cancels-click-to-cancel
- [8] California AB 2863 bill text — https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2863
- [9] Federal Register: COPPA Rule Amendments (2025-04-22) — https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule
- [10] U.S. CBP: Suspension of Duty-Free De Minimis Treatment — https://www.cbp.gov/sites/default/files/2025-08/factsheet_suspension_of_duty-free_de_minimis_treatment.pdf
