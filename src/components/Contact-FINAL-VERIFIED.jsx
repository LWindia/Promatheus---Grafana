import { useState } from "react";

// ⚙️ CONFIGURATION: Update these after setting up Google Apps Script
// See GOOGLE_SHEETS_SETUP.md for step-by-step instructions
const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyt5x5DJ6k24pd4iZfkIaNG1P5RBd-mBI7Iai2-z83xe-9fstCnM_a0NPQNvWKHZMvgfA/exec";
const APP_PASSWORD = "uzdh iiso omms aaic"; // Must match the password in Apps Script EXACTLY
const CHAT_URL = "https://wa.me/919772201449";
const SUPPORT_EMAIL = "support@lwindia.com";
const SUPPORT_PHONE = "+91 9772201449";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) {
      console.log("⚠️ Form already submitting, ignoring duplicate submission");
      return;
    }
    
    setIsSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);
    
    // Extract and validate fields
    const name = (formData.get('name') || '').trim();
    const email = (formData.get('email') || '').trim();
    const phone = (formData.get('phone') || '').trim();
    const message = (formData.get('message') || '').trim();
    
    // Client-side validation
    if (!name || name.length === 0) {
      setStatus("❌ Please enter your name.");
      setIsSubmitting(false);
      return;
    }
    if (!email || email.length === 0 || !email.includes('@')) {
      setStatus("❌ Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }
    if (!phone || phone.length === 0) {
      setStatus("❌ Please enter your phone number.");
      setIsSubmitting(false);
      return;
    }
    
    setStatus("Submitting...");
    
    // Build URL with query parameters (URLSearchParams handles all encoding automatically)
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('email', email);
    params.set('phone', phone);
    params.set('message', message);
    params.set('appPassword', APP_PASSWORD);
    
    const fullUrl = `${APP_SCRIPT_URL}?${params.toString()}`;
    
    // Log submission for debugging (password hidden)
    console.log("==========================================");
    console.log("=== FORM SUBMISSION START ===");
    console.log("Time:", new Date().toISOString());
    console.log("Data:", { 
      name, 
      email, 
      phone, 
      messageLength: message.length,
      messagePreview: message.substring(0, 50) + (message.length > 50 ? '...' : '')
    });
    console.log("URL (password hidden):", fullUrl.replace(APP_PASSWORD, '***PASSWORD***'));
    console.log("Full URL (for manual testing):", fullUrl);
    console.log("==========================================");
    
    // METHOD 1: Image pixel method (silent, very reliable for Google Apps Script)
    // This method works by loading the URL as an image source
    const img = new Image();
    img.src = fullUrl;
    img.style.display = 'none';
    img.width = 1;
    img.height = 1;
    img.style.position = 'absolute';
    img.style.left = '-9999px';
    document.body.appendChild(img);
    
    img.onload = () => {
      console.log("✅ Method 1: Image pixel loaded successfully");
    };
    
    img.onerror = () => {
      console.log("⚠️ Method 1: Image pixel error (non-critical, request may still be sent)");
    };
    
    // METHOD 2: Iframe form submission (primary method)
    // This is the most reliable method for cross-origin form submissions
    const iframeId = 'form-submit-iframe-' + Date.now();
    const iframe = document.createElement('iframe');
    iframe.name = iframeId;
    iframe.id = iframeId;
    iframe.style.display = 'none';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.opacity = '0';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);
    
    // Wait for iframe to be ready
    iframe.onload = () => {
      console.log("✅ Iframe loaded and ready");
    };
    
    const submitForm = document.createElement('form');
    submitForm.method = 'GET';
    submitForm.action = APP_SCRIPT_URL;
    submitForm.target = iframeId;
    submitForm.style.display = 'none';
    submitForm.setAttribute('aria-hidden', 'true');
    
    // Add all form fields as hidden inputs
    // Using forEach to ensure all params are added
    params.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      submitForm.appendChild(input);
    });
    
    document.body.appendChild(submitForm);
    
    // Submit form after ensuring iframe is in DOM
    // Small delay ensures iframe is ready
    setTimeout(() => {
      try {
        submitForm.submit();
        console.log("✅ Method 2: Iframe form submitted successfully");
      } catch (err) {
        console.error("❌ Method 2 error:", err);
      }
    }, 300);
    
    // METHOD 3: Fetch with no-cors (backup, won't read response but request is sent)
    // This is a final backup method
    fetch(fullUrl, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'omit'
    }).then(() => {
      console.log("✅ Method 3: Fetch request sent");
    }).catch((err) => {
      // Expected to fail due to CORS, but request may still be sent
      console.log("⚠️ Method 3: Fetch error (expected with no-cors):", err.message);
    });
    
    // Show success message after delay
    // Give time for at least one method to complete
    setTimeout(() => {
      setStatus("✅ Thanks! We received your details. Check your sheet to confirm.");
      form.reset();
      setIsSubmitting(false);
      
      console.log("==========================================");
      console.log("=== FORM SUBMISSION COMPLETE ===");
      console.log("💡 TIP: Check Apps Script Executions tab to verify submission");
      console.log("💡 TIP: Check Google Sheet to see if data was saved");
      console.log("💡 TIP: Copy the 'Full URL' from above and paste in browser to test manually");
      console.log("==========================================");
    }, 1500);
    
    // Clean up DOM elements after delay
    setTimeout(() => {
      try {
        if (document.body.contains(img)) {
          document.body.removeChild(img);
        }
        if (document.body.contains(submitForm)) {
          document.body.removeChild(submitForm);
        }
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      } catch (cleanupError) {
        console.log("⚠️ Cleanup error (non-critical):", cleanupError);
      }
    }, 10000);
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
              <input 
                required 
                name="name" 
                placeholder="Your name" 
                disabled={isSubmitting}
              />
            </label>
            <label>
              Email
              <input 
                required 
                type="email" 
                name="email" 
                placeholder="you@example.com" 
                disabled={isSubmitting}
              />
            </label>
            <label>
              Phone
              <input 
                required 
                name="phone" 
                placeholder="+91 9xxxx xxxxx" 
                disabled={isSubmitting}
              />
            </label>
            <label>
              Message
              <textarea 
                name="message" 
                rows="3" 
                placeholder="Tell us about your goals"
                disabled={isSubmitting}
              ></textarea>
            </label>
            <div className="hero-actions" style={{ margin: "6px 0 0" }}>
              <button 
                className="btn btn-primary" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
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

