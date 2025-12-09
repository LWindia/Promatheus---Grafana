const modules = [
  { title: "Introduction to Monitoring & Observability", focus: "Foundations" },
  { title: "Prometheus Architecture + Metrics", focus: "Collection" },
  { title: "Exporters & Service Discovery", focus: "Integrations" },
  { title: "PromQL Deep Dive", focus: "Queries" },
  { title: "Alertmanager Setup", focus: "Alerting" },
  { title: "Grafana Dashboards & Visualizations", focus: "Dashboards" },
  { title: "Integrating Prometheus with Kubernetes", focus: "Cloud Native" },
  { title: "Real-Time Monitoring Hands-on Labs", focus: "Labs" },
];

export const curriculum = () => `
  <section class="section" id="curriculum">
    <div class="section-inner animate" data-animate>
      <div class="section-heading">
        <div>
          <div class="tag">Course curriculum</div>
          <h2 class="headline">Built for real-world delivery</h2>
          <p class="subhead">
            A concise, lab-heavy journey from fundamentals to production-grade monitoring with
            Prometheus, Grafana, and Alertmanager.
          </p>
        </div>
        <a class="btn btn-ghost" href="#contact">Download Brochure</a>
      </div>
      <div class="grid curriculum-grid">
        ${modules
          .map(
            (mod, idx) => `
            <div class="timeline-item">
              <div class="tag">${String(idx + 1).padStart(2, "0")} • ${mod.focus}</div>
              <strong>${mod.title}</strong>
              <p class="muted">Guided by use-cases, demos, and rapid labs.</p>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  </section>
`;


