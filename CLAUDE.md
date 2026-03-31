# MarketerClaw Global — 跨境电商营销智能体

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
| mc-dispatch | 统一入口，意图路由 |
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

## 约定

- 所有技能输出直接在对话中展示，无 campaign 目录 / setup.mjs / finalize.mjs
- 数据收集使用工具探测协议（不绑定具体工具名称）
- 默认市场：Amazon US，用户可指定其他市场
- 货币单位跟随目标市场（美国用 $，欧洲用 €，日本用 ¥）
