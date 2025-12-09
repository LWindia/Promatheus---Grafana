const modules = [
  {
    title: "MODULE 1: Introduction to Monitoring",
    focus: "Foundations",
    items: [
      "Why monitoring matters",
      "Traditional logging vs metrics vs tracing",
      "Observability pillars: Metrics, Logs, Traces",
      "Modern system monitoring challenges",
    ],
  },
  {
    title: "MODULE 2: Prometheus Fundamentals",
    focus: "Collection",
    items: [
      "What is Prometheus & evolution",
      "Pull vs Push model; time-series basics",
      "Architecture: TSDB, scrape, rules, exporters",
      "Core concepts: Targets, Jobs, Labels, Metrics",
    ],
  },
  {
    title: "MODULE 3: Installation & Setup",
    focus: "Setup",
    items: [
      "Install on Linux / VM / Docker",
      "prometheus.yml configuration",
      "Running Prometheus; UI walkthrough",
      "Adding the first scrape target",
    ],
  },
  {
    title: "MODULE 4: PromQL Basics",
    focus: "Queries",
    items: [
      "Metric types: Counter, Gauge, Histogram, Summary",
      "Selectors, filters, labels",
      "rate(), sum(), avg(), max(), min()",
      "Practical hands-on queries",
    ],
  },
  {
    title: "MODULE 5: Exporters",
    focus: "Integrations",
    items: [
      "Exporter ecosystem and best practices",
      "Node / Blackbox / MySQL / Redis / Process exporters",
      "Hands-on: setup multiple exporters",
    ],
  },
  {
    title: "MODULE 6: Alerting & Rules",
    focus: "Alerting",
    items: [
      "Recording vs alerting rules",
      "Alertmanager architecture",
      "Routing to Email, Slack, Webhook",
    ],
  },
  {
    title: "MODULE 7: PromQL Advanced",
    focus: "Advanced",
    items: [
      "Aggregations, grouping, joins",
      "Nested functions, subqueries",
      "Real-time scenarios",
    ],
  },
  {
    title: "MODULE 8: Real-World Monitoring Scenarios",
    focus: "Ops",
    items: [
      "CPU, Memory, Disk, Network",
      "Service uptime checks",
      "API latency & error rate",
      "RED & USE methods",
    ],
  },
  {
    title: "MODULE 9: Introduction to Grafana",
    focus: "Grafana",
    items: [
      "Why Grafana; architecture",
      "Datasources: Prometheus, Loki, CloudWatch, etc.",
      "Authentication & RBAC",
    ],
  },
  {
    title: "MODULE 10: Dashboards & Panels",
    focus: "Dashboards",
    items: [
      "Creating dashboards; key panels (Graph, Bar, Table, Stat, Heatmap)",
      "Variables, templates, dynamic dashboards",
    ],
  },
  {
    title: "MODULE 11: Alerts in Grafana",
    focus: "Alerts",
    items: [
      "Grafana vs Prometheus alerting",
      "Creating alert rules",
      "Channels: Slack, Email, Teams, Webhook",
    ],
  },
  {
    title: "MODULE 12: Visualization Best Practices",
    focus: "UX",
    items: [
      "User-friendly dashboards; color coding",
      "Group related metrics; annotation & time ranges",
      "Grafana plugins",
    ],
  },
  {
    title: "MODULE 13: Scaling & High Availability",
    focus: "Scale",
    items: [
      "Federation, sharding, remote storage",
      "Thanos overview",
      "Cortex / Mimir overview",
    ],
  },
];

export default function Curriculum() {
  return (
    <>
      <div className="section-heading">
        <div>
          <div className="tag">Course curriculum</div>
          <h2 className="headline">Built for real-world delivery</h2>
          <p className="subhead">
            A concise, lab-heavy journey from fundamentals to production-grade monitoring with
            Prometheus, Grafana, and Alertmanager.
          </p>
        </div>
      </div>
      <div className="grid curriculum-grid">
        {modules.map((mod, idx) => (
          <div key={mod.title} className="timeline-item">
            <div className="tag">{String(idx + 1).padStart(2, "0")} • {mod.focus}</div>
            <strong>{mod.title}</strong>
            <ul className="list" style={{ margin: "8px 0 0" }}>
              {mod.items.map((item) => (
                <li key={item}>
                  <span className="check">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

