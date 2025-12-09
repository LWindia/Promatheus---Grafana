const outcomeItems = [
  "Deploy and scale a Prometheus monitoring stack",
  "Build and analyze Grafana dashboards with real data",
  "Set up Alertmanager, routing rules, and receiver integrations",
  "Configure exporters and service discovery strategies",
  "Write effective PromQL for SLOs and production signals",
  "Deliver production-grade observability for cloud-native apps",
];

export const outcomes = () => `
  <section class="section" id="outcomes">
    <div class="section-inner animate" data-animate>
      <div class="section-heading">
        <div>
          <div class="tag">Key learning outcomes</div>
          <h2 class="headline">Become fluent in Prometheus & Grafana</h2>
          <p class="subhead">
            Walk away ready to instrument services, visualize metrics, build alerting policies, and
            operate observability in production.
          </p>
        </div>
      </div>
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        <div class="card">
          <h3>Hands-on skills</h3>
          <ul class="list">
            ${outcomeItems
              .slice(0, 3)
              .map(
                (item) => `
              <li>
                <span class="check">✓</span>
                <span>${item}</span>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
        <div class="card">
          <h3>Operational confidence</h3>
          <ul class="list">
            ${outcomeItems
              .slice(3)
              .map(
                (item) => `
              <li>
                <span class="check">✓</span>
                <span>${item}</span>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      </div>
    </div>
  </section>
`;


