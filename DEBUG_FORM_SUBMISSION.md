# 🔍 Debugging Form Submission Issues

## Problem: Form shows success but data doesn't appear in Google Sheet

### Step 1: Check Apps Script Executions

1. Go to your Apps Script project: https://script.google.com/home
2. Open your project
3. Click **"Executions"** tab (left sidebar)
4. Look for recent `doPost` executions
5. Check if they show:
   - ✅ **Success** (green) - Script ran but data might not be saved
   - ❌ **Error** (red) - Click to see error details

**Common errors:**
- `Unauthorized` - Password mismatch
- `Sheet not found` - Sheet name doesn't match
- `Permission denied` - Script needs permission to edit sheet

---

### Step 2: Verify Password Match

**Current password in Contact.jsx:** `"uzdh iiso omms aaic"` (has spaces)

**Issue:** Passwords with spaces can cause matching problems.

**Fix:**
1. **In Apps Script**, change to a password WITHOUT spaces:
   ```javascript
   const APP_PASSWORD = 'PromG-Form-2025!'; // No spaces
   ```

2. **In Contact.jsx**, update to match:
   ```javascript
   const APP_PASSWORD = "PromG-Form-2025!"; // Same password, no spaces
   ```

3. **Save and redeploy** Apps Script (Deploy → Manage deployments → New version)

---

### Step 3: Verify Sheet Name

1. Open your sheet: https://docs.google.com/spreadsheets/d/1TXws8iKNH9b8KmkWMVwHl4wflVD79RbVtGjn87ytq34/edit
2. Check the **tab name** at the bottom (usually "Sheet1")
3. In Apps Script, make sure `SHEET_NAME` matches exactly:
   ```javascript
   const SHEET_NAME = 'Sheet1'; // Must match your tab name exactly
   ```

---

### Step 4: Test Apps Script Directly

1. In Apps Script editor, select `testSubmission` from function dropdown
2. Click **Run** ▶️
3. Check your Google Sheet - a test row should appear
4. If this works, the script is fine - the issue is with the form submission

---

### Step 5: Check Browser Console

1. Open your website
2. Press **F12** → **Console** tab
3. Submit the form
4. Look for:
   - `"Submitting form with payload:"` - Shows what's being sent
   - Any error messages
   - `"Form submitted successfully"` - Confirms request was sent

---

### Step 6: Verify Web App Deployment

1. In Apps Script, go to **Deploy** → **Manage deployments**
2. Make sure:
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
3. If you changed the script, create a **New version** and redeploy

---

## Quick Fix Checklist

- [ ] Password in Apps Script matches password in Contact.jsx (no spaces recommended)
- [ ] Sheet tab name matches `SHEET_NAME` in Apps Script
- [ ] Apps Script is deployed as Web App with "Anyone" access
- [ ] Apps Script Executions tab shows successful runs (not errors)
- [ ] Browser console shows form payload being sent
- [ ] Sheet has headers in Row 1: `Timestamp | Name | Email | Phone | Message`

---

## Manual Test

Run this in browser console to test directly:

```javascript
fetch("https://script.google.com/macros/s/AKfycbwFzO4C069Acmm_rP1jP61AenUBYl7_eo1Ieqe6iAjXzpZMgApAhPRTAYfVIiSEYCmWNQ/exec", {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    phone: "+91 9876543210",
    message: "Test from console",
    appPassword: "uzdh iiso omms aaic" // Your current password
  })
})
.then(() => console.log("Request sent - check your sheet"))
.catch(err => console.error("Error:", err));
```

Then check your sheet for the new row.

---

## Most Likely Issue

**Password with spaces** - The password `"uzdh iiso omms aaic"` has spaces which can cause matching issues.

**Solution:** Use a password without spaces in both places.

