# MarketerClaw Global

AI 驱动的跨境电商营销智能体。

## 技能

| 技能 | 说明 | 输入 |
|------|------|------|
| `mc-listing` | Amazon Listing 优化 | ASIN / 产品信息 + 目标市场 |
| `mc-compete` | 跨境竞品策略分析 | 你的品牌 + 竞品品牌 + 平台 |
| `mc-monitor` | 跨境竞品数据监控 | 品类 + 平台（Amazon/Shopee/TikTok Shop） |
| `mc-ads` | 广告投放策略（含防御性投放） | 产品 + 预算 + 目标市场 |
| `mc-selection` | 跨境选品研究 | 品类方向 + 目标市场 |
| `mc-cost` | 利润与成本计算 | 产品 + 目标市场 + 供应商报价 |
| `mc-logistics` | 跨境物流决策 | 产品 + 发货地 + 目的地 |
| `mc-sop` | 运营效率工具箱 | 团队规模 + 运营平台 |
| `mc-insight` | 目标市场文化洞察 | 品类 + 目标市场（US/EU/JP/SEA） |
| `mc-compliance` | 跨境合规审查（含税务/HS码） | 文案/Listing + 目标市场 |

## 快速开始

在 Claude Code 中打开本项目，直接说：

- "帮我优化这个 Amazon Listing"
- "蓝牙耳机在 Amazon US 上谁卖得最好"
- "分析一下 Anker 和 Baseus 的竞争策略"
- "我要投 Amazon PPC，预算 $5000/月，怎么分配"
- "进入日本市场要注意什么"
- "帮我审一下这个 Listing 的合规风险"
- "硅胶厨具这个品类能不能做"
- "这个产品从中国发到美国能赚多少钱"
- "品牌词被竞品抢了怎么办"
- "这个产品的 HS Code 是什么，关税多少"
- "从中国发到美国走海运还是空运"
- "3 个人的团队怎么安排日常运营"

## 支持平台

- Amazon（US/EU/JP/AU/CA/MX）
- Shopee（SEA 六国）
- TikTok Shop（US/UK/SEA）
- Temu
- 独立站（Shopify/自建站）

## 完整版

完整版 MarketerClaw 包含 22+ 个技能，覆盖从品牌策略到数据复盘的全链路营销自动化。

## 技能矩阵

```
选品研究 (mc-selection)
  ↓
成本计算 (mc-cost) → 定价策略
  ↓
Listing 优化 (mc-listing) ← 文化洞察 (mc-insight)
  ↓
广告投放 (mc-ads) → 防御性投放
  ↓
竞品分析 (mc-compete) ↔ 数据监控 (mc-monitor)
  ↓
合规审查 (mc-compliance) → 税务/HS码
  ↓
物流决策 (mc-logistics)
  ↓
运营效率 (mc-sop) → 日常SOP / 复盘 / 团队管理
```
