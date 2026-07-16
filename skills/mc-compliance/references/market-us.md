# 市场规则 — 美国 (US)

> 由 mc-compliance 按需加载：目标市场含美国时读取本文件。

## 产品准入矩阵

| 产品类别 | 主管机构 | 必要认证/注册 | 关键要求 |
|----------|---------|--------------|---------|
| 食品 | FDA | FDA Food Facility Registration + Prior Notice | 进口前需提交 Prior Notice；标签符合 21 CFR Part 101 |
| 化妆品 | FDA | MoCRA 注册（2024 年起强制） | 成分须在 FDA VCRP 登记；禁用成分清单见 21 CFR 700 |
| 膳食补充剂 | FDA | FDA Facility Registration | 标签必须含 "This statement has not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease." |
| 消费电子 | FCC | FCC ID / SDoC | 所有辐射电子设备需 FCC 认证；蓝牙/WiFi 设备必须 FCC ID |
| 儿童产品 | CPSC | CPC (Children's Product Certificate) | 12 岁以下儿童产品需第三方 CPSC-accepted lab 检测；铅含量 ≤ 100ppm |
| 一般消费品 | CPSC | GCC (General Certificate of Conformity) | 成人产品需 GCC；基于合理测试计划 |
| 激光产品 | FDA CDRH | Accession Number | 激光产品（含激光笔）需向 FDA CDRH 报告 |
| 杀虫/消毒产品 | EPA | EPA Registration | 声称 "kills germs/bacteria" 的产品必须 EPA 注册 |

**实例：** 一个带蓝牙功能的儿童智能手表，同时需要 FCC ID（蓝牙辐射）+ CPC（儿童产品）+ 铅含量检测 + 小零件窒息风险评估。漏掉任何一项都可能被海关扣货或 Amazon 下架。

## Listing 文案 — FTC 规则细化

| FTC 规则 | 要求 | 违规后果 | 高风险短语 |
|----------|------|---------|-----------|
| Substantiation | 所有客观声明必须有"合理依据" | 罚款 + 禁令 | "clinically proven" "scientifically tested"（无检测报告时） |
| Endorsements | 付费评价/推荐必须披露关系 | 罚款最高 $50,120/次 | "as recommended by doctors"（无真实背书时） |
| Made in USA | 产品"全部或几乎全部"在美制造才能声称 | FTC 调查 + 罚款 | "Made in USA"（中国组装产品绝对不能用） |
| Comparative Ads | 对比必须公平、准确、可验证 | 竞争对手诉讼 | "better than [Brand X]"（无检测数据时） |
| Environmental | 环保声明需具体且有依据 (FTC Green Guides) | 罚款 + 强制更正 | "biodegradable" "carbon neutral"（无第三方认证） |
| Children's | COPPA: 不能收集 13 岁以下儿童数据 | 巨额罚款 | 面向儿童的产品页收集邮箱/生日 |

**中国卖家常踩的 FTC 坑：**
- "Best seller" — 除非你真的是 Amazon BSR #1 并有截图证据
- "Award-winning" — 必须有真实获奖记录
- "Doctor recommended" — 需要有真实医生背书文件
- 产品图片展示效果与实际不符（如过度 PS）

## 关税框架

```
总关税 = MFN 基础税率 + Section 301 附加税 + AD/CVD（如适用）

MFN 税率：0-20%（取决于 HS Code）
Section 301（中国产品附加关税，2026 年现行清单）：
  List 1: 25%（~818 个税号）
  List 2: 25%（~279 个税号）
  List 3: 25%（~5,745 个税号）
  List 4a: 7.5%（~2,500 个税号，部分被排除）

  ⚠️ 2025 年新增：
    电动汽车：100%
    半导体：50%
    电池/关键矿产：25%
    钢铝：25%
    太阳能电池：50%
    港口起重机：25%
    个人防护设备：25%
    注射器/针头：50%

确认方法：
  → 搜索 "USTR Section 301 exclusions {HS code}"
  → 检查是否有临时排除（exclusion）
  → 注意排除的到期日
```
