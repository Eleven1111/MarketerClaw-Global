> 由 mc-ads 按需加载：见 SKILL.md「模块加载表」。

## Module 2: Amazon DSP & Sponsored Display

### DSP vs SD 决策矩阵

| 维度 | Sponsored Display (SD) | Amazon DSP |
|------|----------------------|------------|
| 最低预算 | 无门槛 | $10,000/月起（自助）或 $35,000/月（托管） |
| 定向能力 | 基础（ASIN、品类、浏览再营销） | 高级（人口统计、购买行为、生活方式） |
| 投放位置 | Amazon 站内为主 | Amazon 站内 + 站外（Twitch、IMDB 等） |
| 适用场景 | 所有卖家，基础再营销 | 品牌卖家，大预算，品牌建设 |
| 建议阶段 | Growth 起即可使用 | Mature 阶段，月广告预算 > $15K |

### SD 策略（所有卖家适用）

```
SD Retargeting（再营销）
├── 浏览过本 ASIN 未购买 → 竞价中等，频率 7 天
├── 浏览过竞品 ASIN → 竞价中高，截流
└── 浏览过本品类 → 竞价低，扩量

SD Audience（受众定向）
├── In-market 人群 → 近期有品类购买意图
└── Lifestyle 人群 → 长期兴趣标签
```

### DSP 再营销漏斗

仅在满足以下条件时建议启用 DSP：

- 月广告预算 > $15,000
- 品牌注册（Brand Registry）已完成
- 有至少 3 个月的 SP/SD 数据积累

DSP 漏斗设计：

```
Awareness（认知）    → In-market + Lifestyle 人群，CPM 竞价
  ↓
Consideration（考虑）→ 浏览过品类页/竞品页的用户，CPC 竞价
  ↓
Purchase（购买）     → 加购未购买 / 浏览本 ASIN 未购买，CPC 竞价
  ↓
Loyalty（忠诚）      → 已购买用户，复购/交叉销售，CPM 竞价
```

ROI 预期：DSP 的直接 ROAS 通常低于 SP（2-4x vs 4-8x），但其价值在于扩大漏斗顶部。评估 DSP 效果看 **New-to-Brand 比例**和 **总销量增长**，不单看 DSP ROAS。
