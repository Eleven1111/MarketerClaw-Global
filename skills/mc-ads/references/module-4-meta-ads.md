> 由 mc-ads 按需加载：见 SKILL.md「模块加载表」。

## Module 4: Meta Ads 策略（品牌建设 + 引流）

> 适用场景：有独立站的跨境卖家，目标是品牌建设和站外引流。Amazon-only 卖家通常不需要本模块。

### 4.1 Campaign 架构（三阶段漏斗）

```
Awareness（认知层）— 目标：触达新用户
├── 兴趣受众（Interest-based）
├── Lookalike 1-3%（基于已购客户）
└── 素材：品牌故事视频、产品使用场景、UGC 内容
    竞价目标：CPM，预算占比 20-30%

Consideration（考虑层）— 目标：引导互动
├── 互动过广告/主页的用户
├── 网站访客（Pixel 数据）
├── 视频观看 50%+ 的用户
└── 素材：产品对比、用户评价、开箱视频
    竞价目标：Landing Page Views / Add to Cart，预算占比 30-40%

Conversion（转化层）— 目标：促成购买
├── 加购未购买用户（7天内）
├── 网站访客（3天内）
├── 已购客户（交叉销售/复购）
└── 素材：限时优惠、库存紧迫、好评截图
    竞价目标：Purchase，预算占比 30-40%
```

### 4.2 受众构建

| 受众类型 | 构建方式 | 适用阶段 | 预期 CPM |
|---------|---------|---------|---------|
| Broad（宽泛） | 仅限年龄 + 地区，让算法学习 | 预算充足时测试 | $8-15 |
| Interest（兴趣） | 品类相关兴趣标签组合 | Awareness | $10-20 |
| Lookalike 1% | 基于已购客户种子 | Consideration | $12-25 |
| Lookalike 3-5% | 扩大覆盖 | Awareness 扩量 | $8-18 |
| Custom Audience | 网站访客、邮件列表、互动用户 | Retargeting | $15-30 |
| 已购客户 | 客户列表上传 | 排除 + 交叉销售 | $10-20 |

种子受众最低要求：1,000 人（建议 5,000+ 效果更好）。

### 4.3 素材策略

跨境产品素材制作优先级：

| 优先级 | 素材类型 | 制作成本 | 效果排名 |
|--------|---------|---------|---------|
| P0 | UGC 风格短视频（15-30s） | 低 | 最高 |
| P1 | 产品使用场景图（Lifestyle） | 中 | 高 |
| P2 | 产品对比图/信息图 | 低 | 中高 |
| P3 | 开箱/评测视频（60s+） | 中 | 中 |
| P4 | 品牌故事视频 | 高 | 中（长期价值） |

素材轮换规则：

- 每个 Ad Set 放 3-5 个素材
- CTR 下降 20% 或 CPM 上升 30% → 素材疲劳，替换
- 每 2 周上新 1-2 个素材
- 表现好的素材做微调变体（换文案/换 CTA/换前 3 秒）

### 4.4 预算分配框架

月预算 < $3,000（测试期）：

```
Conversion（转化层）: 60%  — 优先验证产品是否跑得通
Consideration（考虑层）: 30%  — 积累 Pixel 数据
Awareness（认知层）: 10%  — 少量测试
```

月预算 $3,000-$10,000（增长期）：

```
Conversion: 40%
Consideration: 35%
Awareness: 25%
```

月预算 > $10,000（规模化）：

```
Conversion: 30%
Consideration: 30%
Awareness: 40%  — 持续扩大漏斗顶部
```

### 4.5 Pixel & 转化追踪

上线前必须完成：

1. **Facebook Pixel** 安装并验证（用 Facebook Pixel Helper 插件检查）
2. **Conversions API (CAPI)** 服务端追踪（弥补 iOS 14+ 数据丢失）
3. **标准事件配置**：ViewContent → AddToCart → InitiateCheckout → Purchase
4. **域名验证** + **聚合事件衡量** (AEM) 配置
5. **UTM 参数**：所有广告链接加 `utm_source=facebook&utm_medium=paid&utm_campaign={campaign_name}`

> 没有完善的转化追踪，Meta Ads 的算法优化等于失明。这是所有投放的前提。
