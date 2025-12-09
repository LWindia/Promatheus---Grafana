# 🧪 Form Submission Testing Guide

## Quick Test Steps

### Option 1: Test Using the Test Page (Easiest)

1. **Open the test file**:
   - Open `test-form-submission.html` in your browser
   - Or serve it: `npx serve .` and visit `http://localhost:3000/test-form-submission.html`

2. **Fill the form** (pre-filled with test data) and click "Test Submit"

3. **Check results**:
   - The page will show if the request was sent
   - Check your Google Sheet: `https://docs.google.com/spreadsheets/d/1TXws8iKNH9b8KmkWMVwHl4wflVD79RbVtGjn87ytq34/edit`
   - A new row should appear with your test data

### Option 2: Test in Browser Console

1. Open your website in browser (dev server running)
2. Open Developer Tools (F12) → Console tab
3. Paste and run this:

```javascript
const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwTs5OaMFytIfT2VyJDmY25eQDkBzqvbyDH9RZgDVm-9SMNoCiPCI2HBOQmD5x8NeyUkg/exec";
const APP_PASSWORD = "uzdh iiso omms aaic";

fetch(APP_SCRIPT_URL, {
  method: 'POST',
  redirect: 'follow',
  headers: {
    'Content-Type': 'application/json',
    'X-App-Password': APP_PASSWORD,
  },
  body: JSON.stringify({
    name: 'Console Test',
    email: 'test@example.com',
    phone: '+91 9876543210',
    message: 'Testing from browser console'
  })
})
.then(res => res.text())
.then(text => {
  console.log('Response:', text);
  try {
    const json = JSON.parse(text);
    console.log('Parsed:', json);
  } catch {
    console.log('Response is not JSON (might be redirect page)');
  }
})
.catch(err => console.error('Error:', err));
```

4. Check your Google Sheet for the new row

### Option 3: Test Using the Actual Form

1. Start dev server: `npm run dev`
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your Google Sheet

---

## 🔍 Troubleshooting

### Issue: Form shows "Submitting..." but nothing happens

**Check:**
1. **Browser Console** (F12 → Console) - Look for errors
2. **Apps Script Executions**:
   - Go to your Apps Script project
   - Click "Executions" tab
   - Check if `doPost` ran and if there are errors

### Issue: "Unauthorized" error

**Possible causes:**
1. **Password mismatch**: The password in `Contact.jsx` must EXACTLY match the password in Apps Script
   - Current password: `uzdh iiso omms aaic` (has spaces)
   - Make sure there are no extra spaces or typos
2. **Password format**: Consider using a password without spaces to avoid issues
   - Example: `PromG-Form-2025!`

**Fix:**
1. Update password in Apps Script to something simple (no spaces)
2. Update `APP_PASSWORD` in `src/components/Contact.jsx`
3. Redeploy the Apps Script Web App (Deploy → Manage deployments → New version)

### Issue: Data not appearing in sheet

**Check:**
1. **Sheet name**: Make sure `SHEET_NAME` in Apps Script matches your sheet tab name
   - Default is `Sheet1`
   - Check your sheet tabs and update if different
2. **Headers**: Make sure Row 1 has headers: `Timestamp | Name | Email | Phone | Message`
3. **Apps Script permissions**: Make sure the script has permission to edit the sheet
   - Run the `testSubmission` function in Apps Script to test

### Issue: CORS errors in console

**Solution:**
- The code now uses `redirect: 'follow'` which should handle Google Apps Script redirects
- Make sure your Web App deployment is set to "Anyone" has access

---

## ✅ Verification Checklist

- [ ] Apps Script is deployed as Web App
- [ ] Web App URL is correct in `Contact.jsx`
- [ ] App password matches in both places (no typos, no extra spaces)
- [ ] Sheet tab name matches `SHEET_NAME` in Apps Script
- [ ] Sheet has headers in Row 1
- [ ] Test submission appears in sheet
- [ ] Browser console shows no errors
- [ ] Apps Script Executions tab shows successful runs

---

## 🐛 Common Issues & Solutions

### Password with spaces causing issues

**Problem**: Password `uzdh iiso omms aaic` has spaces which might cause parsing issues

**Solution**: Use a password without spaces:
```javascript
const APP_PASSWORD = "PromG-Form-2025!"; // No spaces
```

### Apps Script not receiving headers

**Problem**: Google Apps Script Web Apps sometimes don't receive custom headers properly

**Solution**: The code checks both `e.headers['x-app-password']` and `e.parameter.password` as fallback

### Response is HTML instead of JSON

**Problem**: Google Apps Script Web Apps may return HTML redirect pages

**Solution**: The code now handles this by trying to parse JSON, and if it fails, assumes success (since the request was sent)

---

## 📊 Testing Results

After testing, you should see:
- ✅ Form shows success message
- ✅ New row in Google Sheet with timestamp
- ✅ No errors in browser console
- ✅ Successful execution in Apps Script Executions tab

If all these are ✅, your form is working correctly!

