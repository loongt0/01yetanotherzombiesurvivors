# Guide 查询词素材与证据文档

> 更新日期：2026-09-09  
> 目标页面：`/guides/`、`/guides/achievements/`、`/guides/sanji-the-rabbit/` 及现有 Build / Upgrade 专题页  
> 研究方法参考：[生财有术课程《内页信息去哪找》](https://scys.com/activity/10092/course/182?chapterId=13033)  
> 原则：AI 只负责检索、整理和发现冲突，不补写没有来源的游戏机制。

## 1. 证据标准

每个查询词都按“用户问题 → Google 素材 → YouTube 实录 → 官方或平台资料 → 可写结论 → 未决问题”整理。关键事实尽量由两个独立来源交叉验证。

证据优先级如下：

1. **A级：官方与平台实时资料**——开发商公告、游戏官网、Steam 商店、Steam 实时成就页；可直接支持当前版本事实。
2. **B级：版本明确的实录或维护型 Wiki**——当前版本视频、wiki.gg、PlayStation / Xbox 成就页；可与 A 级资料交叉验证。
3. **C级：玩家攻略、讨论和旧视频**——适合找操作路线和问题，不单独证明当前机制；必须标日期和版本。
4. **D级：搜索摘要或无法追溯的转述**——只用于发现线索，不进入正文结论。

版本基线：游戏官网与 [Steam 商店](https://store.steampowered.com/app/2163330/Yet_Another_Zombie_Survivors/) 均确认游戏于 2026-08-20 结束 Early Access；[官方 1.0 公告](https://awesomegamesstudio.com/blog/yazs-full-release/) 是本轮所有 1.0 新内容的主来源。

## 2. 查询清洗与内容归并

`&#x20;` 是尾部空格的 HTML 编码，不属于关键词；`im boss here` 是对成就 **I'm The Boss** 的误记。近义词仍逐条收集素材，但相同搜索意图合并到同一页面，避免制造互相竞争的薄内容。

| # | 清洗后的查询词 | 用户真正要解决的问题 | 承接页 |
| --- | --- | --- | --- |
| 1 | `yet another zombie survivors guide` | 1.0 从哪里开始、核心循环、下一步看什么 | `/guides/` |
| 2 | `yet another zombie survivors achievement guide` | 如何规划成就、当前总数与版本差异 | `/guides/achievements/` |
| 3 | `yet another zombie survivors potato guide find sanji` | Potato 怎么拿、Sanji 在哪里、要几个 | `/guides/sanji-the-rabbit/` |
| 4 | `yet another zombie survivors im boss here achievement guide` | 正确成就名、哪张图、打哪个 Boss | `/guides/achievements/` |
| 5 | `yet another zombie survivors trophy guide` | 主机奖杯路线、是否可漏、与 Steam 成就是否相同 | `/guides/achievements/` |
| 6 | `yet another zombie survivors upgrade guide` | 局内升级、永久 Training、角色树分别怎么用 | `/guides/` 分流至现有升级页 |
| 7 | `yet another zombie survivors achievements guide` | #2 的复数查询变体 | `/guides/achievements/` |
| 8 | `yet another zombie survivors beginner guide` | 首轮、队伍、移动、升级、解锁顺序 | `/guides/` |
| 9 | `yet another zombie survivors build guide` | 如何选三人队、武器/能力、协同与模式适配 | `/builds/` |

## 3. 每个查询词的素材包

### 3.1 `yet another zombie survivors guide`

**要回答的问题**

- 游戏是单人控制还是联机？一队最多几人？
- 一局内做什么，局外又升级什么？
- 1.0 新增了哪些系统，旧攻略哪些部分会过期？
- 用户下一步应进入 Beginner、Build、Upgrade 还是 Achievement 页面？

**可用素材**

- A级：[游戏官网](https://yazs.awesomegamesstudio.com/)——从 1 名 Survivor 开局，经 SOS 招募至最多 3 人；武器与能力可形成 synergies；局外有永久升级。
- A级：[Steam 商店](https://store.steampowered.com/app/2163330/Yet_Another_Zombie_Survivors/)——“组建小队、选择升级、建立协同”的官方产品描述，且显示 229 个 Steam 成就。
- A级：[官方 1.0 公告](https://awesomegamesstudio.com/blog/yazs-full-release/)——Ranger、Bio Lab、Boss Rush、Camp、Missions、Friendship、Rank 5、21 个新物品、88 个新成就。
- B级：[1.0 当前玩法实录](https://www.youtube.com/watch?v=UGRgc1xQd1A)——视频中实际从 Ranger 开局，通过 SOS 选 Huntress / Mechanic，展示升级取舍、Boss 压力和局后 Training Yard；这是“一次实战样本”，不是最佳构筑证明。
- C级：[2023 New Player Guide](https://www.youtube.com/watch?v=825n_y5IQ7o)——转写覆盖成就菜单、Training Points、Leader 选择、局内武器升级和 reroll；只能支持稳定的界面概念，具体数值属于 Early Access 历史资料。
- SERP 结构参考：[Version 1.0 Guide](https://yetanotherzombiesurvivors.org/guide)、[当前 Guides Hub](https://yetanotherzombiesurvivors.wiki/guides/)。

**交叉验证后的可写结论**

- “单人控制一个最多 3 人的小队”“开局 1 人、SOS 再招 2 人”由游戏官网和当前实录共同支持。
- 1.0 内容清单以开发商公告为准，不用旧视频补数值。
- Guide Hub 应先解释核心循环，再把四类搜索意图送到专题页；不应在 Hub 里复制完整成就表或构筑表。

**不能写死**

- “最强开局角色”“固定 SOS 时间”“唯一升级顺序”均无官方依据。

### 3.2 `yet another zombie survivors achievement guide`

**要回答的问题**

- 当前到底有多少个平台成就？1.0 新增多少？
- Story、普通挑战、Torments 是不是同一套完成度？
- 老的 40 / 141 成就攻略还能不能用？
- 100% 应按什么方式组织，而不是逐条乱刷？

**可用素材**

- A级：[Steam 实时成就页](https://steamcommunity.com/stats/2163330/achievements/)——当前 229 个成就的名称、说明和动态完成率。
- A级：[官方 1.0 公告](https://awesomegamesstudio.com/blog/yazs-full-release/)——1.0 新增 88 个成就，其中 64 个 Story；28 个 Torments 明确不计入 100% 成就。
- C级：[Steam 社区 100% 指南](https://steamcommunity.com/sharedfiles/filedetails/?id=3006467623)——历史路线和隐藏成就线索；作者覆盖到 0.9，不能独立说明 1.0 新成就。
- C级：[2023 Achievement Guide](https://commonsensegamer.com/yet-another-zombie-survivors-achievement-guide/)——当时只有 40 个，恰好可作为“旧攻略已过期”的版本证据。
- SERP 结构参考：[当前 achievement guide](https://yetanother-zombie-survivors.wiki/en/guide/yet-another-zombie-survivors-achievement-guide)、[229 achievements hub](https://www.yetanotherzombie.gamewikibase.com/achievements/steam-achievements/)。

**交叉验证后的可写结论**

- 229 是当前 Steam 总数；88 是 1.0 新增数，两者不能混用。
- Torments 是可选挑战，并非 Steam 100% 的额外 28 项。
- 老攻略可保留路线价值，但每一条名称、奖励和条件都需回到 Steam / 当前客户端核对。

**不能写死**

- Steam 完成率会持续变化；不写成永久百分比。
- “最快 100% 顺序”缺乏统一证据，只能给分组规划框架。

### 3.3 `yet another zombie survivors potato guide find sanji`

**要回答的问题**

- Potato 从哪里来？当前要 1 个还是 3 个？
- Sanji 在哪张图、哪个位置、如何触发？
- Curly Little Potato 的当前奖励是什么？
- Power Overwhelming 是否前置条件？Sanji 不出现怎么办？

**可用素材**

- A级：[官方 1.0 公告](https://awesomegamesstudio.com/blog/yazs-full-release/)——Curly Little Potato 奖励由 Jade Amulet 改为 Easter Egg；并确认 Why’d You Pick That? 奖励由 Skip Rope 改为 Great Nade。
- A级：[Steam 实时成就页](https://steamcommunity.com/stats/2163330/achievements/) 与 B级 [Xbox 成就页](https://www.xboxachievements.com/game/yet-another-zombie-survivors/achievement/curly-little-potato.html)——当前目标文字均是 **Find Sanji the Rabbit**。
- B级：[wiki.gg 成就页](https://yetanotherzombie.wiki.gg/wiki/Achievements_%28Survivors%29)——Vile Wasteland 东北边缘中部房屋窗口、耳朵可见、持有 Potato 后靠近等待并出现爱心。
- C级：[2025 Steam 讨论](https://steamcommunity.com/app/2163330/discussions/0/3816292540669147857/)——后续玩家回复支持 Vile Wasteland、窗口附近等待、只需 1 个 Potato；同帖较早回复仍写 3 个，显示补丁前后冲突。
- C级：[2026 Potato Guide](https://grindnstrat.com/yet-another-zombie-survivors-potato-guide/)——1 个 Potato、Vile Wasteland 东/东北边缘、边界外房屋窗口、等待约 5–10 秒；作者把 Power Overwhelming 写成“believed prerequisite”，不是已证实条件。
- C级：[2023 Sanji 视频实录](https://www.youtube.com/watch?v=aMAWN0lbcvE)——转写在 0:37 明说旧路线要 3 个 Potato；2:09:21–2:09:45 实际拿到第三个后触发 Sanji。它证明旧机制存在，不能覆盖当前版本。

**交叉验证后的可写结论**

- 当前可操作路线：Vile Wasteland → 从物品箱拿到 1 个 Potato → 前往东至东北边界外的房屋窗口 → 靠近停留数秒，看到 Sanji / 爱心后解锁。
- “当前 1 个、旧版 3 个”得到当前 wiki / 2025 玩家复现 / 2026 攻略与 2023 视频的版本化解释，不再笼统写成完全未知。
- 当前奖励 Easter Egg 只引用官方公告。

**仍待验证**

- Potato 的精确掉率、固定出箱时间、最佳模式。
- **Power Overwhelming 必须先完成**目前没有官方或第二个可靠实录支撑，不写成硬前置。
- “Sanji 是开发者已故宠物兔”的故事只见二手攻略转述，本轮未找到官方原文，不进入事实正文。

### 3.4 `yet another zombie survivors im boss here achievement guide`

**要回答的问题**

- 用户是不是记错了成就名？
- 哪张地图、哪个 Boss？是否要求指定难度、角色或时间？

**可用素材**

- A级：[Steam 实时成就页](https://steamcommunity.com/stats/2163330/achievements/)——正确名称 **I'm The Boss**，条件是击败 Isolated City 的最终 Boss。
- B级：[PlayStationTrophies](https://www.playstationtrophies.org/game/yet-another-zombie-survivors/trophy/i-m-the-boss.html) 与 [XboxAchievements](https://www.xboxachievements.com/game/yet-another-zombie-survivors/achievement/i-m-the-boss.html)——两个平台独立列出同名、同条件。
- B级：[PS5 奖杯列表](https://trophieshunter.com/games/yet-another-zombie-survivors-ps5)——再次显示同样条件，并把它与其他地图最终 Boss 奖杯区分开。

**交叉验证后的可写结论**

- `im boss here` 是搜索误记，正文自然承接，但 H2 和 schema 使用正确名称 **I'm The Boss**。
- 唯一被三个平台同时确认的条件是“击败 Isolated City 的最终 Boss”。

**不能写死**

- 来源没有要求特定 Survivor、Build、难度或时间，不额外制造条件。

### 3.5 `yet another zombie survivors trophy guide`

**要回答的问题**

- 主机 Trophy 与 Steam Achievement 是否应该拆页？
- 奖杯数、白金耗时、难度、可遗漏项如何确认？

**可用素材**

- B级：[Knoef PS5 Trophy Guide](https://knoef.info/trophy-guides/ps5/yet-another-zombie-survivors-trophy-guide/)——给出主机 roadmap、1 白金 / 2 金 / 15 银 / 28 铜、25+ 小时、2.5/10、无可遗漏项；这些是攻略作者评估，不是官方保证。
- B级：[PlayStationTrophies 单项页](https://www.playstationtrophies.org/game/yet-another-zombie-survivors/trophy/i-m-the-boss.html) 与 [XboxAchievements 单项页](https://www.xboxachievements.com/game/yet-another-zombie-survivors/achievement/i-m-the-boss.html)——可逐项核对条件。
- A级：[Steam 实时成就页](https://steamcommunity.com/stats/2163330/achievements/)——PC 当前有 229 项，与 PlayStation 奖杯总数不是同一个计数口径。

**交叉验证后的可写结论**

- Trophy Guide 与 Achievement Guide 搜索意图高度重叠，但平台总数不同；同页增加平台口径说明即可，不建立重复页面。
- 单项条件可跨 Steam / PS / Xbox 核对；白金时间与难度必须标为第三方估计。

**不能写死**

- 不能把 Steam 的 229 直接写成 PlayStation Trophy 数，也不能把 25+ 小时当官方完成时长。

### 3.6 `yet another zombie survivors upgrade guide`

**要回答的问题**

- “Upgrade” 是局内武器/能力升级、通用 Training，还是 Survivor Skill Tree？
- Training Points 如何获得，能否重置？
- 1.0 的 Rank 5 与新节点改变了什么？
- 新手应该优先伤害、经济还是生存？

**可用素材**

- A级：[官方 1.0 公告](https://awesomegamesstudio.com/blog/yazs-full-release/)——每个 Survivor 增加 Rank 5、2 个 synergy nodes、2 个 passive-improvement nodes、1 个 team-wide passive node；Friendship 永久提高 Cash 与 Specialization 收益。
- B级：[wiki.gg Upgrades](https://yetanotherzombie.wiki.gg/wiki/Upgrades)——Training 是局外永久升级；点数来自金钱掉落和部分成就；可随时全额退点；账号等级 10 / 20 / 30 开放后续层。页面可能早于 1.0，具体树名和数值需回客户端核对。
- A级：[Steam 实时成就页](https://steamcommunity.com/stats/2163330/achievements/)——`Forget It` 的描述为重置任意 skill tree 中已投入的点数，并明确提示 free respecs，可独立支持“可重置”而非猜测。
- C级：[2023 New Player Guide](https://www.youtube.com/watch?v=825n_y5IQ7o)——0:00–5:05 展示 Training Points、层级门槛和作者偏好的 Endurance / Strength 开局；这是旧版个人建议，不当成 1.0 最优顺序。
- SERP 结构参考：[Upgrade Guide](https://yetanother-zombie-survivors.wiki/en/guide/yet-another-zombie-survivors-upgrade-guide)。

**交叉验证后的可写结论**

- 页面必须先把三种 Upgrade 分开，再分别链接 Weapon Upgrades、Skill Tree、General Points；否则查询意图混杂。
- Training / Skill Tree 可以实验和重置；1.0 的 Rank 5 与团队节点意味着旧版“升到四级结束”的视频已过期。
- 新手顺序应写成按目标选择的框架：卡生存补耐久，清怪慢补输出，资源不足补长期收益；不要冒充唯一最优点法。

**不能写死**

- `475 Training Points`、每个节点具体费用和所谓固定最佳路线只在第三方页面出现，本轮未获官方当前值确认。

### 3.7 `yet another zombie survivors achievements guide`

这是 3.2 的复数查询变体，素材与事实完全相同。页面正文应自然同时出现 `achievement guide` 和 `achievements guide`，但 canonical 仍指向同一个 `/guides/achievements/`。

**补充 SERP 素材**

- [2026 achievements 分类页](https://yetanotherzombiesurvivors.wiki/guides/achievements/) 按 Story、Map、Mode、Damage、Restriction、Potato 组织信息，说明用户期待的是分类和路线，而非没有筛选的 229 行清单。
- [当前独立完成规划](https://dq7reimagined.com/yet-another-zombie-survivors/achievements/) 把自然进度、限制挑战、地图/Boss 与隐藏互动分开；可借鉴信息架构，具体数字仍回 Steam / 官方公告确认。

**页面动作**

- 不新建复数 slug；在 Title、Description、首段和 FAQ 覆盖单复数表达。

### 3.8 `yet another zombie survivors beginner guide`

**要回答的问题**

- 第一次进游戏先做什么？如何避免首轮常见错误？
- 何时招募，如何理解 Leader、武器、能力、物品和永久进度？
- 哪些建议在 1.0 仍有证据，哪些只是老玩家偏好？

**可用素材**

- A级：[游戏官网](https://yazs.awesomegamesstudio.com/) 与 [Steam 商店](https://store.steampowered.com/app/2163330/Yet_Another_Zombie_Survivors/)——自动攻击、选择升级、最多 3 人、协同和永久成长的稳定基础。
- A级：[官方 1.0 公告](https://awesomegamesstudio.com/blog/yazs-full-release/)——当前解锁链：Ranger 在 Survival Level 175；Bio Lab 在 Dead Terminal Default 后；每张图 Hardcore 后解锁 Boss Rush；Boss Rush 约 10 分钟出现最终 Boss。
- B级：[当前 1.0 实录](https://www.youtube.com/watch?v=UGRgc1xQd1A)——可观察到作者绕过与目标不协同的分支、通过 SOS 完成队伍、局后查看 Training Yard；只用来说明决策过程。
- C级：[2023 New Player Guide](https://www.youtube.com/watch?v=825n_y5IQ7o)——成就菜单可作为早期目标提示、金钱转为 Training Points、Leader perk 影响开局；所有具体数值均标历史版本。
- C级：[2026 Beginner SERP 参考](https://yetanotherzombiesurvivorsguide.wiki/guides/beginner-guide/)——搜索用户还关心单人/联机误解、地图解锁、任务和补丁问题；其中“谁最强”等判断不能直接照抄。

**交叉验证后的可写结论**

- 开局路线写“先理解移动和自动攻击 → 建立一个清晰伤害/控制方向 → SOS 补齐缺失角色 → 用局后资源补短板 → 按官方解锁链进入新地图/模式”。
- 当前实录支持“有意识跳过不协同分支”，但不证明某一角色或属性永远最优。

**不能写死**

- 旧视频的 Leader 数值、单局 Training Points 数量、旧解锁条件都不进入 1.0 确定答案。

### 3.9 `yet another zombie survivors build guide`

**要回答的问题**

- Build 应以角色、三人队、伤害类型、武器/能力还是模式为中心？
- 什么叫 synergy，如何避免“看似强但彼此不配合”？
- 是否存在跨所有模式的唯一最强队伍？

**可用素材**

- A级：[游戏官网](https://yazs.awesomegamesstudio.com/)——最多 3 人，武器与能力可以组合成 synergies。
- A级：[官方 1.0 公告](https://awesomegamesstudio.com/blog/yazs-full-release/)——每名 Survivor 有 4 个 cross-survivor synergies；1.0 又增加 2 个 synergy nodes 和 team-wide passive node，证明 Build 应按队伍关系组织。
- C级：[Steam 社区 Synergy Guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3352985777)——提供具体跨角色互动索引；社区资料需与当前技能树核对。
- C级：[Steam 玩家队伍讨论](https://steamcommunity.com/app/2163330/discussions/0/599662719724277552/)——玩家报告 Kinetic Tank + SWAT + Medic、Cold Huntress + Medic + Engineer、Tank + Ghost Slashing 等可用组合；属于样本，不是排行榜证据。
- B级：[当前 1.0 实录](https://www.youtube.com/watch?v=UGRgc1xQd1A)——Ranger + Huntress + Mechanic 一次 run 展示强清群、Boss 压力与技能分支取舍；最终 Ranger 约 30 级且输出接近 Huntress，只能作为该次 run 的观察。
- C级：[2024 Elemental Build 视频](https://www.youtube.com/watch?v=d4LV4TBGn1A)——用于找元素构筑问题与画面证据，版本早于 1.0，不能复制数值。
- SERP 结构参考：[1.0 Build Guide](https://www.yazs.blog/builds)、[当前 Builds 页面](https://yet-another-zombie-survivors.wiki/guide/yet-another-zombie-survivors-builds)。

**交叉验证后的可写结论**

- Build 页先要求用户确定版本、模式、难度与目标，再选主输出、控制/生存和支援角色。
- 具体组合可以作为“可测试模板”，必须说明来源与场景，不能命名为全模式唯一 S 级。
- 正式构筑应把“队伍 → 跨角色 synergy → 武器/能力方向 → 物品 → 失败原因”连起来，而非只列三个角色名。

**不能写死**

- 社区讨论没有统一的最佳队；单次视频 DPS 结算也不能推导普遍强度。

## 4. 本轮实际页面优化口径

### `/guides/`

- 用 Guide / Beginner / Build / Upgrade / Achievement 五类意图做清晰分流。
- 只保留官方可证的核心循环与 1.0 解锁信息。
- 把 Sanji 当前路线更新为“1 Potato + Vile Wasteland 东/东北窗口”，同时保留版本提示。

### `/guides/achievements/`

- 区分 Steam 229 总数、1.0 新增 88、Story 新增 64、Torments 28 且不计成就。
- `im boss here` 纠正为 **I'm The Boss**，并用 Steam / PlayStation / Xbox 三方核对同一条件。
- 增加平台口径：Steam achievements 与 PlayStation trophies 不能直接用同一总数。

### `/guides/sanji-the-rabbit/`

- 当前路线写成可执行步骤，并明确 1 个 Potato 与旧视频 3 个 Potato 的版本差异。
- 仅把 Easter Egg 奖励写成官方确认；掉率、Power Overwhelming 前置与宠物兔故事仍标未确认。

## 5. 发布前事实核对清单

- [x] 每个查询词至少有一个官方/平台来源或明确说明为何没有。
- [x] 核心事实尽量由两个独立来源交叉验证。
- [x] 视频内容已读取转写，不只看标题与缩略图。
- [x] Early Access 视频与 1.0 资料分开标注。
- [x] 搜索结果里的“最佳”“最快”“必需”等结论未直接照抄。
- [x] 同意图关键词合并，不建立重复薄页。
- [ ] 上线后在真实 1.0 客户端复现 Sanji 路线并保存截图/录屏。
- [ ] 实测 Power Overwhelming 是否为必要前置。
- [ ] 在 Search Console 按 7 天窗口记录 9 个原始查询的展示、点击、CTR、平均排名与落地页。

## 6. 建议新增的自然子关键词

| 集群 | 可覆盖子关键词 |
| --- | --- |
| Guide / Beginner | `guide 1.0`、`guide for beginners`、`first run guide`、`progression guide`、`how to recruit survivors`、`SOS guide` |
| Achievement / Trophy | `229 achievements`、`100 percent guide`、`hidden achievements`、`Story achievements`、`trophy roadmap`、`missable trophies` |
| I'm The Boss | `I'm The Boss achievement`、`Isolated City final boss`、`how to get I'm The Boss`、`im boss here` |
| Sanji / Potato | `Sanji location`、`Curly Little Potato`、`how many potatoes`、`Sanji not appearing`、`Easter Egg reward`、`window in desert` |
| Upgrade | `Training Points`、`free respec`、`skill tree guide`、`Rank 5 upgrades`、`weapon upgrade path`、`General Points` |
| Build | `team build 1.0`、`three survivor team`、`synergy guide`、`beginner build`、`Boss Rush build`、`elemental build` |
