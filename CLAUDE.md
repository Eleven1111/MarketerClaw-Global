# MarketerClaw Global — 跨境电商营销智能体

## 系统入口

**所有跨境营销请求必须先经过 mc-cmo。**

mc-cmo 是 MarketerClaw Global 的 CMO 核心引擎（Hub），负责：
- 判断请求是否合理，开口先算账
- 根据用户关系阶段（new/building/partner）调节干预强度
- 检测危机模式（cash_crisis/listing_crisis/stock_crisis）
- 感知季节阶段，调整策略倾向
- 匹配预设工作流，串联多技能执行
- 判断完成后在同一技能内完成路由与执行

用户也可以用 `/mc-xxx` 命令直接调用技能（mc-cmo 仍在场但不判断）。

### 技能调用顺序

```
用户请求 → mc-cmo（判断 + 危机检测 + 工作流匹配 + 路由 + 执行）→ 具体技能
```

### Brand Brain 数据总线

所有技能共享 `brand-brain/` 目录作为数据层：

```
brand-brain/
├── profile.md         用户画像（阶段/偏好/盲区）
├── brand-master.md    品牌定位/声音/价值主张
├── products.md        产品矩阵（SKU/ASIN/价格/利润率/阶段）
├── audience.md        目标客群画像
├── competitors.md     竞品情报（mc-compete 写入）
├── metrics.md         核心指标基线（mc-dashboard 写入）
├── offers.md          当前促销策略
├── learnings.jsonl    结构化学习日志（所有技能 append）
└── review-loop.md     内容产出双环状态（mc-cmo 工作流维护）
```

技能按需加载 Brand Brain 文件，不全量加载。mc-cmo 在交接时指定建议加载的文件列表。

### Brand Brain 写入纪律

- **工作区锚定**：`brand-brain/` 的解析顺序为 `MC_WORKSPACE` 环境变量 → 当前工作目录。
  技能安装在全局目录（如 `~/.claude/skills/`）时，品牌数据仍写入用户工作区，禁止写入安装目录。
- **并发写保护**：工作流并行阶段（如大促备战三技能并行、双环双审并行）中，各技能不直接写
  brand-brain 文件；由 mc-cmo 在合并点串行统一写入。`learnings.jsonl` 只追加不重写；
  `review-loop.md` 仅由 mc-cmo 维护。

---

## 项目定位

面向跨境电商卖家的 AI 营销工具。纯 Markdown skill 文件，运行在 Claude Code 中。

## 核心差异（vs 国内版 MarketerClaw）

- **平台**：Amazon、Shopee、TikTok Shop、Temu、独立站（非淘宝/京东/抖音）
- **内容**：多语言 Listing、A+ Content、Review 管理（非中文种草/直播）
- **投放**：Amazon PPC、Google Ads、Meta Ads（非抖音/小红书广告）
- **合规**：FDA/CE/FBA 政策/各国进口法规（非中国广告法）
- **数据**：BSR 排名、Review 增速、Keepa 价格追踪（非生意参谋/蝉妈妈）

## 技能清单

### 系统层
| 技能 | 职责 |
|------|------|
| mc-cmo | Hub — CMO 核心引擎 + 路由/执行 + 工作流编排 + 危机/季节感知 |

### 诊断与数据层
| 技能 | 职责 |
|------|------|
| mc-diagnose | 全链路诊断引擎（8 维诊断 + ICE 优先级） |
| mc-dashboard | 数据看板与健康体检（三层看板 + 异常预警） |

### 产品与供应链层
| 技能 | 职责 |
|------|------|
| mc-selection | 跨境选品研究（品类机会 + 竞争格局 + 决策矩阵） |
| mc-cost | 利润与成本计算（FBA 费用 + 关税 + 定价 + 多平台对比） |
| mc-logistics | 跨境物流决策（头程选择 / FBA vs 3PL / 备货计划） |
| mc-launch | 新品上市引擎（四阶段框架 + PMF 评估 + 冷启动预算） |

### 流量与转化层
| 技能 | 职责 |
|------|------|
| mc-listing | Amazon Listing 优化（标题/Bullets/Search Terms/A+） |
| mc-ads | 广告投放策略（Amazon PPC + Meta/Google + 防御性投放） |
| mc-convert | 转化率优化引擎（Amazon CVR + 独立站 CRO + A/B 测试） |
| mc-creative | 创意生产（视觉素材 + 广告测试矩阵 + 视频脚本 + 多平台适配） |

### 品牌与用户层
| 技能 | 职责 |
|------|------|
| mc-brand | 品牌备案与知识产权保护 |
| mc-social | 社媒运营（TikTok/IG/Pinterest + 达人筛选 + UGC 飞轮） |
| mc-retain | 用户留存与 LTV（RFM 分层 + S&S 优化 + 召回体系） |
| mc-compete | 竞品分析（6 模块 + 对标学习 + 自动写入 Brand Brain） |
| mc-monitor | 竞品数据监控 |
| mc-insight | 目标市场文化洞察 |

### 运营与合规层
| 技能 | 职责 |
|------|------|
| mc-compliance | 跨境合规审查（含税务 / HS Code / VAT）— 双环合规硬门禁 |
| mc-grade | 内容产出质量评审 evaluator（双环质量软门，独立于生产者） |
| mc-sop | 运营效率工具箱（日常SOP / 复盘 / 团队分工 / 运营日历） |
| mc-finance | 跨境财务管理（月度P&L / FBA对账 / VAT / 现金流） |
| mc-freestack | 零成本运营工具栈 |

## 全局规范

### 三级降级策略

所有技能在执行前检查数据充分度：

| 级别 | 触发条件 | 执行策略 |
|------|---------|---------|
| Level 1 | 部分数据缺失 | 基于已有数据推进 + 标注假设 + 标记待验证项 |
| Level 2 | 极少数据 | 保守方案 + 标注待验证项 + 列出需要收集的数据 |
| Level 3 | 零数据 + 无搜索工具 | 行业基准参考 + 明确告知数据缺失 + 不编造数据 |

### 成本标签

所有技能的每条可执行建议必须附带：
```
💰 预算：$X    ⏱ 见效：X 周    👤 执行：卖家自己 / VA / 服务商
```

### Learnings 日志

所有技能执行完成后，向 `brand-brain/learnings.jsonl` 追加一条记录：
```jsonl
{"date":"2026-05-02","skill":"mc-ads","finding":"蓝牙耳机品类 CPC 从 $1.2 涨至 $1.5","action":"降低 Broad 竞价 15%","impact":"ACOS 预计降 5-8%","confidence":"medium"}
```

复盘类回写（mc-sop Module 3.4）额外带 `"status"` 字段：已被数据验证的洞察记
`"status":"verified"`，被证伪的假设记 `"status":"falsified"`（finding 中写明证据数据点）。
无执行数据的预测性判断不回写；追加前做语义去重，与既有条目重复的跳过。

## 约定

- 所有技能输出直接在对话中展示，无 campaign 目录 / setup.mjs / finalize.mjs
- 数据收集使用工具探测协议（不绑定具体工具名称）
- 默认市场：Amazon US，用户可指定其他市场
- 货币单位跟随目标市场（美国用 $，欧洲用 €，日本用 ¥）
