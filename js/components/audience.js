const audienceList = [
  "DevOps Engineers, SREs, Cloud Engineers",
  "Developers building apps with observability requirements",
  "Platform and Infra teams standardizing monitoring",
  "Leads who need reliable dashboards and alerting",
];

export const audience = () => `
  <section class="section" id="audience">
    <div class="section-inner animate" data-animate>
      <div class="section-heading">
        <div>
          <div class="tag">Who should attend</div>
          <h2 class="headline">For teams that own uptime and insight</h2>
          <p class="subhead">If you ship, run, or operate services—this training is for you.</p>
        </div>
      </div>
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
        ${audienceList
          .map(
            (item) => `
            <div class="card">
              <div class="check">✓</div>
              <h3 style="margin: 8px 0 0;">${item}</h3>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  </section>
`;


