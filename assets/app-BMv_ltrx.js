import{a as e,i as t,n,s as r,t as i}from"./decorate-C7nvYDoO.js";var a=`/console/overview`;function o(e){if(!e||!e.startsWith(`/console/`)||/[\\\u0000-\u001f\u007f]/.test(e)||/%2f|%5c/i.test(e))return a;try{let t=new URL(e,`http://agentops.local`);return t.origin!==`http://agentops.local`||!t.pathname.startsWith(`/console/`)?a:t.pathname+t.search+t.hash}catch{return a}}function s(e){return e?`/login?next=`+encodeURIComponent(o(e)):`/login`}var c=[{label:`发现错误`,finding:`任务结束了，答复却错了`,detail:`技术执行成功；源订单存在，业务核验发现 Agent 答复“订单不存在”。`,action:`查看失败任务`,next:`/console/tasks/task-service-bad?workspace=ws-service`},{label:`定位原因`,finding:`问题落在一个工具参数上`,detail:`Trace 记录了带句号的订单号被原样传给 order_lookup，工具因此返回查无订单。`,action:`查看调用证据`,next:`/console/observe/trace-service-bad?workspace=ws-service`},{label:`形成修订`,finding:`让失败成为回归样本`,detail:`将失败 Trace 入集；候选 v1.9 已预置订单号规范化配置，等待同集验证。`,action:`查看回归数据集`,next:`/console/quality/dataset-service?workspace=ws-service`},{label:`验证改善`,finding:`用同一组问题比较版本`,detail:`基线结果与候选结果必须逐样本对照。当前候选尚未运行回归，不预设改善分数。`,action:`进入评测与优化`,next:`/console/quality?workspace=ws-service`},{label:`审批发布`,finding:`确认依据，再改变运行版本`,detail:`发布前核对评测、业务与安全审批；发布后以新任务核验业务结果。`,action:`查看发布流程`,next:`/console/releases/ver-service-19?workspace=ws-service`}],l=(e=!1)=>r`
 <a class="nh-brand" href="/" aria-label="AgentOps 官网首页">
  <img src=${e?`/brand/agentops-mark-white.svg`:`/brand/agentops-mark.svg`} alt="" width="39" height="39">
  <span><strong>AgentOps</strong><small>神州数码 · 企业 Agent 管理</small></span>
 </a>`,u=[{title:`客服质量改进`,summary:`从一次错误答复进入任务、Trace、数据集、评测与发布。`,path:`/console/tasks/task-service-bad?workspace=ws-service`,details:[`业务答复与技术执行分开核验`,`失败轨迹入集并对比候选版本`,`审批后再检查生产任务`]},{title:`AIOps 事件处置`,summary:`用 Team 汇集诊断证据，审批控制动作，再核验源回执与业务恢复。`,path:`/console/incidents/incident-ops?workspace=ws-operations&tour=aiops`,details:[`Team 分派与人工复核`,`控制申请、审批、发送分段记录`,`源回执和恢复效果分别确认`]},{title:`经营分析复核`,summary:`查看 60 条自建订单的历史测试证据，再进入独立练习副本。`,path:`/console/cases/business-analysis-60?workspace=ws-agentcore-practice`,details:[`历史记录与练习副本隔离`,`原始成果和复算结果并看`,`技术完成后仍核对业务结论`]},{title:`退款风险控制`,summary:`高风险写操作经过策略判定、人工审批与业务回执核验。`,path:`/console/tasks/task-refund?workspace=ws-service&tour=refund`,details:[`检查执行身份与动作权限`,`独立审批高风险动作`,`未知副作用时停止自动重放`]}],d=class extends e{constructor(...e){super(...e),this.stage=0}createRenderRoot(){return this}firstUpdated(){if(!(`IntersectionObserver`in window))return;let e=this.querySelector(`.nh`);e&&(this.revealObserver=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&(t.target.classList.add(`nh-visible`),this.revealObserver?.unobserve(t.target))},{rootMargin:`0px 0px -5% 0px`,threshold:.05}),e.querySelectorAll(`.nh-reveal`).forEach(e=>this.revealObserver?.observe(e)),e.classList.add(`nh-ready`))}disconnectedCallback(){this.revealObserver?.disconnect(),super.disconnectedCallback()}selectStage(e){this.stage=e}onStageKey(e,t){if(![`ArrowDown`,`ArrowUp`,`ArrowRight`,`ArrowLeft`,`Home`,`End`].includes(e.key))return;e.preventDefault();let n=e.key===`ArrowDown`||e.key===`ArrowRight`?1:-1,r=e.key===`Home`?0:e.key===`End`?c.length-1:(t+n+c.length)%c.length;this.selectStage(r),this.updateComplete.then(()=>this.querySelectorAll(`.nh-stage-tab`)[r]?.focus())}stageEvidence(){switch(this.stage){case 0:return r`
    <div class="nh-ui-results">
     <div class="nh-ui-result"><span>技术执行</span><strong class="nh-ui-success">成功</strong></div>
     <div class="nh-ui-result"><span>业务核验</span><strong class="nh-ui-danger">不一致</strong></div>
    </div>
    <div class="nh-ui-finding"><strong>源订单存在，Agent 答复不存在</strong><p>同一次任务保留技术结果和业务结论，避免把“执行成功”误判成业务正确。</p></div>
    <div class="nh-ui-context"><span>客服知识助手</span><span>运行版本 v1.8</span><span>订单 ORD-20240315-001</span></div>`;case 1:return r`
    <div class="nh-ui-trace">
     <div><span>识别订单号</span><strong>输入：ORD-20240315-001。</strong><em>正常</em></div>
     <div class="nh-ui-trace-fail"><span>调用 order_lookup</span><strong>order_id = “ORD-20240315-001。”</strong><em>查无订单</em></div>
     <div><span>生成答复</span><strong>“订单不存在”</strong><em>业务错误</em></div>
    </div>
    <p class="nh-ui-note">问题原因：工具参数未清除尾随句号。Trace 来自本地模拟案例。</p>`;case 2:return r`
    <div class="nh-ui-two-col">
     <div><span>回归数据集</span><strong>客服订单回归集</strong><p>现有正常订单样本。失败 Trace 等待复核入集。</p></div>
     <div><span>优化候选</span><strong>客服助手 v1.9</strong><p>先规范化订单号，再调用订单查询工具。</p></div>
    </div>
    <div class="nh-ui-change"><span>基线 v1.8</span><s>订单号原样传给查询工具</s><span>候选 v1.9</span><strong>先去掉尾随标点</strong></div>`;case 3:return r`
    <div class="nh-ui-eval">
     <div class="nh-ui-eval-head"><span>逐样本比较</span><span>相同数据集与评测器</span></div>
     <div><strong>正常订单查询</strong><span>基线已有记录</span><span>候选待评测</span></div>
     <div><strong>尾随标点订单</strong><span>待复核入集</span><span>候选待评测</span></div>
    </div>
    <p class="nh-ui-note">候选分数暂不展示。完成入集与回归运行后，才形成发布依据。</p>`;default:return r`
    <div class="nh-ui-approvals">
     <div><span>发布准入</span><strong>等待评测证据</strong></div>
     <div><span>业务审核</span><strong>待申请</strong></div>
     <div><span>安全复核</span><strong>待申请</strong></div>
     <div><span>生产运行版本</span><strong>仍为 v1.8</strong></div>
    </div>
    <p class="nh-ui-note">审批、发布、运行复测均在 Demo 中操作；首页不预设发布成功。</p>`}}heroProduct(){let e=c[this.stage];return r`
   <div class="nh-demo-stage">
    <div class="nh-demo-layout">
     <div class="nh-demo-index">
      <p class="nh-demo-index-title">一次客服答复错误</p>
      <div class="nh-stage-list" role="tablist" aria-label="查看修复流程">
       ${c.map((e,t)=>r`
        <button class="nh-stage-tab ${this.stage===t?`is-active`:``}" id=${`nh-stage-`+t}
         type="button" role="tab" aria-controls="nh-stage-panel"
         aria-selected=${this.stage===t?`true`:`false`} tabindex=${this.stage===t?`0`:`-1`}
         @click=${()=>this.selectStage(t)} @keydown=${e=>this.onStageKey(e,t)}>
         <span class="nh-stage-dot" aria-hidden="true"></span>${e.label}
        </button>`)}
      </div>
      <label class="nh-mobile-stage-select">选择流程阶段
       <select aria-label="选择修复流程阶段" .value=${String(this.stage)}
        @change=${e=>this.selectStage(Number(e.target.value))}>
        ${c.map((e,t)=>r`<option value=${t} ?selected=${t===this.stage}>${e.label}</option>`)}
       </select>
      </label>
      <p class="nh-demo-footnote">本地模拟案例 · 工作空间：客户服务</p>
     </div>
     <div class="nh-product-fragment" data-ui id="nh-stage-panel" role="tabpanel" aria-labelledby=${`nh-stage-`+this.stage}>
      <div class="nh-fragment-top"><span>AgentOps / 客户服务 / 生产</span><span>演示数据</span></div>
      <div class="nh-fragment-title"><div><p>订单 ORD-20240315-001</p><h3>${e.finding}</h3></div><span class="nh-fragment-state">${e.label}</span></div>
      <p class="nh-fragment-detail">${e.detail}</p>
      <div class="nh-evidence-swap" aria-live="polite">${this.stageEvidence()}</div>
      <div class="nh-fragment-actions"><span>Agent · 任务 · 版本关联</span><a href=${s(e.next)}>${e.action}<span aria-hidden="true"> ↗</span></a></div>
     </div>
    </div>
   </div>`}render(){return r`<div class="nh">
   <div class="nh-dark">
    <header class="nh-header">
     <div class="nh-frame nh-nav">
      ${l()}
      <nav class="nh-desktop-nav" aria-label="主导航">
       <a href="#capabilities">产品能力</a>
       <a href="#workflow">完整流程</a>
       <a href="#scenarios">企业场景</a>
       <a href="/product.html">产品手册</a>
       <a href="https://zhaca.github.io/solution/">解决方案</a>
      </nav>
      <a class="nh-primary nh-nav-action" href="/login">体验 Demo</a>
      <details class="nh-mobile-nav"><summary>菜单</summary><nav aria-label="手机导航">
       <a href="#capabilities">产品能力</a><a href="#workflow">完整流程</a>
       <a href="#scenarios">企业场景</a><a href="/product.html">产品手册</a>
       <a href="https://zhaca.github.io/solution/">解决方案</a><a href="/login">体验 Demo</a>
      </nav></details>
     </div>
    </header>
    <main>
     <section class="nh-hero" aria-labelledby="nh-main-title">
      <div class="nh-frame nh-hero-copy">
       <h1 id="nh-main-title">管理运行，<br>让改进有据可循</h1>
       <p>纳管已有 Agent 与运行资源，让任务证据进入评测，再把经过审批的版本带回生产。</p>
       <a class="nh-primary" href="/login">体验 Demo</a>
       <a class="nh-subtle-link" href="#workflow">了解产品流程</a>
      </div>
      <div class="nh-hero-stage nh-reveal">
       <div class="nh-frame nh-stage-frame">${this.heroProduct()}</div>
      </div>
     </section>
    </div>

    <section class="nh-section nh-system" id="capabilities" aria-labelledby="nh-system-title">
     <div class="nh-frame nh-system-layout">
      <div class="nh-system-intro nh-reveal"><h2 id="nh-system-title">管理运行，<br>持续改进</h2><p>围绕 Agent、任务和版本，把运行管理与持续优化连成同一条工作流。</p><a class="nh-text-action" href="/product.html">查看产品手册 <span aria-hidden="true">↗</span></a></div>
      <div class="nh-system-flow nh-reveal">
       <a href=${s(`/console/agents?workspace=ws-service`)}><strong>接入与运行</strong><span>登记 Agent，配置模型、工具和身份；管理任务与运行版本。</span><i aria-hidden="true">↗</i></a>
       <a href=${s(`/console/observe?workspace=ws-service`)}><strong>观测与优化</strong><span>从任务进入 Trace，复核失败证据，入集并比较候选结果。</span><i aria-hidden="true">↗</i></a>
       <a href=${s(`/console/releases?workspace=ws-service`)}><strong>审批与发布</strong><span>核对评测、业务和安全依据；发布后再验证生产结果。</span><i aria-hidden="true">↗</i></a>
      </div>
     </div>
    </section>

    <section class="nh-section nh-failure" aria-labelledby="nh-failure-title">
     <div class="nh-frame nh-failure-layout">
      <div class="nh-failure-copy nh-reveal">
       <h2 id="nh-failure-title">先看清<br>为什么答错</h2>
       <p>客服知识助手完成了任务，订单工具却收到带句号的参数。平台把技术执行、工具调用与业务核验放在同一条证据链上。</p>
       <a class="nh-text-action" href=${s(`/console/observe/trace-service-bad?workspace=ws-service`)}>打开完整 Trace <span aria-hidden="true">↗</span></a>
      </div>
      <div class="nh-trace-picture nh-reveal" data-ui>
       <div class="nh-picture-top"><strong>订单号异常 Trace</strong><span>完整采样 · 本地模拟</span></div>
       <div class="nh-trace-row"><span>用户输入</span><strong>查询订单 ORD-20240315-001。</strong></div>
       <div class="nh-trace-row nh-trace-row-hot"><span>工具调用</span><div><strong>order_lookup</strong><code>order_id: "ORD-20240315-001。"</code></div><em>查无订单</em></div>
       <div class="nh-trace-row"><span>业务核验</span><strong>源订单存在，答复不一致</strong></div>
       <p>一次错误，可回到输入、工具参数与业务结果逐项核对。</p>
      </div>
     </div>
    </section>

    <section class="nh-section nh-improvement" id="workflow" aria-labelledby="nh-improve-title">
     <div class="nh-frame">
      <div class="nh-improve-heading nh-reveal"><h2 id="nh-improve-title">修订需要证据</h2><p>失败轨迹经过复核进入回归集。候选版本改变订单号处理方式，再使用同一组样本比较结果。</p></div>
      <div class="nh-improve-layout">
       <div class="nh-version-picture nh-reveal" data-ui>
        <div class="nh-picture-top"><strong>客服助手版本比较</strong><span>v1.8 → v1.9 候选</span></div>
        <div class="nh-version-columns"><div><span>当前运行</span><strong>v1.8</strong><p>订单号原样传给查询工具</p></div><div><span>优化候选</span><strong>v1.9</strong><p>先规范化订单号，再查询</p></div></div>
        <div class="nh-version-bottom"><span>失败 Trace</span><span>复核入集</span><span>同集评测</span><span>候选回归</span></div>
       </div>
       <div class="nh-eval-picture nh-reveal" data-ui>
        <div class="nh-picture-top"><strong>逐样本评测</strong><span>候选待运行</span></div>
        <div class="nh-eval-rows"><div><span>样本</span><span>基线</span><span>候选</span></div><div><strong>正常订单查询</strong><span>已有记录</span><span>待评测</span></div><div><strong>尾随标点订单</strong><span>待入集</span><span>待评测</span></div></div>
        <p>只有同一数据集与评测器产生的结果，才用于判断版本改进。</p>
       </div>
      </div>
      <div class="nh-improve-link nh-reveal"><span>Agent、任务、Trace、样本和版本共享关联 ID。</span><a class="nh-text-action" href=${s(`/console/quality?workspace=ws-service`)}>进入评测与优化 <span aria-hidden="true">↗</span></a></div>
     </div>
    </section>

    <section class="nh-section nh-governance" aria-labelledby="nh-govern-title">
     <div class="nh-frame nh-govern-layout">
      <div class="nh-govern-copy nh-reveal"><h2 id="nh-govern-title">发布之前，<br>还有一轮确认</h2><p>评测改善形成候选。业务审核、安全复核与发布准入完成后，运行版本才改变；生产任务继续验证结果。</p><a class="nh-text-action" href=${s(`/console/releases/ver-service-19?workspace=ws-service`)}>查看发布中心 <span aria-hidden="true">↗</span></a></div>
      <div class="nh-govern-visuals">
       <div class="nh-approval-picture nh-reveal" data-ui><div class="nh-picture-top"><strong>版本发布准入</strong><span>客服助手 v1.9</span></div><div><span>评测结果</span><strong>等待候选回归</strong></div><div><span>业务审核</span><strong>待申请</strong></div><div><span>安全复核</span><strong>待申请</strong></div><div><span>当前生产</span><strong>v1.8 继续运行</strong></div></div>
       <div class="nh-team-picture nh-reveal" data-ui><div class="nh-picture-top"><strong>Team 协作同样可追溯</strong><span>智能运维</span></div><p>告警识别 → 根因诊断 → 受控处置</p><div><span>技术恢复</span><strong>未恢复</strong><span>业务恢复</span><strong>待确认</strong></div></div>
      </div>
     </div>
    </section>

    <section class="nh-section nh-scenarios" id="scenarios" aria-labelledby="nh-scenarios-title">
     <div class="nh-frame">
      <div class="nh-scenarios-head nh-reveal"><h2 id="nh-scenarios-title">带着业务问题进入平台</h2><p>从一个对象开始，沿证据走向评测、处置或审批。场景中的云连接与执行动作均按 Demo 标识为本地模拟。</p></div>
      <div class="nh-scenario-list">
       ${u.map((e,t)=>r`<details class="nh-scenario nh-reveal" ?open=${t===0}><summary><strong>${e.title}</strong><span>${e.summary}</span><span class="nh-scenario-toggle" aria-hidden="true"><span class="nh-toggle-open">展开</span><span class="nh-toggle-close">收起</span></span></summary><div class="nh-scenario-body"><ul>${e.details.map(e=>r`<li>${e}</li>`)}</ul><a href=${s(e.path)}>进入场景 <span aria-hidden="true">↗</span></a></div></details>`)}
      </div>
     </div>
    </section>

    <section class="nh-close" aria-labelledby="nh-close-title"><div class="nh-frame nh-close-layout"><div class="nh-reveal"><h2 id="nh-close-title">从一次任务，<br>看完整个平台</h2><p>在管理员演示环境中查看当前案例，按流程完成入集、评测、审批与复测。</p><a class="nh-primary" href=${s(`/console/tasks/task-service-bad?workspace=ws-service`)}>体验 Demo</a><a class="nh-subtle-link" href="/product.html">阅读产品手册</a></div><img class="nh-close-brand" src="/brand/agentops-lockup-white.svg" alt="" width="600" height="151" loading="lazy"></div></section>
   </main>
   <footer class="nh-footer"><div class="nh-frame"><span>神州数码 AgentOps · 企业 Agent 全生命周期管理</span><nav aria-label="页脚导航"><a href="/product.html">产品手册</a><a href="https://zhaca.github.io/solution/">解决方案</a><a href="/login">体验 Demo</a></nav><span>本地原型演示</span></div></footer>
  </div>`}};i([n()],d.prototype,`stage`,void 0),d=i([t(`agentops-site`)],d);var f=(e=!1)=>r`<span class="site-symbol ${e?`inverse`:``}"><img src=${e?`/brand/agentops-mark-white.svg`:`/brand/agentops-mark.svg`} alt="" width="40" height="40"></span>`,p=(e=!1)=>r`<a class="site-brand ${e?`on-dark`:``}" href="/" aria-label="AgentOps 官网首页">${f(e)}<span><strong>AgentOps</strong><small>神州数码 · 企业 Agent 管理</small></span></a>`,m=r`<span aria-hidden="true">↗</span>`,h=class extends e{createRenderRoot(){return this}render(){let e=o(new URLSearchParams(location.search).get(`next`));return r`<div class="login-layout"><aside class="login-story"><div class="login-story-inner">${p(!0)}<div class="login-story-content"><span class="section-index">ENTERPRISE AGENTOPS</span><h1>让 Agent 的每一次运行，<br>成为下一次改进的依据。</h1><p>统一资产、任务与版本。以证据驱动评测，以治理保障发布。</p><div class="login-flow"><span>接入</span><i></i><span>运行</span><i></i><span>观测</span><i></i><span>评测</span><i></i><span>发布</span></div></div><small>神州数码 AgentOps · 本地产品演示</small></div></aside><main class="login-main"><div class="login-top"><a href="/">← 返回官网</a><span>v2.2.0-beta.5</span></div><div class="login-panel"><span class="login-symbol">${f()}</span><span class="section-index">WELCOME TO AGENTOPS</span><h2>欢迎进入 AgentOps</h2><p>使用预置管理员身份，直接体验企业 Agent 全生命周期管理。</p><div class="login-persona"><div class="persona-avatar">管</div><div><strong>平台管理员</strong><span>演示全权限 · 当前工作空间保留</span></div><span aria-hidden="true">✓</span></div><a class="site-button blue login-submit" href=${e}>一键进入演示控制台 ${m}</a><p class="login-note">本地原型使用虚构业务数据；云连接、模型运行、控制与审批为本地模拟。经营分析历史另标注来源。</p></div><div class="login-bottom"><span>神州数码 AgentOps</span><span>ENTERPRISE AGENT LIFECYCLE</span></div></main></div>`}};h=i([t(`agentops-login`)],h);