# 合规审查 — AI 生成内容（AIGC）

> last_verified: 2026-09-25 · 复核周期 180 天
> 由 mc-compliance 按需加载：审查对象含 AI 生成或合成的图片、视频、音频、虚拟模特/主播或创意 prompt（如 `mc-creative` 产出）时，**无论目标市场一律加载本文件**。审查参考，不构成法律意见。

## 主要法域法规要求

| 检查项 | 风险 | 说明 | 依据 |
|--------|------|------|------|
| **欧盟 AI 透明度** | 高 | 2026-08-02 起，构成 deepfake 的合成图像/音视频须披露为人工生成或操纵；生成式 AI 系统输出须嵌入机器可读隐式标记 | EU AI Act 第 50 条 [1] |
| **美国虚假证言与 AI 评价** | 高 | 联邦层面虽无统一 AI 水印法，但 AI 生成的虚假评价、虚构体验证言明确违法；以"真实用户"呈现的证言须来自真实用户且反映一般体验 | FTC `16 CFR 465` [2]；`16 CFR 255.2` [3] |
| **英国虚假评价与误导** | 高 | 严禁生成、委托或发布 AI 虚构买家评价或隐瞒合成误导功效演示 | DMCC Act 2024 附表 20 [4] |

## 跨境主流平台规则

| 平台 | 关键规则 | 依据 |
|------|---------|------|
| **Amazon** | 产品主图与详情图必须**如实反映实物形态、材质、尺寸比例与实际性能**：允许 AI 辅助生成生活场景背景，但**严禁**用 AI 改写产品本体质感、放大视觉效果、生成虚假测试画面或伪造"真实买家/医生"证言，否则触发图片误导抑制或投诉下架 | Amazon Product Image & Community Guidelines [5] |
| **YouTube** | 可能被误认为真实人物、地点、事件的合成或篡改内容，上传时须在 "Altered content" 选择 Yes；明显不真实的动画/特效或仅用 AI 写脚本等辅助生产可免标 | YouTube 帮助中心 [6] |
| **TikTok / TikTok Shop** | 展示逼真人物/场景的 AI 内容须开启 `AI-generated` 标签；禁止用 AI 生成私人人物形象，或未经授权用公众人物形象/声音做商业背书 | TikTok Creator Academy [7] |
| **Meta (Facebook / Instagram)** | 检测到行业标准 AI 信号或用户自述时加 `"AI info"` 标签；用 AI 生成或显著修改的广告会在"关于此广告"中标示 | Meta Transparency Center [8] |

## 审查动作（`mc-compliance` 据此出 finding）

- 逼真 AI 生成视频/图像/虚拟主播未按目标平台或欧盟 AI Act 第 50 条加注披露标识 → `severity: block`，写明须添加的标签位置。
- 用 AI 生成的"真实用户"头像/视频做开箱种草、使用体验或证言 → 属虚构证言，`severity: block`（违反 FTC `16 CFR 465/255`、EU UCPD、UK DMCC Act 2024）。
- 用 AI 生成或修饰 Skincare/减重/耐用性 **Before/After** 对比图或材质微距实测图 → 属虚构使用效果，`severity: block`；仅基于真实、可复现测试的实拍对比方可使用。
- 用 AI 生成公众人物形象/声音做商业背书，或在产品图上合成虚假认证徽章/奖项/畸形文字 → `severity: block`。

## 来源

- [1] European Commission: Quick facts — transparency rules for AI systems — https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems
- [2] FTC: 16 CFR Part 465 Final Rule — https://www.ftc.gov/legal-library/browse/federal-register-notices/16-cfr-part-465-trade-regulation-rule-use-consumer-reviews-testimonials-final-rule
- [3] 16 CFR Part 255 (eCFR) — https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255
- [4] UK DMCC Act 2024 — https://www.legislation.gov.uk/ukpga/2024/13/contents
- [5] Amazon Community Guidelines — https://www.amazon.com/gp/help/customer/display.html?nodeId=GLHXEX85MENUE4XF
- [6] YouTube Help: Disclosing use of altered or synthetic content — https://support.google.com/youtube/answer/14328491
- [7] TikTok Creator Academy: AI-generated content label — https://www.tiktok.com/creator-academy/en/article/ai-generated-content-label
- [8] Meta Transparency Center: Labeling AI content — https://transparency.meta.com/governance/tracking-impact/labeling-ai-content/
