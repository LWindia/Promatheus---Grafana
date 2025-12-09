// ============================================
// Google Apps Script - Contact Form Handler
// ============================================
// Copy this entire code into your Apps Script editor

// ⚙️ CONFIGURATION - UPDATE THESE VALUES
const APP_PASSWORD = 'YOUR_STRONG_PASSWORD_HERE'; // Change this to a secure password
const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

/**
 * Handles OPTIONS requests for CORS preflight
 */
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Handles POST requests from the contact form
 * This function is called automatically when your form submits
 */
function doPost(e) {
  try {
    // 📝 Parse form data from request
    const data = JSON.parse(e.postData.contents || '{}');
    
    // 🔒 Security: Check app password (from headers or body)
    const reqPassword = e?.headers?.['x-app-password'] || data.appPassword || e?.parameter?.password;
    if (reqPassword !== APP_PASSWORD) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Extract form fields (exclude appPassword from data)
    const name = data.name || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const message = data.message || '';

    // 📊 Get the active spreadsheet and sheet
    // NOTE: This works because the script is "bound" to your sheet
    // You DON'T need a Sheet ID when using this method
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // ✅ If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      // Set headers
      newSheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Message']]);
      newSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      // Add first data row
      newSheet.getRange(2, 1, 1, 5).setValues([[new Date(), name, email, phone, message]]);
    } else {
      // 📥 Append new row with form data
      sheet.appendRow([new Date(), name, email, phone, message]);
    }

    // ✅ Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // ❌ Return error response
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 🧪 Test function - Optional: Run this to verify the script works
 * Steps:
 * 1. Select "testSubmission" from the function dropdown
 * 2. Click Run ▶️
 * 3. Check your Google Sheet - you should see a test row
 */
function testSubmission() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    message: 'This is a test submission from Apps Script'
  };

  const mockEvent = {
    headers: { 'x-app-password': APP_PASSWORD },
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}

// ============================================
// ALTERNATIVE: If you need to use Sheet ID
// ============================================
// Uncomment and use this version if you want to access a sheet by ID
// (You DON'T need this if using the bound script method above)

/*
const SHEET_ID = 'your-sheet-id-here'; // Get from URL: docs.google.com/spreadsheets/d/SHEET_ID/edit
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const reqPassword = e?.headers?.['x-app-password'];
    if (reqPassword !== APP_PASSWORD) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents || '{}');
    const name = data.name || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const message = data.message || '';

    // Open sheet by ID
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([new Date(), name, email, phone, message]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/

