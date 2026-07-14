"use client";

import { useEffect, useState } from "react";

type PlaceholderProps = {
  label: string;
  detail: string;
  className?: string;
};

type FeatureIconName =
  | "calendar" | "package" | "wallet" | "users" | "database" | "chart" | "grid" | "play" | "shield"
  | "cart" | "scale" | "coins" | "message" | "cube";

function FeatureIcon({ name }: { name: FeatureIconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.8 };
  const shapes: Record<FeatureIconName, React.ReactNode> = {
    calendar: <><rect {...common} x="3" y="5" width="18" height="16" rx="2" /><path {...common} d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
    package: <><path {...common} d="m21 8-9-5-9 5 9 5 9-5Z" /><path {...common} d="M3 8v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5" /></>,
    wallet: <><path {...common} d="M4 6h16v14H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14" /><path {...common} d="M20 10h-5a2 2 0 0 0 0 4h5M17 12h.01" /></>,
    users: <><path {...common} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    database: <><ellipse {...common} cx="12" cy="5" rx="8" ry="3" /><path {...common} d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></>,
    chart: <><path {...common} d="M3 3v18h18" /><path {...common} d="m7 16 4-5 3 3 5-7" /></>,
    grid: <><rect {...common} x="3" y="3" width="7" height="7" rx="1" /><rect {...common} x="14" y="3" width="7" height="7" rx="1" /><rect {...common} x="3" y="14" width="7" height="7" rx="1" /><rect {...common} x="14" y="14" width="7" height="7" rx="1" /></>,
    play: <><path {...common} d="m7 3 14 9-14 9V3Z" /><path {...common} d="M3 5v14" /></>,
    shield: <><path {...common} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path {...common} d="m9 12 2 2 4-4" /></>,
    cart: <><circle {...common} cx="9" cy="20" r="1" /><circle {...common} cx="19" cy="20" r="1" /><path {...common} d="M3 4h2l2.5 11h11L21 8H6" /></>,
    scale: <><path {...common} d="M12 3v18M5 7h14M4 7l-3 6h6L4 7ZM20 7l-3 6h6l-3-6ZM5 21h14" /></>,
    coins: <><circle {...common} cx="9" cy="9" r="6" /><path {...common} d="M15 9a6 6 0 0 1-6 6M15 5a6 6 0 0 1 6 6 6 6 0 0 1-6 6M9 6v6M7 8h4M7 10h4" /></>,
    message: <><path {...common} d="M21 11.5a8 8 0 0 1-8.5 8 8.5 8.5 0 0 1-4.2-1.1L3 20l1.6-4A8 8 0 1 1 21 11.5Z" /><path {...common} d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    cube: <><path {...common} d="m12 2 9 5-9 5-9-5 9-5Z" /><path {...common} d="m3 7 9 5 9-5M3 7v10l9 5 9-5V7M12 12v10" /></>,
  };
  return <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true">{shapes[name]}</svg>;
}

const metrics = [
  { label: "采购响应", value: "26h", note: "智能聚合询价全流程跟踪，响应时间缩短。", icon: "/assets/icons/metrics/procurement-response-transparent.png" },
  { label: "成本降低", value: "2.1%", note: "智能比价与供应商推荐，项目采购成本更透明。", icon: "/assets/icons/metrics/cost-reduction-transparent.png" },
  { label: "核算周期", value: "月→天", note: "纪月度核算升级为日级追踪，利润实时可见。", icon: "/assets/icons/metrics/settlement-cycle-transparent.png" },
  { label: "BIM 预测", value: "40%", note: "材料计划准确率提升，减少停工待料与库存积压。", icon: "/assets/icons/metrics/bim-forecast-transparent.png" },
];

