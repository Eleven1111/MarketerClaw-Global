> 由 mc-ads 按需加载：见 SKILL.md「模块加载表」。

## Module 3: Google Ads 策略（独立站 / 品牌词）

> 适用场景：有独立站的跨境卖家，或需要品牌词防御的 Amazon 卖家。

### 3.1 Search Campaign — 品牌词防御

目的：防止竞品抢占你的品牌词搜索结果。

```
Campaign: Brand Defense
├── Ad Group: Brand Exact
│   ├── [品牌名]
│   ├── [品牌名] + official
│   └── [品牌名] + website
├── Ad Group: Brand + Product
│   ├── [品牌名] + [产品名]
│   └── [品牌名] + [品类]
└── 竞价策略: Target Impression Share (95%+, 页首)
```

品牌词 CPC 通常很低（$0.1-0.5），ROAS 极高（10-20x），是性价比最高的广告类型。

### 3.2 Shopping Campaign

适用于有独立站且产品 SKU > 5 的卖家：

```
Campaign 结构:
├── High Priority (低竞价) → 品类通用词流量
├── Medium Priority (中竞价) → 长尾词 + 产品属性词
└── Low Priority (高竞价) → 品牌词 + 精准产品词

Merchant Center 要求:
- Product Feed 字段完整（title, description, price, image, GTIN）
- 标题含核心关键词，前 70 字符最关键
- 图片白底，无水印，符合 Google 规范
```

### 3.3 Performance Max (PMax)

适用条件：

- 已有至少 30 天 Shopping / Search 数据
- 月预算 > $3,000（PMax 需要数据量才能学习）
- 已安装 Google Tag 且转化追踪正常

PMax 设置要点：

| 要素 | 建议 |
|------|------|
| Asset Group | 按产品线分组，每组 5+ 图片、5+ 标题、5+ 描述 |
| Audience Signal | 导入已有客户列表 + 自定义意向受众 |
| URL 扩展 | 初期关闭（Final URL expansion = Off），避免流量分散 |
| 排除词 | 通过账户级否定关键词排除品牌词（让 Brand Campaign 处理） |
| 学习期 | 前 2 周不调整，让算法学习 |

### 3.4 跨境关键词策略

| 关键词类型 | 示例 | 竞价 | 优先级 |
|-----------|------|------|--------|
| 品牌词 | `[your brand]` | 低 CPC, 高出价 | 最高 |
| 产品词 | `bamboo cutting board` | 中 CPC | 高 |
| 品类词 | `kitchen accessories` | 高 CPC | 中（需控预算） |
| 竞品词 | `[competitor] alternative` | 中高 CPC | 低（测试性投放） |
| 长尾问题词 | `best cutting board for meat` | 低 CPC | 高（转化率高） |

### 3.5 Landing Page 对齐

广告效果 50% 取决于落地页。检查项：

- 落地页标题与广告文案关键词一致（Quality Score 直接影响）
- 首屏有明确 CTA（Add to Cart / Buy Now）
- 加载速度 < 3 秒（用 PageSpeed Insights 检测）
- 移动端适配（Google 优先索引移动端）
- 有社会证明（评价、销量、媒体报道）
