# AgentOps 平台使用流程与实操走查

> 新版功能闭环预览：v2.2.0-beta.1 使用5186；登记、接入、文本评测与人员设置的新入口见同目录《AgentOps-v2.2工作台预览走查.md》。下文原经营分析案例与5181稳定版链接保留。

> 适用版本：AgentOps Demo v2.2.0-beta.4。入口：[在线演示平台](https://zhaca.github.io/console/overview) →「经营分析真实案例」。默认管理员演示身份具有全部操作权限。云连接、模型、评测、部署、通知及练习执行均在本地模拟；“真实历史”仅指 2026-10-18 已采集的 AgentCore 云端执行记录，订单本身是自建测试数据。若 5181 未打开，双击 `交互原型/agentops-console/启动 AgentOps.command`。

## 1. 先弄清平台的使用逻辑

AgentOps 是企业管理已有 Agent 的运行与持续改进的平台。一个实际用户通常先回答四个问题：**谁在运行、为谁完成什么任务、结果对不对、出了问题如何改进并安全上线**。本平台以 Agent、任务、版本为关联对象；数据集、评测、审批、部署、成本和事件都要能回到这三个对象。

| 参考产品 | 擅长的环节 | 在本 Demo 中的入口 | 当前证据边界 |
|---|---|---|---|
| [阿里云 AgentCore](https://help.aliyun.com/zh/agentcore/agentcore-basic-concepts) | Workspace、Agent 资源与运行、Team 协作、任务评审 | Agent 中心、Team 协作、接入与资源、运行中心 | 经营分析历史有真实云端执行记录；新增运行操作仍为本地回放 |
| [阿里云 AgentLoop](https://help.aliyun.com/zh/agentloop/use-cases/i-overview-a-closed-loop-that-allows-agent-to-continuously-tune) | 运行证据、失败样本、数据集、评测、实验、经验沉淀 | 可观测中心、评测与优化、发布中心 | 经营分析六类样本评分是透明的本地规则回放，不是 AgentLoop 云端真实评分 |
| [Langfuse](https://langfuse.com/docs/evaluation/core-concepts) | Trace 与反馈关联、数据集、逐样本评测、版本实验 | 可观测中心、业务任务、评测与优化 | AgentCore 此次未采集单次 Trace/Span/Token；界面显示“未采集”，执行事件单独呈现 |

按企业实际流程使用：**确定业务目标与验收口径 → 接入 Agent 与资源权限 → 基线测试 → 审批发布 → 运行与观测 → 业务核验 → 错误入集 → 候选优化 → 同集评测与实验 → 再次审批发布 → 复测与核验**。Team 任务可插入运行阶段，事件、成本和治理始终横向贯穿。

案例的核心验收口径来自 [60 条自建订单 CSV](https://zhaca.github.io/cases/orders-60.csv)：`净销售额 = grossCny − refundCny`，退款率按退款金额除以原始金额。独立逐单复算为 **60 单、原始金额 16,140 元、退款 1,144 元、净额 14,996 元**，9 月 baseline 净额 7,673 元、10 月 current 净额 7,323 元。这里的 baseline/current 是**业务周期**，不是 Agent 基线版本／候选版本。

## 2. 先看 5 分钟真实历史

在[案例页](https://zhaca.github.io/console/cases/business-analysis-60)点击「查看历史」，顶部工作空间应变为“经营分析 · 真实历史”。源对象只读。建议按下表依次展开四次执行；若刷新后仍在历史空间，可直接使用任务深链。

| 顺序 | 操作与证据 | 应看到的结论 |
|---|---|---|
| 1 | 展开「单 Agent 经营分析」的原始输入、输出和事件；打开[来源任务](https://zhaca.github.io/console/tasks/history-task-single)，下载 `single-output.md` | 模型实际报告净额 **12,179** 元；独立复算 **14,996** 元，差 2,817 元。技术生成了报告，业务核验不通过 |
| 2 | 展开「缺字段异常输入」；下载 `invalid-tool-log.txt` | 输入缺 `refundCny`、`status`；工具报 `ModuleNotFoundError: pandas`。模型注意到缺字段，但附加的金额推断也不可靠 |
| 3 | 展开「补齐字段重新执行」；下载 `recovery-tool-log.txt` | 使用标准库 `csv` 后核心净额 **14,996** 元，但企业直销原始额增长与净额增长曾混淆，不能因为一次补齐成功就认定 Agent 已修好 |
| 4 | 展开「Team 协作分析与复核」；对照 Worker 初稿和人类验收的 v2 终稿 | 人工退回并修订后，数值表核对通过；源站已验收不等于全文完全正确，终稿仍有“会员服务费”和“官网所有指标最好”等残留表述 |

[可观测中心](https://zhaca.github.io/console/observe)可看到这些历史任务与采集范围，但**没有单次 Trace、Span、Token**；不能把源站事件时间点伪装成 Span。历史费用到[成本中心](https://zhaca.github.io/console/costs)看：2026-10-18 22:24 部分出账三项相加为 **¥0.525426387**。账户级百炼模型费 **¥0.04863432** 无法归属该 Workspace，未计入小计。费用不代表最终账单。

## 3. 用 20–30 分钟走练习闭环

返回[案例页](https://zhaca.github.io/console/cases/business-analysis-60)，点击「开始走查」。顶部工作空间变为“经营分析 · 练习副本”。所有新操作显示“本地回放／模拟”；练习重置只影响这个空间。

| 步骤 | 目的与页面 | 按钮／建议输入 | 预期状态与核对证据 | 不符合预期时 |
|---|---|---|---|---|
| 1 | 先确认业务问题：[失败任务](https://zhaca.github.io/console/tasks/case-task-single) | 看“结果证据”和来源 run ID `single` | 技术状态“成功”，业务结果“不一致”，原报告 12,179 vs 独立净额 14,996；没有虚构 Trace | 若页为空，先在案例页点「开始走查」，确认当前工作空间 |
| 2 | 将失败证据变成可回归样本：[案例页](https://zhaca.github.io/console/cases/business-analysis-60) | 「执行证据入集」 | [经营分析六类回归集](https://zhaca.github.io/console/quality/case-dataset-analysis)从 5 类变 6 类，版本从 v1 变 v2；新样本保留来源任务 ID | 历史没有 Trace，使用“执行证据入集”；重复点击不得重复导入 |
| 3 | 建候选：[练习 Agent](https://zhaca.github.io/console/agents/case-agent-analyst) | 「建立优化候选」；返回案例页查看候选入口 | 出现 v1.1 候选，运行中仍是 v1.0。创建候选本身不会改变生产运行 | 已有候选时直接打开，不必重复建立 |
| 4 | 明确可回放改进：[候选版本](https://zhaca.github.io/console/releases) | 打开候选 →「修改候选配置」→ 回放配置选“标准库精确累计＋字段与证据边界”；配置摘要写“逐行累计、缺字段停止计算、退款笔数校验、推断列为假设”；制品引用沿用 `local-replay:...`；确认 | 配置变更保存；先前候选评测证据会失效。任意文字修改不能自动获得改善分 | 若提示不可回放，请明确选择受支持的回放配置；此项是模拟能力边界 |
| 5 | 同集基线：[基线版本](https://zhaca.github.io/console/releases/case-ver-baseline) | 「运行回归评测」→ 数据集选“经营分析六类回归集”→ 评测器选“经营分析证据规则” | 基线低分，6 个样本的预期、实际和依据可查看；总分是样本分平均值 | 若数据集只有 5 类，先完成步骤 2；若评测失败，检查当前空间及模拟异常状态 |
| 6 | 同集候选：从[案例页](https://zhaca.github.io/console/cases/business-analysis-60)打开候选 | 「运行回归评测」选择**同一数据集和评测器** | 候选 6 个样本规则核对通过；对比数据集版本和评测器版本与基线相同。分数是本地规则回放结果 | 候选仍低分时检查步骤 4 的回放配置，配置变更后需重跑评测 |
| 7 | 证明改进：[候选版本](https://zhaca.github.io/console/releases) | 「比较基线版本」／案例页「运行同集实验」 | 实验逐样本列出前后分数，候选分不低于基线；引用同一数据集快照 | 提示缺基线时按步骤 5 重评；修改样本后基线与候选都要重评 |
| 8 | 进入发布门禁：候选详情 | 「提交发布申请」 | 发布记录出现“待业务审批”，包含评测、实验、运行制品与身份依赖 | 若提示依赖不全，检查[Agent 资源与身份](https://zhaca.github.io/console/agents/case-agent-analyst)；练习模型引用及身份已预置 |
| 9 | 两条审批：[发布中心](https://zhaca.github.io/console/releases) | 先打开“业务放行”审批→「处理审批」选批准，说明填“六类回归样本及净额核对通过”；再打开“安全复核”审批→批准，说明填“仅本地回放引用，未调用真实云端” | 两条审批分别批准后，发布状态“已批准·待发布”。管理员可演示全部职责，但审批和发布动作仍分别提交 | 审批驳回或到期时不可发布；需重新形成有效申请 |
| 10 | 发布新配置：发布记录或案例页 | 「发布到当前环境」／「发布获批版本」 | Agent 当前运行版本切至候选，原 v1.0 归档；运行与部署记录出现新引用，历史空间不变 | 若改过数据集、评测器或候选配置，旧证据失效，重做步骤 5–9 |
| 11 | 发布后复测：[练习 Agent](https://zhaca.github.io/console/agents/case-agent-analyst) | 「模拟运行」／案例页「本地复测」 | 新任务仅为本地规则回放，技术成功、业务待核验；结果应含 16,140、1,144、14,996 与两期净额 | 若仍是 12,179，检查当前运行版本是否已发布切换 |
| 12 | 业务确认：从案例页打开最新复测任务 | 「核验业务结果」选“业务已核验”，说明填“60 单独立复算 14,996 元，退款 6 笔，未推断成因” | 任务变“已核验”，核验记录与技术成功分开；错误净额无法标记通过 | 复测结果不一致应选“结果不一致”，进入问题处置而非强行通过 |

### Team 分支（可在主流程前后独立练习）

进入[经营分析 Team](https://zhaca.github.io/console/teams/case-team-analysis)，点「接收目标并分派」；目标填“核算 60 条订单并复核退款笔数”，业务对象填“2026 年 9–10 月自建测试订单”。打开新父任务及其子任务，依序在子任务点「执行或复核子任务」→“执行并提交”；此时可见“会员服务包 4 笔退款”的初稿错误。再选“退回修改”，说明“原 CSV 仅 ORD-09-027 与 ORD-10-023 两笔会员服务包退款”；再选“修订再提交”，然后“接受成果”。父任务技术完成后，还要在父任务点“核验业务结果”，说明“退款 6 笔，其中会员服务包 2 笔”。**成员执行完成、成果通过复核、业务结果确认是三种状态。** 这一分支为源站过程的本地回放，不是新云端执行，也不产生真实 Trace。

## 4. 走查验收清单

- [ ] 真实历史中的单 Agent 原报告仍写 12,179 元，且标记独立核验不通过。
- [ ] 60 单复算得到 16,140 − 1,144 = 14,996 元；两期 7,673／7,323 元；退款 6 笔、会员服务包 2 笔。
- [ ] 历史源站 Team “已验收”与独立核验分别显示，终稿文本残留未被自动抹去。
- [ ] 历史单次 Trace、Span、Token 显示“未采集”；原始事件、工具日志和报告可打开或下载。
- [ ] 历史账单三条合计 ¥0.525426387，账户级模型费单列且未相加。
- [ ] 练习入集后样本从 5 类变 6 类；重复入集不重复记录。
- [ ] 基线与候选基于相同数据集版本、评测器版本；逐样本得分与总分一致。
- [ ] 修改候选或样本后，旧发布证据失效；业务与安全审批必须逐条处理。
- [ ] 发布才改变运行版本；本地复测后还需独立业务核验。
- [ ] Team 可以退回、修订、接受并最终业务确认。
- [ ] 点击“仅重置练习”后练习恢复到失败基线，历史与其他工作空间不变；刷新、直接访问详情和浏览器前进后退仍可用。

## 5. 容易混淆的概念与边界

1. **60 条订单 ≠ 60 次 Agent 执行。** 本次源站采集 4 次执行；每次输入可引用同一组 60 条自建订单。
2. **业务周期 baseline/current ≠ Agent 版本 v1.0/v1.1。** 前者是 9 月／10 月订单分组，后者是 Agent 配置与发布阶段。
3. **成果验收 ≠ 版本发布。** Team 的人类评审只确认某次任务成果；候选版仍要评测、实验、两条审批并手动发布。
4. **技术成功 ≠ 业务正确。** 单 Agent 原报告正常生成，但净额错 2,817 元；任务应显示技术成功、业务不一致。
5. **补齐一次输入 ≠ 修复 Agent。** 恢复执行借助补字段和标准库算对核心数值，但不能证明所有未来输入或解释都可靠。
6. **执行事件 ≠ Trace/Span。** 该源站采集只有时间点、事件与工具日志，缺少结构化单次链路与 Token。
7. **账户费用 ≠ 工作空间费用。** 只有三条 AgentCore Workspace 账单可归属；百炼账户级模型费无法据此归因。
8. **固定规则高分 ≠ 真实模型质量提升。** 练习候选用本地确定性规则回放，旨在验证 AgentOps 流程；需要真实集成后才能证明线上效果。

## 6. 数据与参考来源

- 本地原始证据：`agentcore-clone/replay-bundle.json`、`agentcore-clone/orders-60.csv`、`agentcore-clone/evidence/runs/`、`agentcore-clone/evidence/billing/2026-10-18-snapshot.md`。Demo 提供 [JSON 下载](https://zhaca.github.io/cases/agentcore-replay.json) 与 [CSV 下载](https://zhaca.github.io/cases/orders-60.csv)。克隆项目中的测试数据与云端采集状态必须分开理解。
- [AgentCore 基本概念](https://help.aliyun.com/zh/agentcore/agentcore-basic-concepts)、[Team 任务](https://help.aliyun.com/zh/agentcore/using-team-tasks)、[AgentLoop 持续优化闭环](https://help.aliyun.com/zh/agentloop/use-cases/i-overview-a-closed-loop-that-allows-agent-to-continuously-tune)、[Langfuse 评测概念](https://langfuse.com/docs/evaluation/core-concepts)。参考的是流程组织方式，Demo 不声称与这些产品已实时集成。
- 客服订单号标点案例可在 Demo“客户服务”空间补充走查。其候选评分与修复效果是本地模拟，和本次 AgentCore 真实历史不能混作同一份云端证据。
