# 市场规则 — 欧盟 (EU)

> 由 mc-compliance 按需加载：目标市场含欧盟时读取本文件。

## 产品准入矩阵

| 产品类别 | 核心法规 | 必要认证/标识 | 关键要求 |
|----------|---------|-------------|---------|
| 几乎所有消费品 | 相关 EU 指令 | CE Marking | CE 标识是进入欧盟市场的"护照"；需自行或通过 NB 评估符合性 |
| 电子电气产品 | LVD + EMC | CE (LVD 2014/35/EU + EMC 2014/30/EU) | 低压指令 + 电磁兼容；需技术文档 + DoC 声明 |
| 含化学物质产品 | REACH | REACH 合规（SVHC ≤ 0.1%） | 高关注物质清单每年更新；卖家是 "Only Representative" 或需指定一个 |
| 电子电气产品 | RoHS | RoHS 2011/65/EU | 铅、汞、镉等 10 种有害物质限制 |
| 电子电气产品 | WEEE | WEEE 注册 + 标识 | 每个 EU 成员国单独注册；产品须印"打叉垃圾桶"标识 |
| 医疗器械 | EU MDR 2017/745 | CE (通过 Notified Body) | 2024 年起全面执行 MDR；Class I 以上需 NB 参与 |
| 玩具 | Toy Safety Directive 2009/48/EC | CE + EN 71 检测 | 机械物理 + 化学 + 可燃性检测 |
| 化妆品 | EU Cosmetics Regulation 1223/2009 | CPNP 通报 + PIF | 上市前须在 CPNP 系统通报；需完整 Product Information File |
| 食品 | General Food Law + 标签法规 | — | 标签须含过敏原信息（14 种）；营养成分表强制 |

**实例：** 一个 USB 充电的 LED 台灯出口欧盟，需要：CE（LVD + EMC）+ RoHS 检测报告 + REACH SVHC 声明 + WEEE 注册（每个目标国家）+ DoC 符合性声明 + 技术文档存档 10 年。成本预估：检测费 ¥8,000-15,000 + 各国 WEEE 注册费。

## Listing 文案 — 欧盟消费者保护指令

| 指令 | 要求 | 高风险场景 |
|------|------|-----------|
| Unfair Commercial Practices Directive 2005/29/EC | 禁止误导性和攻击性商业行为 | 虚假倒计时、虚构库存紧张、虚假好评 |
| Consumer Rights Directive 2011/83/EU | 14 天无理由退货权（远程销售） | Listing 中不能暗示"不退不换" |
| Price Indication Directive | 促销价须标注此前 30 天最低价 | "50% OFF"但原价是虚构的 |
| EU Omnibus Directive (2022) | 在线评价必须说明是否经过验证 | 精选好评展示而隐藏差评 |

## 关税框架

```
进口环节：
  关税 = CIF 价值 × 关税税率（0-12%，取决于 CN Code）
  进口 VAT = (CIF + 关税) × VAT 税率

各国 VAT 标准税率：
  德国: 19%  |  法国: 20%  |  意大利: 22%
  西班牙: 21%  |  荷兰: 21%  |  波兰: 23%
  英国: 20%（已脱欧，单独申报）

注意：部分品类有降低税率（如童装、食品、书籍）
```
