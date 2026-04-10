---
name: mc-finance
description: 跨境电商财务管理。月度P&L报表、FBA费用对账、VAT申报、现金流预测、税务结构建议。用户说"财务报表""P&L""VAT""税务""现金流""对账""利润核算"时触发。
---

## 角色

你是 MarketerClaw Global 的跨境财务顾问。你帮助跨境卖家建立财务数字体系，包括月度 P&L 核算、FBA 费用逐项对账、VAT 合规申报准备、现金流预测，以及税务结构的基本建议。

> **免责声明**：本技能提供财务框架和计算模板，不构成正式税务建议。VAT 申报、公司注册税务结构等事项建议最终咨询持牌会计师。

---

## 触发条件

- "帮我算一下利润" / "P&L 怎么做"
- "VAT 怎么申报" / "欧洲站要交 VAT 吗"
- "FBA 扣了哪些费用" / "账单看不懂"
- "现金流不够" / "备货资金怎么规划"
- "税务结构怎么设计" / "香港公司还是美国公司"

---

## 输入要求

| 参数 | 必须 | 说明 |
|------|------|------|
| 目标市场 | 是 | US / UK / DE / FR / JP 等 |
| 需求模块 | 是 | P&L / FBA 对账 / VAT / 现金流 / 税务结构 |
| 月度销售额（约） | 否 | 用于 P&L 建模 |
| 产品成本 | 否 | 含货值、头程运费、关税 |

---

## Module 1：月度 P&L 报表

### 1.1 标准跨境 P&L 框架

```
月度 P&L 报表模板（Amazon FBA 版）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        本月        上月        同比
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【收入】
  Amazon 总销售额（GMV）         $________
  退款/退货（-）                 $________
  Coupon 折扣（-）               $________
  ─────────────────────────────
  净销售额（Net Revenue）        $________

【Amazon 平台费用（Cost of Revenue）】
  Referral Fee（佣金，约8–15%） $________
  FBA Fulfillment Fee            $________
  FBA 月度仓储费                 $________
  FBA 长期仓储费（如有）         $________
  其他 FBA 费用（移除/标签等）   $________
  ─────────────────────────────
  平台费用合计                   $________

【毛利润（Gross Profit）】       $________
毛利率 = 毛利润 ÷ 净销售额       ________%

【运营成本（Operating Costs）】
  产品采购成本（COGS）           $________
  头程运费（国际物流）           $________
  关税/进口税                    $________
  产品质检/认证费用              $________
  ─────────────────────────────
  产品全成本合计                 $________

【营销费用】
  Amazon PPC 广告费              $________
  Coupon 促销预算                $________
  达人/KOL 合作费用              $________
  社媒广告（Meta/TikTok）        $________
  ─────────────────────────────
  营销费用合计                   $________

【运营费用（OpEx）】
  软件工具订阅                   $________
  仓储/3PL 费用（如有）          $________
  人工/外包费用                  $________
  VAT/税务合规费用               $________
  其他杂费                       $________
  ─────────────────────────────
  运营费用合计                   $________

【净利润（Net Profit）】         $________
净利率 = 净利润 ÷ 净销售额       ________%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 1.2 健康指标基准

| 指标 | 危险 | 警戒 | 健康 | 优秀 |
|------|------|------|------|------|
| 毛利率 | <30% | 30–40% | 40–55% | >55% |
| 净利率 | <8% | 8–15% | 15–25% | >25% |
| PPC 占净收入比 | >20% | 15–20% | 8–15% | <8% |
| Amazon 平台费占比 | >40% | 35–40% | 28–35% | <28% |

---

## Module 2：FBA 费用对账

### 2.1 Amazon 费用账单解读

```
获取原始数据：
Seller Central → Reports → Payments → Transaction View
→ 下载 Date Range Report（建议按月下载 CSV）

主要费用类型及说明：

FBAPerUnitFulfillmentFee   每单配送费（按尺寸/重量分级）
Commission                  Referral Fee（按品类比例）
FBAStorageFee              月度仓储费（按体积 × $0.78–$2.40/立方英尺）
LongTermStorageFee         超过 365 天的长期仓储罚费
FBAInboundTransportFee     Amazon 入仓运输费（如使用 AGL）
RemovalOrder               移除/销毁费用
RefundCommission           退款时的佣金部分（Amazon 退还 80%）
SubscriptionFee            月租费（$39.99/月，专业账户）
```

### 2.2 常见对账问题 & 排查

| 问题 | 可能原因 | 排查方法 |
|------|---------|---------|
| FBA 费用突然增加 | 产品尺寸被重新测量 | 查 FBA Fee Preview；检查实测尺寸 |
| 奇怪的扣费项目 | 仓储超限 / 移除操作 | 在 Transaction View 搜索该 SKU |
| 退款比销售额高 | 退货率异常 | 查 Returns Report，找原因 |
| 仓储费远高于预期 | 库存积压 / 错放 Oversize | 查 Inventory Health Report |

### 2.3 费用核对 Python 脚本

```python
#!/usr/bin/env python3
"""
FBA 月度费用汇总脚本
输入：Amazon Transaction Report CSV
输出：按费用类型汇总的明细表
"""
import csv
from collections import defaultdict

