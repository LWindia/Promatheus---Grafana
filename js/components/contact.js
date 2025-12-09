const APP_SCRIPT_URL = "https://script.google.com/macros/s/APP_SCRIPT_ID/exec";
const APP_PASSWORD = "APP_PASSWORD_HERE";
const CHAT_URL = "https://wa.me/919999999999";
const SUPPORT_EMAIL = "training@prom-grafana.dev";
const SUPPORT_PHONE = "+91 99999 99999";

export const contact = () => `
  <section class="section" id="contact">
    <div class="section-inner animate" data-animate>
      <div class="section-heading">
        <div>
          <div class="tag">Contact & Registration</div>
          <h2 class="headline">Talk to us. Lock your seat.</h2>
          <p class="subhead">Share your details and we will confirm your seat with next steps.</p>
        </div>
        <div class="status">Live support available</div>
      </div>
      <div class="contact-grid">
        <div class="card">
          <form id="contactForm">
            <label>
              Name
              <input required name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input required type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              Phone
              <input required name="phone" placeholder="+91 9xxxx xxxxx" />
            </label>
            <label>
              Message
              <textarea name="message" rows="3" placeholder="Tell us about your goals"></textarea>
            </label>
            <div class="hero-actions" style="margin: 6px 0 0;">
              <button class="btn btn-primary" type="submit">Submit</button>
              <a class="btn btn-ghost" href="${CHAT_URL}" target="_blank" rel="noreferrer">Chat now</a>
            </div>
            <p id="formStatus" class="muted" style="margin: 6px 0 0;"></p>
          </form>
        </div>
        <div class="card">
          <h3>Need instant help?</h3>
          <p class="muted">Call or email us for seat confirmation or team pricing.</p>
          <div class="hero-actions" style="margin-top: 12px;">
            <a class="btn btn-primary" href="tel:${SUPPORT_PHONE}">Call Now</a>
            <a class="btn btn-ghost" href="mailto:${SUPPORT_EMAIL}">Email</a>
          </div>
          <div class="list" style="margin-top: 16px;">
            <div class="pill">Email: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></div>
            <div class="pill">Phone: <a href="tel:${SUPPORT_PHONE}">${SUPPORT_PHONE}</a></div>
            <div class="pill">Chat: <a href="${CHAT_URL}" target="_blank" rel="noreferrer">Instant chat support</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="floating-chat">
      <a class="btn btn-primary" href="${CHAT_URL}" target="_blank" rel="noreferrer">Chat Support</a>
    </div>
  </section>
`;

export const initContactForm = () => {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  if (!form || !statusEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Submitting...";

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(APP_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Password": APP_PASSWORD,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Network error");
      statusEl.textContent = "Thanks! We received your details.";
      form.reset();
    } catch (err) {
      statusEl.textContent = "Something went wrong. Please try again or use chat.";
    }
  });
};


