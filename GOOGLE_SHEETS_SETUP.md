# Google Sheets Setup Guide - Step by Step

This guide will help you set up Google Apps Script to store contact form entries in a Google Sheet.

---

## 📋 Prerequisites
- A Google account
- Access to Google Sheets and Google Apps Script

---

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it: **"Prometheus Grafana Leads"** (or any name you prefer)
4. In the first row (Row 1), add these headers:
   - **Column A**: `Timestamp`
   - **Column B**: `Name`
   - **Column C**: `Email`
   - **Column D**: `Phone`
   - **Column E**: `Message`
5. **Important**: Note the sheet tab name (usually "Sheet1" by default). If you renamed it, remember the name.

---

## Step 2: Create Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab opens with a blank script editor
3. Delete the default `myFunction()` code
4. Copy and paste this code:

```javascript
// Configuration - UPDATE THESE VALUES
const APP_PASSWORD = 'YOUR_STRONG_PASSWORD_HERE'; // Change this to a secure password
const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

/**
 * Handles POST requests from the contact form
 */
function doPost(e) {
  try {
    // Security: Check app password
    const reqPassword = e?.headers?.['x-app-password'] || e?.parameter?.password;
    if (reqPassword !== APP_PASSWORD) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Parse form data
    const data = JSON.parse(e.postData.contents || '{}');
    const name = data.name || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const message = data.message || '';

    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, create it
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      newSheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Message']]);
      newSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      newSheet.getRange(2, 1, 1, 5).setValues([[new Date(), name, email, phone, message]]);
    } else {
      // Append new row with data
      sheet.appendRow([new Date(), name, email, phone, message]);
    }

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - you can run this to verify the script works
 */
function testSubmission() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    message: 'This is a test submission'
  };

  const mockEvent = {
    headers: { 'x-app-password': APP_PASSWORD },
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

5. **Update the configuration**:
   - Replace `YOUR_STRONG_PASSWORD_HERE` with a secure password (e.g., `MySecurePass123!`)
   - If your sheet tab is not named "Sheet1", change `SHEET_NAME` to match your tab name

6. Click **Save** (💾 icon) or press `Ctrl+S` / `Cmd+S`
7. Name your project: Click "Untitled project" at the top and rename it to **"Contact Form Handler"**

---

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to **"Select type"** and choose **"Web app"**
3. Fill in the deployment settings:
   - **Description**: `Contact Form Handler v1` (optional)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (this allows your website to call it)
4. Click **Deploy**
5. **First-time authorization**:
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to Contact Form Handler (unsafe)"**
   - Click **"Allow"** to grant permissions
6. **Copy the Web App URL**:
   - You'll see a URL that looks like:
     ```
     https://script.google.com/macros/s/AKfycby.../exec
     ```
   - Click the **copy icon** 📋 to copy this URL
   - **Save this URL** - you'll need it in the next step

---

## Step 4: Update Your Website Code

1. Open `src/components/Contact.jsx` in your project
2. Find these lines at the top:
   ```javascript
   const APP_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   const APP_PASSWORD = 'YOUR_APP_PASSWORD_HERE';
   ```
3. Replace with your actual values:
   ```javascript
   const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec'; // Your Web App URL
   const APP_PASSWORD = 'MySecurePass123!'; // Same password you set in Apps Script
   ```
4. Save the file

---

## Step 5: Test the Setup

1. **Test in Apps Script** (optional):
   - In Apps Script editor, select `testSubmission` from the function dropdown
   - Click **Run** ▶️
   - Check your Google Sheet - you should see a test row appear

2. **Test on your website**:
   - Start your dev server: `npm run dev`
   - Go to the Contact section
   - Fill out the form with test data
   - Submit the form
   - Check your Google Sheet - a new row should appear with your data

---

## 🔒 Security Notes

- **App Password**: Use a strong, unique password (mix of letters, numbers, symbols)
- **Keep it secret**: Don't share your app password publicly
- **HTTPS only**: Your website should use HTTPS in production
- **Rate limiting**: Google Apps Script has daily execution limits (free tier: 20,000/day)

---

## ❓ Troubleshooting

### Form submits but no data in sheet
- Check Apps Script execution log: **Executions** tab in Apps Script
- Verify sheet tab name matches `SHEET_NAME` in the script
- Check that headers are in Row 1

### "Unauthorized" error
- Verify `APP_PASSWORD` in both `Contact.jsx` and Apps Script match exactly
- Check for extra spaces or typos

### "Script function not found" error
- Make sure the function is named `doPost` (case-sensitive)
- Save the script before deploying

### CORS errors in browser
- Make sure deployment is set to **"Anyone"** has access
- Redeploy if you changed access settings

---

## 📝 Alternative: Using Sheet ID (If Needed)

**You DON'T need Sheet ID if you use the bound script method above** (recommended).

However, if you want to use a standalone script that can access any sheet:

1. Get your Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
2. Update the script:
   ```javascript
   const SHEET_ID = 'your-sheet-id-here';
   const SHEET_NAME = 'Sheet1';

   function doPost(e) {
     // ... security check ...
     const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
     const sheet = spreadsheet.getSheetByName(SHEET_NAME);
     // ... rest of code ...
   }
   ```

---

## ✅ You're Done!

Your contact form will now automatically save all submissions to your Google Sheet. Each submission will include:
- Timestamp (automatically added)
- Name
- Email
- Phone
- Message

---

**Need help?** Check the Apps Script execution logs or browser console for error messages.

