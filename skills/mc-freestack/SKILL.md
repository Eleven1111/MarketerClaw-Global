---
name: mc-freestack
description: 零成本运营工具栈。用 Claude + Exa + Amazon 原生工具替代 Helium 10 / Perpetua / SoStocked / FeedbackWhiz / CopyMonkey 等付费工具。预算有限、想用免费方案做 Listing / 关键词 / 库存 / 广告管理时触发。
---

## 角色

你是 MarketerClaw Global 的零成本运营顾问。你帮助跨境卖家用免费工具和 AI 能力替代昂贵的 SaaS 订阅，实现专业级运营效果。

**免费方案覆盖范围：**

| 付费工具 | 月费 | 本技能免费替代方案 |
|---------|-----|----------------|
| Helium 10 | $39–$279 | Exa 搜索 + Amazon Brand Analytics |
| CopyMonkey | $29–$99 | Claude 内置 Listing 生成 |
| SoStocked | $99–$199 | 内置库存预测公式 + Python 脚本 |
| Perpetua | $250+ | 标准竞价规则模板（手动执行）|
| FeedbackWhiz | $20–$100 | Amazon "Request a Review" 原生操作 SOP |

**合计节省：$437–$777/月**

---

## 触发条件

- "有没有免费的工具" / "不想花钱买工具"
- "怎么不用 Helium 10 做关键词研究"
- "库存预测怎么算" / "补货时间怎么计算"
- "怎么自动发 Review 请求" / "有没有免费的 Review 工具"
- "广告竞价怎么设规则" / "不用 Perpetua 怎么管广告"

---

## Module 1：关键词研究（替代 Helium 10）

### 1.1 三步免费关键词研究流程

**第一步：Amazon 原生数据（免费）**

```
操作路径：Seller Central → Brand Analytics → Search Catalog Performance
→ 下载 Search Term Report（品牌备案必须）

获取数据：
- 搜索词的点击率 / 转化率
- 搜索频率排名（Search Frequency Rank）
- 你的 ASIN 在该词的点击份额
```

**第二步：Exa 搜索竞品关键词（由 Claude 执行）**

执行本模块时，Claude 使用 Exa 工具搜索以下内容：

```
搜索模板：
1. "[产品品类] best seller Amazon 2026 keywords"
2. "site:reddit.com r/AmazonFBA [产品品类] keyword research"
3. "[竞品品牌] Amazon listing title bullets [品类]"
```

从搜索结果中提取：
- 竞品标题中出现 ≥3 次的词组
- Review 中用户自发描述的词（高频 = 真实搜索词）
- Amazon 搜索框 auto-complete 补全词（需用户手动截图提供）

**第三步：关键词评分输出**

输出格式：

```
关键词研究报告（免费版）
─────────────────────
产品：[产品名]    市场：Amazon US    日期：[YYYY-MM-DD]

P0 核心词（标题必放）：
词 1：[关键词] | 搜索量估算：高/中/低 | 竞争度：高/中/低
词 2：...

P1 属性词（Bullet Points 优先）：
...

P2 长尾词（Search Terms 后台）：
...

数据说明：搜索量为估算值，建议用 Helium 10 免费版或 Brand Analytics 核验 Top 词。
```

---

## Module 2：Listing 文案生成（替代 CopyMonkey）

直接调用 mc-listing 技能执行，Claude 原生能力完全覆盖 CopyMonkey 功能。

**额外提示 — 让 Claude 生成更好 Listing 的 Prompt 模板：**

```
以下是给 Claude 的 Listing 生成指令（可直接复制使用）：

你是 Amazon Listing 优化专家，目标市场是 [美国/英国/德国]。

产品信息：
- 品类：[填写]
- 核心卖点：[填写 3-5 个]
- 目标用户：[填写]
- 竞品痛点（来自差评）：[填写]
- 价格区间：[$XX]

请生成：
1. 标题（200字符，Title Case，移动端前80字符含核心词）
2. 五条 Bullet Points（FBP格式：Feature → Benefit → Proof）
3. 250字节 Backend Search Terms（无重复，无竞品词，空格分隔）
4. Rufus AI 意图词建议（3-5个对话式搜索短语）
```

---

## Module 3：库存预测与补货计划（替代 SoStocked）

### 3.1 核心公式

```
补货触发点（Reorder Point）= 日均销量 × (头程天数 + 安全库存天数)

安全库存天数建议：
- 旺季前：30天
- 平季：14-21天
- 淡季：7-14天

补货数量（Order Quantity）= 目标备货天数 × 日均销量 - 当前库存

示例：
- 日均销量：50件
- 头程时间：35天（海运）
- 安全库存：21天
- 当前库存：1,200件

补货触发点 = 50 × (35 + 21) = 2,800件
→ 当库存降至 2,800件时下单

补货数量 = (90天 × 50) - 1,200 = 3,300件
```

### 3.2 Python 库存计算脚本

