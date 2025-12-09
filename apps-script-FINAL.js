// ============================================
// Google Apps Script - Contact Form Handler
// FINAL VERSION - Ready to use
// ============================================
// Copy this entire code into your Apps Script editor

// ⚙️ CONFIGURATION - UPDATE THESE VALUES
const APP_PASSWORD = 'uzdh iiso omms aaic'; // Your current password (consider changing to one without spaces)
const SHEET_ID = '1TXws8iKNH9b8KmkWMVwHl4wflVD79RbVtGjn87ytq34'; // Your Google Sheet ID
const SHEET_NAME = 'Sheet1'; // Matches your sheet tab name

/**
 * Handles GET requests (primary method - more reliable with Google Apps Script)
 * Form will submit via GET with query parameters
 */
function doGet(e) {
  // If no parameters, return a test page to verify script is working
  if (!e || !e.parameter || Object.keys(e.parameter).length === 0) {
    Logger.log('doGet called with no parameters - returning test page');
    return HtmlService.createHtmlOutput(`
      <h1>✅ Google Apps Script is Working!</h1>
      <p>Your Web App is deployed and accessible.</p>
      <p>Event object: ${e ? 'Present' : 'Missing'}</p>
      <p>Parameters: ${e && e.parameter ? JSON.stringify(e.parameter) : 'None'}</p>
      <p>To test form submission, add ?name=Test&email=test@example.com&appPassword=YOUR_PASSWORD to the URL</p>
    `);
  }
  
  // Use the same processing logic as doPost
  return processFormSubmission(e);
}

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
  return processFormSubmission(e);
}

/**
 * Common function to process form submissions (works for both GET and POST)
 */
function processFormSubmission(e) {
  try {
    // Log received data for debugging
    Logger.log('=== Form Submission Received ===');
    Logger.log('Event type: ' + typeof e);
    Logger.log('Event is null/undefined: ' + (e == null));
    
    // Handle case where e might be undefined - try to get from query string
    let data = {};
    let reqPassword = '';
    
    if (!e || e === null || e === undefined) {
      Logger.log('Warning: Event object is null/undefined');
      Logger.log('Attempting to read from query string directly...');
      
      // Try to get parameters from the request URL directly
      // This is a workaround for when e is undefined
      try {
        // Unfortunately, we can't access the raw URL in Apps Script
        // So we'll return an error but also try to process if e.parameter exists
        Logger.log('Cannot access URL parameters without event object');
      } catch (err) {
        Logger.log('Error accessing parameters: ' + err.toString());
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'No data received - event object is undefined' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Log event structure
    Logger.log('Event keys: ' + JSON.stringify(Object.keys(e)));
    if (e.parameter) {
      Logger.log('Parameters received: ' + JSON.stringify(e.parameter));
    } else {
      Logger.log('No parameters found in event');
    }
    if (e.postData) {
      Logger.log('PostData type: ' + e.postData.type);
      Logger.log('PostData contents: ' + e.postData.contents);
    }
    
    // Get data from parameters (GET query string or form-encoded POST)
    if (e.parameter) {
      // GET query parameters or form-encoded POST data comes in e.parameter
      data = {
        name: e.parameter.name || '',
        email: e.parameter.email || '',
        phone: e.parameter.phone || '',
        message: e.parameter.message || ''
      };
      reqPassword = e.parameter.appPassword || e.parameter.password || '';
      Logger.log('Data extracted from parameters: ' + JSON.stringify(data));
      Logger.log('Password received: ' + (reqPassword ? 'Yes (length: ' + reqPassword.length + ')' : 'No'));
    } else if (e.postData && e.postData.contents) {
      // Try JSON if available
      try {
        data = JSON.parse(e.postData.contents);
        reqPassword = data.appPassword || e?.headers?.['x-app-password'] || '';
        Logger.log('Data from JSON: ' + JSON.stringify(data));
      } catch (parseError) {
        Logger.log('JSON parse error: ' + parseError.toString());
      }
    } else {
      Logger.log('Error: No parameters or postData found');
      Logger.log('Event structure: ' + JSON.stringify(e));
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Invalid request format - no parameters found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate we have at least some data
    if (!data.name && !data.email && !reqPassword) {
      Logger.log('Error: No valid data found in request');
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Invalid request - missing required fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 🔒 Security: Check app password
    if (reqPassword !== APP_PASSWORD) {
      Logger.log('Unauthorized: Password mismatch.');
      Logger.log('Expected: [' + APP_PASSWORD + ']');
      Logger.log('Got: [' + reqPassword + ']');
      Logger.log('Length - Expected: ' + APP_PASSWORD.length + ', Got: ' + reqPassword.length);
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized - password mismatch' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Extract form fields
    const name = data.name || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const message = data.message || '';
    
    Logger.log('Processing submission: ' + name + ', ' + email);

    // 📊 Open spreadsheet by ID (more reliable than bound script)
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      Logger.log('Spreadsheet opened successfully');
    } catch (error) {
      Logger.log('Error opening spreadsheet: ' + error.toString());
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Failed to open spreadsheet: ' + error.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the sheet by name
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // ✅ If sheet doesn't exist, create it with headers
    if (!sheet) {
      Logger.log('Sheet tab not found, creating: ' + SHEET_NAME);
      try {
        sheet = spreadsheet.insertSheet(SHEET_NAME);
        // Set headers
        sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Message']]);
        sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
        // Add first data row
        sheet.getRange(2, 1, 1, 5).setValues([[new Date(), name, email, phone, message]]);
        Logger.log('Sheet tab created and data added');
      } catch (createError) {
        Logger.log('Error creating sheet: ' + createError.toString());
        return ContentService
          .createTextOutput(JSON.stringify({ ok: false, error: 'Failed to create sheet: ' + createError.toString() }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    } else {
      // 📥 Append new row with form data
      try {
        sheet.appendRow([new Date(), name, email, phone, message]);
        Logger.log('Data appended to sheet successfully');
      } catch (appendError) {
        Logger.log('Error appending row: ' + appendError.toString());
        return ContentService
          .createTextOutput(JSON.stringify({ ok: false, error: 'Failed to append data: ' + appendError.toString() }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // ✅ Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // ❌ Return error response
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 🧪 Test function - Run this to verify the script works
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
    message: 'This is a test submission from Apps Script',
    appPassword: APP_PASSWORD
  };

  // Test with URL-encoded parameters (like the form sends)
  const mockEvent = {
    parameter: {
      name: testData.name,
      email: testData.email,
      phone: testData.phone,
      message: testData.message,
      appPassword: testData.appPassword
    }
  };

  Logger.log('Running test submission...');
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
  
  // Also test direct sheet access
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (sheet) {
      Logger.log('✅ Sheet access test: SUCCESS - Sheet found');
      Logger.log('Sheet has ' + sheet.getLastRow() + ' rows');
    } else {
      Logger.log('❌ Sheet access test: FAILED - Sheet tab not found');
    }
  } catch (error) {
    Logger.log('❌ Sheet access test: ERROR - ' + error.toString());
  }
}

