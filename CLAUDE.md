# MarketerClaw Global — 跨境电商营销智能体

## 系统入口

**所有跨境营销请求必须先经过 mc-cmo。**

mc-cmo 是 MarketerClaw Global 的 CMO 核心引擎，负责：
- 判断请求是否合理，开口先算账
- 根据用户关系阶段（new/building/partner）调节干预强度
- 判断完成后交给 mc-dispatch 执行

用户也可以用 `/mc-xxx` 命令直接调用技能（mc-cmo 仍在场但不判断）。

### 技能调用顺序

```
用户请求 → mc-cmo（判断）→ mc-dispatch（路由+执行）→ 具体技能
```

### 用户画像

存储在 `memory/default/profile.md`，mc-cmo 每次对话开始加载、结束时更新。

---

## 项目定位

面向跨境电商卖家的 AI 营销工具。纯 Markdown skill 文件，运行在 Claude Code 中。

## 核心差异（vs 国内版 MarketerClaw）

- **平台**：Amazon、Shopee、TikTok Shop、Temu、独立站（非淘宝/京东/抖音）
- **内容**：多语言 Listing、A+ Content、Review 管理（非中文种草/直播）
- **投放**：Amazon PPC、Google Ads、Meta Ads（非抖音/小红书广告）
- **合规**：FDA/CE/FBA 政策/各国进口法规（非中国广告法）
- **数据**：BSR 排名、Review 增速、Keepa 价格追踪（非生意参谋/蝉妈妈）

## 技能清单（第一期）

| 技能 | 职责 |
|------|------|
| mc-cmo | CMO 核心引擎，判断+人格+用户认知 |
| mc-dispatch | 执行路由层，技能路由+参数传递 |
| mc-listing | Amazon Listing 优化（标题/Bullet Points/Search Terms/A+） |
| mc-compete | 跨境竞品策略分析 |
| mc-monitor | 跨境竞品数据监控 |
| mc-ads | 广告投放策略（Amazon PPC + Meta/Google + 防御性投放） |
| mc-selection | 跨境选品研究（品类机会 + 竞争格局 + 决策矩阵） |
| mc-cost | 利润与成本计算（FBA 费用 + 关税 + 定价 + 多平台对比） |
| mc-logistics | 跨境物流决策（头程选择 / FBA vs 3PL / 备货计划） |
| mc-sop | 运营效率工具箱（日常SOP / 复盘框架 / 团队分工 / 运营日历） |
| mc-insight | 目标市场文化洞察 |
| mc-compliance | 跨境合规审查（含税务 / HS Code / VAT） |
| mc-poster | 视觉素材设计（Amazon 主图/A+/广告素材/多市场适配） |

## 约定

- 所有技能输出直接在对话中展示，无 campaign 目录 / setup.mjs / finalize.mjs
- 数据收集使用工具探测协议（不绑定具体工具名称）
- 默认市场：Amazon US，用户可指定其他市场
- 货币单位跟随目标市场（美国用 $，欧洲用 €，日本用 ¥）
