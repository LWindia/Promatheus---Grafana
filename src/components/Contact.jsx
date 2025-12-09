import { useState } from "react";

// ⚙️ CONFIGURATION: Update these after setting up Google Apps Script
// See GOOGLE_SHEETS_SETUP.md for step-by-step instructions
const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyt5x5DJ6k24pd4iZfkIaNG1P5RBd-mBI7Iai2-z83xe-9fstCnM_a0NPQNvWKHZMvgfA/exec";
const APP_PASSWORD = "uzdh iiso omms aaic"; // Must match the password in Apps Script
const CHAT_URL = "https://wa.me/919772201449";
const SUPPORT_EMAIL = "support@lwindia.com";
const SUPPORT_PHONE = "+91 9772201449";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    setStatus("Submitting...");
    
    // Use hidden iframe form submission - MOST RELIABLE method for Google Apps Script
    const iframe = document.createElement('iframe');
    iframe.name = 'form-submit-iframe-' + Date.now();
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    
    // Create a form that will submit to the iframe
    const submitForm = document.createElement('form');
    submitForm.method = 'GET';
    submitForm.action = APP_SCRIPT_URL;
    submitForm.target = iframe.name;
    submitForm.style.display = 'none';
    
    // Add all form fields as hidden inputs
    const fields = {
      name: (data.name || '').trim(),
      email: (data.email || '').trim(),
      phone: (data.phone || '').trim(),
      message: (data.message || '').trim(),
      appPassword: APP_PASSWORD
    };
    
    // Validate required fields
    if (!fields.name || !fields.email || !fields.phone) {
      setStatus("❌ Please fill in all required fields.");
      document.body.removeChild(iframe);
      return;
    }
    
    // Add fields to form
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      submitForm.appendChild(input);
    });
    
    document.body.appendChild(submitForm);
    
    // Log what we're sending
    console.log("Submitting form:", {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      message: fields.message,
      appPassword: "***hidden***"
    });
    
    // Submit the form
    submitForm.submit();
    
    // Clean up and show success after a delay
    setTimeout(() => {
      setStatus("✅ Thanks! We received your details. Check your sheet to confirm.");
      form.reset();
      
      // Clean up after a bit more time
      setTimeout(() => {
        if (document.body.contains(submitForm)) {
          document.body.removeChild(submitForm);
        }
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 500);
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