const painPoints = [
  { title: "进度黑箱", icon: "calendar" as FeatureIconName, text: "计划与现场脱节，进度滞后无法及时预警。" },
  { title: "材料黑箱", icon: "package" as FeatureIconName, text: "材料需求不清，浪费严重，库存与现场不同步。" },
  { title: "成本黑箱", icon: "wallet" as FeatureIconName, text: "成本核算滞后，超支风险难以及时发现。" },
  { title: "协同黑箱", icon: "users" as FeatureIconName, text: "跨部门信息不通，决策链长，执行效率低下。" },
];

const layers = [
  { title: "数据矩阵层", icon: "database" as FeatureIconName, text: "项目、合同、材料、设备、财务与供应链数据统一治理。" },
  { title: "智能分析层", icon: "chart" as FeatureIconName, text: "异常识别、趋势预测、成本预警和风险评估持续运行。" },
  { title: "Agent 编排层", icon: "grid" as FeatureIconName, text: "按需分配、调用能力，分派最合适的 Agent 执行任务。" },
  { title: "业务执行层", icon: "play" as FeatureIconName, text: "采购、财务、过磅、BIM、协同流程一体化闭环。" },
  { title: "审计管控层", icon: "shield" as FeatureIconName, text: "全链路可追溯、实时合规、复盘与经营管理升级。" },
];

const modules = [
  { title: "智慧采购", icon: "cart" as FeatureIconName, bullets: ["需求识别与计划生成", "智能比价与供应商推荐", "在线询比价与合同管理"] },
  { title: "过磅防作弊", icon: "scale" as FeatureIconName, bullets: ["AI 识别异常过磅行为", "车辆识别与称重联动", "数据留痕与证据固化"] },
  { title: "智能财务", icon: "coins" as FeatureIconName, bullets: ["合同、票据、付款自动归集", "成本分摊与利润监控", "利润风险预警与分析"] },
  { title: "企业微信 AI Agent", icon: "message" as FeatureIconName, bullets: ["审批、通知、预警一站触达", "项目群智能应答", "移动端协同与反馈闭环"] },
  { title: "BIM 预测材料需求", icon: "cube" as FeatureIconName, bullets: ["基于 BIM 模型预测需求", "材料计划与库存联动", "缺料预警与协作方提醒"] },
];

const footerColumns = [
  { title: "产品", links: ["产品定位", "多 Agent 架构", "核心能力", "版本与定价"] },
  { title: "核心模块", links: ["智慧采购", "过磅防作弊", "智能财务", "企业微信 AI Agent", "BIM 预测材料需求"] },
  { title: "场景", links: ["采购管理", "现场管理", "成本管理", "财务管理", "协同办公"] },
  { title: "资源", links: ["白皮书", "客户案例", "帮助中心", "更新日志"] },
];

function Placeholder({ label, detail, className = "" }: PlaceholderProps) {
  return (
    <div className={`asset-placeholder ${className}`} role="img" aria-label={`${label}，${detail}`}>
      <span className="placeholder-mark" aria-hidden="true">✦</span>
      <strong>{label}</strong>
      <small>{detail}</small>
    </div>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Pmagic AI 首页">
      <span className="brand-symbol" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span>Pmagic AI</span>
    </a>
  );
}

function AgentCoreGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "agent-core agent-core-compact" : "agent-core"}>
      <img
        className="agent-core-video"
        src="/assets/agent-core-loop-v2.webp"
        aria-label="基于参考图制作的多 Agent 彩色智能中枢动效"
      />
    </div>
  );
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <header className="site-header" id="top">
        <div className="nav-shell">
          <Brand />
          <button
            className="menu-button"
            type="button"
            aria-label="切换导航菜单"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
          <nav id="primary-navigation" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="主要导航">
            <a href="#positioning" onClick={() => setMenuOpen(false)}>产品定位</a>
            <a href="#architecture" onClick={() => setMenuOpen(false)}>多 Agent 架构</a>
            <a href="#capabilities" onClick={() => setMenuOpen(false)}>核心能力</a>
            <a href="#case-study" onClick={() => setMenuOpen(false)}>客户案例</a>
          </nav>
          <a className="button button-primary nav-cta" href="#contact">预约演示</a>
        </div>
      </header>

      <main id="main">
        <section className="hero section-shell" id="positioning">
          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span aria-hidden="true">✦</span> 建工 AI 管理矩阵 OS</div>
            <h1>建工领域专属的<br /><span>超级工程大脑</span></h1>
            <p>以多 Agent 协同架构，打通采购、过磅、BIM、财务与企业微信协同，让工程管理从人工经验驱动升级为数据智能驱动。</p>
            <div className="button-row">
              <a className="button button-primary" href="#contact">预约演示 <span aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="#architecture">查看多 Agent 架构 <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="hero-visual" data-reveal>
            <AgentCoreGraphic />
            <span className="agent-chip chip-one">智慧采购 Agent</span>
            <span className="agent-chip chip-two">过磅防作弊 Agent</span>
            <span className="agent-chip chip-three">BIM 预测 Agent</span>
            <span className="agent-chip chip-four">智能财务 Agent</span>
            <span className="agent-chip chip-five">企业微信协同 Agent</span>
          </div>
        </section>

        <section className="metrics section-shell" aria-label="产品核心指标">
          {metrics.map((metric, index) => (
            <article className="metric-card glass-card" data-reveal style={{ "--delay": `${index * 80}ms` } as React.CSSProperties} key={metric.label}>
              <div>
                <span className="card-kicker">{metric.label}</span>
                <strong className="metric-value">{metric.value}</strong>
                <p>{metric.note}</p>
              </div>
              <div className="metric-icon" aria-hidden="true">
                <img src={metric.icon} alt="" />
              </div>
            </article>
          ))}
        </section>

        <section className="content-section section-shell" aria-labelledby="pain-title">
          <div className="section-heading" data-reveal>
            <h2 id="pain-title">传统建工管理的四大黑箱，正在拖慢项目节奏</h2>
          </div>
          <div className="pain-grid">
            {painPoints.map((item, index) => (
              <article className="pain-card glass-card" data-reveal style={{ "--delay": `${index * 70}ms` } as React.CSSProperties} key={item.title}>
                <span className="line-icon"><FeatureIcon name={item.icon} /></span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-shell" id="architecture" aria-labelledby="architecture-title">
          <div className="section-heading" data-reveal>
            <h2 id="architecture-title">一个工程大脑中枢，编排多个业务 Agent</h2>
          </div>
          <div className="architecture-grid">
            <div className="architecture-visual" data-reveal>
              <AgentCoreGraphic compact />
              <span className="agent-chip architecture-chip chip-one">智慧采购 Agent</span>
              <span className="agent-chip architecture-chip chip-three">BIM 预测 Agent</span>
              <span className="agent-chip architecture-chip chip-four">智能财务 Agent</span>
            </div>
            <div className="layer-list">
              {layers.map((layer, index) => (
                <article className="layer-card glass-card" data-reveal style={{ "--delay": `${index * 60}ms` } as React.CSSProperties} key={layer.title}>
                  <span className="line-icon"><FeatureIcon name={layer.icon} /></span>
                  <div><h3>{layer.title}</h3><p>{layer.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-shell" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-heading" data-reveal>
            <h2 id="capabilities-title">五大智能模块，打造建工管理全流程闭环</h2>
          </div>
          <div className="module-grid">
            {modules.map((module, index) => (
              <article
                className={selectedModule === module.title ? "module-card glass-card is-selected" : "module-card glass-card"}
                data-reveal
                style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
                key={module.title}
                tabIndex={0}
                role="button"
                aria-pressed={selectedModule === module.title}
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a")) return;
                  setSelectedModule((current) => current === module.title ? null : module.title);
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  setSelectedModule((current) => current === module.title ? null : module.title);
                }}
              >
                <div className="module-icon-wrap" role="img" aria-label={`${module.title}图标`}><FeatureIcon name={module.icon} /></div>
                <h3>{module.title}</h3>
                <ul>{module.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                <a href="#contact">了解更多 <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-shell" id="case-study" aria-labelledby="case-title">
          <div className="section-heading" data-reveal>
            <h2 id="case-title">从真实项目中验证的智能闭环</h2>
          </div>
          <article className="case-card glass-card" data-reveal>
            <Placeholder label="项目鸟瞰图" detail="AVIF/WebP · 建议 1200×900" className="case-placeholder" />
            <div className="case-content">
              <div className="case-heading">
                <div><h3>湖州织东控规单元项目</h3><span className="case-tag">真实案例</span></div>
                <p>项目总建筑面积约 15 万㎡，正处于主体结构施工高峰期。通过多 Agent 协同，关键任务实现自动识别、分派、跟踪与闭环。</p>
              </div>
              <div className="case-metrics">
                <div><span>全流程</span><strong>26 小时</strong><small>完成紧急合同保障</small></div>
                <div><span>提前</span><strong>38 小时</strong><small>比原计划提前</small></div>
                <div><span>成本下降</span><strong>2.1%</strong><small>采购成本降低</small></div>
                <div><span>间接损失减少</span><strong>8 万元</strong><small>停工损失降低</small></div>
              </div>
              <div className="timeline" aria-label="项目闭环时间线">
                {["需求识别 0h", "供应商匹配 2h", "在线询比价 6h", "合同签署 10h", "过磅进场 24h", "供货闭环 26h"].map((item) => (
                  <div className="timeline-step" key={item}><i aria-hidden="true" /><span>{item}</span></div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="content-section section-shell resources" aria-labelledby="resources-title">
          <div className="section-heading" data-reveal>
            <h2 id="resources-title">浏览建工 AI 白皮书</h2>
            <p>系统了解多 Agent 架构、材料闭环、成本预测与企业微信协同的落地方法。</p>
          </div>
          <div className="resource-grid" data-reveal>
            <Placeholder label="建工管理矩阵 OS 白皮书 2026" detail="封面组合图 · AVIF/WebP" className="book-feature" />
            {["多 Agent 架构指南", "智慧采购与过磅闭环", "项目成本预测实践"].map((title) => (
              <article className="resource-card" key={title}>
                <div><h3>{title}</h3><p>从业务流程到数据闭环，提供可执行的建设方法。</p></div>
                <Placeholder label={`${title}封面`} detail="AVIF/WebP · 720×480" className="resource-placeholder" />
                <div className="resource-actions"><a href="#contact">在线浏览</a><a className="download-link" href="#contact">下载白皮书</a></div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section section-shell" id="contact" data-reveal>
          <div className="cta-copy">
            <h2>让你的项目进入智能管理时代</h2>
            <p>Pmagic AI 建工管理矩阵 OS，助力企业降本增效、赢在未来。</p>
            <div className="button-row">
              <a className="button button-primary" href="mailto:service@pmagic.ai">预约产品演示 <span aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="mailto:service@pmagic.ai">获取解决方案 <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <Placeholder label="CTA 城市插画" detail="透明 WebP · 建议 1200×520" className="cta-placeholder" />
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-brand"><Brand /><p>建工领域专属的超级工程大脑，以多 Agent 协同驱动全流程智能管理。</p><small>© 2026 Pmagic AI. All rights reserved.</small></div>
        {footerColumns.map((column) => (
          <div className="footer-column" key={column.title}><h2>{column.title}</h2>{column.links.map((link) => <a href="#top" key={link}>{link}</a>)}</div>
        ))}
        <div className="footer-column footer-contact"><h2>联系</h2><a href="mailto:service@pmagic.ai">service@pmagic.ai</a><span>400-888-9999</span><div><a href="#top">隐私政策</a><a href="#top">服务条款</a></div></div>
      </footer>
    </>
  );
}