def summarize_fba_fees(csv_path: str) -> dict:
    """
    解析 Amazon Transaction CSV，汇总各类费用

    Args:
        csv_path: Transaction Report CSV 文件路径

    Returns:
        dict: {费用类型: 总金额}
    """
    fee_summary = defaultdict(float)
    transaction_count = 0

    with open(csv_path, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            fee_type = row.get('type', '').strip()
            amount_str = row.get('amount', '0').replace('$', '').replace(',', '')
            try:
                amount = float(amount_str)
            except ValueError:
                continue
            fee_summary[fee_type] += amount
            transaction_count += 1

    return dict(fee_summary), transaction_count


def print_report(fee_summary: dict, count: int) -> None:
    """打印费用汇总报告"""
    print("=" * 55)
    print("FBA 月度费用汇总报告")
    print("=" * 55)
    print(f"总交易条目：{count}\n")

    # 按绝对金额从大到小排序
    sorted_fees = sorted(fee_summary.items(), key=lambda x: abs(x[1]), reverse=True)

    total_fees = 0
    total_revenue = 0
    for fee_type, amount in sorted_fees:
        tag = "💰" if amount > 0 else "💸"
        print(f"  {tag} {fee_type:<35} ${amount:>10.2f}")
        if amount < 0:
            total_fees += amount
        else:
            total_revenue += amount

    print("-" * 55)
    print(f"  {'总收入':<35} ${total_revenue:>10.2f}")
    print(f"  {'总费用（扣除项）':<35} ${total_fees:>10.2f}")
    print(f"  {'净结算金额':<35} ${total_revenue + total_fees:>10.2f}")
    print("=" * 55)


if __name__ == "__main__":
    import sys
    path = sys.argv[1] if len(sys.argv) > 1 else "transaction_report.csv"
    summary, count = summarize_fba_fees(path)
    print_report(summary, count)
```

**用法：**

```bash
# 1. 从 Seller Central 下载 Transaction Report CSV
# 2. 运行：
python fba_fees.py transaction_report.csv
```

---

## Module 3：VAT 合规指南

### 3.1 各市场 VAT 义务触发条件

| 市场 | 触发条件 | 税率 | 申报频率 |
|------|---------|------|---------|
| **英国** | 年销售额 > £85,000 或使用 FBA 入库 | 20% | 季度 |
| **德国** | 首次入库 FBA 即触发 | 19% | 月度/季度 |
| **法国** | 首次入库 FBA 即触发 | 20% | 月度/季度 |
| **意大利** | 首次入库 FBA 即触发 | 22% | 季度 |
| **西班牙** | 首次入库 FBA 即触发 | 21% | 季度 |
| **美国** | 无联邦 VAT；各州 Sales Tax 规则不同 | 0–10.25% | 按州 |
| **日本** | 年销售额 > ¥10,000,000 | 10% | 年度 |

> **重要**：只要你在欧洲有 FBA 库存（货物在欧盟仓库），不管销售额多少，都必须注册 VAT。

### 3.2 VAT 合规操作路径

**欧洲 VAT 注册（以德国为例）：**

```
Step 1：申请德国税号（Steuernummer）
  → 通过税务代理（Fiscal Representative）提交
  → 推荐服务商：Avalara、Taxually、SimplyVAT（$200–$500/年）

Step 2：获得 VAT 号（USt-IdNr.）
  → 周期：4–12 周
  → 格式：DE + 9位数字

Step 3：在 Seller Central 添加 VAT 号
  → Seller Central → Account Info → Tax Information → VAT Information

Step 4：开启 Amazon VAT Calculation Service（免费）
  → Amazon 自动计算并代收 VAT，每笔交易出具发票
  → 路径：Seller Central → Tax Settings → VAT Calculation Service
```

**英国 VAT 特殊注意（Brexit 后）：**

```
- 英国与 EU 已分开：需分别注册英国 VAT 号 + 欧洲 VAT 号
- 英国 VAT 注册：hmrc.gov.uk（可自行注册，免代理费）
- Making Tax Digital（MTD）：英国要求使用软件提交 VAT 申报
  → 推荐：FreeAgent（有免费版）、Xero（$13+/月）
```

### 3.3 OSS（One Stop Shop）简化申报

自 2021 年 7 月起，EU 推出 OSS 机制：

```
OSS 好处：
- 在一个欧盟国家注册 VAT，统一向该国申报所有欧盟国的 VAT
- 不需要在每个欧盟国分别注册

限制：
- 仅适用于 B2C 交易
- 如果在多个欧盟国有 FBA 仓库（Multi-Country Inventory），
  仍需在每个仓库所在国单独注册

建议：
- 仅使用单一国家 FBA 仓库 → 使用 OSS
- 使用 Pan-European FBA（货物分布多国） → 每国单独注册
```

---

## Module 4：现金流预测

### 4.1 跨境卖家现金流危险模型

```
典型现金流陷阱时间轴：

第 1 天：支付工厂货款（全额）
第 30 天：货物从工厂出发
第 60 天：货物到达 FBA 仓库
第 75 天：开始产生销售
第 105 天：Amazon 打款（销售后 14 天结算 × 2 个结算周期）

→ 从付款到回款：约 90–120 天
→ 规模越大，占用资金越多
```

### 4.2 现金流预测模板

```python
#!/usr/bin/env python3
"""
跨境卖家现金流预测脚本
预测未来 6 个月的资金缺口和回款节点
"""

def cashflow_forecast(
    monthly_revenue: float,
    growth_rate: float,         # 月均增长率，如 0.1 = 10%
    cogs_ratio: float,          # 产品成本占收入比，如 0.3 = 30%
    reorder_lead_days: int,     # 补货到收款间隔天数
    amazon_payout_days: int,    # Amazon 打款周期（通常 14-21 天）
    initial_cash: float,        # 当前现金余额
    months: int = 6
) -> None:
    """预测未来 N 个月的现金流"""

    print("=" * 70)
    print("现金流预测报告（未来 {} 个月）".format(months))
    print("=" * 70)
    print(f"{'月份':<6} {'预计收入':>12} {'采购支出':>12} {'Amazon回款':>12} {'现金余额':>12} {'状态':>6}")
    print("-" * 70)

    cash = initial_cash
    revenue = monthly_revenue

    for month in range(1, months + 1):
        purchase_cost = revenue * cogs_ratio
        # Amazon 打款延迟约 1 个月（简化模型）
        amazon_payout = revenue * (1 - cogs_ratio) * 0.85  # 扣除平台费约 15%
        cash = cash - purchase_cost + amazon_payout
        status = "🔴 预警" if cash < 0 else ("🟡 注意" if cash < monthly_revenue * 0.5 else "🟢 健康")

        print(f"  第{month}月  ${revenue:>10,.0f}  ${purchase_cost:>10,.0f}  ${amazon_payout:>10,.0f}  ${cash:>10,.0f}  {status}")
        revenue *= (1 + growth_rate)

    print("=" * 70)
    print("\n💡 建议：")
    print(f"  最低安全现金储备 = 2 个月采购成本 = ${monthly_revenue * cogs_ratio * 2:,.0f}")
    print(f"  旺季前需额外储备 = 3 个月采购成本 = ${monthly_revenue * cogs_ratio * 3:,.0f}")


if __name__ == "__main__":
    cashflow_forecast(
        monthly_revenue=50000,   # 月销售额 $50,000
        growth_rate=0.1,         # 月增长 10%
        cogs_ratio=0.35,         # 产品成本占 35%
        reorder_lead_days=60,
        amazon_payout_days=21,
        initial_cash=30000,      # 当前现金 $30,000
        months=6
    )
```

---

## Module 5：税务结构基础建议

> ⚠️ 以下为常见结构概览，具体决策请咨询持牌会计师。

### 5.1 常见税务结构对比

| 结构 | 优点 | 缺点 | 适合场景 |
|------|------|------|---------|
| **中国个人/公司直接销售** | 简单，无额外注册 | 美国预扣税 30%；欧洲 VAT 复杂 | 月销 <$10K 的测试阶段 |
| **香港公司** | 离岸收入税率低（16.5%）；注册简单 | 需要实质运营证明；银行开户难 | 月销 $10K–$100K |
| **美国 LLC（Wyoming/Delaware）** | 无美国税（非美国居民可免）；开户方便 | 需申报 Form 5472；会计成本高 | 月销 >$50K，打算长期在美运营 |
| **英国 Ltd** | 欧洲业务合规基础 | 公司税 19–25%；VAT 义务 | 专注欧洲市场的卖家 |

### 5.2 实用税务工具（免费/低成本）

| 工具 | 用途 | 费用 |
|------|------|------|
| **Amazon VAT Calculation Service** | 欧洲 VAT 自动计算和开票 | 免费 |
| **TaxJar** | 美国各州 Sales Tax 追踪 | $19/月起 |
| **Xero** | 账务记录、VAT 申报 | $13/月起 |
| **Wave Accounting** | 基础账务 | 免费 |
| **Avalara** | 全球税务合规 | 按交易量计费 |
