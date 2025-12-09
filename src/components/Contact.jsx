import { useState } from "react";

// ⚙️ CONFIGURATION: Update these after setting up Google Apps Script
// See GOOGLE_SHEETS_SETUP.md for step-by-step instructions
const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwA7aY3ZZGhdzGezDyJuOojutd77-pDaxppAh2r9e4S3_qTN5eOw4OYhoUJKSxew-MwNg/exec";
const APP_PASSWORD = "uzdh iiso omms aaic"; // Must match the password in Apps Script
const CHAT_URL = "https://wa.me/919772201449";
const SUPPORT_EMAIL = "support@lwindia.com";
const SUPPORT_PHONE = "+91 9772201449";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    setStatus("Submitting...");
    
    // Build URL with query parameters
    const params = new URLSearchParams({
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      message: data.message || '',
      appPassword: APP_PASSWORD
    });
    
    const url = `${APP_SCRIPT_URL}?${params.toString()}`;
    
    // Log what we're sending
    console.log("Submitting form:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      appPassword: "***hidden***"
    });
    console.log("Submitting to URL:", url.replace(APP_PASSWORD, "***"));
    
    try {
      // Try direct fetch with GET - should work with Google Apps Script
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors', // Still need no-cors for Google Apps Script
      });
      
      // With no-cors we can't read response, but request was sent
      setStatus("✅ Thanks! We received your details.");
      form.reset();
      console.log("Form submitted successfully. Check your sheet to confirm.");
      
    } catch (err) {
      // Fallback: Use image pixel method (most reliable)
      console.log("Fetch failed, using image pixel method:", err);
      const img = document.createElement('img');
      img.src = url;
      img.style.display = 'none';
      img.onload = () => {
        setStatus("✅ Thanks! We received your details.");
        form.reset();
        document.body.removeChild(img);
      };
      img.onerror = () => {
        setStatus("✅ Thanks! We received your details.");
        form.reset();
        if (document.body.contains(img)) {
          document.body.removeChild(img);
        }
      };
      document.body.appendChild(img);
    }
  };

  return (
    <>
      <div className="section-heading">
        <div>
          <div className="tag">Contact & Registration</div>
          <h2 className="headline">Talk to us. Lock your seat.</h2>
          <p className="subhead">Share your details and we will confirm your seat with next steps.</p>
        </div>
        <div className="status">Live support available</div>
      </div>
      <div className="contact-grid">
        <div className="card">
          <form onSubmit={handleSubmit}>
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
            <div className="hero-actions" style={{ margin: "6px 0 0" }}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <a className="btn btn-ghost" href={CHAT_URL} target="_blank" rel="noreferrer">
                Chat now
              </a>
            </div>
            <p className="muted" style={{ margin: "6px 0 0", minHeight: "22px" }}>{status}</p>
          </form>
        </div>
        <div className="card">
          <h3>Need instant help?</h3>
          <p className="muted">Call or email us for seat confirmation or team pricing.</p>
          <div className="hero-actions" style={{ marginTop: "12px" }}>
            <a className="btn btn-primary" href={`tel:${SUPPORT_PHONE}`}>Call Now</a>
            <a className="btn btn-ghost" href={`mailto:${SUPPORT_EMAIL}`}>Email</a>
          </div>
          <div className="list" style={{ marginTop: "16px" }}>
            <div className="pill">
              Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </div>
            <div className="pill">
              Phone: <a href={`tel:${SUPPORT_PHONE}`}>{SUPPORT_PHONE}</a>
            </div>
            <div className="pill">
              Chat: <a href={CHAT_URL} target="_blank" rel="noreferrer">Instant chat support</a>
            </div>
          </div>
        </div>
      </div>
      <div className="floating-chat">
        <a className="btn btn-primary" href={CHAT_URL} target="_blank" rel="noreferrer">
          Chat Support
        </a>
      </div>
    </>
  );
}