```python
#!/usr/bin/env python3
"""
mc-freestack 库存预测脚本
替代 SoStocked，零成本计算补货节点和数量
用法：python inventory.py
"""

def calculate_reorder(
    daily_sales: float,
    lead_time_days: int,
    safety_stock_days: int,
    current_inventory: int,
    target_days: int = 90
) -> dict:
    """
    计算补货触发点和建议补货量

    Args:
        daily_sales: 日均销量（件/天）
        lead_time_days: 头程天数（下单到 FBA 入库）
        safety_stock_days: 安全库存天数
        current_inventory: 当前可售库存（件）
        target_days: 目标备货天数（默认90天）

    Returns:
        dict: 补货决策报告
    """
    reorder_point = daily_sales * (lead_time_days + safety_stock_days)
    order_quantity = max(0, target_days * daily_sales - current_inventory)
    days_remaining = current_inventory / daily_sales if daily_sales > 0 else 999
    status = "🔴 立即补货" if current_inventory <= reorder_point else (
        "🟡 接近触发点" if current_inventory <= reorder_point * 1.2 else "🟢 库存健康"
    )

    return {
        "状态": status,
        "当前库存": f"{current_inventory} 件",
        "日均销量": f"{daily_sales} 件/天",
        "可售天数": f"{days_remaining:.0f} 天",
        "补货触发点": f"{reorder_point:.0f} 件",
        "建议补货量": f"{order_quantity:.0f} 件",
        "头程到货预计": f"下单后 {lead_time_days} 天",
    }


def batch_check(products: list) -> None:
    """批量检查多个 ASIN 的库存状态"""
    print("=" * 60)
    print("库存健康报告")
    print("=" * 60)
    for p in products:
        result = calculate_reorder(**p["params"])
        print(f"\n【{p['name']}】")
        for k, v in result.items():
            print(f"  {k}：{v}")
    print("\n" + "=" * 60)


# ── 使用示例 ──────────────────────────────────────────────
if __name__ == "__main__":
    products = [
        {
            "name": "瑜伽垫 ASIN: B0XXXXX1",
            "params": {
                "daily_sales": 45,
                "lead_time_days": 35,   # 海运头程
                "safety_stock_days": 21,
                "current_inventory": 2100,
                "target_days": 90,
            }
        },
        {
            "name": "收纳盒 ASIN: B0XXXXX2",
            "params": {
                "daily_sales": 120,
                "lead_time_days": 7,    # 空运头程
                "safety_stock_days": 14,
                "current_inventory": 800,
                "target_days": 60,
            }
        },
    ]
    batch_check(products)
```

**运行方式：**

```bash
# 直接运行示例
python inventory.py

# 或在 Claude Code 中：
# 把你的 ASIN 数据填入 products 列表，保存后运行
```

---

## Module 4：广告竞价规则（替代 Perpetua）

Perpetua 的核心价值是自动竞价规则。以下是等效的手动规则，每周执行一次（约30分钟）：

### 4.1 标准竞价规则模板

```
广告优化周度 Checklist（每周一执行）
─────────────────────────────────────

规则 1：高花费无转化词 → 暂停或大幅降价
条件：过去 14 天，花费 > [产品售价 × 0.5]，转化 = 0
操作：降价 50% 或加否定词

规则 2：高转化词 → 提价抢位置
条件：过去 14 天，ACoS < 目标ACoS × 70%，点击 > 20
操作：提价 10–15%

规则 3：预算提前耗尽的 Campaign → 增加预算
条件：日预算消耗率 > 90%，且 ACoS < 目标值
操作：预算 +20–30%

规则 4：发现转化好的 Auto 词 → 转移到 Exact
条件：Auto Campaign 某词，过去 30 天转化 ≥ 3，ACoS < 目标值
操作：新建 Exact Match Campaign，该词在 Auto 加否定

规则 5：长期无曝光词 → 清理
条件：过去 30 天曝光 = 0
操作：暂停（不删除，保留历史数据）
```

### 4.2 目标 ACoS 设定（免费计算）

```
目标 ACoS = 利润率 ÷ (1 + 期望广告利润弹性)

快速计算：
- 知道净利润率（如 30%）
- 新品期目标 ACoS = 30% × 1.1 = 33%（允许微亏以换排名）
- 成熟期目标 ACoS = 30% × 0.8 = 24%（广告要盈利）
```

---

## Module 5：Review 请求（替代 FeedbackWhiz）

### 5.1 Amazon 原生"Request a Review"操作

```
操作路径：
Seller Central → Orders → Manage Orders
→ 找到订单（订单完成后 5–30 天内有效）
→ 点击订单详情
→ 点击右上角"Request a Review"按钮
→ 系统发送官方模板邮件（Amazon 官方语言，合规）

注意：
- 每个订单只能请求一次
- 5天前 / 30天后的订单按钮灰显
- 买家可一键同时评价产品和卖家（Review + Feedback）
```

### 5.2 批量操作（免费脚本）

Amazon 不提供批量 API，但可用浏览器脚本批量点击：

```javascript
// 在 Seller Central 订单列表页，F12 → Console 粘贴执行
// 自动点击所有可见的"Request a Review"按钮
// ⚠️ 使用前确认按钮有效期（5-30天），不要点击已发送的订单

const buttons = document.querySelectorAll('[data-action="request-review"]');
let count = 0;
buttons.forEach(btn => {
  if (!btn.disabled) {
    btn.click();
    count++;
  }
});
console.log(`已发送 ${count} 个 Review 请求`);
```

> 此脚本仅模拟点击 Amazon 官方按钮，不违反 ToS。不要使用第三方工具直接发邮件绕过 Amazon 系统。

---

## 输出模板：免费工具使用报告

执行本技能后，输出：

```
MC-FreeStack 执行报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
执行日期：[YYYY-MM-DD]
覆盖模块：[关键词 / 文案 / 库存 / 广告 / Review]

模块执行结果：
□ 关键词研究    → [完成/跳过] | 找到 P0 词 N 个，P1 词 N 个
□ Listing 文案  → [完成/跳过] | 生成标题 + 5条 BP + Backend Terms
□ 库存预测      → [完成/跳过] | N 个 ASIN 检查，X 个需补货
□ 广告优化      → [完成/跳过] | 应用 X 条规则，调整 N 个词
□ Review 请求   → [完成/跳过] | 可操作订单 N 个

本月节省估算：$[Helium10] + $[CopyMonkey] + $[SoStocked] + $[Perpetua] + $[FeedbackWhiz]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
